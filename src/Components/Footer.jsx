import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import ImgLogo2 from "../assets/logo2.png";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="max-w-6xl mx-auto px-4">

        {/* Logo + Description */}
        <div className="flex flex-col items-center text-center gap-4 lg:flex-row lg:justify-between lg:text-left mb-10">

          {/* Logo */}
          <div className="flex items-center font-bold">
            <span className="text-sky-600 text-2xl">Plate</span>
            <div className="h-12 w-12 rounded-full mx-1 bg-sky-500 overflow-hidden">
              <img
                src={ImgLogo2}
                className="h-full w-full object-cover mix-blend-multiply"
              />
            </div>
            <h2 className="text-xl">Sharing</h2>
          </div>

          {/* Description */}
          <p className="text-gray-400 max-w-md leading-6">
            Plate Sharing is a nonprofit organization dedicated to reducing food
            waste and hunger. Join our efforts to fight food insecurity by
            redistributing excess food to those in need.
          </p>
        </div>

        {/* MIDDLE GRID */}
        <div className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          gap-10 
          text-center 
          lg:text-left
        ">

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="/about" className="text-gray-400 hover:text-green-500">About Us</a></li>
              <li><a href="/donate" className="text-gray-400 hover:text-green-500">Donate</a></li>
              <li><a href="/volunteer" className="text-gray-400 hover:text-green-500">Volunteer</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-green-500">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <p className="mt-4 text-gray-400">Email: support@plateSharing.org</p>
            <p className="text-gray-400">Phone: +123 456 7890</p>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-lg">Follow Us</h3>
            <div className="flex justify-center lg:justify-start gap-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-blue-600"><FaFacebook size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-blue-400"><FaXTwitter size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-pink-600"><FaInstagram size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-blue-700"><FaLinkedin size={24} /></a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 pt-6 text-center text-gray-400 text-sm mt-10">
          <p>
            © 2025 <span className="text-sky-600 text-lg">PlateSharing</span>. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
