'use client';

import { useState } from 'react';
import { Send, CheckCircle2, MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '919258912169';

const inputClasses =
  'w-full bg-[#121212] border border-[#333537] rounded-xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#F7941D] focus:ring-4 focus:ring-[#F7941D]/10 transition-all text-sm font-medium';

export function ContactWhatsAppForm() {
  const todayDate = new Date();
  const today = `${todayDate.getFullYear()}-${String(todayDate.getMonth() + 1).padStart(2, '0')}-${String(todayDate.getDate()).padStart(2, '0')}`;

  const [form, setForm] = useState({
    name: '',
    phone: '',
    date: '',
    route: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const isValid = form.name.trim() && form.phone.trim() && form.route.trim();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (submitted) setSubmitted(false);
  }

  function buildWhatsAppMessage() {
    const lines = [
      `Hi, I'd like a taxi quote:`,
      ``,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Route: ${form.route}`,
    ];
    if (form.date) lines.push(`Travel Date: ${form.date}`);
    if (form.message.trim()) lines.push(`Details: ${form.message.trim()}`);
    lines.push('', 'Please share availability and fixed fare.');
    return encodeURIComponent(lines.join('\n'));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    setSubmitted(true);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage()}`, '_blank');
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-white/80 ml-1">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={form.name}
          onChange={handleChange}
          className={inputClasses}
          placeholder="Enter your name"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="phone" className="text-[10px] font-black uppercase tracking-widest text-white/80 ml-1">Phone / WhatsApp Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={form.phone}
            onChange={handleChange}
            className={inputClasses}
            placeholder="+91 XXXXX XXXXX"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="date" className="text-[10px] font-black uppercase tracking-widest text-white/80 ml-1">Travel Date</label>
          <input
            type="date"
            id="date"
            name="date"
            min={today}
            value={form.date}
            onChange={handleChange}
            className={`${inputClasses} [color-scheme:dark]`}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="route" className="text-[10px] font-black uppercase tracking-widest text-white/80 ml-1">Route / Destinations Needed</label>
        <input
          type="text"
          id="route"
          name="route"
          required
          value={form.route}
          onChange={handleChange}
          className={inputClasses}
          placeholder="e.g. Dehradun Airport to Mussoorie"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-[10px] font-black uppercase tracking-widest text-white/80 ml-1">Additional Details (Optional)</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          className={`${inputClasses} resize-none`}
          placeholder="Number of passengers, vehicle preference, specific pickup time..."
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className="w-full bg-[#25D366] hover:bg-[#128C7E] hover:shadow-[0_0_25px_-5px_#25D366] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none text-white font-black text-sm uppercase tracking-widest py-5 rounded-xl transition-all flex items-center justify-center gap-3 mt-4"
      >
        {submitted ? (
          <>
            <CheckCircle2 className="w-5 h-5" /> Opened WhatsApp — Send Your Message
          </>
        ) : (
          <>
            <MessageCircle className="w-5 h-5" /> Send via WhatsApp
          </>
        )}
      </button>

      <div className="flex items-center justify-start gap-3 mt-6 pt-6 border-t border-white/10 text-white/50 text-xs font-light">
        <Send className="w-4 h-4 text-[#F7941D] shrink-0" />
        <span>This opens WhatsApp with your details pre-filled — just hit send on your end to reach our dispatch team.</span>
      </div>
    </form>
  );
}
