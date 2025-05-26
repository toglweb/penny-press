import { useState, FormEvent, ChangeEvent } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRoute } from "wouter";
import profileImg from '../assets/togl-icon.svg';
import google from '../assets/Google.svg';


interface UnlockNowProps {
  isOpen: boolean;
  onClose: () => void;
  handleRequestFunds: any
}

const UnlockNowModal = ({ isOpen, onClose, handleRequestFunds }: UnlockNowProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#FBFBFB] rounded-lg max-w-md w-full mx-4 animate-fade-in p-0">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <DialogTitle className="text-2xl font-bold mx-auto mt-2">Select Payment Option</DialogTitle>
            {/* <DialogClose className="text-[#757575] hover:text-black">
              <X className="h-5 w-5" />
            </DialogClose> */}
          </div>

          <div className="mb-6">
            <Button
              variant="outline"
              className="w-full py-3 px-4 h-[50px] border text-xl border-[#E7E7E7] rounded-lg flex items-center justify-center font-medium hover:bg-[#F2F2F2] transition mb-4"
            >Credit Card
            </Button>
            <Button
              variant="outline"
              className="w-full py-3 h-[50px] px-4 border text-xl border-[#E7E7E7] rounded-lg flex items-center justify-center font-medium hover:bg-[#F2F2F2] transition mb-4"
            >
              Pay with <i className="fab fa-apple"></i> Pay
            </Button>
            <Button
              variant="outline"
              className="w-full py-3 h-[50px] px-4 border text-xl border-[#E7E7E7] rounded-lg flex items-center justify-center font-medium hover:bg-[#F2F2F2] transition mb-4"
            >
              Pay with <img src={google}/>pay
            </Button>

            <Button
              onClick={handleRequestFunds}
              variant="outline"
              className="w-full py-3 flex flex-col px-4 border border-[#E7E7E7] rounded-lg font-medium hover:bg-[#F2F2F2] transition mb-3 h-[75px]"
            >
              <div className="flex items-center justify-center text-xl">
                Pay with <img src={profileImg} alt="Profile" width="32" className="mx-2" /> Togl pay
              </div>
              
              <div className="text-[#4A4A4A]">
                The most secure way to pay on the internet
              </div>
            </Button>


          </div>









        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UnlockNowModal;
