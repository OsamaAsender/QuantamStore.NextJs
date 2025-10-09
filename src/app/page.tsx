import Image from "next/image";

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
              src="/images/genetic.png"
              alt="Hero graphic"
              width={300}
              height={300}
              className="object-contain"
              priority
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-16 bg-gray-50">
          <h2 className="text-center text-2xl sm:text-3xl font-bold mb-10 text-indigo-700">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white rounded shadow">
              <Image
                src="/images/atoms.png"
                alt="Feature 1"
                width={40}
                height={40}
              />
              <h3 className="font-bold mt-4 mb-2">Innovative Products</h3>
              <p className="text-sm text-gray-600">
                We curate the latest tech and trends for forward-thinkers.
              </p>
            </div>
            <div className="p-6 bg-white rounded shadow">
              <Image
                src="/images/excel.svg"
                alt="Feature 2"
                width={40}
                height={40}
              />
              <h3 className="font-bold mt-4 mb-2">Smart Shopping</h3>
              <p className="text-sm text-gray-600">
                Intuitive design and secure checkout for a smooth experience.
              </p>
            </div>
            <div className="p-6 bg-white rounded shadow">
              <Image
                src="/images/vertical.svg"
                alt="Feature 3"
                width={40}
                height={40}
              />
              <h3 className="font-bold mt-4 mb-2">Responsive Support</h3>
              <p className="text-sm text-gray-600">
                We’re here when you need us — fast, friendly, and reliable.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
