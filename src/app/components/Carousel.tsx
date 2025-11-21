"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

type Product = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
};

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel = ({ products }: ProductCarouselProps) => {
  return (
    <section className="w-full">
      <div className="max-w-6xl mx-auto p-10">
        {/* Section Header + Navigation */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700">
            Featured Products
          </h2>
          <div className="flex gap-2">
            <div className="swiper-button-prev !static !text-indigo-600 !p-1 !w-5 rounded !h-5 hover:!bg-gray-100  !transition " />
            <div className="swiper-button-next !static !bg-indigo-600 !text-white !p-1 !w-5 rounded !h-5" />
          </div>
        </div>

        {/* Carousel */}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{ clickable: true }}
          loop
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="bg-gray rounded shadow bg-white mb-10 hover:shadow-lg transition p-4 h-full flex flex-col">
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={product.imageUrl || "/placeholder.png"}
                    alt={product.name}
                    fill
                    className="object-contain rounded"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-indigo-600 font-bold text-sm">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ProductCarousel;
