import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans fade-in">
      <div className="container-fluid mx-auto mt-15 rounded">
        {/* Hero Section */}
        <section className="flex flex-col-reverse md:flex-row items-center justify-around px-16 py-16 gap-10 bg-white">
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent mb-4">
              Welcome to QuantamStore
            </h1>
            <p className="text-gray-700 text-base sm:text-lg mb-6">
              Discover cutting-edge products, seamless shopping, and a smarter
              experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="/store"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded font-mono transition"
              >
                Explore Store
              </a>
              <a
                href="/about"
                className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-6 py-2 rounded font-mono transition"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex-1 flex justify-center">
            <Image
              src="/images/quantamLogo.png"
              alt="Hero graphic"
              width={300}
              height={300}
              className="object-contain"
              priority
            />
          </div>
        </section>

        {/* Product Highlights Section */}
        <section className="px-10 py-16 bg-gray-50">
          <h2 className="text-center text-2xl sm:text-3xl font-bold mb-10 text-indigo-700">
            Featured Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
            {/* Prebuilt PCS */}
            <Link href="/store/prebuilt" className="group">
              <div className="p-6 bg-white rounded shadow hover:shadow-lg transition cursor-pointer">
                <Image
                  src="/images/prebuilt.jpeg"
                  className="mx-auto"
                  alt="Prebuilt PC"
                  width={300}
                  height={300}
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

            {/* Headsets */}
            <Link href="/store/headsets" className="group">
              <div className="p-6 bg-white rounded shadow hover:shadow-lg transition cursor-pointer">
                <Image
                  src="/images/headset.jpg"
                  className="mx-auto"
                  alt="Gaming Headset"
                  width={300}
                  height={150}
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
            <Link href="/store/monitors" className="group">
              <div className="p-6 bg-white rounded shadow hover:shadow-lg transition cursor-pointer">
                <Image
                  src="/images/monitor.jpeg"
                  className="mx-auto"
                  alt="Monitor"
                  width={300}
                  height={150}
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
            <Link href="/store/storage" className="group">
              <div className="p-6 bg-white rounded shadow hover:shadow-lg transition cursor-pointer">
                <Image
                  src="/images/ssd.jpg"
                  className="mx-auto"
                  alt="Storage Devices"
                  width={180}
                  height={150}
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
            <Link href="/store/cpus" className="group">
              <div className="p-6 bg-white rounded shadow hover:shadow-lg transition cursor-pointer">
                <Image
                  src="/images/cpu.jpeg"
                  className="mx-auto"
                  alt="CPU"
                  width={320}
                  height={150}
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
            <Link href="/store/gpus" className="group">
              <div className="p-6 bg-white rounded shadow hover:shadow-lg transition cursor-pointer">
                <Image
                  src="/images/Gpu.jpeg"
                  className="mx-auto"
                  alt="GPU"
                  width={300}
                  height={150}
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

            <div>
              <a
                href="/categories"
                className="text-indigo-600 w-full hover:underline font-mono"
              ></a>
            </div>
            <div>
              <a
                href="/categories"
                className="text-indigo-600 w-full font-bold hover:underline font-mono"
              >
                See all Categories →
              </a>
            </div>
            <div>
              <a
                href="/categories"
                className="text-indigo-600 w-full hover:underline font-mono"
              ></a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
