import React from "react";
import { FaGithub, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        {/* Brand Name */}
        <div className="text-3xl p-3 font-bold">CheckSOL</div>

        {/* Social Media Icons */}
        <div className="md:flex md:items-center space-x-4">
          <a
            href="https://github.com/KrishCodesw"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.instagram.com/krishkracksup"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://x.com/KrishJainw"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/krish-jain"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
