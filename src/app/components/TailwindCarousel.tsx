"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function TailwindCarousel() {
  const slides = [
    {
      id: 1,
      title: "Built to Dominate",
      text: "CyberPowerPC Gamer Master — ready for battle, right out of the box.",
      image: "/images/CyberPowerPC Gamer Master Gaming PC.jpg",
      button: "Shop Desktop",
    },
    {
      id: 2,
      title: "Smooth & Fast Visuals",
      text: "ASUS TUF VG249QM — 165Hz refresh rate for ultra-responsive gameplay.",
      image: "/images/ASUS TUF VG259Q3A Full HD 24.5.jpg",
      button: "Shop Monitor",
    },
    {
      id: 3,
      title: "Efficient Multitasking",
      text: "Intel Core i5-14400 — perfect balance of power and value.",
      image: "/images/Intel Core i5-14400F.jpg",
      button: "Shop Processor",
    },
  ];

  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative w-full h-[500px] overflow-hidden my-5">
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              active === index ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 h-full bg-white p-10 items-center">
              <div className="space-y-4 text-center md:text-left">
                <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
                  {slide.title}
                </h2>
                <p className="text-lg text-gray-600">{slide.text}</p>
                <Link
                  href="/store"
                  className="inline-block bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition font-mono"
                >
                  {slide.button}
                </Link>
              </div>
              <div className="flex justify-center">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  width={300}
                  height={300}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            className={`w-3 h-3 rounded-full ${
              active === index ? "bg-indigo-600" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
