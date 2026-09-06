"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Edit,
  Trash2,
  Clock,
  DollarSign,
  CheckCircle,
  Folder,
  Briefcase,
  AlertTriangle,
  Eye,
  EyeOff,
} from "lucide-react";
import { BACKEND_URL } from "@/lib/config";
import toast from "react-hot-toast";

interface Service {
  _id: string;
  category: { _id: string; name: string } | string;
  name: string;
  slug: string;
  shortDescription: string;
  detailedDescription: string;
  keyBenefits: string[];
  duration: string;
  pricing: string;
  imageUrl: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ServiceCardProps {
  service: Service;
  index: number;
  onEdit: (service: Service) => void;
  onDelete: (id: string) => void;
  onTogglePublish: (id: string) => void;
}

// API - Delete service
const API_BASE_URL = `${BACKEND_URL}/api/services`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const deleteServiceAPI = async (id: string): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to delete service");
  }

  return response.json();
};

// API - Toggle publish status
export const togglePublishServiceAPI = async (
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
    throw new Error("Failed to update service");
  }

  return response.json();
};

// Component
export default function ServiceCard({
  service,
  index,
  onEdit,
  onDelete,
  onTogglePublish,
}: ServiceCardProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await deleteServiceAPI(service._id);
      toast.success("Service deleted successfully!");
      onDelete(service._id);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Failed to delete service");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleTogglePublish = async () => {
    try {
      await togglePublishServiceAPI(service._id, !service.published);
      toast.success(
        service.published
          ? "Service unpublished successfully!"
          : "Service published successfully!"
      );
      onTogglePublish(service._id);
    } catch (error) {
      console.error("Error toggling publish status:", error);
      toast.error("Failed to update service");
    }
  };

  const getCategoryName = () => {
    if (typeof service.category === "string") {
      return service.category;
    }
    return service.category.name;
  };

  const getCategoryId = () => {
    if (typeof service.category === "string") {
      return service.category;
    }
    return service.category._id;
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      >
        {/* Service Header */}
        <div className="bg-gradient-to-r from-[#2e3192] to-[#4c46a3] p-6 text-white">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                {service.imageUrl ? (
                  <Image
                    src={`${BACKEND_URL}${service.imageUrl}`}
                    alt={service.name}
                    width={48}
                    height={48}
                    className="rounded-xl object-cover"
                  />
                ) : (
                  <Briefcase className="h-6 w-6" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Folder className="h-4 w-4" />
                  <span className="text-sm opacity-90">
                    {getCategoryName()}
                  </span>
                </div>
                <h3 className="text-xl font-bold">{service.name}</h3>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleTogglePublish}
                className={`p-2 rounded-lg transition-colors ${
                  service.published
                    ? "bg-white/20 hover:bg-white/30"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                {service.published ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={() =>
                  onEdit({
                    ...service,
                    category: getCategoryId(),
                  })
                }
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="p-2 bg-white/20 hover:bg-red-500 rounded-lg transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          <p className="text-sm opacity-90">{service.shortDescription}</p>
        </div>

        {/* Service Body */}
        <div className="p-6">
          {/* Detailed Description */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">
              About This Service
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {service.detailedDescription}
            </p>
          </div>

          {/* Benefits */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              Key Benefits
            </h4>
            <div className="space-y-2">
              {service.keyBenefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Duration & Pricing */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Duration</p>
                <p className="text-sm font-semibold text-gray-900">
                  {service.duration}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Pricing</p>
                <p className="text-sm font-semibold text-gray-900">
                  {service.pricing}
                </p>
              </div>
            </div>
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
                  Delete Service
                </h3>
                <p className="text-sm text-gray-600">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <p className="text-gray-700 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{service.name}</span>?
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
