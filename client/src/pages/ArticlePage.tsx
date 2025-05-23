import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Article } from "@shared/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRoute } from "wouter";
import {  RequestFund } from "connect-togl";
import { useUnlock } from "@/hooks/UnlockContext";
import LoginModal from "@/components/LoginModal";
import { User } from "@/App";
import UnlockNowModal from "@/components/unlockNowModal";


const ArticlePage = () => {
  const [, params] = useRoute("/article/:id");
  const articleId = params?.id ? parseInt(params.id) : 0;
  const { unlocked, setUnlocked } = useUnlock();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [UnlockNowModalOpen, setUnlockNowModalOpen] = useState(false);
   const [user, setUser] = useState<User | null>(null);
   
  
    const mockUser: User = {
      id: 1,
      name: "Jane Doe",
      email: "john@gmail.com",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
    };

  const { data: article, isLoading } = useQuery<Article>({
    queryKey: [`/api/articles/${articleId}`],
  });

  useEffect(() => {
    const approved = JSON.parse(localStorage.getItem("approved_articles") || "[]");
    if (approved.includes(articleId)) {
      setUnlocked(true);
    } else {
      setUnlocked(false);
    }
  }, [articleId]);


  useEffect(() => {
    if (article) {
      document.title = `${article.title} | PennyPress`;
    }
  }, [article]);
  
  const getTokenFromCookie = () => {
    const cookieName = "token"; // Specify the cookie name
    const decodedCookie = decodeURIComponent(document.cookie); // Decode cookies for readability
    const cookiesArray = decodedCookie.split(';'); // Split cookies by semicolon
  
    for (let i = 0; i < cookiesArray.length; i++) {
      let c = cookiesArray[i].trim();  // Trim leading spaces
  
      if (c.indexOf(cookieName + "=") === 0) {  // Look for "token=" in each cookie
        return c.substring(cookieName.length + 1);  // Return value after "token="
      }
    }
    return null; // Return null if the cookie doesn't exist
  };

  const handleRequestFunds = async (amount: any) => {
    const incomingMessageData = getCookie("incomingMessage");
    console.log('incomingMessageData: ', incomingMessageData);
    setUnlockNowModalOpen(false)
    if(incomingMessageData?.event_type !== "account_connected"){
      localStorage.setItem("unlock_now",amount)
      setIsLoginModalOpen(true)
      return
    }
    setIsLoginModalOpen(false)
    const extensionId =  "kkojjinggkcdgmhandhckbjbeeiefhgi"
    // const extensionId =  "kbkhmlfogpleldogmkkcbfmpmhhllnmm"
    const res = await RequestFund(amount,extensionId);  // Make API call
    console.log('handleRequestFunds res: ', res);

  };


  useEffect(() => {
    // let lastToken = getTokenFromCookie();
  
    const interval = setInterval(() => {
      const currentToken = getTokenFromCookie();
      const incomingMessageData = getCookie("incomingMessage");

  
      // if (currentToken !== lastToken) {
      //   console.log("Token changed:", currentToken);
      //   lastToken = currentToken;
  
        if (currentToken && incomingMessageData?.event_type === "account_connected") {
          setUser(mockUser);
          setIsLoginModalOpen(false);
          const getAmount:any = localStorage.getItem("unlock_now")
          if(getAmount && getAmount > 0){
            handleRequestFunds(getAmount)
            localStorage.removeItem("unlock_now")
          }
        } else {
          setUser(null);
        }
      // }else if(incomingMessageData?.event_type !== "account_connected"){
      //   setUser(null);
      // }
    }, 1000); // Check every 1 second
  
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl animate-pulse">
        <div className="mb-8">
          <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
            <div className="ml-3">
              <div className="h-4 bg-gray-200 rounded w-32 mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-48"></div>
            </div>
          </div>
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-8 h-8 rounded-full bg-gray-200"></div>
            <div className="w-8 h-8 rounded-full bg-gray-200"></div>
            <div className="w-8 h-8 rounded-full bg-gray-200"></div>
            <div className="w-8 h-8 rounded-full bg-gray-200"></div>
          </div>
          <div className="w-full h-64 bg-gray-200 rounded-lg mb-8"></div>
        </div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-4">Article not found</h1>
        <p>The article you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  const {
    title,
    author,
    publishedDate,
    readTime,
    category,
    imageUrl,
    content,
    price,
    comments
  } = article;

  const formattedDate = new Date(publishedDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric'
  });



  // const onFundApprove = (data: any) => {
  //   console.log('onFundApprove', data);
  //   window.alert("funds approved")


  // }
  // const onFundReject = (data: any) => {
  //   console.log('onFundReject', data);
  //   window.alert("funds declined")

  // }
  function getCookie(name:any) {
    const cookieArr = document.cookie.split(";");
  
    // Loop through all cookies to find the one we need
    for (let i = 0; i < cookieArr.length; i++) {
      let cookie = cookieArr[i].trim();
  
      if (cookie.startsWith(name + "=")) {
        const cookieValue = cookie.substring(name.length + 1);
        return JSON.parse(cookieValue); // Parse back to object
      }
    }
    return null; // Return null if the cookie is not found
  }

    
 

  
  
  
  const handleSignIn = (email: string, password: string) => {
    // In a real app, this would validate credentials with the backend
    // For now, we'll just create a mock user object
    
    setUser(mockUser);
    setIsLoginModalOpen(false);
  };
  return (
    <main className="pt-8 pb-16">
      <article className="container mx-auto px-4 max-w-3xl">
        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-serif mb-4">{title}</h1>

          <div className="flex items-center mb-6">
            <Avatar className="w-10 h-10">
              <AvatarImage src={author.avatarUrl} alt={`${author.name} avatar`} />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="font-medium">{author.name}</p>
              <div className="flex items-center text-sm text-[#757575]">
                <span>{formattedDate}</span>
                <span className="mx-1">·</span>
                <span>{readTime} min read</span>
                <span className="mx-1">·</span>
                <span>{category}</span>
              </div>
            </div>
          </div>

          {/* Social Share */}
          <div className="flex items-center space-x-4 mb-6">
            <Button variant="ghost" size="icon" className="p-2 hover:bg-[#F2F2F2] rounded-full transition">
              <i className="fab fa-twitter text-[#757575]"></i>
            </Button>
            <Button variant="ghost" size="icon" className="p-2 hover:bg-[#F2F2F2] rounded-full transition">
              <i className="fab fa-facebook-f text-[#757575]"></i>
            </Button>
            <Button variant="ghost" size="icon" className="p-2 hover:bg-[#F2F2F2] rounded-full transition">
              <i className="fab fa-linkedin-in text-[#757575]"></i>
            </Button>
            <Button variant="ghost" size="icon" className="p-2 hover:bg-[#F2F2F2] rounded-full transition">
              <i className="fas fa-link text-[#757575]"></i>
            </Button>
          </div>

          {/* Header Image */}
          <img src={imageUrl} alt={`${title} featured image`} className="w-full h-auto rounded-lg mb-8" />
        </header>

        {/* Article Content */}
        <div className="article-body">
          {/* Display limited content before unlocking */}
          {!unlocked ? (
            <>
              <div dangerouslySetInnerHTML={{
                __html: content.split('</p>').slice(0, 2).join('</p>') + '</p>'
              }} />
              <div className="h-20"></div>
              <div className="article-fade-out"></div>
            </>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          )}
        </div>

        {/* Paywall */}
        {!unlocked && (
          <div className="mt-6 p-6 border border-[#E6E6E6] rounded-lg bg-white shadow-md text-center">
            <h3 className="text-xl font-bold mb-2">Continue Reading for ${price.toFixed(2)}</h3>
            <p className="text-[#757575] mb-4">Unlock the full article to learn more about this topic and gain valuable insights.</p>
            <Button
              className="bg-[#1A8917] hover:bg-opacity-90 ml-2 text-white font-bold py-2 px-6 rounded-full transition duration-200"
              onClick={() => setUnlockNowModalOpen(true)}

            >
              Unlock Now
            </Button>
            <p className="mt-3 text-sm text-[#757575]">One-time payment. No subscription required.</p>
          </div>
        )}

        {/* Author Info */}
        <div className="mt-12 p-6 border-t border-b border-[#E6E6E6]">
          <div className="flex items-start">
            <Avatar className="w-12 h-12">
              <AvatarImage src={author.avatarUrl} alt={`${author.name} avatar`} />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <p className="font-bold">{author.name}</p>
              <p className="text-sm text-[#757575] mb-2">{author.bio}</p>
              <p className="text-[#757575] text-sm mb-4">{author.description}</p>
              <Button variant="ghost" className="text-[#1A8917] hover:text-opacity-80 font-medium text-sm p-0">
                Follow
              </Button>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <section className="mt-12">
          <h3 className="text-xl font-bold mb-6">Comments</h3>

          <div className="mb-8">
            <Textarea
              placeholder="Add to the discussion..."
              className="w-full p-4 border border-[#E6E6E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A8917]"
            />
            <div className="mt-2 text-right">
              <Button className="bg-[#1A8917] hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded-full text-sm transition duration-200">
                Post Comment
              </Button>
            </div>
          </div>

          {comments.map((comment, index) => (
            <div key={index} className="border-t border-[#E6E6E6] py-6">
              <div className="flex items-start">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={comment.user.avatarUrl} alt={`${comment.user.name} avatar`} />
                  <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="ml-3 flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-medium">{comment.user.name}</p>
                    <p className="text-xs text-[#757575]">{comment.timeAgo}</p>
                  </div>
                  <p className="text-[#757575] mb-2">{comment.content}</p>
                  <div className="flex items-center text-sm">
                    <Button variant="ghost" className="text-[#757575] hover:text-[#1A8917] flex items-center p-0">
                      <i className="far fa-heart mr-1"></i>
                      <span>{comment.likes}</span>
                    </Button>
                    <Button variant="ghost" className="ml-4 text-[#757575] hover:text-[#1A8917] p-0">Reply</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {comments.length === 0 && (
            <div className="text-center py-8 border-t border-[#E6E6E6]">
              <p className="text-[#757575]">Be the first to comment on this article.</p>
            </div>
          )}
        </section>
      </article>
      <LoginModal
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onSignIn={handleSignIn}
      />
      <UnlockNowModal
        isOpen={UnlockNowModalOpen} 
        onClose={() => setUnlockNowModalOpen(false)} 
        handleRequestFunds={()=>handleRequestFunds(price)}
      />
    </main>
  );
};

export default ArticlePage;
