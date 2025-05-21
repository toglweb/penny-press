import { Switch, Route } from "wouter";
import LandingPage from "@/pages/LandingPage";
import HomePage from "@/pages/HomePage";
import ArticlePage from "@/pages/ArticlePage";
import ProfilePage from "@/pages/ProfilePage";
import NotFound from "@/pages/not-found";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import { UnlockProvider } from "./hooks/UnlockContext";
import favicon from '../favicon.ico';
import { Toaster } from 'react-hot-toast';


// Define user type for our mock authentication
export interface User {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
}

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const mockUser: User = {
    id: 1,
    name: "Jane Doe",
    email: "john@gmail.com",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
  };
  // Mock sign in function
  const handleSignIn = (email: string, password: string) => {
    // In a real app, this would validate credentials with the backend
    // For now, we'll just create a mock user object

    setUser(mockUser);
    setIsLoginModalOpen(false);
  };




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

  function getCookie(name: any) {
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
      } else {
        setUser(null);
      }
      // }else if(incomingMessageData?.event_type !== "account_connected"){
      //   setUser(null);
      // }
    }, 1000); // Check every 1 second

    return () => clearInterval(interval);
  }, []);

  // Mock sign out function
  const handleSignOut = () => {
    setUser(null);
  };

  // Create profile component with props
  const ProfileComponent = () => (
    <ProfilePage user={user} onSignOut={handleSignOut} />
  );


  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = favicon;
    document.head.appendChild(link);
  }, []);

  return (
    <UnlockProvider>
      <Toaster
        position="top-left"
        reverseOrder={false}
      />


      <div className="flex flex-col min-h-screen">
        <Header
          user={user}
          onOpenLoginModal={() => setIsLoginModalOpen(true)}
          onSignOut={handleSignOut}
        />
        <main className="flex-grow">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={HomePage} />
            <Route path="/article/:id" component={ArticlePage} />
            <Route path="/profile" component={ProfileComponent} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onSignIn={handleSignIn}
        />
      </div>
    </UnlockProvider>
  );
}

export default App;
