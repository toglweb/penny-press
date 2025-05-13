import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Article } from "@shared/schema";
import ArticleCard from "@/components/ArticleCard";
import Testimonial from "@/components/Testimonial";
import StepCard from "@/components/StepCard";
import PublicationLogo from "@/components/PublicationLogo";
import { Search, Coins, Zap, Heart } from "lucide-react";

const LandingPage = () => {
  const { data: articles, isLoading } = useQuery<Article[]>({
    queryKey: ['/api/articles/featured'],
  });

  // Array of major publications featured on PennyPress
  const publications = [
    'The New York Times',
    'The Washington Post',
    'The Wall Street Journal',
    'CNN',
    'BBC News',
    'Reuters',
    'Bloomberg News',
    'Associated Press',
    'The Guardian',
    'The Economist',
    'Vox',
    'Politico',
    'Business Insider',
    'The Times',
    'Los Angeles Times',
    'USA Today',
    'NBC News',
    'ABC News',
    'CBS News',
    'Al Jazeera',
    'Le Monde',
    'Der Spiegel',
    'Nikkei',
    'South China Morning Post',
    'Axios',
    'HuffPost',
    'BuzzFeed News'
  ];

  const testimonials = [
    {
      name: "Michael T.",
      title: "Avid Reader",
      content: "I love the freedom of paying for only what I read – no more full subscriptions! PennyPress has changed how I consume content online.",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
    },
    {
      name: "Jessica R.",
      title: "Tech Professional",
      content: "As someone who reads across multiple publications, PennyPress gives me the flexibility to access premium content without committing to dozens of subscriptions.",
      avatarUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
    },
    {
      name: "Thomas L.",
      title: "Student",
      content: "On a student budget, I couldn't afford multiple subscriptions. Now I can read quality articles from diverse sources while supporting writers directly.",
      avatarUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
    }
  ];

  const steps = [
    {
      icon: <Search className="text-[#1A8917] h-6 w-6" />,
      title: "Find an Article",
      description: "Browse top stories or search for what interests you."
    },
    {
      icon: <Coins className="text-[#1A8917] h-6 w-6" />,
      title: "Pay in Cents",
      description: "Unlock only the articles you want with one click."
    },
    {
      icon: <Zap className="text-[#1A8917] h-6 w-6" />,
      title: "Instant Access",
      description: "Enjoy premium content without subscriptions."
    },
    {
      icon: <Heart className="text-[#1A8917] h-6 w-6" />,
      title: "Support Writers",
      description: "Every payment goes directly to the creators."
    }
  ];

  useEffect(() => {
    document.title = "PennyPress - Read What You Want. Pay Only for What You Read.";
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">Read What You Want. Pay Only for What You Read.</h1>
            <p className="text-xl md:text-2xl text-[#757575] mb-8 max-w-2xl mx-auto">Discover premium articles without subscriptions – pay just cents per piece.</p>
            <Link href="/home">
              <Button className="bg-[#1A8917] hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-200 shadow-md hover:shadow-lg">
                Start Reading
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-[#F8F8F8]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-12">How PennyPress Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <StepCard key={index} {...step} />
            ))}
          </div>
        </div>
      </section>

      {/* Sample Articles Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-4">Featured Articles</h2>
          <p className="text-[#757575] text-center mb-12 max-w-2xl mx-auto">Discover high-quality content from talented writers across various topics.</p>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Show 3 skeleton loaders while loading */}
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Show exactly 3 featured articles */}
              {articles?.slice(0, 3).map((article) => (
                <ArticleCard key={article.id} article={article} featured={true} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link href="/home">
              <Button variant="outline" className="py-3 px-8 border border-[#757575] text-[#757575] rounded-full hover:bg-[#F2F2F2] transition duration-200">
                Browse All Articles
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-4">All Your Favorite Publications in One Place</h2>
          <p className="text-[#757575] text-center mb-12 max-w-2xl mx-auto">
            PennyPress aggregates articles from major news sources worldwide, giving you access to premium content from trusted publications with a single account.
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 gap-2 md:gap-4">
            {publications.slice(0, 18).map((publication, index) => (
              <div key={index} className="flex justify-center">
                <PublicationLogo name={publication} />
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-[#757575] text-sm">Plus many more leading publications from around the world...</p>
          </div>
        </div>
      </section>

      {/* User Testimonials */}
      <section className="py-16 bg-[#F8F8F8]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-12">What Our Readers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Testimonial key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6">Join thousands of readers. Pay only for what you read.</h2>
            <p className="text-[#757575] mb-8 text-lg">Start your journey with PennyPress today and discover a smarter way to consume premium content.</p>
            <Button className="bg-[#1A8917] hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-200 shadow-md hover:shadow-lg">
              Create Your Account
            </Button>
            <p className="mt-4 text-sm text-[#757575]">No subscription required. No minimum commitment.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
