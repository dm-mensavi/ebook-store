import React from "react";
import { Facebook, Twitter, Instagram, Github, GithubIcon } from "lucide-react";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Tooltip from "@mui/material/Tooltip";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-8 px-4 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8 w-full px-4">
        {/* Logo / App Name */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-white mb-2">CodiBook</h2>
          <p className="text-sm text-gray-400">
            Dive into the world of books with us.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col sm:flex-row gap-6 text-center md:text-left">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Explore</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/books" className="hover:text-white transition">
                  Books
                </Link>
              </li>
              <li>
                <Link href="/authors" className="hover:text-white transition">
                  Authors
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Icons and Avatars */}
        <div className="flex flex-col gap-4 justify-center md:justify-start items-center md:items-start">
          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="https://github.com/Godfred-Owusu/Book_Management"
              className="hover:text-white transition"
            >
              <GithubIcon size={20} />
            </a>
          </div>

          <AvatarGroup spacing="small" max={4}>
            <Tooltip title="Godfred" arrow>
              <a
                href="https://www.linkedin.com/in/godfredmirekuowusu/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Avatar alt="Godfred" src="/photo.jpg" />
              </a>
            </Tooltip>

            <Tooltip title="Othniel" arrow>
              <a
                href="https://www.linkedin.com/in/othniel-aryee-9501a0239/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Avatar alt="Othniel" src="/niel.jpg" />
              </a>
            </Tooltip>

            <Tooltip title="Eugene Okyere" arrow>
              <a
                href="https://www.linkedin.com/in/eookyere3/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Avatar alt="Eugene Okyere" src="/eugene.png" />
              </a>
            </Tooltip>

            <Tooltip title="David Mensavi" arrow>
              <a
                href="https://www.linkedin.com/in/mensavi/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Avatar alt="David Mensavi" src="/mensavi.png" />
              </a>
            </Tooltip>
          </AvatarGroup>
        </div>
      </div>

      {/* Footer Bottom Text */}
      <div className="mt-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} BookNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
