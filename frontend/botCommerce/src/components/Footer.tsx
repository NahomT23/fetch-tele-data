import React from "react";
import { FaFacebook, FaTelegram, FaInstagram } from "react-icons/fa";
import { BiMap, BiEnvelope, BiPhone } from "react-icons/bi";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {

  return (
    <div id="footer" className="footer-container bg-gradient-to-b from-black to-gray-950 text-white py-10">
      <footer>
        <div className="footer-info flex flex-col md:flex-row justify-between px-4 md:px-10">
          {/* About Section */}
          <div className="footer-width fabout mb-8 md:mb-0">
            <h2 className="text-xl font-bold mb-4">About</h2>
            <p>
              <h3 className="text-lg">
                <em>
                  <strong>Kalit watch store online shopping page</strong>
                </em>
              </h3>
            </p>
            <div className="social-media mt-4">
              <ul className="flex space-x-4">
                <li>
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-400"
                  >
                    <FaFacebook size={24} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://t.me/kalit_24"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-400"
                  >
                    <FaTelegram size={24} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-400"
                  >
                    <FaInstagram size={24} />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="footer-width flink mb-8 md:mb-0">
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-gray-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gray-400">
                  About
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-gray-400">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="footer-width fcontact">
            <h2 className="text-xl font-bold mb-4">Contact</h2>
            <ul className="space-y-4">
              <li className="flex items-center space-x-2">
                <a
                  href="https://www.google.com/maps/place/KALIT-%E1%8A%AB%E1%88%8A%E1%89%B5+The+Watch+House/@8.9961854,38.7879603,17z/data=!3m1!4b1!4m6!3m5!1s0x164b8595b622cd67:0xcc3911ab334787d7!8m2!3d8.9961854!4d38.7879603!16s%2Fg%2F11rrt_n34z?entry=ttu&g_ep=EgoyMDI0MDkyMi4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-400"
                >
                  <BiMap size={24} />
                </a>
                <p>Ethiopia, Addis Ababa, 22 Kaliti First Street</p>
              </li>
              <li className="flex items-center space-x-2">
                <BiEnvelope size={24} />
                <a
                  href="mailto:kalitstore@gmail.com"
                  className="hover:text-gray-400"
                >
                  kalitstore@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <BiPhone size={24} />
                <a href="tel:+251921333221" className="hover:text-gray-400">
                  +251 921 333 221
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="copy-right text-center mt-10 text-sm text-gray-500">
          <p>© COPYRIGHT 2024 KALIT ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
