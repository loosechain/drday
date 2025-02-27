// components/Footer.js
import { FaInstagram, FaTelegram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="p-4 border-t border-gray-800">
      <div className="container mx-auto flex justify-center space-x-4">
        <a href="https://instagram.com/dryday" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="w-6 h-6" />
        </a>
        <a href="https://t.me/dryday" target="_blank" rel="noopener noreferrer">
          <FaTelegram className="w-6 h-6" />
        </a>
      </div>
    </footer>
  );
}