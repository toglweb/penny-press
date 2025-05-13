import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-[#F8F8F8] border-t border-[#E6E6E6] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">About PennyPress</h3>
            <p className="text-[#757575] text-sm mb-4">PennyPress is revolutionizing how we consume digital content by enabling readers to pay only for the articles they want to read, without subscriptions.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#757575] hover:text-[#1A8917] transition">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-[#757575] hover:text-[#1A8917] transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-[#757575] hover:text-[#1A8917] transition">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-[#757575] hover:text-[#1A8917] transition">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/home?category=technology" className="text-[#757575] hover:text-[#1A8917] transition">Technology</Link></li>
              <li><Link href="/home?category=business" className="text-[#757575] hover:text-[#1A8917] transition">Business</Link></li>
              <li><Link href="/home?category=politics" className="text-[#757575] hover:text-[#1A8917] transition">Politics</Link></li>
              <li><Link href="/home?category=health" className="text-[#757575] hover:text-[#1A8917] transition">Health</Link></li>
              <li><Link href="/home?category=science" className="text-[#757575] hover:text-[#1A8917] transition">Science</Link></li>
              <li><Link href="/home?category=lifestyle" className="text-[#757575] hover:text-[#1A8917] transition">Lifestyle</Link></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-[#757575] hover:text-[#1A8917] transition">About Us</a></li>
              <li><a href="#" className="text-[#757575] hover:text-[#1A8917] transition">Careers</a></li>
              <li><a href="#" className="text-[#757575] hover:text-[#1A8917] transition">For Writers</a></li>
              <li><a href="#" className="text-[#757575] hover:text-[#1A8917] transition">For Publishers</a></li>
              <li><a href="#" className="text-[#757575] hover:text-[#1A8917] transition">Press</a></li>
              <li><a href="#" className="text-[#757575] hover:text-[#1A8917] transition">Contact</a></li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-[#757575] hover:text-[#1A8917] transition">Terms of Service</a></li>
              <li><a href="#" className="text-[#757575] hover:text-[#1A8917] transition">Privacy Policy</a></li>
              <li><a href="#" className="text-[#757575] hover:text-[#1A8917] transition">Cookie Policy</a></li>
              <li><a href="#" className="text-[#757575] hover:text-[#1A8917] transition">Accessibility</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-[#E6E6E6] flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-[#757575] mb-4 md:mb-0">
            © {new Date().getFullYear()} PennyPress. All rights reserved.
          </div>
          <div className="text-sm text-[#757575]">
            Made with <span className="text-[#1A8917]">♥</span> for readers and writers everywhere.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
