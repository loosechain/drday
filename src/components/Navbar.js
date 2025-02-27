// components/Navbar.js
import { FaTelegram, FaInstagram } from 'react-icons/fa';
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/[0.08] 
      bg-gradient-to-r from-black via-zinc-900/95 to-black
      backdrop-blur supports-[backdrop-filter]:bg-black/80
      after:absolute after:inset-0 after:h-px after:w-full after:-bottom-[1px]
      after:bg-gradient-to-r after:from-transparent after:via-white/[0.07] after:to-transparent">
      <div className="container h-14 max-w-screen-2xl mx-auto flex items-center relative px-6">
        <div className="flex items-center space-x-6">
          <Link href="https://t.me/yourusername" target="_blank" rel="noopener noreferrer">
            <Button 
              variant="ghost" 
              className="text-white/80 hover:text-white hover:bg-white/[0.08] flex items-center space-x-2"
            >
              <FaTelegram className="w-5 h-5" />
              <span className="text-sm font-cal">Telegram</span>
            </Button>
          </Link>
          <Link href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer">
            <Button 
              variant="ghost" 
              className="text-white/80 hover:text-white hover:bg-white/[0.08] flex items-center space-x-2"
            >
              <FaInstagram className="w-5 h-5" />
              <span className="text-sm font-cal">Instagram</span>
            </Button>
          </Link>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link href="/" className="flex items-center group px-2">
            <div className="font-marcellus text-white/90 transition-colors duration-300 group-hover:text-white">
              <span className="text-2xl tracking-wide">DryDay</span>
            </div>
          </Link>
        </div>
        <div className="flex-1 flex justify-end">
          <nav className="flex items-center space-x-6">
            <Link href="/">
              <Button 
                variant="ghost" 
                className="font-cal text-sm text-white/80 
                  transition-all duration-300 ease-out
                  hover:bg-white/[0.08] hover:text-white
                  relative after:absolute after:bottom-0 after:left-0 after:h-px 
                  after:w-0 hover:after:w-full after:bg-white/30
                  after:transition-all after:duration-300"
              >
                Home
              </Button>
            </Link>
            <Link href="/rates">
              <Button 
                variant="ghost" 
                className="font-cal text-sm text-white/80 
                  transition-all duration-300 ease-out
                  hover:bg-white/[0.08] hover:text-white
                  relative after:absolute after:bottom-0 after:left-0 after:h-px 
                  after:w-0 hover:after:w-full after:bg-white/30
                  after:transition-all after:duration-300"
              >
                Rates
              </Button>
            </Link>
            <Link href="/social">
              <Button 
                variant="ghost" 
                className="font-cal text-sm text-white/80 
                  transition-all duration-300 ease-out
                  hover:bg-white/[0.08] hover:text-white
                  relative after:absolute after:bottom-0 after:left-0 after:h-px 
                  after:w-0 hover:after:w-full after:bg-white/30
                  after:transition-all after:duration-300"
              >
                Social
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </nav>
  );
}