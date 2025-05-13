import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { User } from "@/App";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Article } from "@shared/schema";
import ArticleCard from "@/components/ArticleCard";
import { useQuery } from "@tanstack/react-query";
import { 
  CreditCard, 
  History, 
  BookOpen, 
  Settings, 
  Edit, 
  Mail, 
  User as UserIcon 
} from "lucide-react";

interface ProfilePageProps {
  user: User | null;
  onSignOut: () => void;
}

// Mock data for purchases and reading history
interface Purchase {
  id: number;
  articleId: number;
  articleTitle: string;
  price: number;
  date: string;
  imageUrl: string;
}

interface ReadItem {
  id: number;
  articleId: number;
  articleTitle: string;
  date: string;
  progress: number;
  imageUrl: string;
}

const ProfilePage = ({ user, onSignOut }: ProfilePageProps) => {
  const [, setLocation] = useLocation();
  
  // Mock purchases data
  const [purchases, setPurchases] = useState<Purchase[]>([
    {
      id: 1,
      articleId: 1,
      articleTitle: "The Future of AI: How Machine Learning is Reshaping Industries",
      price: 0.10,
      date: "May 3, 2023",
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500"
    },
    {
      id: 2,
      articleId: 8,
      articleTitle: "Quantum Computing: The New Frontier of Processing Power",
      price: 0.12,
      date: "May 1, 2023",
      imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500"
    },
    {
      id: 3,
      articleId: 2,
      articleTitle: "Remote Work Revolution: The New Normal for Corporate America",
      price: 0.15,
      date: "April 29, 2023",
      imageUrl: "https://images.unsplash.com/photo-1577412647305-991150c7d163?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500"
    }
  ]);
  
  // Mock reading history data
  const [readingHistory, setReadingHistory] = useState<ReadItem[]>([
    {
      id: 1,
      articleId: 1,
      articleTitle: "The Future of AI: How Machine Learning is Reshaping Industries",
      date: "May 3, 2023",
      progress: 100,
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500"
    },
    {
      id: 2,
      articleId: 8,
      articleTitle: "Quantum Computing: The New Frontier of Processing Power",
      date: "May 1, 2023",
      progress: 85,
      imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500"
    },
    {
      id: 3,
      articleId: 2,
      articleTitle: "Remote Work Revolution: The New Normal for Corporate America",
      date: "April 29, 2023",
      progress: 60,
      imageUrl: "https://images.unsplash.com/photo-1577412647305-991150c7d163?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500"
    },
    {
      id: 4,
      articleId: 14,
      articleTitle: "Digital Minimalism: Finding Balance in an Always-On World",
      date: "April 27, 2023",
      progress: 40,
      imageUrl: "https://images.unsplash.com/photo-1536148935331-408321065b18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500"
    }
  ]);
  
  // Get recommended articles based on reading history
  const { data: recommendedArticles, isLoading } = useQuery<Article[]>({
    queryKey: ['/api/articles'],
    queryFn: async () => {
      const response = await fetch('/api/articles');
      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }
      return response.json();
    }
  });
  
  useEffect(() => {
    // Redirect to home if no user is logged in
    if (!user) {
      setLocation("/");
    }
    
    // Set page title
    document.title = user ? `${user.name}'s Profile - PennyPress` : "Profile - PennyPress";
  }, [user, setLocation]);
  
  if (!user) {
    return null; // Don't render if not logged in
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="mb-8 p-6 bg-white rounded-lg border border-[#E6E6E6] shadow-sm">
          <div className="flex flex-col md:flex-row items-center">
            <Avatar className="h-24 w-24 md:h-32 md:w-32">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left flex-grow">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-[#757575] flex items-center justify-center md:justify-start mt-1">
                    <Mail className="h-4 w-4 mr-1" />
                    {user.email}
                  </p>
                </div>
                <Button 
                  className="mt-4 md:mt-0 bg-[#1A8917] hover:bg-opacity-90 text-white"
                  size="sm"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
              
              <div className="mt-4 p-4 bg-[#F8F8F8] rounded-lg">
                <h3 className="font-medium mb-2">Account Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2 text-[#1A8917]" />
                    <div>
                      <p className="text-sm text-[#757575]">Total Spent</p>
                      <p className="font-medium">${purchases.reduce((sum, p) => sum + p.price, 0).toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-[#1A8917]" />
                    <div>
                      <p className="text-sm text-[#757575]">Articles Purchased</p>
                      <p className="font-medium">{purchases.length}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <History className="h-4 w-4 mr-2 text-[#1A8917]" />
                    <div>
                      <p className="text-sm text-[#757575]">Member Since</p>
                      <p className="font-medium">May 2023</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Profile Tabs */}
        <Tabs defaultValue="purchases" className="w-full">
          <TabsList className="mb-6 grid grid-cols-4 bg-transparent">
            <TabsTrigger value="purchases" className="data-[state=active]:bg-[#1A8917] data-[state=active]:text-white">
              Purchases
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-[#1A8917] data-[state=active]:text-white">
              Reading History
            </TabsTrigger>
            <TabsTrigger value="recommended" className="data-[state=active]:bg-[#1A8917] data-[state=active]:text-white">
              Recommended
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-[#1A8917] data-[state=active]:text-white">
              Settings
            </TabsTrigger>
          </TabsList>
          
          {/* Purchases Tab */}
          <TabsContent value="purchases" className="mt-0">
            <h2 className="text-xl font-bold mb-4">Your Purchases</h2>
            {purchases.length === 0 ? (
              <div className="text-center py-8 bg-[#F8F8F8] rounded-lg">
                <BookOpen className="h-12 w-12 mx-auto text-[#757575] mb-2" />
                <h3 className="text-lg font-medium mb-1">No purchases yet</h3>
                <p className="text-[#757575]">Articles you purchase will appear here</p>
                <Button 
                  className="mt-4 bg-[#1A8917] hover:bg-opacity-90 text-white"
                  onClick={() => setLocation("/home")}
                >
                  Browse Articles
                </Button>
              </div>
            ) : (
              <div>
                {purchases.map((purchase) => (
                  <div key={purchase.id} className="mb-4 border border-[#E6E6E6] rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4 h-40 md:h-auto">
                        <img 
                          src={purchase.imageUrl} 
                          alt={purchase.articleTitle} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 md:p-6 flex flex-col justify-between flex-grow">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-bold mb-2">{purchase.articleTitle}</h3>
                            <span className="bg-[#1A8917] bg-opacity-10 text-[#1A8917] text-sm font-bold py-1 px-3 rounded-full">
                              ${purchase.price.toFixed(2)}
                            </span>
                          </div>
                          <p className="text-[#757575] mb-4">Purchased on {purchase.date}</p>
                        </div>
                        <div className="flex justify-end">
                          <Button 
                            variant="outline" 
                            className="text-[#1A8917] border-[#1A8917]"
                            onClick={() => setLocation(`/article/${purchase.articleId}`)}
                          >
                            Read Article
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          {/* Reading History Tab */}
          <TabsContent value="history" className="mt-0">
            <h2 className="text-xl font-bold mb-4">Your Reading History</h2>
            {readingHistory.length === 0 ? (
              <div className="text-center py-8 bg-[#F8F8F8] rounded-lg">
                <History className="h-12 w-12 mx-auto text-[#757575] mb-2" />
                <h3 className="text-lg font-medium mb-1">No reading history</h3>
                <p className="text-[#757575]">Articles you read will appear here</p>
              </div>
            ) : (
              <div>
                {readingHistory.map((item) => (
                  <div key={item.id} className="mb-4 border border-[#E6E6E6] rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4 h-40 md:h-auto">
                        <img 
                          src={item.imageUrl} 
                          alt={item.articleTitle} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 md:p-6 flex flex-col justify-between flex-grow">
                        <div>
                          <h3 className="text-lg font-bold mb-2">{item.articleTitle}</h3>
                          <p className="text-[#757575] mb-2">Last read on {item.date}</p>
                          
                          {/* Progress bar */}
                          <div className="w-full bg-[#E6E6E6] rounded-full h-2.5 mb-4">
                            <div 
                              className="bg-[#1A8917] h-2.5 rounded-full" 
                              style={{ width: `${item.progress}%` }}
                            />
                          </div>
                          <p className="text-sm text-[#757575]">{item.progress}% complete</p>
                        </div>
                        <div className="flex justify-end">
                          <Button 
                            variant="outline" 
                            className="text-[#1A8917] border-[#1A8917]"
                            onClick={() => setLocation(`/article/${item.articleId}`)}
                          >
                            Continue Reading
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          {/* Recommended Tab */}
          <TabsContent value="recommended" className="mt-0">
            <h2 className="text-xl font-bold mb-4">Recommended For You</h2>
            <p className="text-[#757575] mb-6">Based on your reading history and purchases</p>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="rounded-lg overflow-hidden border border-[#E6E6E6] h-full animate-pulse">
                    <div className="w-full h-48 bg-gray-200"></div>
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="bg-gray-200 h-6 w-16 rounded-full"></div>
                        <div className="ml-2 bg-gray-200 h-4 w-20 rounded-full"></div>
                      </div>
                      <div className="bg-gray-200 h-6 w-full rounded mb-2"></div>
                      <div className="bg-gray-200 h-4 w-full rounded mb-1"></div>
                      <div className="bg-gray-200 h-4 w-3/4 rounded mb-4"></div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                        <div className="ml-2">
                          <div className="bg-gray-200 h-4 w-24 rounded mb-1"></div>
                          <div className="bg-gray-200 h-3 w-32 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedArticles && recommendedArticles.slice(0, 6).map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings" className="mt-0">
            <h2 className="text-xl font-bold mb-4">Account Settings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-[#E6E6E6] rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <UserIcon className="h-5 w-5 mr-2 text-[#1A8917]" />
                  Personal Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input 
                      type="text" 
                      value={user.name}
                      className="w-full p-2 border border-[#E6E6E6] rounded-md"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input 
                      type="email" 
                      value={user.email}
                      className="w-full p-2 border border-[#E6E6E6] rounded-md"
                      readOnly
                    />
                  </div>
                  <Button className="bg-[#1A8917] hover:bg-opacity-90 text-white">
                    Update Information
                  </Button>
                </div>
              </div>
              
              <div className="border border-[#E6E6E6] rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-[#1A8917]" />
                  Payment Methods
                </h3>
                <div className="p-4 mb-4 bg-[#F8F8F8] rounded-lg border border-[#E6E6E6] flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-gray-800 w-10 h-7 rounded-md flex items-center justify-center text-white font-bold mr-3">
                      Visa
                    </div>
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-sm text-[#757575]">Expires 05/25</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
                <Button variant="outline" className="w-full">
                  Add Payment Method
                </Button>
              </div>
              
              <div className="border border-[#E6E6E6] rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-[#1A8917]" />
                  Preferences
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <input 
                      type="checkbox" 
                      id="emailNotifications" 
                      className="mt-1 mr-2"
                      defaultChecked
                    />
                    <div>
                      <label htmlFor="emailNotifications" className="font-medium">Email Notifications</label>
                      <p className="text-sm text-[#757575]">Receive updates about new articles and features</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <input 
                      type="checkbox" 
                      id="weeklyDigest" 
                      className="mt-1 mr-2"
                      defaultChecked
                    />
                    <div>
                      <label htmlFor="weeklyDigest" className="font-medium">Weekly Digest</label>
                      <p className="text-sm text-[#757575]">Get a weekly email with personalized recommendations</p>
                    </div>
                  </div>
                  <Button className="bg-[#1A8917] hover:bg-opacity-90 text-white">
                    Save Preferences
                  </Button>
                </div>
              </div>
              
              <div className="border border-[#E6E6E6] rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4 text-red-600">Account Actions</h3>
                <div className="space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full border-red-600 text-red-600 hover:bg-red-50"
                    onClick={onSignOut}
                  >
                    Sign Out
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-300 text-gray-700"
                  >
                    Export My Data
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-red-600 text-red-600 hover:bg-red-50"
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;