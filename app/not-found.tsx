import Link from 'next/link';
import { MapPin, ArrowRight, Phone } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="min-h-screen bg-[#1A1A1A] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="text-8xl font-heading font-bold text-gold mb-2">404</div>
        <h1 className="font-heading font-bold text-3xl text-white uppercase mb-4">
          Page Not Found
        </h1>
        <p className="text-white/70 mb-8">
          Looks like this road leads nowhere. Let us help you find the right destination.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <Link href="/" className="btn-primary flex items-center justify-center gap-2">
            <ArrowRight className="w-4 h-4" /> Back to Home
          </Link>
          <Link href="/destinations" className="btn-outline flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4" /> View Destinations
          </Link>
        </div>
        <div className="flex flex-col items-center gap-2 text-sm text-white/70">
          <p>Or call us directly:</p>
          <a href="tel:+919258912169" className="text-gold font-bold text-lg hover:underline flex items-center gap-1">
            <Phone className="w-4 h-4" /> +91 92589 12169
          </a>
        </div>
      </div>
    </section>
  );
}
