"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Edit,
  Trash2,
  Star,
  Quote,
  Eye,
  EyeOff,
  AlertTriangle,
} from "lucide-react";
import toast from "react-hot-toast";
import { BACKEND_URL, getMediaUrl } from "@/lib/config";

interface Testimonial {
  _id: string;
  profileMedia: string;
  mediaType: "image" | "video";
  bannerMedia: string;
  bannerMediaType: "image" | "video";
  fullName: string;
  role: string;
  rating: number;
  testimonial: string;
  service: string;
  date: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
  onEdit: (testimonial: Testimonial) => void;
  onDelete: (id: string) => void;
  onTogglePublish: (id: string) => void;
}

// API - Delete testimonial
const API_BASE_URL = `${BACKEND_URL}/api/testimonials`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const deleteTestimonialAPI = async (id: string): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to delete testimonial");
  }

  return response.json();
};

// API - Toggle publish status
export const togglePublishAPI = async (
  id: string,
  published: boolean
): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ published }),
  });

  if (!response.ok) {
    throw new Error("Failed to update testimonial");
  }

  return response.json();
};

// Component
export default function TestimonialCard({
  testimonial,
  index,
  onEdit,
  onDelete,
  onTogglePublish,
}: TestimonialCardProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [bannerFailed, setBannerFailed] = useState(false);
  const [profileFailed, setProfileFailed] = useState(false);

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await deleteTestimonialAPI(testimonial._id);
      toast.success("Testimonial deleted successfully!");
      onDelete(testimonial._id);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      toast.error("Failed to delete testimonial");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleTogglePublish = async () => {
    try {
      await togglePublishAPI(testimonial._id, !testimonial.published);
      toast.success(
        testimonial.published
          ? "Testimonial unpublished successfully!"
          : "Testimonial published successfully!"
      );
      onTogglePublish(testimonial._id);
    } catch (error) {
      console.error("Error toggling publish status:", error);
      toast.error("Failed to update testimonial");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden relative"
      >
        {/* Banner Media */}
        {testimonial.bannerMedia && (
          <div className="relative w-full h-48 bg-gradient-to-r from-[#2e3192] to-[#4c46a3]">
            {testimonial.bannerMediaType === "video" ? (
              <video
                src={getMediaUrl(testimonial.bannerMedia)}
                className="w-full h-full object-cover"
                muted
                loop
                autoPlay
                onError={() => setBannerFailed(true)}
              />
            ) : !bannerFailed ? (
              <Image
                src={getMediaUrl(testimonial.bannerMedia)}
                alt="Banner"
                fill
                className="object-cover"
                onError={() => setBannerFailed(true)}
              />
            ) : null}
          </div>
        )}

        {/* Status Badge */}
        {testimonial.published && (
          <div className="absolute top-4 right-4 z-10">
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
              Published
            </span>
          </div>
        )}

        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-[#2e3192] to-[#4c46a3]">
                {profileFailed ? (
                  <div className="w-full h-full flex items-center justify-center text-white font-bold text-base">
                    {testimonial.fullName.charAt(0).toUpperCase()}
                  </div>
                ) : testimonial.mediaType === "video" ? (
                  <video
                    src={getMediaUrl(testimonial.profileMedia)}
                    className="w-full h-full object-cover"
                    muted
                    onError={() => setProfileFailed(true)}
                  />
                ) : (
                  <Image
                    src={getMediaUrl(testimonial.profileMedia)}
                    alt={testimonial.fullName}
                    fill
                    className="object-cover"
                    onError={() => setProfileFailed(true)}
                  />
                )}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">
                  {testimonial.fullName}
                </h3>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
            <div className="flex gap-1">
              <button
                onClick={handleTogglePublish}
                className={`p-2 rounded-lg transition-colors ${
                  testimonial.published
                    ? "bg-green-50 hover:bg-green-100"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                title={testimonial.published ? "Published" : "Unpublished"}
              >
                {testimonial.published ? (
                  <Eye className="h-4 w-4 text-green-600" />
                ) : (
                  <EyeOff className="h-4 w-4 text-gray-600" />
                )}
              </button>
              <button
                onClick={() => onEdit(testimonial)}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Edit className="h-4 w-4 text-gray-700" />
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="p-2 bg-gray-100 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="h-4 w-4 text-red-600" />
              </button>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < testimonial.rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Testimonial Text */}
          <div className="relative">
            <Quote className="absolute -top-2 -left-2 h-8 w-8 text-[#2e3192] opacity-20" />
            <p className="text-gray-700 leading-relaxed pl-6">
              {testimonial.testimonial}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Service</p>
            <p className="text-sm font-semibold text-gray-900">
              {testimonial.service}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Date</p>
            <p className="text-sm font-semibold text-gray-900">
              {new Date(testimonial.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Delete Testimonial
                </h3>
                <p className="text-sm text-gray-600">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <p className="text-gray-700 mb-6">
              Are you sure you want to delete the testimonial from{" "}
              <span className="font-semibold">{testimonial.fullName}</span>?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
