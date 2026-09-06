"use client";

export const dynamic = "force-dynamic";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, RefreshCw, AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-[#2e3192]/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#4c46a3]/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200/50 text-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-8"
          >
            <img
              src="/images/logo3.png"
              alt="Reflex Physiotherapy"
              className="w-48 h-auto object-contain"
            />
          </motion.div>

          {/* Error Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <div className="bg-red-100 p-6 rounded-full">
              <AlertTriangle className="h-16 w-16 text-red-600" />
            </div>
          </motion.div>

          {/* Error Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Something Went Wrong
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              We're sorry, but something unexpected happened.
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Don't worry, our team has been notified and we're working on it.
            </p>
          </motion.div>

          {/* Error Details (Development) */}
          {process.env.NODE_ENV === "development" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-left"
            >
              <p className="text-sm font-mono text-red-800 break-all">
                {error.message}
              </p>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              onClick={reset}
              className="bg-gradient-to-r from-[#2e3192] to-[#4c46a3] hover:from-[#2e3192]/90 hover:to-[#4c46a3]/90 text-white px-8"
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              Try Again
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => (window.location.href = "/")}
              className="border-2 border-[#2e3192] text-[#2e3192] hover:bg-blue-50 px-8"
            >
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Button>
          </motion.div>

          {/* Help Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 pt-8 border-t border-gray-200"
          >
            <p className="text-sm text-gray-500">
              If the problem persists, please contact our support team.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
