// components/ProductCarousel.tsx
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
    <div className="w-full max-w-6xl mx-auto px-4">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        navigation
        pagination={{ clickable: true }}
        loop
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="bg-white rounded shadow hover:shadow-lg transition p-4 h-full flex flex-col">
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
  );
};

export default ProductCarousel;
