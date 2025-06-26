"use client";
import { useState } from "react";
import Image from "next/image";
import { Mail, Phone, MapPin, Send, User, MessageCircle, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all fields.");
      return;
    }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 opacity-60 pointer-events-none" />
        <h1 className="relative z-10 text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 animate-fadeIn">Contact Us</h1>
        <p className="relative z-10 text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fadeIn delay-100">
          We're here to help! Reach out with your questions, feedback, or just to say hello.
        </p>
      </section>

      {/* Contact Form & Info */}
      <section className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="bg-white/90 dark:bg-gray-900/90 rounded-xl shadow-lg border border-blue-100 dark:border-gray-800 p-8 flex flex-col gap-4 animate-fadeInUp">
          <h2 className="text-2xl font-bold mb-2">Send Us a Message</h2>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 w-5 h-5" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="pl-10 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none px-4 py-2 text-base transition-shadow hover:shadow"
              required
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="pl-10 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none px-4 py-2 text-base transition-shadow hover:shadow"
              required
            />
          </div>
          <div className="relative">
            <MessageCircle className="absolute left-3 top-4 text-blue-400 w-5 h-5" />
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              className="pl-10 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none px-4 py-2 text-base min-h-[100px] transition-shadow hover:shadow"
              required
            />
          </div>
          {error && <div className="text-red-600 font-semibold">{error}</div>}
          {submitted && (
            <div className="flex items-center gap-2 text-green-600 font-semibold animate-fadeIn">
              <CheckCircle className="w-5 h-5" /> Thank you! We've received your message.
            </div>
          )}
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-lg flex items-center gap-2 justify-center mt-2 shadow transition-transform hover:scale-105 focus:ring-2 focus:ring-blue-400">
            <Send className="w-5 h-5" /> Send Message
          </button>
        </form>

        {/* Contact Info & Map */}
        <div className="flex flex-col gap-8 animate-fadeInUp delay-100">
          <div className="bg-white/90 dark:bg-gray-900/90 rounded-xl shadow-lg border border-blue-100 dark:border-gray-800 p-6 flex flex-col gap-4">
            <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
              <Mail className="w-5 h-5 text-blue-600" /> support@aicommerce.com
            </div>
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
              <Phone className="w-5 h-5 text-green-600" /> +233595354747
            </div>
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
              <MapPin className="w-5 h-5 text-pink-600" /> KNUST, Ayeduase
            </div>
          </div>
          <div className="bg-white/90 dark:bg-gray-900/90 rounded-xl shadow-lg border border-blue-100 dark:border-gray-800 p-6 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Our Location</h2>
            <div className="w-full">
              <iframe
                title="KNUST, Ayeduase Map"
                src="https://www.google.com/maps?q=KNUST,+Ayeduase&output=embed"
                width="100%"
                height="220"
                style={{ border: 0, borderRadius: '0.75rem', width: '100%' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Divider and About Link */}
      <div className="container mx-auto px-4">
        <hr className="my-12 border-blue-200 dark:border-gray-700" />
      </div>

      {/* About Us Link Section */}
      <section className="container mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Learn More About Us</h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <a href="/about" className="bg-blue-100 text-blue-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-200 transition">About Us</a>
        </div>
      </section>

      {/* Friendly Closing Message */}
      <div className="text-center text-gray-500 dark:text-gray-400 pb-8 animate-fadeInUp">
        <p>We look forward to hearing from you. Have a wonderful day! 😊</p>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fadeIn { animation: fadeIn 0.7s both; }
        .animate-fadeInUp { animation: fadeIn 0.7s both; }
        .delay-100 { animation-delay: 0.1s; }
      `}</style>
    </div>
  );
} 