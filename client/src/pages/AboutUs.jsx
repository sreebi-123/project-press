import React from "react";

export default function AboutUs({
  name = "PrintPress",
  tagline = "Your Trusted Partner in Printing Excellence",
  established = 2024,
  description =
    "We provide high-quality printing solutions tailored to your needs — business cards, flyers, posters, brochures, invoices, and large-scale banners.",
  services = ["Business Cards", "Flyers & Posters", "Brochures", "Banners", "Custom Design"],
  mission = "To deliver affordable, fast, and premium printing services while empowering printing businesses through technology and innovation.",
  vision = "To become a leading digital printing ecosystem, connecting customers with trusted printing units across regions.",
  ctaLabel = "Request a Quote",
  ctaHref = "#contact",
imageSrc =  "/uploads/printpress.png",
}) {
  return (
    <section className="bg-white text-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-2 lg:items-center">
        {/* Left column: Text content */}
        <div>
          <p className="text-sm font-medium text-blue-600">About</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl text-blue-600">
            {name}
          </h2>
          <p className="mt-1 text-lg text-black">{tagline}</p>

          <div className="mt-6 prose max-w-none">
            <p className="text-black">{description}</p>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-blue-600">Founded</h3>
              <p className="mt-1 text-lg font-medium text-black">{established}</p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-blue-600">Our Approach</h3>
              <p className="mt-1 text-lg font-medium text-black">
                Technology-driven • Customer-first • Quality assured
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-blue-600">What we offer</h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2 list-none">
              {services.map((s, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-gray-200 p-3"
                >
                  <span
                    className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-50 text-blue-600 font-semibold"
                    aria-hidden
                  >
                    {s.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-black">{s}</p>
                    <p className="text-sm text-gray-600">
                      High-quality prints with fast turnaround.
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex gap-4">
            <a
              href={ctaHref}
              className="inline-flex items-center justify-center rounded-2xl bg-blue-600 text-white px-5 py-2.5 text-sm font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {ctaLabel}
            </a>

            <a
              href="#learn"
              className="inline-flex items-center justify-center rounded-2xl border border-gray-300 px-4 py-2.5 text-sm font-medium hover:bg-gray-50"
            >
              Learn more
            </a>
          </div>

          <div id="learn" className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="rounded-xl bg-gray-50 p-4">
              <h4 className="text-sm font-semibold text-blue-600">Mission</h4>
              <p className="mt-1 text-sm text-black">{mission}</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <h4 className="text-sm font-semibold text-blue-600">Vision</h4>
              <p className="mt-1 text-sm text-black">{vision}</p>
            </div>
          </div>
        </div>

        {/* Right column: Image / visual */}
        <div className="relative rounded-3xl overflow-hidden shadow-lg">
          <img
            src={imageSrc}
            alt={`${name} printing press`}
            className="w-full h-80 object-cover sm:h-96 lg:h-full"
          />

          {/* subtle overlay info box */}
          <div className="absolute left-6 bottom-6 bg-white/85 backdrop-blur rounded-2xl p-4 border border-gray-200">
            <p className="text-xs font-semibold text-blue-600">Trusted by</p>
            <div className="mt-2 flex gap-3 items-center">
              <div className="h-8 w-20 rounded-md bg-gray-100 flex items-center justify-center text-sm text-black">
                B2B
              </div>
              <div className="h-8 w-20 rounded-md bg-gray-100 flex items-center justify-center text-sm text-black">
                Retail
              </div>
              <div className="h-8 w-20 rounded-md bg-gray-100 flex items-center justify-center text-sm text-black">
                Startups
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative footer text */}
      <div className="mt-10 max-w-7xl mx-auto text-center text-sm text-gray-600">
        © {new Date().getFullYear()} {name}. All rights reserved.
      </div>
    </section>
  );
}
