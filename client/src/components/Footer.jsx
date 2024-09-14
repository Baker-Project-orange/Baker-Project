import React from "react";
import {
  MapPin,
  Phone,
  Users,
  ShoppingBag,
  Award,
  Users as Clients,
  Clock,
} from "lucide-react";

function Footer() {
  return (
    <footer className="text-center text-black my-32 mx-auto  max-w-3xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and Address */}
          <div className="flex flex-col items-center md:items-start">
            {/* <img
              alt="Logo"
              className="w-[100px] mb-6"
              src="../src/assets/image2-removebg-preview (1).png"
            /> */}
            <div className="flex items-start space-x-2 text-xl text-black">
              <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
              <p className="text-sm">
                <span className="font-semibold">Envato</span>
                <br />
                Level 13, 2 Elizabeth
                <br />
                Victoria 3000
                <br />
                Australia
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center text-center md:items-start">
            <img
              alt="Logo"
              className="w-[100px] mb-6"
              src="../src/assets/image2-removebg-preview (1).png"
            />
            <h3 className="text-xl font-semibold text-black mb-4">
              Contact Us
            </h3>
            <div className="flex items-center space-x-2 text-black">
              <Phone className="w-5 h-5" />
              <p className="text-lg font-serif">+61 (0) 3 8376 6284</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-black mb-4 text-center md:text-left">
              Quick Links
            </h3>
            <ul className="space-y-2 text-center md:text-left">
              {[
                { icon: Users, text: "Our team" },
                { icon: ShoppingBag, text: "Products" },
                { icon: Award, text: "Certificates" },
                { icon: Clients, text: "Clients" },
                { icon: Clock, text: "History" },
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="flex items-center justify-center md:justify-start space-x-2 text-black hover:text-black transition-colors duration-300"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-amber-200">
          <p className="text-center text-sm text-black">
            Â© 2024 B baker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
