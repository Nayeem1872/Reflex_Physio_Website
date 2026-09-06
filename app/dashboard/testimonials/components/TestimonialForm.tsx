"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { X, User, Save, Star } from "lucide-react";
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

interface TestimonialFormProps {
  isOpen: boolean;
  onClose: () => void;
  editingTestimonial: Testimonial | null;
  onSuccess: () => void;
}

// API - Upload media
const API_BASE_URL = `${BACKEND_URL}/api/testimonials`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

const getAuthHeadersJSON = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const uploadMediaAPI = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("media", file);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload media");
  }

  const data = await response.json();
  return data.imageUrl || data.mediaUrl || data.url;
};

// API - Create testimonial
export const createTestimonialAPI = async (payload: any): Promise<any> => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: getAuthHeadersJSON(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create testimonial");
  }

  return response.json();
};

// API - Update testimonial
export const updateTestimonialAPI = async (
  id: string,
  payload: any
): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeadersJSON(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to update testimonial");
  }

  return response.json();
};

// Component
export default function TestimonialForm({
  isOpen,
  onClose,
  editingTestimonial,
  onSuccess,
}: TestimonialFormProps) {
  const [imagePreview, setImagePreview] = useState<string>("");
  const [bannerPreview, setBannerPreview] = useState<string>("");
  const [profilePreviewFailed, setProfilePreviewFailed] = useState(false);
  const [bannerPreviewFailed, setBannerPreviewFailed] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    role: "",
    profileMedia: "",
    mediaType: "image" as "image" | "video",
    bannerMedia: "",
    bannerMediaType: "image" as "image" | "video",
    rating: 5,
    testimonial: "",
    service: "",
    date: new Date().toISOString().split("T")[0],
    published: true,
  });

  useEffect(() => {
    if (editingTestimonial) {
      setFormData({
        fullName: editingTestimonial.fullName,
        role: editingTestimonial.role,
        profileMedia: editingTestimonial.profileMedia,
        mediaType: editingTestimonial.mediaType,
        bannerMedia: editingTestimonial.bannerMedia || "",
        bannerMediaType: editingTestimonial.bannerMediaType || "image",
        rating: editingTestimonial.rating,
        testimonial: editingTestimonial.testimonial,
        service: editingTestimonial.service,
        date: editingTestimonial.date,
        published: editingTestimonial.published,
      });
      setImagePreview(editingTestimonial.profileMedia);
      setBannerPreview(editingTestimonial.bannerMedia || "");
      setProfilePreviewFailed(false);
      setBannerPreviewFailed(false);
    } else {
      resetForm();
    }
  }, [editingTestimonial]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      const uploadToast = toast.loading("Uploading profile media...");
      try {
        const mediaUrl = await uploadMediaAPI(file);
        const mediaType = file.type.startsWith("video/") ? "video" : "image";
        setFormData({ ...formData, profileMedia: mediaUrl, mediaType });
        toast.success("Profile media uploaded successfully!", {
          id: uploadToast,
        });
      } catch (error) {
        console.error("Error uploading media:", error);
        toast.error("Failed to upload media", { id: uploadToast });
      }
    }
  };

  const handleBannerChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      const uploadToast = toast.loading("Uploading banner media...");
      try {
        const mediaUrl = await uploadMediaAPI(file);
        const mediaType = file.type.startsWith("video/") ? "video" : "image";
        setFormData({
          ...formData,
          bannerMedia: mediaUrl,
          bannerMediaType: mediaType,
        });
        toast.success("Banner media uploaded successfully!", {
          id: uploadToast,
        });
      } catch (error) {
        console.error("Error uploading banner:", error);
        toast.error("Failed to upload banner", { id: uploadToast });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submitToast = toast.loading(
      editingTestimonial ? "Updating testimonial..." : "Creating testimonial..."
    );

    try {
      const payload = {
        profileMedia: formData.profileMedia,
        mediaType: formData.mediaType,
        bannerMedia: formData.bannerMedia,
        bannerMediaType: formData.bannerMediaType,
        fullName: formData.fullName,
        role: formData.role,
        rating: formData.rating,
        testimonial: formData.testimonial,
        service: formData.service,
        date: formData.date,
        published: formData.published,
      };

      if (editingTestimonial) {
        await updateTestimonialAPI(editingTestimonial._id, payload);
        toast.success("Testimonial updated successfully!", { id: submitToast });
      } else {
        await createTestimonialAPI(payload);
        toast.success("Testimonial created successfully!", { id: submitToast });
      }

      onSuccess();
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      toast.error("Failed to submit testimonial", { id: submitToast });
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      role: "",
      profileMedia: "",
      mediaType: "image",
      bannerMedia: "",
      bannerMediaType: "image",
      rating: 5,
      testimonial: "",
      service: "",
      date: new Date().toISOString().split("T")[0],
      published: true,
    });
    setImagePreview("");
    setBannerPreview("");
    setProfilePreviewFailed(false);
    setBannerPreviewFailed(false);
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
          </h2>
          <button
            onClick={handleCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Profile Media Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Profile Media (Image/Video)
            </label>
            <div className="flex items-center gap-4">
              {imagePreview && (
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  {profilePreviewFailed ? (
                    <div className="w-full h-full flex items-center justify-center text-white font-bold">
                      {formData.fullName.charAt(0).toUpperCase() || "?"}
                    </div>
                  ) : formData.mediaType === "video" ? (
                    <video
                      src={
                        imagePreview.startsWith("data:")
                          ? imagePreview
                          : getMediaUrl(imagePreview)
                      }
                      className="w-full h-full object-cover"
                      muted
                      onError={() => setProfilePreviewFailed(true)}
                    />
                  ) : (
                    <Image
                      src={
                        imagePreview.startsWith("data:")
                          ? imagePreview
                          : getMediaUrl(imagePreview)
                      }
                      alt="Preview"
                      fill
                      className="object-cover"
                      onError={() => setProfilePreviewFailed(true)}
                    />
                  )}
                </div>
              )}
              <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
                <User className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  Upload Profile Media
                </span>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Banner Media Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Banner Media (Image/Video) - Optional
            </label>
            <div className="space-y-3">
              {bannerPreview && (
                <div className="relative w-full h-40 rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-100 flex items-center justify-center">
                  {bannerPreviewFailed && (
                    <p className="text-sm text-gray-500 px-4 text-center">
                      Previously uploaded media file is no longer available.
                      Upload a new one to replace it.
                    </p>
                  )}
                  {!bannerPreviewFailed && formData.bannerMediaType === "video" && (
                    <video
                      src={
                        bannerPreview.startsWith("data:")
                          ? bannerPreview
                          : getMediaUrl(bannerPreview)
                      }
                      className="w-full h-full object-cover"
                      controls
                      muted
                      onError={() => setBannerPreviewFailed(true)}
                    />
                  )}
                  {!bannerPreviewFailed && formData.bannerMediaType !== "video" && (
                    <Image
                      src={
                        bannerPreview.startsWith("data:")
                          ? bannerPreview
                          : getMediaUrl(bannerPreview)
                      }
                      alt="Banner Preview"
                      fill
                      className="object-cover"
                      onError={() => setBannerPreviewFailed(true)}
                    />
                  )}
                </div>
              )}
              <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors w-fit">
                <User className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  Upload Banner Media
                </span>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleBannerChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Name & Role */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Role/Occupation *
              </label>
              <input
                type="text"
                required
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                placeholder="Office Worker"
              />
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Rating *
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= formData.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {formData.rating} star{formData.rating !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Testimonial Text */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Testimonial *
            </label>
            <textarea
              required
              value={formData.testimonial}
              onChange={(e) =>
                setFormData({ ...formData, testimonial: e.target.value })
              }
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
              placeholder="Write the testimonial here..."
            />
          </div>

          {/* Service & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Service *
              </label>
              <input
                type="text"
                required
                value={formData.service}
                onChange={(e) =>
                  setFormData({ ...formData, service: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                placeholder="Manual Therapy"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Date *
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
              />
            </div>
          </div>

          {/* Publish Status */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) =>
                setFormData({ ...formData, published: e.target.checked })
              }
              className="w-5 h-5 text-[#2e3192] border-gray-300 rounded focus:ring-[#2e3192]"
            />
            <label
              htmlFor="published"
              className="text-sm font-medium text-gray-700"
            >
              Publish this testimonial immediately
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2e3192] to-[#4c46a3] text-white rounded-lg hover:shadow-lg transition-all"
            >
              <Save className="h-5 w-5" />
              {editingTestimonial ? "Update Testimonial" : "Add Testimonial"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
