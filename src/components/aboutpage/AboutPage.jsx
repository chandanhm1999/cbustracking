import React from "react";
import { MapPin, BusFront, Compass, Smartphone } from "lucide-react"; // optional icons

const AboutPage = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Image */}
        <div className="relative w-full">
          <img
            src="/assets/aboutbus.svg"
            alt="CBus Tracking"
            className="rounded-sm shadow-xl w-full object-cover"
          />
        </div>

        {/* Right: Text Content */}
        <div>
          <h2 className="text-5xl font-extrabold text-[#572649] mb-4 leading-tight">
            CBus Tracking
          </h2>
          <h3 className="text-2xl font-semibold text-[#572649] mb-6">
            Smart Tracking System for Public Transport
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            CBus Tracking is a real-time bus tracking solution built to make
            commuting smoother. With intuitive features like live location,
            stop-based search, and arrival predictions, CBus connects citizens
            with smarter city travel.
          </p>

          {/* Features List */}
          <div className="space-y-5">
            <FeatureItem
              icon={<BusFront className="w-5 h-5 text-[#572649]" />}
              text="Live location tracking of city buses"
            />
            <FeatureItem
              icon={<MapPin className="w-5 h-5 text-[#572649]" />}
              text="Search by stop to view nearby buses"
            />
            <FeatureItem
              icon={<Compass className="w-5 h-5 text-[#572649]" />}
              text="Supports smart city integration"
            />
            <FeatureItem
              icon={<Smartphone className="w-5 h-5 text-[#572649]" />}
              text="Clean and intuitive user interface"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureItem = ({ icon, text }) => (
  <div className="flex items-start gap-3">
    <div className="mt-1">{icon}</div>
    <p className="text-gray-700 text-base">{text}</p>
  </div>
);

export default AboutPage;
