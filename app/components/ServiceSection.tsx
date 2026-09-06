// "use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Baby,
  BarChart3,
  CheckCircle2,
  Hand,
  Heart,
  Loader2,
  Shield,
  ShieldCheck,
  Sparkles,
  Target,
  UserCheck,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useServices } from "../hooks/useServices";

const ServiceSection = () => {
  const { services, isLoading } = useServices();

  const fadeInUp = {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const iconMap: Record<string, any> = {
    Activity,
    Baby,
    Shield,
    Target,
    UserCheck,
    Zap,
    Hand,
  };

  /**
   * We intentionally show 4 services on the landing page:
   * 3 cards on top + 1 wide featured card underneath.
   */
  const visibleServices = services.slice(0, 4);
  const topServices = visibleServices.slice(0, 3);
  const wideService = visibleServices[3];

  /**
   * Use the uploaded/service image whenever available.
   * pic2.jpg acts as a safe local fallback because it already exists in the project.
   */
  const getServiceImage = (imageUrl?: string) => {
    if (imageUrl && imageUrl.trim()) return imageUrl.trim();
    return "/images/pic2.jpg";
  };

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#fbfbff] py-20 sm:py-24 lg:py-28"
    >
      {/* Soft background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-28 top-12 h-80 w-80 rounded-full bg-[#6a42df]/[0.06] blur-3xl" />
        <div className="absolute -right-28 bottom-0 h-[420px] w-[420px] rounded-full bg-[#7d5cff]/[0.07] blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(#5a35cf 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-3xl text-center lg:mb-14"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#633bdb]/15 bg-[#633bdb]/[0.07] px-5 py-2 text-sm font-bold text-[#5130be]">
            <Activity className="h-4 w-4" />
            Our Expertise
          </div>

          <h2 className="text-4xl font-black tracking-[-0.035em] text-[#11113a] sm:text-5xl lg:text-[56px] lg:leading-[1.05]">
            Comprehensive{" "}
            <span className="bg-gradient-to-r from-[#5a33ce] to-[#8056ff] bg-clip-text text-transparent">
              Rehabilitation
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-7 text-[#767b91] sm:text-lg">
            Advanced, evidence-based treatments tailored to your unique needs
            using modern practice and state-of-the-art technology.
          </p>
        </motion.div>

        {/* Loading */}
        {isLoading ? (
          <div className="flex h-[420px] items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-10 w-10 animate-spin text-[#5c35d0]" />
              <p className="text-sm font-semibold text-[#8a8ea0]">
                Loading specialist services...
              </p>
            </div>
          </div>
        ) : visibleServices.length === 0 ? (
          <div className="rounded-[32px] border border-[#eceaf4] bg-white px-6 py-20 text-center shadow-sm">
            <p className="text-lg font-medium text-[#777b8e]">
              Our services are being updated. Check back soon!
            </p>
          </div>
        ) : (
          <>
            {/* Top 3 cards */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid gap-6 lg:grid-cols-3"
            >
              {topServices.map((service, index) => {
                const IconComponent =
                  iconMap[service.category?.icon] || Activity;

                const isPhotoCard = index === 0;
                const image = getServiceImage(service.imageUrl);

                return (
                  <motion.article
                    key={service._id}
                    variants={fadeInUp}
                    className="group relative min-h-[320px] overflow-hidden rounded-[30px] border border-[#e7e5f0] bg-white shadow-[0_16px_45px_rgba(45,32,108,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_26px_65px_rgba(72,47,160,0.12)]"
                  >
                    {/* Featured photo card */}
                    {isPhotoCard && (
                      <>
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.04]"
                          style={{
                            backgroundImage: `url("${image}")`,
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/88 to-white/10" />
                        <div className="absolute inset-0 bg-[#20154f]/[0.06]" />
                      </>
                    )}

                    {/* White cards subtle decoration */}
                    {!isPhotoCard && (
                      <>
                        <div className="absolute -bottom-24 -right-20 h-56 w-56 rounded-full bg-[#7650e8]/[0.06]" />
                        <div className="absolute -bottom-32 -right-7 h-60 w-60 rounded-full border border-[#7650e8]/[0.08]" />
                      </>
                    )}

                    <div className="relative z-10 flex h-full min-h-[320px] flex-col p-7 sm:p-8">
                      <div className="mb-auto">
                        <div className="flex items-start justify-between">
                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/70 bg-[#f1edff]/95 text-[#5c34cf] shadow-sm backdrop-blur">
                            <IconComponent className="h-6 w-6" />
                          </div>

                          <ArrowRight className="h-5 w-5 translate-x-2 text-[#6037d1] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                        </div>
                      </div>

                      <div className={isPhotoCard ? "pt-10" : "pt-9"}>
                        <h3 className="text-[22px] font-black leading-tight tracking-[-0.025em] text-[#15153e]">
                          {service.name}
                        </h3>

                        <p className="mt-3 max-w-[410px] text-[15px] leading-6 text-[#666c83]">
                          {service.shortDescription}
                        </p>

                        <Link
                          href={`/services#${service._id}`}
                          className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#5630c9] transition-all hover:gap-3"
                        >
                          Learn More
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>

            {/* Wide featured 4th service */}
            {wideService && (
              <motion.article
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                viewport={{ once: true }}
                className="group relative mt-6 overflow-hidden rounded-[30px] border border-[#e6e3f0] bg-white shadow-[0_18px_50px_rgba(45,32,108,0.07)]"
              >
                <div className="grid min-h-[290px] lg:grid-cols-[1.08fr_0.92fr]">
                  {/* Left content */}
                  <div className="relative z-10 p-7 sm:p-9 lg:p-10">
                    <div className="grid h-full items-center gap-8 md:grid-cols-[1.05fr_0.95fr]">
                      <div>
                        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f0ecff] text-[#5a34cd]">
                          {React.createElement(
                            iconMap[wideService.category?.icon] || Activity,
                            { className: "h-6 w-6" },
                          )}
                        </div>

                        <h3 className="text-2xl font-black tracking-[-0.025em] text-[#15153e] sm:text-[27px]">
                          {wideService.name}
                        </h3>

                        <p className="mt-3 max-w-xl text-[15px] leading-6 text-[#666c83]">
                          {wideService.shortDescription}
                        </p>

                        <Link
                          href={`/services#${wideService._id}`}
                          className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#5630c9] transition-all hover:gap-3"
                        >
                          Learn More
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>

                      {/* Benefits */}
                      <div className="space-y-4 border-t border-[#e9e6f2] pt-7 md:border-l md:border-t-0 md:pl-9 md:pt-0">
                        {[
                          "Reduce Pain",
                          "Improve Mobility",
                          "Better Quality of Life",
                        ].map((benefit) => (
                          <div
                            key={benefit}
                            className="flex items-center gap-3 text-sm font-semibold text-[#666b80]"
                          >
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eee9ff] text-[#5c35cf]">
                              <CheckCircle2 className="h-4 w-4" />
                            </span>
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right image */}
                  <div className="relative min-h-[260px] overflow-hidden lg:min-h-full">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.035]"
                      style={{
                        backgroundImage: `url("${getServiceImage(
                          wideService.imageUrl,
                        )}")`,
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/20 to-transparent lg:from-white/60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a123e]/15 to-transparent" />

                    <div className="absolute bottom-7 right-7 rounded-2xl border border-white/70 bg-white/85 px-4 py-3 text-right shadow-lg backdrop-blur-md">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#5a36ca]">
                        Stronger Movement
                      </p>
                      <p className="mt-1 text-xs font-medium text-[#8a8da0]">
                        Happier You
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>
            )}
          </>
        )}

        {/* CTA */}
        {!isLoading && visibleServices.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.55 }}
            viewport={{ once: true }}
            className="mt-8 flex justify-center"
          >
            <Link href="/services">
              <Button className="h-14 rounded-2xl bg-gradient-to-r from-[#4d29b7] to-[#663bd8] px-8 text-base font-bold text-white shadow-[0_15px_35px_rgba(76,42,180,0.23)] transition-all hover:-translate-y-0.5 hover:from-[#42229f] hover:to-[#5930c9]">
                View All Specialist Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        )}

        {/* Trust strip */}
        {!isLoading && visibleServices.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto mt-8 grid max-w-4xl gap-5 border-t border-[#ebe8f3] pt-7 sm:grid-cols-3"
          >
            <div className="flex items-center justify-center gap-3 sm:border-r sm:border-[#e8e5ef]">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f0ecff] text-[#5c35cf]">
                <Heart className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-extrabold text-[#202044]">
                  Personalized Care
                </p>
                <p className="text-xs text-[#9396a6]">Tailored to your goals</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 sm:border-r sm:border-[#e8e5ef]">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f0ecff] text-[#5c35cf]">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-extrabold text-[#202044]">
                  Licensed Therapists
                </p>
                <p className="text-xs text-[#9396a6]">
                  Qualified. Experienced. Caring.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f0ecff] text-[#5c35cf]">
                <BarChart3 className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-extrabold text-[#202044]">
                  Evidence-Based Treatment
                </p>
                <p className="text-xs text-[#9396a6]">
                  Modern methods. Real progress.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ServiceSection;
