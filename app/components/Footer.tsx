"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Clock3,
  Facebook,
  Instagram,
  Linkedin,
  LockKeyhole,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Send,
  Twitter,
  Youtube,
  ArrowUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useContactInfo } from "../hooks/useContactInfo";

const Footer = () => {
  const { contactInfo } = useContactInfo();

  const linkPaths: Record<string, string> = {
    Home: "/",
    "About Us": "/about",
    "Our Team": "/team",
    Services: "/services",
    "Book Appointment": "/book",
    Blog: "/blog",
    Contact: "/book",
  };

  const quickLinks = [
    "Home",
    "About Us",
    "Our Team",
    "Services",
    "Book Appointment",
    "Blog",
    "Contact",
  ];

  const serviceLinks = [
    "Manual Therapy",
    "Sports Rehabilitation",
    "Post-Surgical Rehab",
    "Pediatric Care",
    "Geriatric Physiotherapy",
    "Neurological Physiotherapy",
    "Orthopedic Physiotherapy",
    "Electrotherapy",
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, url: contactInfo?.facebook },
    { name: "Instagram", icon: Instagram, url: contactInfo?.instagram },
    { name: "Twitter", icon: Twitter, url: contactInfo?.twitter },
    { name: "LinkedIn", icon: Linkedin, url: contactInfo?.linkedin },
    { name: "YouTube", icon: Youtube, url: contactInfo?.youtube },
  ].filter((link) => Boolean(link.url));

  const primaryPhone = contactInfo?.phone?.[0] || "+880 1684-522924";
  const primaryEmail = contactInfo?.email?.[0] || "reflexphysiobd@gmail.com";
  const primaryAddress =
    contactInfo?.address?.[0] ||
    "House# 36, Road# Shah Makhdum Avenue, Sector# 13, Level# 04, Lift# 04, Uttara.";

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden bg-[#fbfbff] text-[#17173e]">
      {/* Soft footer background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-36 -left-24 h-[420px] w-[620px] rounded-[50%] bg-[#6843de]/[0.055] blur-3xl" />
        <div className="absolute -bottom-40 right-[-80px] h-[420px] w-[620px] rounded-[50%] bg-[#805eff]/[0.06] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: "radial-gradient(#5b35d0 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 pt-10 sm:px-8 lg:px-12 xl:px-16">
        {/* CTA BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="relative overflow-hidden rounded-[32px] border border-[#e7e3f6] bg-gradient-to-r from-[#f0edff] via-[#f7f5ff] to-[#ece8ff] shadow-[0_20px_55px_rgba(62,41,142,0.08)]"
        >
          {/* Image decoration */}
          <div
            className="absolute inset-y-0 right-0 hidden w-[38%] bg-cover bg-center opacity-[0.22] lg:block"
            style={{
              backgroundImage: 'url("/images/pic2.jpg")',
            }}
          />
          <div className="absolute inset-y-0 right-0 hidden w-[48%] bg-gradient-to-r from-[#f7f5ff] via-[#f7f5ff]/85 to-transparent lg:block" />

          <div className="relative z-10 grid gap-7 px-6 py-8 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center lg:px-10 lg:py-9 xl:px-12">
            <div className="max-w-3xl">
              <p className="mb-3 text-[11px] font-black uppercase tracking-[0.22em] text-[#5934c8]">
                Ready to start your recovery?
              </p>

              <h2 className="text-3xl font-black tracking-[-0.035em] text-[#15153e] sm:text-4xl lg:text-[42px] lg:leading-[1.05]">
                Take the First Step Towards a{" "}
                <span className="bg-gradient-to-r from-[#5b34ce] to-[#7d54f7] bg-clip-text text-transparent">
                  Healthier, Happier You
                </span>
              </h2>

              <p className="mt-4 max-w-2xl text-sm font-medium leading-6 text-[#73788d] sm:text-base">
                Book a consultation today and let our experts help you move
                better, live pain-free, and achieve your recovery goals.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Link href="/book">
                <Button className="h-13 rounded-2xl bg-gradient-to-r from-[#4f2ab8] to-[#6237d6] px-6 py-6 text-sm font-bold text-white shadow-[0_14px_30px_rgba(78,44,181,0.22)] transition-all hover:-translate-y-0.5">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  Book Appointment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <a href={`tel:${primaryPhone.replace(/\s/g, "")}`}>
                <Button
                  variant="outline"
                  className="h-13 rounded-2xl border-[#5d37ca]/25 bg-white/80 px-6 py-6 text-sm font-bold text-[#4e2bb3] backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  {primaryPhone}
                </Button>
              </a>
            </div>
          </div>
        </motion.div>

        {/* MAIN FOOTER */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.15fr_0.8fr_0.95fr_1.05fr] xl:grid-cols-[1.15fr_0.85fr_1fr_1.05fr_1.05fr]"
        >
          {/* BRAND */}
          <div className="xl:pr-6">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-[#e5e1f3] bg-white shadow-sm">
                <img
                  src="/images/logo2.jpg"
                  alt="Reflex Physiotherapy Logo"
                  className="h-full w-full object-contain"
                />
              </div>

              <div>
                <h3 className="text-3xl font-black tracking-[-0.035em] text-[#15153e]">
                  Reflex
                </h3>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.24em] text-[#77809b]">
                  Physiotherapy & Rehab
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-[320px] text-sm font-medium leading-6 text-[#72788d]">
              Your trusted partner in recovery and rehabilitation. We help you
              move better, live healthier, and enjoy a better quality of life
              through personalized, evidence-based physiotherapy care.
            </p>

            {socialLinks.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <motion.a
                      key={social.name}
                      href={social.url as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      whileHover={{ y: -3, scale: 1.05 }}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e6e2f2] bg-white text-[#403f60] shadow-sm transition-colors hover:border-[#5c36cd]/25 hover:bg-[#f0ecff] hover:text-[#5832c8]"
                    >
                      <Icon className="h-4 w-4" />
                    </motion.a>
                  );
                })}
              </div>
            )}

            <p className="mt-6 text-sm font-medium italic leading-5 text-[#6a4dd0]">
              Movement for a Better Tomorrow
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="mb-5 text-lg font-black text-[#17173f]">
              Quick Links
            </h4>

            <ul className="space-y-1">
              {quickLinks.map((linkText) => (
                <li key={linkText}>
                  <Link
                    href={linkPaths[linkText] || "#"}
                    className="group flex items-center justify-between border-b border-[#ece9f3] py-2.5 text-sm font-medium text-[#686e82] transition-colors hover:text-[#5731c7]"
                  >
                    <span>{linkText}</span>
                    <ChevronRight className="h-4 w-4 text-[#9995ad] transition-transform group-hover:translate-x-1 group-hover:text-[#5731c7]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h4 className="mb-5 text-lg font-black text-[#17173f]">
              Our Services
            </h4>

            <ul className="space-y-1">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="group flex items-center justify-between border-b border-[#ece9f3] py-2.5 text-sm font-medium text-[#686e82] transition-colors hover:text-[#5731c7]"
                  >
                    <span>{service}</span>
                    <ChevronRight className="h-4 w-4 text-[#9995ad] transition-transform group-hover:translate-x-1 group-hover:text-[#5731c7]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="mb-5 text-lg font-black text-[#17173f]">
              Contact Information
            </h4>

            <div className="space-y-4">
              {contactInfo?.phone?.length ? (
                contactInfo.phone.map((phone, index) => (
                  <a
                    key={`${phone}-${index}`}
                    href={`tel:${phone}`}
                    className="group flex items-start gap-3 text-sm font-medium text-[#686e82] transition-colors hover:text-[#5731c7]"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f0ecff] text-[#5a34ca]">
                      <Phone className="h-4 w-4" />
                    </span>
                    <span className="pt-2">{phone}</span>
                  </a>
                ))
              ) : (
                <a
                  href={`tel:${primaryPhone.replace(/\s/g, "")}`}
                  className="group flex items-start gap-3 text-sm font-medium text-[#686e82] transition-colors hover:text-[#5731c7]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f0ecff] text-[#5a34ca]">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span className="pt-2">{primaryPhone}</span>
                </a>
              )}

              {contactInfo?.email?.length ? (
                contactInfo.email.map((email, index) => (
                  <a
                    key={`${email}-${index}`}
                    href={`mailto:${email}`}
                    className="group flex items-start gap-3 text-sm font-medium text-[#686e82] transition-colors hover:text-[#5731c7]"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f0ecff] text-[#5a34ca]">
                      <Mail className="h-4 w-4" />
                    </span>
                    <span className="break-all pt-2">{email}</span>
                  </a>
                ))
              ) : (
                <a
                  href={`mailto:${primaryEmail}`}
                  className="group flex items-start gap-3 text-sm font-medium text-[#686e82] transition-colors hover:text-[#5731c7]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f0ecff] text-[#5a34ca]">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span className="break-all pt-2">{primaryEmail}</span>
                </a>
              )}

              <div className="flex items-start gap-3 text-sm font-medium leading-6 text-[#686e82]">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f0ecff] text-[#5a34ca]">
                  <MapPin className="h-4 w-4" />
                </span>
                <span>{primaryAddress}</span>
              </div>

              <div className="flex items-start gap-3 text-sm font-medium leading-6 text-[#686e82]">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f0ecff] text-[#5a34ca]">
                  <Clock3 className="h-4 w-4" />
                </span>
                <span>
                  Sat - Thu: 9:00 AM - 8:00 PM
                  <br />
                  Friday: Closed
                </span>
              </div>

              {contactInfo?.mapLink && (
                <a
                  href={contactInfo.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 rounded-xl bg-[#efebff] px-4 py-3 text-sm font-extrabold text-[#5430c1] transition-all hover:-translate-y-0.5 hover:bg-[#e9e3ff]"
                >
                  <Navigation className="h-4 w-4" />
                  Get Directions
                  <ArrowRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* NEWSLETTER */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="rounded-[26px] border border-[#e7e3f4] bg-gradient-to-br from-[#f4f1ff] to-[#ece8ff] p-6 shadow-[0_16px_40px_rgba(72,47,155,0.07)]">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#5933ca] shadow-sm">
                <Mail className="h-5 w-5" />
              </div>

              <h4 className="text-xl font-black text-[#17173f]">
                Stay Updated
              </h4>

              <p className="mt-2 text-sm font-medium leading-6 text-[#71768b]">
                Subscribe for health tips, clinic updates and rehabilitation
                guidance.
              </p>

              <div className="mt-5">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="h-12 w-full rounded-xl border border-[#ded9ec] bg-white px-4 text-sm text-[#252546] outline-none transition focus:border-[#6540d4] focus:ring-4 focus:ring-[#6540d4]/10"
                />

                <button
                  type="button"
                  className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4f2ab9] to-[#6338d8] text-sm font-extrabold text-white shadow-[0_12px_25px_rgba(78,43,179,0.2)] transition-all hover:-translate-y-0.5"
                >
                  Subscribe
                  <Send className="h-4 w-4" />
                </button>
              </div>

              <p className="mt-4 flex items-center gap-2 text-[11px] font-medium text-[#8b8fa1]">
                <LockKeyhole className="h-3.5 w-3.5" />
                We respect your privacy
              </p>
            </div>
          </div>
        </motion.div>

        {/* BOTTOM BAR */}
        <div className="relative border-t border-[#e9e6f1] py-6">
          <div className="flex flex-col gap-4 text-xs font-medium text-[#7c8194] md:flex-row md:items-center md:justify-between">
            <p>
              &copy; {new Date().getFullYear()} Reflex Physiotherapy & Rehab
              Center. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link href="/privacy" className="hover:text-[#5731c7]">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-[#5731c7]">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="hover:text-[#5731c7]">
                Sitemap
              </Link>
            </div>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="absolute -top-6 right-0 flex h-12 w-12 items-center justify-center rounded-full border border-[#e6e2f2] bg-white text-[#5731c7] shadow-[0_10px_28px_rgba(68,46,148,0.12)] transition-all hover:-translate-y-1 hover:bg-[#f3f0ff]"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
