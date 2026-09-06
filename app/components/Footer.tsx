"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, Mail, MapPin, Navigation, Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import { useContactInfo } from "../hooks/useContactInfo";

const Footer = () => {
  const { contactInfo } = useContactInfo();

  const linkPaths: { [key: string]: string } = {
    "About Us": "/about",
    "Our Team": "/team",
    Services: "/services",
    Contact: "/book",
  };

  const socialLinks = [
    { name: "Facebook", icon: Facebook, url: contactInfo?.facebook },
    { name: "Instagram", icon: Instagram, url: contactInfo?.instagram },
    { name: "Twitter", icon: Twitter, url: contactInfo?.twitter },
    { name: "LinkedIn", icon: Linkedin, url: contactInfo?.linkedin },
    { name: "YouTube", icon: Youtube, url: contactInfo?.youtube },
  ].filter((link) => link.url);

  return (
    <div>
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-8"
          >
            <div className="space-y-4">
              <motion.div
                className="flex items-center space-x-3 group"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src="/images/logo2.jpg"
                  alt="Reflex Physiotherapy Logo"
                  className="w-14 h-14 object-contain"
                />
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Reflex
                  </h3>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
                    Physiotherapy & Rehab
                  </p>
                </div>
              </motion.div>
              <p className="text-gray-400 leading-relaxed">
                Your trusted partner in recovery and rehabilitation. Helping you
                move better and live healthier.
              </p>

              {/* Social Media Links */}
              {socialLinks.length > 0 && (
                <div className="flex items-center gap-3 pt-2">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                      >
                        <Icon className="h-4 w-4" />
                      </motion.a>
                    );
                  })}
                </div>
              )}
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                {[
                  "Manual Therapy",
                  "Sports Rehabilitation",
                  "Post-Surgical Rehab",
                  "Pediatric Care",
                ].map((service) => (
                  <motion.li
                    key={service}
                    whileHover={{ x: 5, color: "#60A5FA" }}
                  >
                    <Link
                      href="/services"
                      className="hover:text-blue-400 transition-colors"
                    >
                      {service}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                {["About Us", "Our Team", "Services", "Contact"].map(
                  (linkText) => (
                    <motion.li
                      key={linkText}
                      whileHover={{ x: 5, color: "#60A5FA" }}
                    >
                      <Link
                        href={linkPaths[linkText] || "#"}
                        className="hover:text-blue-400 transition-colors"
                      >
                        {linkText}
                      </Link>
                    </motion.li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-3 text-gray-400">
                {contactInfo?.phone && contactInfo.phone.length > 0 && (
                  <div className="space-y-2">
                    {contactInfo.phone.map((phone, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 flex-shrink-0" />
                        <a
                          href={`tel:${phone}`}
                          className="hover:text-blue-400 transition-colors"
                        >
                          {phone}
                        </a>
                      </div>
                    ))}
                  </div>
                )}

                {contactInfo?.email && contactInfo.email.length > 0 && (
                  <div className="space-y-2">
                    {contactInfo.email.map((email, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 flex-shrink-0" />
                        <a
                          href={`mailto:${email}`}
                          className="hover:text-blue-400 transition-colors break-all"
                        >
                          {email}
                        </a>
                      </div>
                    ))}
                  </div>
                )}

                {contactInfo?.address && contactInfo.address.length > 0 && (
                  <div className="space-y-2">
                    {contactInfo.address.map((addr, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <MapPin className="h-4 w-4 flex-shrink-0 mt-1" />
                        <span className="text-sm">{addr}</span>
                      </div>
                    ))}
                  </div>
                )}

                {contactInfo?.mapLink && (
                  <div className="pt-1">
                    <a
                      href={contactInfo.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
                    >
                      <Navigation className="h-4 w-4" />
                      Get Directions
                    </a>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400"
          >
            <p>
              &copy; {new Date().getFullYear()} Reflex Physiotherapy & Rehab
              Center. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
