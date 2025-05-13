import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Article } from "@shared/schema";
import ArticleCard from "@/components/ArticleCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HomePage = () => {
  const [location] = useLocation();
  const [category, setCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Parse URL params
  useEffect(() => {
    const params = new URLSearchParams(location.split('?')[1]);
    const categoryParam = params.get('category');
    const searchParam = params.get('search');
    
    if (categoryParam) {
      setCategory(categoryParam);
    }
    
    if (searchParam) {
      setSearchQuery(searchParam);
    }
    
    document.title = `PennyPress - ${categoryParam ? categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1) : "Home"}`;
  }, [location]);

  // Construct the URL with query params
  const buildUrl = () => {
    let url = '/api/articles';
    const params = new URLSearchParams();
    
    if (category) {
      params.append('category', category);
    }
    
    if (searchQuery) {
      params.append('search', searchQuery);
    }
    
    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
    
    return url;
  };

  // Create fully constructed URL when dependencies change
  const apiUrl = buildUrl();
  
  // Fetch articles based on category and search
  const { data: articles, isLoading } = useQuery<Article[]>({
    queryKey: ['/api/articles', { category, search: searchQuery }],
    queryFn: async () => {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }
      return response.json();
    }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // No need to update URL here as the query is already included in the queryKey
  };

  const categories = [
    "All", "Technology", "Business", "Lifestyle", "Politics", "Health", "Science"
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <form onSubmit={handleSearch} className="relative max-w-lg mx-auto mb-10">
          <Input
            type="text"
            placeholder="Search for articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-3 px-10 bg-[#F8F8F8] rounded-full outline-none w-full"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#757575] h-4 w-4" />
          <Button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#1A8917] hover:bg-opacity-90 text-white py-1 px-4 rounded-full text-sm"
          >
            Search
          </Button>
        </form>
        
        <Tabs defaultValue={category || "All"} className="w-full" onValueChange={(value) => setCategory(value === "All" ? null : value.toLowerCase())}>
          <TabsList className="mb-8 flex space-x-2 overflow-x-auto pb-2 justify-start w-full bg-transparent">
            {categories.map(cat => (
              <TabsTrigger 
                key={cat} 
                value={cat}
                className="data-[state=active]:bg-[#1A8917] data-[state=active]:text-white rounded-full px-4 py-2 text-sm font-medium"
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map(cat => (
            <TabsContent key={cat} value={cat} className="mt-0">
              {searchQuery && (
                <h2 className="text-2xl font-serif font-bold mb-6">
                  {searchQuery ? `Search results for "${searchQuery}"` : ""}
                </h2>
              )}
              
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(6)].map((_, index) => (
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
              ) : articles?.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-bold mb-2">No articles found</h3>
                  <p className="text-[#757575]">Try adjusting your search or browse a different category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {articles?.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default HomePage;
