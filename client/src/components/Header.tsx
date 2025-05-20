import { useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, Menu, User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User as UserType } from "@/App";
import { ConnectToglButton } from "connect-togl";
import { useUnlock } from "@/hooks/UnlockContext";

interface HeaderProps {
  user: UserType | null;
  onOpenLoginModal: () => void;
  onSignOut: () => void;
}

const Header = ({ user, onOpenLoginModal, onSignOut }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [, setLocation] = useLocation();
    const [, params] = useRoute("/article/:id");
    const articleId = params?.id ? parseInt(params.id) : 0;
    const { setUnlocked } = useUnlock();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };


  function deleteCookie(name:any) {
    // Set the cookie with the same name and a past expiration date
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
  }

  const handleSignOut = ()=>{

    deleteCookie('incomingMessage');
    deleteCookie('token')
    window.location.reload()
  }

   const onFundReject = (data: any) => {
    console.log('onFundReject', data);
    window.alert("funds declined")

  }
 const onFundApprove = (data: any) => {
      console.log('onFundApprove', data);
    window.alert("Funds approved");

    setUnlocked(true);

    // Get existing list
    const approvedArticles = JSON.parse(localStorage.getItem("approved_articles") || "[]");

    // Add current articleId if not already in list
    if (!approvedArticles.includes(articleId)) {
      approvedArticles.push(articleId);
      localStorage.setItem("approved_articles", JSON.stringify(approvedArticles));
    }}
  return (
    <header className="border-b border-[#E6E6E6] sticky top-0 bg-white z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold flex items-center">
            <span className="text-[#1A8917]">Penny</span><span>Press</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/home" className="nav-link font-medium">Home</Link>
          <Link href="/home?category=technology" className="nav-link font-medium">Technology</Link>
          <Link href="/home?category=business" className="nav-link font-medium">Business</Link>
          <Link href="/home?category=lifestyle" className="nav-link font-medium">Lifestyle</Link>
          <Link href="/home?category=politics" className="nav-link font-medium">Politics</Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="p-2 hover:bg-[#F2F2F2] rounded-full"
            onClick={toggleSearch}
          >
            <Search className="h-5 w-5 text-[#757575]" />
          </Button>
          
          {user ? (
            // User is signed in, show profile dropdown
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                {/* <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setLocation('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator /> */}
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
            {/* // User is not signed in, show sign in button
            <Button
              variant="outline"
              className="hidden md:flex py-2 px-4 rounded-full border border-[#1A8917] text-[#1A8917] hover:bg-[#1A8917] hover:text-white transition duration-200"
              onClick={onOpenLoginModal}
            >
              Sign In
            </Button> */}
               <ConnectToglButton
                          apikey={"41897981789148918494198"}
                          companyId={"6811b6dcd402d4e24735eb31"}
                          // ref={buttonRef}
                          extensionId="kkojjinggkcdgmhandhckbjbeeiefhgi" // prod
                          // extensionId="kbkhmlfogpleldogmkkcbfmpmhhllnmm" // local
                          style={{
                            width: "100%",
                            paddingTop: "8px", // 12px
                            paddingBottom: "8px", // 12px
                            paddingLeft: "1rem", // 16px
                            paddingRight: "1rem", // 16px
                            border: "1px solid #d1d5db",
                            borderRadius: "40px", // 8px
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "500",
                            fontSize: "17px",
                            backgroundColor: "transparent",
                            color: "black",
                            transition: "background-color 0.3s ease",
                            cursor: "pointer",
                          }}
                          onFundApprove={onFundApprove}
                          onFundReject={onFundReject}
                        />
                        </>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden p-2 hover:bg-[#F2F2F2] rounded-full"
            onClick={toggleMobileMenu}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#E6E6E6]">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-3 py-4">
              <Link href="/home" className="nav-link font-medium py-2">Home</Link>
              <Link href="/home?category=technology" className="nav-link font-medium py-2">Technology</Link>
              <Link href="/home?category=business" className="nav-link font-medium py-2">Business</Link>
              <Link href="/home?category=lifestyle" className="nav-link font-medium py-2">Lifestyle</Link>
              <Link href="/home?category=politics" className="nav-link font-medium py-2">Politics</Link>
              
              {user ? (
                // User profile info for mobile
                <div className="mt-2 py-2 border-t border-[#E6E6E6]">
                  <div className="flex items-center py-2">
                    <Avatar className="h-9 w-9 mr-2">
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="mt-2 py-2 px-4 rounded-full border border-[#1A8917] text-[#1A8917] hover:bg-[#1A8917] hover:text-white transition duration-200 w-full flex items-center justify-center"
                    onClick={() => setLocation('/profile')}
                  >
                    <User className="mr-2 h-4 w-4" />
                    View Profile
                  </Button>
                  <Button
                    variant="outline"
                    className="mt-2 py-2 px-4 rounded-full border border-[#1A8917] text-[#1A8917] hover:bg-[#1A8917] hover:text-white transition duration-200 w-full flex items-center justify-center"
                    onClick={onSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </div>
              ) : (
                // Sign in button for mobile
                <Button
                  className="mt-2 py-2 px-4 rounded-full border border-[#1A8917] text-[#1A8917] hover:bg-[#1A8917] hover:text-white transition duration-200 w-full"
                  onClick={onOpenLoginModal}
                >
                  Sign In
                </Button>
              )}
            </nav>
          </div>
        </div>
      )}
      
      {/* Search Bar */}
      {isSearchOpen && (
        <div className="border-t border-[#E6E6E6] py-3">
          <div className="container mx-auto px-4">
            <div className="relative">
              <div className="relative w-full rounded-full overflow-hidden bg-[#F8F8F8]">
                <Input 
                  type="text" 
                  placeholder="Search for articles..." 
                  className="w-full py-3 pl-10 pr-10 border-none bg-transparent outline-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const value = (e.target as HTMLInputElement).value;
                      setLocation(`/home?search=${encodeURIComponent(value)}`);
                      setIsSearchOpen(false);
                    }
                  }}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#757575] h-4 w-4" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full rounded-r-full px-3 text-[#757575] hover:text-black hover:bg-gray-200"
                  onClick={toggleSearch}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
