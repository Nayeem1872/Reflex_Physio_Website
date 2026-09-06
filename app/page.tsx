"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, useMemo, useCallback } from "react";
import dynamicImport from "next/dynamic";
import { motion } from "framer-motion";
import { BACKEND_URL } from "@/lib/config";

// Lazy load components that are not immediately visible
const ServiceSection = dynamicImport(
  () => import("./components/ServiceSection"),
  {
    loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
  },
);
const AboutSection = dynamicImport(() => import("./components/AboutSection"), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
});
const TeamSection = dynamicImport(() => import("./components/TeamSection"), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
});
const TestimonialSection = dynamicImport(
  () => import("./components/TestimonialSection"),
  {
    loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
  },
);
const ContactSection = dynamicImport(
  () => import("./components/ContactSection"),
  {
    loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
  },
);
const VideoGallerySection = dynamicImport(
  () => import("./components/VideoGallerySection"),
  {
    loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
  },
);
const Footer = dynamicImport(() => import("./components/Footer"));

// Keep critical above-the-fold components as regular imports
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import LeadershipQuoteSection from "./components/LeadershipQuoteSection";

interface Banner {
  _id: string;
  section: string;
  images: string[];
  title: string;
  subtitle: string;
  isActive: boolean;
}

interface Testimonial {
  _id: string;
  profileMedia: string;
  mediaType: string;
  fullName: string;
  role: string;
  rating: number;
  testimonial: string;
  service: string;
  date: string;
  published: boolean;
}

interface ContactInfo {
  _id: string;
  phone: string[];
  email: string[];
  address: string[];
  whatsapp: string[];
  mapLink: string;
  facebook: string;
  instagram: string;
  twitter: string;
  linkedin: string;
  youtube: string;
}

interface Leadership {
  _id: string;
  name: string;
  position: string;
  role: "chairman" | "ceo" | "other";
  quote: string;
  image: string;
  badge: string;
  order: number;
  published: boolean;
}

export default function ReflexPhysiotherapyWebsite() {
  const [heroBanners, setHeroBanners] = useState<Banner[]>([]);
  const [aboutBanner, setAboutBanner] = useState<Banner | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [leadership, setLeadership] = useState<Leadership[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Memoize API endpoints
  const apiEndpoints = useMemo(
    () => ({
      banners: `${BACKEND_URL}/api/banners?isActive=true`,
      testimonials: `${BACKEND_URL}/api/testimonials`,
      contact: `${BACKEND_URL}/api/contact-info`,
      leadership: `${BACKEND_URL}/api/leadership`,
    }),
    [],
  );

  // Optimized fetch function with error handling
  const fetchWithRetry = useCallback(
    async (url: string, retries = 2): Promise<any> => {
      for (let i = 0; i <= retries; i++) {
        try {
          const response = await fetch(url, {
            next: { revalidate: 3600 }, // Cache for 1 hour
          });
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return await response.json();
        } catch (error) {
          if (i === retries) throw error;
          await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
        }
      }
    },
    [],
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all data in parallel for better performance
        const [bannersData, testimonialsData, contactData, leadershipData] =
          await Promise.allSettled([
            fetchWithRetry(apiEndpoints.banners),
            fetchWithRetry(apiEndpoints.testimonials),
            fetchWithRetry(apiEndpoints.contact),
            fetchWithRetry(apiEndpoints.leadership),
          ]);
        // Process banners
        if (bannersData.status === "fulfilled") {
          const banners: Banner[] = bannersData.value.banners || [];
          setHeroBanners(banners.filter((b) => b.section === "hero"));
          setAboutBanner(banners.find((b) => b.section === "about") || null);
        }

        // Process testimonials
        if (testimonialsData.status === "fulfilled") {
          setTestimonials(testimonialsData.value.testimonials || []);
        }

        // Process contact info
        if (contactData.status === "fulfilled") {
          setContactInfo(contactData.value);
        }

        // Process leadership
        if (leadershipData.status === "fulfilled") {
          const data = leadershipData.value;
          if (data.leaders?.length > 0) {
            const sortedLeadership = data.leaders
              .filter(
                (l: Leadership) => l.role === "chairman" || l.role === "ceo",
              )
              .sort((a: Leadership, b: Leadership) => a.order - b.order);
            setLeadership(sortedLeadership);
          }
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [apiEndpoints, fetchWithRetry]);

  // Memoize leadership data
  const { chairman, ceo } = useMemo(
    () => ({
      chairman: leadership.find((l) => l.role === "chairman"),
      ceo: leadership.find((l) => l.role === "ceo"),
    }),
    [leadership],
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection
        banners={heroBanners}
        isLoading={isLoading}
        contactInfo={contactInfo}
      />

      {/* Services Section */}
      <ServiceSection />

      {/* Chairman Quote - Image Left, Quote Right */}
      {chairman && (
        <LeadershipQuoteSection
          leadership={chairman}
          imagePosition="left"
          index={0}
        />
      )}

      {/* About Section */}
      <AboutSection banner={aboutBanner} isLoading={isLoading} />

      {/* CEO Quote - Image Right, Quote Left */}
      {ceo && (
        <LeadershipQuoteSection
          leadership={ceo}
          imagePosition="right"
          index={1}
        />
      )}
      {/* Video Gallery Section */}
      <VideoGallerySection />
      {/* Team Section */}
      <TeamSection />

      {/* Testimonials Section */}
      <TestimonialSection testimonials={testimonials} isLoading={isLoading} />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Floating Action Buttons */}
      {contactInfo && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
          {/* WhatsApp Button */}
          {contactInfo.whatsapp?.[0] && (
            <motion.a
              href={`https://wa.me/${contactInfo.whatsapp[0].replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-colors"
              aria-label="Contact us on WhatsApp"
            >
              <svg
                className="w-8 h-8"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </motion.a>
          )}

          {/* Facebook Messenger Button */}
          {contactInfo.facebook && (
            <motion.a
              href={contactInfo.facebook}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-2xl transition-colors"
              aria-label="Contact us on Facebook"
            >
              <svg
                className="w-8 h-8"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M12 0C5.373 0 0 4.975 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111C24 4.975 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z" />
              </svg>
            </motion.a>
          )}
        </div>
      )}
    </div>
  );
}
