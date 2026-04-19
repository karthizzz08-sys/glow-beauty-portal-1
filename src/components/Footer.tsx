import { Link } from "@tanstack/react-router";
import { Sparkles, Instagram, Facebook, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="container mx-auto grid gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            <span className="font-display text-xl font-semibold">Glow Beauty</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Enhancing your natural beauty with care, craft and elegance.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/services" className="hover:text-primary">Services</Link></li>
            <li><Link to="/gallery" className="hover:text-primary">Gallery</Link></li>
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/booking" className="hover:text-primary">Book Now</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /><span>+91 99999 99999</span></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /><span>hello@glowbeauty.com</span></li>
            <li>123 Rose Avenue, Mumbai</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Follow</h4>
          <div className="flex gap-3">
            <a href="#" className="rounded-full bg-background p-2 hover:text-primary"><Instagram className="h-4 w-4" /></a>
            <a href="#" className="rounded-full bg-background p-2 hover:text-primary"><Facebook className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Glow Beauty Parlour · All rights reserved
      </div>
    </footer>
  );
}
