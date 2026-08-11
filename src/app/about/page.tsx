"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800 fade-in">
      {/* Hero */}
      <section
        className="relative h-[420px] md:h-[520px] w-full bg-cover bg-center flex items-end"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(73, 16, 231, 0.91), rgba(32, 57, 170, 0.65)), url('/images/heroBg.jpeg')",
        }}
      >
        <div className="container mx-auto px-6 pb-16 md:pb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-white mb-3 block">
            About Us
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-2xl">
            More speakers.
            <br />
            Bigger sound.
          </h1>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8 leading-snug">
            Technology built around people, designed to inspire and empower.
          </h2>

          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
            At Quantam, we believe computers are more than machines — they’re
            the foundation of creativity, productivity, and play. Every device
            we offer is chosen to seamlessly integrate into your lifestyle,
            helping you work smarter, game harder, and connect more
            meaningfully.
          </p>

          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-12">
            Our mission is to combine performance with thoughtful design,
            ensuring that technology feels natural, reliable, and future-ready.
            With a strong focus on sustainability, compliance, and customer
            care, we deliver solutions that not only meet today’s needs but also
            anticipate tomorrow’s possibilities.
          </p>

          <div className="border-t pt-10">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Quantam</h3>
            <p className="text-sm text-gray-500 mb-4">
              Your trusted gaming & tech store
            </p>

            <address className="not-italic text-sm text-gray-600 space-y-2">
              <p>Al Swaifieh, Front of Chapatis Restaurant</p>
              <p>Amman, Jordan</p>
              <p>
                <Link
                  href="mailto:support@quantamstore.com"
                  className="hover:text-indigo-600 transition"
                >
                  support@quantamstore.com
                </Link>
              </p>
              <p>
                <Link
                  href="tel:+9620797500000"
                  className="hover:text-indigo-600 transition"
                >
                  +962 0797500000
                </Link>
              </p>
              <p>11:00 am - 11:00 pm</p>
            </address>
          </div>
        </div>
      </section>
    </main>
  );
}
