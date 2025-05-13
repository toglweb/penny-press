import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TestimonialProps {
  name: string;
  title: string;
  content: string;
  avatarUrl: string;
}

const Testimonial = ({ name, title, content, avatarUrl }: TestimonialProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center mb-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={avatarUrl} alt={`${name} avatar`} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <p className="font-bold">{name}</p>
          <p className="text-sm text-[#757575]">{title}</p>
        </div>
      </div>
      <p className="italic text-[#757575]">{content}</p>
    </div>
  );
};

export default Testimonial;
