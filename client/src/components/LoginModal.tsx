import { useState, FormEvent, ChangeEvent, useRef } from "react";
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import { ConnectToglButton } from "connect-togl";
import logo from "../assets/togl-icon.svg"
import { useUnlock } from "@/hooks/UnlockContext";
import { useRoute } from "wouter";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: (email: string, password: string) => void;
}

const LoginModal = ({ isOpen, onClose, onSignIn }: LoginModalProps) => {
  const buttonRef: any = useRef(null);
  const [, params] = useRoute("/article/:id");
  const articleId = params?.id ? parseInt(params.id) : 0;
  const { setUnlocked } = useUnlock();


  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (isSignUp) {
      // In a real app, this would call a signup API
      // For the mock, we immediately sign them in
      onSignIn(formData.email, formData.password);
    } else {
      // Call the provided sign in function with form data
      onSignIn(formData.email, formData.password);
    }
  };

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
    }
  };
  const onFundReject = (data: any) => {
    console.log('onFundReject', data);
    window.alert("funds declined")

  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-lg max-w-md w-full mx-4 animate-fade-in p-0">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <DialogTitle className="text-2xl font-bold">{isSignUp ? "Sign Up" : "Sign In"}</DialogTitle>
            {/* <DialogClose className="text-[#757575] hover:text-black">
              <X className="h-5 w-5" />
            </DialogClose> */}
          </div>

          <div className="mb-6">
            <Button
              variant="outline"
              className="w-full py-3 px-4 border border-gray-300 rounded-lg flex items-center justify-center font-medium hover:bg-[#F2F2F2] transition mb-3"
            >
              <i className="fab fa-google mr-2"></i> Continue with Google
            </Button>
            <Button
              variant="outline"
              className="w-full py-3 px-4 border border-gray-300 rounded-lg flex items-center justify-center font-medium hover:bg-[#F2F2F2] transition mb-3"
            >
              <i className="fab fa-apple mr-2"></i> Continue with Apple
            </Button>
            {/* <Button
              variant="outline"
              className="w-full py-3 px-4 border border-gray-300 rounded-lg flex items-center justify-center font-medium hover:bg-[#F2F2F2] transition"
            >
              <img src={logo} alt="" className="w-4 h-4 mr-2" />
              <ConnectToglButton
                apikey={"41897981789148918494198"}
                companyId={"6811b6dcd402d4e24735eb31"}
                ref={buttonRef}
                extensionId="kbkhmlfogpleldogmkkcbfmpmhhllnmm"
                style={{
                  backgroundColor: "transparent",
                  // width:"100%",
                  color: "black",
                  // padding: "9px 24px",
                  // borderRadius: "8px",
                  // marginTop: "20px",
                  fontWeight: 500,
                  fontSize: "14px",
                  // marginInline:"10px",
                  // border:"1px solid #d1d5db"
                }}
                onFundApprove={onFundApprove}
                onFundReject={onFundReject}
              />
            </Button> */}
             <ConnectToglButton
              apikey={"41897981789148918494198"}
              companyId={"6811b6dcd402d4e24735eb31"}
              ref={buttonRef}
                extensionId="kkojjinggkcdgmhandhckbjbeeiefhgi" // prod
                // extensionId="kbkhmlfogpleldogmkkcbfmpmhhllnmm" // local
              style={{
                width: "100%",
                paddingTop: "0.75rem", // 12px
                paddingBottom: "0.75rem", // 12px
                paddingLeft: "1rem", // 16px
                paddingRight: "1rem", // 16px
                border: "1px solid #d1d5db",
                borderRadius: "0.5rem", // 8px
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "500",
                fontSize: "14px",
                backgroundColor: "transparent",
                color: "black",
                transition: "background-color 0.3s ease",
                cursor: "pointer",
              }}
              onFundApprove={onFundApprove}
              onFundReject={onFundReject}
            />
          </div>

          <div className=" flex items-center w-full my-6">
            <Separator className="w-[44.5%]" />
            <span className="flex-shrink mx-4 text-[#757575] text-sm">or</span>
            <Separator className="w-[44.5%]" />
          </div>

          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="mb-4">
                <Label htmlFor="name" className="block text-sm font-medium mb-2">Full Name</Label>
                <Input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full py-2 px-4 border border-[#E6E6E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A8917]"
                />
              </div>
            )}

            <div className="mb-4">
              <Label htmlFor="email" className="block text-sm font-medium mb-2">Email</Label>
              <Input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full py-2 px-4 border border-[#E6E6E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A8917]"
              />
            </div>

            <div className="mb-6">
              <Label htmlFor="password" className="block text-sm font-medium mb-2">Password</Label>
              <Input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full py-2 px-4 border border-[#E6E6E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A8917]"
              />
              {!isSignUp && (
                <div className="mt-1 text-right">
                  <a href="#" className="text-sm text-[#1A8917] hover:underline">Forgot password?</a>
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-[#1A8917] hover:bg-opacity-90 text-white font-bold py-3 px-4 rounded-full transition duration-200"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-[#757575]">
            {isSignUp ? (
              <>Already have an account? <Button variant="link" className="text-[#1A8917] hover:underline p-0" onClick={() => setIsSignUp(false)}>Sign in</Button></>
            ) : (
              <>Don't have an account? <Button variant="link" className="text-[#1A8917] hover:underline p-0" onClick={() => setIsSignUp(true)}>Sign up</Button></>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
