// import { motion, AnimatePresence } from "framer-motion";
// import { Badge } from "@/components/ui/badge";
// import { CheckCircle, Heart, Star, Users, Phone, Mail, MapPin, Sparkles, Navigation, Award, CalendarDays } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { ArrowRight } from "lucide-react";
// import { useState, useEffect, useMemo } from "react";
// import { BACKEND_URL } from "@/lib/config";
// import toast from "react-hot-toast";

// interface Banner {
//   _id: string;
//   section: string;
//   images: string[];
//   title: string;
//   subtitle: string;
//   isActive: boolean;
// }

// interface ContactInfo {
//   _id: string;
//   phone: string[];
//   email: string[];
//   address: string[];
//   whatsapp: string[];
//   mapLink: string;
//   facebook: string;
//   instagram: string;
//   twitter: string;
//   linkedin: string;
//   youtube: string;
// }

// interface HeroSectionProps {
//   banners: Banner[];
//   isLoading: boolean;
//   contactInfo: ContactInfo | null;
// }

// const HeroSection = ({ banners, isLoading, contactInfo }: HeroSectionProps) => {
//   const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     date: ""
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e?: React.FormEvent) => {
//     if (e) e.preventDefault();

//     if (!formData.name || !formData.email || !formData.phone || !formData.date) {
//       toast.error("Please fill in all fields");
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const response = await fetch("/api/appointments", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...formData,
//           service: "Physiotherapy Analysis",
//           status: "pending"
//         }),
//       });

//       if (response.ok) {
//         toast.success("Appointment request sent!");
//         setFormData({ name: "", email: "", phone: "", date: "" });
//       } else {
//         toast.error("Failed to send request. Please try again.");
//       }
//     } catch (error) {
//       console.error("Booking error:", error);
//       toast.error("An error occurred. Please check your connection.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Flatten banners so each image becomes its own slide with its parent banner's text
//   const slides = useMemo(() => {
//     if (!banners || banners.length === 0) {
//       return [{
//         _id: "default",
//         bannerId: "default",
//         title: "Care You Can Trust, Results You Can See",
//         subtitle: "Expert physiotherapy care tailored to your needs. We help you recover faster and move better with advanced techniques.",
//         image: "/images/pic2.jpg"
//       }];
//     }

//     return banners.flatMap((banner: Banner) =>
//       banner.images.map((img: string, index: number) => ({
//         _id: `${banner._id}-${index}`,
//         bannerId: banner._id,
//         title: banner.title,
//         subtitle: banner.subtitle,
//         image: img
//       }))
//     );
//   }, [banners]);

//   const getImageUrl = (imagePath: string) => {
//     if (!imagePath) return "/images/pic2.jpg";
//     if (imagePath.startsWith("http") || imagePath.startsWith("data:")) {
//       return imagePath;
//     }
//     const baseUrl = BACKEND_URL || "";
//     return `${baseUrl}${imagePath}`;
//   };

//   useEffect(() => {
//     if (slides.length <= 1 || isLoading) return;

//     const interval = setInterval(() => {
//       setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
//     }, 6000);

//     return () => clearInterval(interval);
//   }, [slides.length, isLoading]);

//   const currentSlide = slides[currentSlideIndex];
//   const slideImage = currentSlide?.image;

//   if (isLoading) {
//     return (
//       <div className="relative min-h-[90vh] lg:min-h-[85vh] bg-[#f8faff] flex flex-col items-center justify-center overflow-hidden">
//         {/* Decorative background for loader */}
//         <div className="absolute top-0 right-0 w-[50%] h-full bg-[#2e3192]/5 -skew-x-12 translate-x-1/4 -z-10" />
//         <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100/30 rounded-full blur-[100px] -z-10" />

//         <div className="relative flex flex-col items-center gap-6">
//           <div className="w-20 h-20 border-4 border-[#2e3192]/10 border-t-[#2e3192] rounded-full animate-spin" />
//           <div className="flex flex-col items-center">
//             <h3 className="text-2xl font-black text-[#1a1c3d] animate-pulse">Reflex Physiotherapy</h3>
//             <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-2">Loading Premium Experience...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="relative min-h-[90vh] lg:min-h-[85vh] bg-[#f8faff] overflow-hidden flex flex-col justify-center">
//       {/* Background Decorative Elements */}
//       <div className="absolute top-0 right-0 w-[50%] h-full bg-[#2e3192]/5 -skew-x-12 translate-x-1/4 -z-10" />
//       <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100/30 rounded-full blur-[100px] -z-10" />
//       <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#4c99e9]/10 rounded-full blur-[120px] -z-10" />
//       <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-green-200/20 rounded-full blur-[100px] -z-10" />

//       <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-20">
//         <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-center">
//           {/* Left Side - Animated Content */}
//           <div className="relative z-20">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={currentSlide.bannerId}
//                 initial={{ opacity: 0, x: -30 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: 30 }}
//                 transition={{ duration: 0.8, ease: "circOut" }}
//                 className="max-w-xl"
//               >
//                 <motion.div
//                   initial={{ opacity: 0, y: 15 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.2 }}
//                   className="flex flex-wrap items-center gap-3 mb-6"
//                 >
//                   <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200/60 text-amber-700 font-bold text-[11px] tracking-wide">
//                     <span className="flex items-center">
//                       {[...Array(5)].map((_, i) => (
//                         <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
//                       ))}
//                     </span>
//                     4.9/5 Patient Rated
//                   </span>
//                   <Badge variant="outline" className="px-4 py-1.5 rounded-full border-[#2e3192]/20 bg-[#2e3192]/5 text-[#2e3192] font-bold uppercase text-[10px] tracking-[0.2em]">
//                     <Sparkles className="w-3 h-3 mr-2" />
//                     Premium Medical Care
//                   </Badge>
//                 </motion.div>

//                 <h1 className="text-5xl lg:text-7xl xl:text-8xl font-black text-[#1a1c3d] leading-[1.05] mb-8 tracking-tighter">
//                   {currentSlide.title}
//                 </h1>

//                 <p className="text-gray-500 text-lg lg:text-xl leading-relaxed mb-10 font-medium opacity-80">
//                   {currentSlide.subtitle}
//                 </p>

//                 <div className="flex flex-wrap items-center gap-4">
//                   <Link href="/services">
//                     <Button
//                       className="rounded-2xl bg-[#2e3192] text-white hover:bg-[#1a1c3d] px-8 py-6 text-lg font-bold shadow-2xl shadow-[#2e3192]/30 transition-all hover:translate-y-[-4px] active:scale-95 group"
//                     >
//                       Our Services
//                       <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                     </Button>
//                   </Link>
//                   {contactInfo?.phone?.[0] ? (
//                     <a href={`tel:${contactInfo.phone[0]}`}>
//                       <Button
//                         variant="outline"
//                         className="rounded-2xl border-2 border-[#2e3192]/20 text-[#2e3192] hover:bg-[#2e3192]/5 px-8 py-6 text-lg font-bold transition-all hover:translate-y-[-4px] flex items-center gap-3"
//                       >
//                         <Phone className="w-5 h-5" />
//                         {contactInfo.phone[0]}
//                       </Button>
//                     </a>
//                   ) : (
//                     <Link href="/book">
//                       <Button
//                         variant="outline"
//                         className="rounded-2xl border-2 border-[#2e3192]/20 text-[#2e3192] hover:bg-[#2e3192]/5 px-8 py-6 text-lg font-bold transition-all hover:translate-y-[-4px]"
//                       >
//                         Book Visit
//                       </Button>
//                     </Link>
//                   )}
//                   {contactInfo?.mapLink && (
//                     <a
//                       href={contactInfo.mapLink}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <Button
//                         variant="ghost"
//                         className="rounded-2xl text-[#2e3192] hover:bg-[#2e3192]/5 px-6 py-6 text-base font-bold transition-all hover:translate-y-[-4px] flex items-center gap-2"
//                       >
//                         <Navigation className="w-5 h-5" />
//                         Get Directions
//                       </Button>
//                     </a>
//                   )}
//                 </div>

//                 {/* Trust Stats */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 15 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.5 }}
//                   className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-10 pt-8 border-t border-[#2e3192]/10"
//                 >
//                   {[
//                     { value: "10+", label: "Years Experience", icon: Award },
//                     { value: "5,000+", label: "Happy Patients", icon: Heart },
//                     { value: "98%", label: "Recovery Success", icon: CheckCircle },
//                   ].map((stat, i) => (
//                     <div key={i} className="flex items-center gap-3">
//                       <div className="w-10 h-10 rounded-xl bg-[#2e3192]/10 flex items-center justify-center">
//                         <stat.icon className="w-5 h-5 text-[#2e3192]" />
//                       </div>
//                       <div>
//                         <p className="text-xl font-black text-[#1a1c3d] leading-none">
//                           {stat.value}
//                         </p>
//                         <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em] mt-1">
//                           {stat.label}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </motion.div>

//               </motion.div>
//             </AnimatePresence>
//           </div>

//           {/* Right Side - Visuals */}
//           <div className="relative">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={currentSlideIndex}
//                 initial={{ opacity: 0, scale: 1.1 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
//                 className="relative z-10 w-full aspect-video group"
//               >
//                 {/* Image Container with Dynamic Border */}
//                 <div className="absolute inset-0 bg-white/50 backdrop-blur-sm p-1.5 rounded-3xl shadow-[0_50px_100px_-20px_rgba(46,49,146,0.15)] ring-1 ring-black/5">
//                   <div className="w-full h-full rounded-2xl overflow-hidden relative shadow-inner">
//                     <motion.img
//                       key={slideImage}
//                       initial={{ scale: 1.15, opacity: 0 }}
//                       animate={{ scale: 1, opacity: 1 }}
//                       transition={{
//                         scale: { duration: 12, ease: "linear" },
//                         opacity: { duration: 0.8, ease: "easeOut" }
//                       }}
//                       src={getImageUrl(slideImage)}
//                       alt={currentSlide.title}
//                       className="w-full h-full object-cover"
//                       onError={(e) => {
//                         (e.target as HTMLImageElement).src = "/images/pic2.jpg";
//                       }}
//                     />
//                     {/* Cinematic Overlays */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c3d]/20 via-transparent to-transparent pointer-events-none" />
//                     <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
//                   </div>
//                 </div>

//                 {/* Floating Rating Widget */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.8 }}
//                   className="absolute -bottom-8 -left-8 bg-white/95 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/50 z-20"
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="flex -space-x-3">
//                       <div className="w-10 h-10 rounded-full bg-[#2e3192]/15 border-2 border-white flex items-center justify-center text-[10px] font-black text-[#2e3192]">R</div>
//                       <div className="w-10 h-10 rounded-full bg-green-500/15 border-2 border-white flex items-center justify-center text-[10px] font-black text-green-600">S</div>
//                       <div className="w-10 h-10 rounded-full bg-amber-500/15 border-2 border-white flex items-center justify-center text-[10px] font-black text-amber-600">+</div>
//                     </div>
//                     <div>
//                       <div className="flex items-center gap-0.5">
//                         {[...Array(5)].map((_, i) => (
//                           <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
//                         ))}
//                         <span className="text-xs font-bold text-[#1a1c3d] ml-1">4.9</span>
//                       </div>
//                       <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-1">Trusted by 1,000+</p>
//                     </div>
//                   </div>
//                 </motion.div>

//                 {/* Location Chip */}
//                 {contactInfo?.address?.[0] && (
//                   <motion.a
//                     href={contactInfo.mapLink || "#"}
//                     target={contactInfo.mapLink ? "_blank" : undefined}
//                     rel={contactInfo.mapLink ? "noopener noreferrer" : undefined}
//                     initial={{ opacity: 0, y: -20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 1 }}
//                     className="absolute -top-5 left-6 bg-white/95 backdrop-blur-xl px-4 py-3 rounded-2xl shadow-xl border border-white/50 z-20 flex items-center gap-2.5 max-w-[260px]"
//                   >
//                     <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
//                       <MapPin className="w-4 h-4 text-red-500" />
//                     </div>
//                     <div className="min-w-0">
//                       <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em]">Our Location</p>
//                       <p className="text-[11px] font-bold text-[#1a1c3d] truncate">
//                         {contactInfo.address[0].split(",").slice(0, 3).join(",")}
//                       </p>
//                     </div>
//                   </motion.a>
//                 )}

//                 {/* Decorative Pill */}
//                 <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#2e3192] to-[#4c99e9] rounded-full -z-10 blur-2xl opacity-20 animate-pulse" />
//               </motion.div>
//             </AnimatePresence>

//             {/* Slider Controls */}
//             {slides.length > 1 && (
//               <div className="absolute top-1/2 -right-6 lg:-right-12 -translate-y-1/2 flex flex-col gap-4 z-30">
//                 {slides.map((_, idx: number) => (
//                   <button
//                     key={idx}
//                     onClick={() => setCurrentSlideIndex(idx)}
//                     className="group relative flex items-center justify-end"
//                   >
//                     <span className={`mr-4 text-[10px] font-bold transition-all duration-300 ${idx === currentSlideIndex ? 'opacity-100 translate-x-0 text-[#2e3192]' : 'opacity-0 translate-x-4'}`}>
//                       0{idx + 1}
//                     </span>
//                     <div className={`transition-all duration-500 rounded-full ${idx === currentSlideIndex ? 'w-12 h-3 bg-[#2e3192] shadow-lg shadow-[#2e3192]/30' : 'w-3 h-3 bg-gray-300 hover:bg-[#2e3192]/40'}`} />
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Floating Appointment Bar - Refined */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1, duration: 0.8 }}
//           className="mt-24 relative z-30 lg:-mb-16"
//         >
//           <div className="bg-white/80 backdrop-blur-2xl rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-white/50 p-8 lg:p-10 max-w-7xl mx-auto">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
//               <div className="space-y-3">
//                 <label className="text-[10px] font-black text-[#2e3192] uppercase tracking-widest ml-1">Full Name</label>
//                 <div className="relative">
//                   <Users className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     placeholder="John Doe"
//                     className="w-full bg-gray-50/50 border-2 border-transparent focus:border-[#2e3192]/10 rounded-2xl pl-12 pr-5 py-4 transition-all outline-none"
//                   />
//                 </div>
//               </div>
//               <div className="space-y-3">
//                 <label className="text-[10px] font-black text-[#2e3192] uppercase tracking-widest ml-1">Email Address</label>
//                 <div className="relative">
//                   <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     placeholder="john@example.com"
//                     className="w-full bg-gray-50/50 border-2 border-transparent focus:border-[#2e3192]/10 rounded-2xl pl-12 pr-5 py-4 transition-all outline-none"
//                   />
//                 </div>
//               </div>
//               <div className="space-y-3">
//                 <label className="text-[10px] font-black text-[#2e3192] uppercase tracking-widest ml-1">Phone Number</label>
//                 <div className="relative">
//                   <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     placeholder="01XXXXXXXXX"
//                     className="w-full bg-gray-50/50 border-2 border-transparent focus:border-[#2e3192]/10 rounded-2xl pl-12 pr-5 py-4 transition-all outline-none"
//                   />
//                 </div>
//               </div>
//               <div className="space-y-3">
//                 <label className="text-[10px] font-black text-[#2e3192] uppercase tracking-widest ml-1">Preferred Date</label>
//                 <div className="relative">
//                   <CalendarDays className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
//                   <input
//                     type="date"
//                     name="date"
//                     value={formData.date}
//                     onChange={handleInputChange}
//                     className="w-full bg-gray-50/50 border-2 border-transparent focus:border-[#2e3192]/10 rounded-2xl pl-12 pr-5 py-4 transition-all outline-none cursor-pointer"
//                   />
//                 </div>
//               </div>
//               <Button
//                 onClick={() => handleSubmit()}
//                 disabled={isSubmitting}
//                 className="w-full bg-[#2e3192] hover:bg-[#1a1c3d] text-white rounded-2xl py-8 shadow-xl shadow-[#2e3192]/20 font-bold text-lg active:scale-95 transition-all disabled:opacity-70"
//               >
//                 {isSubmitting ? "Sending..." : "Book Analysis"}
//               </Button>
//             </div>

//             <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 pt-5 border-t border-gray-100 text-[11px] text-gray-400">
//               <p className="flex items-center gap-1.5">
//                 <CheckCircle className="w-3.5 h-3.5 text-green-500" />
//                 We'll confirm your appointment within 24 hours
//               </p>
//               {contactInfo?.phone?.[0] && (
//                 <a
//                   href={`tel:${contactInfo.phone[0]}`}
//                   className="flex items-center gap-1.5 font-semibold text-[#2e3192] hover:underline"
//                 >
//                   <Phone className="w-3.5 h-3.5" />
//                   Or call {contactInfo.phone[0]}
//                 </a>
//               )}
//             </div>
//           </div>
//         </motion.div>
//       </div>

//     </div>
//   );
// };

// export default HeroSection;

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  CalendarDays,
  CheckCircle2,
  Heart,
  Phone,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * Props are kept optional so this component can replace your current
 * HeroSection without forcing you to immediately change the parent page.
 *
 * All hero content below is intentionally STATIC.
 */
interface HeroSectionProps {
  banners?: unknown;
  isLoading?: boolean;
  contactInfo?: unknown;
}

const PHONE = "+880 1684-522924";
const HERO_IMAGE = "/images/pic2.jpg";

const features = [
  {
    icon: Heart,
    title: "Pain Relief",
    text: "Feel better, move freely",
  },
  {
    icon: TrendingUp,
    title: "Improved Mobility",
    text: "Regain your independence",
  },
  {
    icon: Sparkles,
    title: "Better Quality of Life",
    text: "Get back to what you love",
  },
];

const HeroSection = (_props: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden bg-[#fbfbff]">
      {/* Soft background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#5b35d5]/[0.05] blur-2xl" />
        <div className="absolute right-[-90px] top-16 h-[440px] w-[440px] rounded-full bg-[#7c5cff]/[0.07] blur-3xl" />
        <div className="absolute bottom-[-130px] left-[35%] h-80 w-80 rounded-full bg-blue-200/20 blur-3xl" />

        <div className="absolute left-[43%] top-24 hidden grid-cols-4 gap-3 lg:grid">
          {Array.from({ length: 16 }).map((_, i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-[#5b35d5]/20"
            />
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 pb-8 pt-12 sm:px-8 lg:px-12 lg:pb-10 lg:pt-20 xl:px-16">
        <div className="grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12 xl:gap-20">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#5b35d5]/15 bg-[#5b35d5]/[0.055] px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#4a2eb8]">
              <Sparkles className="h-3.5 w-3.5" />
              Premium Physiotherapy Care
            </div>

            <h1 className="max-w-[760px] text-[52px] font-black leading-[0.98] tracking-[-0.045em] text-[#11113a] sm:text-[64px] lg:text-[64px] xl:text-[76px]">
              Move Better,
              <span className="block bg-gradient-to-r from-[#5630c9] to-[#7c4dff] bg-clip-text text-transparent">
                Recover Faster
              </span>
              <span className="block">with Expert</span>
              <span className="block">Physiotherapy Care</span>
            </h1>

            <p className="mt-7 max-w-[650px] text-base font-medium leading-7 text-[#707589] sm:text-lg">
              Personalized rehabilitation, effective pain management and expert
              care to help you move better, live stronger and get back to what
              you love.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/book">
                <Button className="h-14 rounded-2xl bg-gradient-to-r from-[#4d2bb8] to-[#6136d7] px-7 text-base font-bold text-white shadow-[0_16px_35px_rgba(78,45,184,0.24)] transition-all hover:-translate-y-0.5 hover:from-[#42239f] hover:to-[#5630c9]">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  Book a Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Link href="/services">
                <Button
                  variant="outline"
                  className="h-14 rounded-2xl border-[#5b35d5]/25 bg-white px-7 text-base font-bold text-[#4b2db5] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#f5f2ff]"
                >
                  View Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center">
              <a
                href={`tel:${PHONE.replace(/\s/g, "")}`}
                className="group flex items-center gap-3"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#5b35d5]/10 text-[#4f2dbd] transition-transform group-hover:scale-105">
                  <Phone className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-semibold text-[#8c90a0]">
                    Call Us Today
                  </span>
                  <span className="block text-lg font-black text-[#34218f]">
                    {PHONE}
                  </span>
                </span>
              </a>

              <div className="hidden h-10 w-px bg-[#dedcf0] sm:block" />

              <p className="max-w-[230px] text-sm leading-5 text-[#9296a6]">
                We&apos;re here to help you on your recovery journey.
              </p>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, x: 24 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10 mx-auto w-full max-w-[760px] lg:mx-0"
          >
            {/* Purple glow behind image */}
            <div className="absolute -inset-8 -z-10 rounded-[44px] bg-[#6c4cff]/10 blur-3xl" />

            {/* Main image card */}
            <div className="relative aspect-[1.20/1] overflow-hidden rounded-[36px] border-[5px] border-white bg-white shadow-[0_30px_80px_rgba(50,35,120,0.16)] sm:aspect-[1.32/1] lg:aspect-[1.32/1]">
              <Image
                src={HERO_IMAGE}
                alt="Physiotherapist helping a patient during rehabilitation"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#17113b]/20 via-transparent to-transparent" />

              {/* Bottom visual accent */}
              <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#17113b]/25 to-transparent" />
            </div>

            {/* Happy patients card */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.55 }}
              className="absolute right-[-8px] top-7 z-20 w-[205px] rounded-[24px] border border-white/80 bg-white/95 p-4 shadow-[0_18px_45px_rgba(37,27,92,0.14)] backdrop-blur-xl sm:right-[-24px]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#efeaff] text-[#6942e4]">
                  <Heart className="h-5 w-5 fill-current" />
                </div>
                <div>
                  <p className="text-2xl font-black leading-none text-[#15153f]">
                    500+
                  </p>
                  <p className="mt-1 text-sm font-bold text-[#2f3150]">
                    Happy Patients
                  </p>
                </div>
              </div>
              <p className="mt-2 pl-14 text-[11px] text-[#9296a7]">
                Real people. Real progress.
              </p>
            </motion.div>

            {/* Licensed therapists card */}
            <motion.div
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.82, duration: 0.55 }}
              className="absolute -bottom-8 left-[-6px] z-20 flex items-center gap-3 rounded-[22px] border border-white/80 bg-white/95 px-4 py-3 shadow-[0_18px_45px_rgba(37,27,92,0.15)] backdrop-blur-xl sm:left-[-30px] sm:px-5 sm:py-4"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-extrabold text-[#1b1b43]">
                  Licensed Therapists
                </p>
                <p className="mt-0.5 text-[11px] text-[#969aaa]">
                  Qualified. Experienced. Caring.
                </p>
              </div>
            </motion.div>

            {/* Recovery plan card */}
            <motion.div
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.95, duration: 0.55 }}
              className="absolute -bottom-7 right-[-4px] z-20 hidden items-center gap-3 rounded-[22px] border border-white/80 bg-white/95 px-4 py-3 shadow-[0_18px_45px_rgba(37,27,92,0.15)] backdrop-blur-xl sm:flex sm:right-[-34px]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eee9ff] text-[#6640dc]">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-extrabold text-[#1b1b43]">
                  Personalized Recovery Plans
                </p>
                <p className="mt-0.5 text-[11px] text-[#969aaa]">
                  Tailored to your goals.
                </p>
              </div>
            </motion.div>

            {/* Decorative marker */}
            <div className="absolute -right-5 bottom-[25%] hidden rotate-[-4deg] text-right lg:block">
              <p className="font-medium italic leading-5 text-[#7050d8]">
                A healthier,
                <br />
                brighter you
              </p>
              <div className="ml-auto mt-2 h-8 w-16 rounded-[50%] border-b-2 border-[#7050d8]/70" />
            </div>
          </motion.div>
        </div>

        {/* Bottom benefit strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.65 }}
          className="mt-20 border-t border-[#e7e5f2] pt-6 lg:mt-24"
        >
          <div className="grid gap-5 md:grid-cols-3 xl:grid-cols-[1fr_1fr_1fr_0.9fr]">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className={`flex items-center gap-4 ${
                    index < 2 ? "md:border-r md:border-[#e4e2ee] md:pr-6" : ""
                  }`}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f0ecff] text-[#5a35ce]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-extrabold text-[#18183d]">
                      {feature.title}
                    </p>
                    <p className="mt-1 text-sm text-[#8b8fa1]">
                      {feature.text}
                    </p>
                  </div>
                </div>
              );
            })}

            <div className="hidden items-center border-l border-[#e4e2ee] pl-8 xl:flex">
              <div>
                <div className="mb-2 flex items-center gap-2 text-[#5b35d5]">
                  <Award className="h-4 w-4" />
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <p className="text-[11px] font-extrabold uppercase leading-5 tracking-[0.26em] text-[#9b9eae]">
                  Expert Care.
                  <br />
                  Brighter Tomorrows.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
