import { ReactNode } from "react";

interface StepCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const StepCard = ({ icon, title, description }: StepCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm text-center">
      <div className="w-16 h-16 mx-auto bg-[#F8F8F8] rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-[#757575]">{description}</p>
    </div>
  );
};

export default StepCard;
