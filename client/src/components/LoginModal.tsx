import { useState, FormEvent, ChangeEvent } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useUnlock } from "@/hooks/UnlockContext";
import { useRoute } from "wouter";
import { ConnectToglButton } from "connect-togl";
import toast from "react-hot-toast";
import google from '../assets/Google.svg';
import facebook from '../assets/Facebook.svg';
import togl from '../assets/togl-icon.svg';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: (email: string, password: string) => void;
}

const LoginModal = ({ isOpen, onClose, onSignIn }: LoginModalProps) => {
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
    // window.alert("Funds approved");
    // toast.success("Funds approved")


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
    // toast.error("funds declined")


  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#FBFBFB] rounded-[24px] max-w-md w-full mx-4 animate-fade-in p-4 pb-0">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <DialogTitle className="text-2xl font-bold mx-auto mt-1">{isSignUp ? "Sign Up" : "Create account"}</DialogTitle>
            {/* <DialogClose className="text-[#757575] hover:text-black">
              <X className="h-5 w-5" />
            </DialogClose> */}
          </div>

          <div>

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
                <Label htmlFor="email" className="block text-sm font-semibold mb-2">Email</Label>
                <Input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full py-2 px-4 border border-[#E6E6E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A8917]"
                />
              </div>

              <div className="mb-6">
                <Label htmlFor="password" className="block text-sm font-semibold mb-2">Password</Label>
                <Input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full py-2 px-4 border border-[#E6E6E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A8917]"
                />
              </div>
              <div className=" flex items-center w-full my-6">
                <Separator className="w-[44.5%]" />
                <span className="flex-shrink mx-4 text-[#757575] text-sm">OR</span>
                <Separator className="w-[44.5%]" />
              </div>
            </form>
          </div>

          <div className="mb-6">
            <Button
              variant="outline"
              className="relative text-[16px] w-full py-3 h-[48px] px-4 border border-gray-300 rounded-lg flex items-center justify-center font-semibold hover:bg-[#F2F2F2] transition mb-3"
            >
              <img src={google} className="absolute top-1/2 left-5 transform -translate-y-1/2" />
              Sign Up with Google
            </Button>
            <Button
              variant="outline"
              className=" relative text-[16px] w-full py-3 px-4 h-[48px] border border-gray-300 rounded-lg flex items-center justify-center font-semibold hover:bg-[#F2F2F2] transition mb-3"
            >
              <img src={facebook} className="absolute top-1/2 left-5 transform -translate-y-1/2" /> Sign Up with Facebook
            </Button>

            <ConnectToglButton
              apikey={"41897981789148918494198"}
              companyId={"6811b6dcd402d4e24735eb31"}
              extensionId="kkojjinggkcdgmhandhckbjbeeiefhgi" // prod
              // extensionId="kbkhmlfogpleldogmkkcbfmpmhhllnmm" // local

              onFundApprove={onFundApprove}
              onFundReject={onFundReject}
            >
              <Button
                variant="outline"
                className="relative w-full py-3 h-[75px] px-4 border border-gray-300 rounded-lg flex items-center justify-center font-semibold hover:bg-[#F2F2F2] transition flex-col text-center"
              >
                <img
                  src={togl}
                  alt="Togl Logo"
                  className="absolute top-6 left-5 transform -translate-y-1/2 w-[26px] h-[16px]"
                />
                <div>
                  <span className="block font-semibold text-base mb-2">Sign up with Togl</span>
                  <span className="text-sm font-normal text-[#4A4A4A]">The most secure way to use the internet</span>
                </div>
              </Button>

            </ConnectToglButton>
          </div>
          <Button
            type="submit"
            className="w-full text-base bg-black hover:bg-opacity-90 text-white font-bold py-6 px-4 rounded-lg transition duration-200"
          >
            {/* {isSignUp ? "Sign Up" : "Sign In"} */}
            Create Account
          </Button>


          <div className="mt-3 text-center text-sm text-[#757575]">
            {isSignUp ? (
              <>Already have an account?  <Button variant="link" className="text-[#1A8917] hover:underline p-0" onClick={() => setIsSignUp(false)}>Log in</Button></>
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
