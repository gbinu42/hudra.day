import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/images/logo.png"
                alt="Hudra Logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-3xl font-syriac">ܚܘܼܕܪܵܐ</span>
            </div>
            <p className="text-white/80 mb-4 max-w-md">
              The East Syriac Breviary project(hudra.day) is dedicated to
              digitizing and freely sharing the liturgical treasures of the
              Church of the East through innovative digital solutions.
            </p>
            <div className="flex items-center space-x-2 text-white/70">
              <Heart className="h-4 w-4" />
              <span className="text-sm">Made with love by Hendo Academy</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <Link
                  href="/type"
                  className="hover:text-white transition-colors"
                >
                  Text Editor
                </Link>
              </li>
              <li>
                <Link
                  href="/prayers"
                  className="hover:text-white transition-colors"
                >
                  Daily Prayers
                </Link>
              </li>
              <li>
                <Link
                  href="/calendar"
                  className="hover:text-white transition-colors"
                >
                  Liturgical Calendar
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/contribute"
                  className="hover:text-white transition-colors"
                >
                  Contribute
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center justify-start">
            <Image
              src="/images/sliwa.png"
              alt="Sliwa"
              width={150}
              height={150}
              className="rounded-xl"
            />
          </div>
        </div>
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-white/70 text-sm">
            <p>&copy; 2025 Hendo Academy. All rights reserved.</p>
            <p>Preserving sacred eastern tradition for all</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
