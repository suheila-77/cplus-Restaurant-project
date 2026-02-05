import { Link, useNavigate, useLocation } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin, Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import cplusLogo from "@/assets/cplus-logo.png";
import { scrollToElement } from "@/lib/utils";

export const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => scrollToElement('about'), 100);
    } else {
      scrollToElement('about');
    }
  };

  return (
    <footer className="bg-background/95 backdrop-blur-sm border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={cplusLogo} alt="C+" className="h-12 w-auto" />
            </Link>
            <p className="text-sm text-muted-foreground">
              Where culinary artistry meets elegant ambiance
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/share/16iCnprs3k/?mibextid=wwXIfr" className="text-muted-foreground hover:text-primary transition-colors hover-scale">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/cpluscafe.so?igsh=MTdrdjQ1djh3MXVnNg==" className="text-muted-foreground hover:text-primary transition-colors hover-scale">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors hover-scale">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors hover-scale">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <button onClick={handleAboutClick} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About
                </button>
              </li>
              <li>
                <Link to="/cafe" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Café
                </Link>
              </li>
              <li>
                <Link to="/restaurant" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Restaurant
                </Link>
              </li>
              <li>
                <Link to="/sweets" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Sweets
                </Link>
              </li>
              <li>
                <Link to="/weddings" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Wedding Halls
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+2526770</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@cplus.com</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>123 Main Street, City</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-primary" />
                <span>Mon-Sun: 8AM - 11PM</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}

          <div>
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to receive news and special offers
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="text-sm"
              />
              <Button size="sm" className="shrink-0">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} C+. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};