"use client";
import Image from "next/image";
import Link from "next/link";
import Pagination from "./components/Pagination";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCarousel from "./components/Carousel";
import { useState, useEffect } from "react";
import TailwindCarousel from "./components/TailwindCarousel";

export default function Home() {
  const slides = [
    {
      id: 1,
      title: "50% Off Your First Shopping",
      text: "Get Free Shipping on all orders over $99.00",
      image: "/earbuds.png",
      button: "Shop Now",
    },
    {
      id: 2,
      title: "Upgrade Your Setup",
      text: "Save 30% on gaming monitors and accessories",
      image: "/monitor.png",
      button: "Explore Deals",
    },
    {
      id: 3,
      title: "New Arrivals Just Dropped",
      text: "Discover the latest fashion and tech",
      image: "/sweater.png",
      button: "Browse Now",
    },
  ];

  const [active, setActive] = useState(0);

  // Autoplay every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans fade-in">
      <div className="container-fluid mx-auto rounded">
        {/* 🎯 Tailwind Carousel */}
        <TailwindCarousel />
        {/* Product Highlights Section */}
        <section className="px-10 py-16 bg-gray-50">
          <h2 className="text-center text-2xl sm:text-3xl font-bold mb-10 text-indigo-700">
            Featured Categories
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
            {/* Prebuilt PCs */}
            <Link
              href={{ pathname: "/store", query: { category: "prebuilt" } }}
              className="group"
            >
              <div className="p-6 bg-white rounded shadow hover:shadow-lg transition cursor-pointer">
                <Image
                  src="/images/prebuilt.jpeg"
                  alt="Prebuilt PC"
                  width={300}
                  height={300}
                  className="mx-auto transform transition-transform duration-300 group-hover:scale-105"
                />
                <h3 className="font-bold mt-4 mb-2 group-hover:text-indigo-600 transition">
                  Prebuilt PCs
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  High-performance desktops ready to plug and play.
                </p>
                <span className="text-indigo-600 hover:underline text-sm font-mono">
                  Browse PCs →
                </span>
              </div>
            </Link>

            {/* Gaming Headsets */}
            <Link
              href={{ pathname: "/store", query: { category: "headsets" } }}
              className="group"
            >
              <div className="p-6 bg-white rounded shadow hover:shadow-lg transition cursor-pointer">
                <Image
                  src="/images/headset.jpg"
                  alt="Gaming Headset"
                  width={300}
                  height={150}
                  className="mx-auto transform transition-transform duration-300 group-hover:scale-105"
                />
                <h3 className="font-bold mt-4 mb-2 group-hover:text-indigo-600 transition">
                  Gaming Headsets
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Immersive audio for competitive and casual play.
                </p>
                <span className="text-indigo-600 hover:underline text-sm font-mono">
                  Shop Headsets →
                </span>
              </div>
            </Link>

            {/* Monitors */}
            <Link
              href={{ pathname: "/store", query: { category: "monitors" } }}
              className="group"
            >
              <div className="p-6 bg-white rounded shadow hover:shadow-lg transition cursor-pointer">
                <Image
                  src="/images/monitor.jpeg"
                  alt="Monitor"
                  width={300}
                  height={150}
                  className="mx-auto transform transition-transform duration-300 group-hover:scale-105"
                />
                <h3 className="font-bold mt-4 mb-2 group-hover:text-indigo-600 transition">
                  Monitors
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Crisp visuals and fast refresh rates for every setup.
                </p>
                <span className="text-indigo-600 hover:underline text-sm font-mono">
                  View Monitors →
                </span>
              </div>
            </Link>

            {/* Storage Devices */}
            <Link
              href={{ pathname: "/store", query: { category: "storage" } }}
              className="group"
            >
              <div className="p-6 bg-white rounded shadow hover:shadow-lg transition cursor-pointer">
                <Image
                  src="/images/ssd.jpg"
                  alt="Storage Devices"
                  width={180}
                  height={150}
                  className="mx-auto transform transition-transform duration-300 group-hover:scale-105"
                />
                <h3 className="font-bold mt-4 mb-2 group-hover:text-indigo-600 transition">
                  Storage Devices
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  SSDs, HDDs, and NVMe drives for speed and capacity.
                </p>
                <span className="text-indigo-600 hover:underline text-sm font-mono">
                  Explore Storage →
                </span>
              </div>
            </Link>

            {/* CPUs */}
            <Link
              href={{ pathname: "/store", query: { category: "cpus" } }}
              className="group"
            >
              <div className="p-6 bg-white rounded shadow hover:shadow-lg transition cursor-pointer">
                <Image
                  src="/images/cpu.jpeg"
                  alt="CPU"
                  width={320}
                  height={150}
                  className="mx-auto transform transition-transform duration-300 group-hover:scale-105"
                />
                <h3 className="font-bold mt-4 mb-2 group-hover:text-indigo-600 transition">
                  Processors
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Power your rig with the latest multi-core CPUs.
                </p>
                <span className="text-indigo-600 hover:underline text-sm font-mono">
                  Browse CPUs →
                </span>
              </div>
            </Link>

            {/* GPUs */}
            <Link
              href={{ pathname: "/store", query: { category: "gpus" } }}
              className="group"
            >
              <div className="p-6 bg-white rounded shadow hover:shadow-lg transition cursor-pointer">
                <Image
                  src="/images/Gpu.jpeg"
                  alt="GPU"
                  width={300}
                  height={150}
                  className="mx-auto transform transition-transform duration-300 group-hover:scale-105"
                />
                <h3 className="font-bold mt-4 mb-2 group-hover:text-indigo-600 transition">
                  Graphics Cards
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Stunning visuals and performance for gaming and creation.
                </p>
                <span className="text-indigo-600 hover:underline text-sm font-mono">
                  Shop GPUs →
                </span>
              </div>
            </Link>

            {/* See All Categories */}
            <div className="flex items-center justify-center">
              <Link
                href="/categories"
                className="text-indigo-600 font-bold hover:underline font-mono"
              >
                See all Categories →
              </Link>
            </div>
          </div>
        </section>

        {/* 🛒 Product Carousel Section */}
        <section className=" py-16 bg-gray-50">
          <ProductCarousel
            products={[
              {
                id: 1,
                name: "ASUS TUF Gaming VG259Q3A",
                imageUrl: "/images/ASUS TUF VG259Q3A Full HD 24.5.jpg",
                price: 299,
              },
              {
                id: 2,
                name: "Intel Core i5-14400 Processor",
                imageUrl: "/images/Intel Core i5-14400F.jpg",
                price: 220,
              },
              {
                id: 3,
                name: "CyberPowerPC Gamer Master ",
                imageUrl: "/images/CyberPowerPC Gamer Master Gaming PC.jpg",
                price: 1200,
              },
              {
                id: 4,
                name: "GIGABYTE GeForce RTX 5060",
                imageUrl: "/images/GIGABYTE GeForce RTX 5060.jpg",
                price: 450,
              },
            ]}
          />
        </section>
      </div>
    </div>
  );
}
