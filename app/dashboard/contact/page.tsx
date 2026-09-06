"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import {
  Save,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Plus,
  X,
  Loader2,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import {
  getContactInfoAPI,
  updateContactInfoAPI,
  ContactInfoPayload,
} from "./api/contactInfoApi";

export default function ContactInfoPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState<ContactInfoPayload>({
    phone: [""],
    email: [""],
    address: [""],
    whatsapp: [""],
    mapLink: "",
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    youtube: "",
  });

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      setIsLoading(true);
      const data = await getContactInfoAPI();
      setFormData({
        phone: data.phone.length > 0 ? data.phone : [""],
        email: data.email.length > 0 ? data.email : [""],
        address: data.address.length > 0 ? data.address : [""],
        whatsapp: data.whatsapp.length > 0 ? data.whatsapp : [""],
        mapLink: data.mapLink || "",
        facebook: data.facebook || "",
        instagram: data.instagram || "",
        twitter: data.twitter || "",
        linkedin: data.linkedin || "",
        youtube: data.youtube || "",
      });
    } catch (error) {
      console.error("Error fetching contact info:", error);
      toast.error("Failed to fetch contact info");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submitToast = toast.loading("Saving contact info...");

    try {
      setIsSaving(true);

      // Filter out empty strings from arrays
      const payload: ContactInfoPayload = {
        phone: formData.phone.filter((p) => p.trim() !== ""),
        email: formData.email.filter((e) => e.trim() !== ""),
        address: formData.address.filter((a) => a.trim() !== ""),
        whatsapp: formData.whatsapp.filter((w) => w.trim() !== ""),
        mapLink: formData.mapLink,
        facebook: formData.facebook,
        instagram: formData.instagram,
        twitter: formData.twitter,
        linkedin: formData.linkedin,
        youtube: formData.youtube,
      };

      await updateContactInfoAPI(payload);
      toast.success("Contact info saved successfully!", { id: submitToast });
      await fetchContactInfo();
    } catch (error: any) {
      console.error("Error saving contact info:", error);
      toast.error(error.message || "Failed to save contact info", {
        id: submitToast,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const addField = (field: "phone" | "email" | "address" | "whatsapp") => {
    setFormData({
      ...formData,
      [field]: [...formData[field], ""],
    });
  };

  const removeField = (
    field: "phone" | "email" | "address" | "whatsapp",
    index: number,
  ) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index),
    });
  };

  const updateField = (
    field: "phone" | "email" | "address" | "whatsapp",
    index: number,
    value: string,
  ) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({
      ...formData,
      [field]: newArray,
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Toaster position="top-right" />

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <DashboardSidebar
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <DashboardSidebar
              isCollapsed={false}
              setIsCollapsed={() => setIsMobileSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardNavbar
          onMenuClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />

        <main className="flex-1 overflow-y-auto p-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Contact Information
            </h1>
            <p className="text-gray-600">
              Manage your business contact details and social media links
            </p>
          </motion.div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 text-[#2e3192] animate-spin" />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <form onSubmit={handleSubmit} className="max-w-4xl">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  {/* Contact Details Section */}
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Contact Details
                    </h2>

                    {/* Phone Numbers */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                          <Phone className="h-4 w-4" />
                          Phone Numbers
                        </label>
                        <button
                          type="button"
                          onClick={() => addField("phone")}
                          className="flex items-center gap-1 px-3 py-1 text-sm bg-[#2e3192] text-white rounded-lg hover:bg-[#4c46a3] transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                          Add
                        </button>
                      </div>
                      <div className="space-y-2">
                        {formData.phone.map((phone, index) => (
                          <div key={index} className="flex gap-2">
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) =>
                                updateField("phone", index, e.target.value)
                              }
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                              placeholder="+880 1234-567890"
                            />
                            {formData.phone.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeField("phone", index)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <X className="h-5 w-5" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Email Addresses */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                          <Mail className="h-4 w-4" />
                          Email Addresses
                        </label>
                        <button
                          type="button"
                          onClick={() => addField("email")}
                          className="flex items-center gap-1 px-3 py-1 text-sm bg-[#2e3192] text-white rounded-lg hover:bg-[#4c46a3] transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                          Add
                        </button>
                      </div>
                      <div className="space-y-2">
                        {formData.email.map((email, index) => (
                          <div key={index} className="flex gap-2">
                            <input
                              type="email"
                              value={email}
                              onChange={(e) =>
                                updateField("email", index, e.target.value)
                              }
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                              placeholder="contact@example.com"
                            />
                            {formData.email.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeField("email", index)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <X className="h-5 w-5" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Addresses */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                          <MapPin className="h-4 w-4" />
                          Addresses
                        </label>
                        <button
                          type="button"
                          onClick={() => addField("address")}
                          className="flex items-center gap-1 px-3 py-1 text-sm bg-[#2e3192] text-white rounded-lg hover:bg-[#4c46a3] transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                          Add
                        </button>
                      </div>
                      <div className="space-y-2">
                        {formData.address.map((address, index) => (
                          <div key={index} className="flex gap-2">
                            <textarea
                              value={address}
                              onChange={(e) =>
                                updateField("address", index, e.target.value)
                              }
                              rows={2}
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                              placeholder="123 Main Street, City, Country"
                            />
                            {formData.address.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeField("address", index)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <X className="h-5 w-5" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Google Maps Link */}
                    <div className="mb-6">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                        <MapPin className="h-4 w-4 text-green-600" />
                        Google Maps Link
                      </label>
                      <input
                        type="url"
                        value={formData.mapLink}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            mapLink: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                        placeholder="https://maps.app.goo.gl/..."
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Used for the "Get Directions" button and embedded map on
                        the site.
                      </p>
                    </div>

                    {/* WhatsApp Numbers */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                          <MessageCircle className="h-4 w-4" />
                          WhatsApp Numbers
                        </label>
                        <button
                          type="button"
                          onClick={() => addField("whatsapp")}
                          className="flex items-center gap-1 px-3 py-1 text-sm bg-[#2e3192] text-white rounded-lg hover:bg-[#4c46a3] transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                          Add
                        </button>
                      </div>
                      <div className="space-y-2">
                        {formData.whatsapp.map((whatsapp, index) => (
                          <div key={index} className="flex gap-2">
                            <input
                              type="tel"
                              value={whatsapp}
                              onChange={(e) =>
                                updateField("whatsapp", index, e.target.value)
                              }
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                              placeholder="+880 1234-567890"
                            />
                            {formData.whatsapp.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeField("whatsapp", index)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <X className="h-5 w-5" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Social Media Section */}
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Social Media Links
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Facebook */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <Facebook className="h-4 w-4 text-blue-600" />
                          Facebook
                        </label>
                        <input
                          type="url"
                          value={formData.facebook}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              facebook: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                          placeholder="https://facebook.com/yourpage"
                        />
                      </div>

                      {/* Instagram */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <Instagram className="h-4 w-4 text-pink-600" />
                          Instagram
                        </label>
                        <input
                          type="url"
                          value={formData.instagram}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              instagram: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                          placeholder="https://instagram.com/yourprofile"
                        />
                      </div>

                      {/* Twitter */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <Twitter className="h-4 w-4 text-blue-400" />
                          Twitter
                        </label>
                        <input
                          type="url"
                          value={formData.twitter}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              twitter: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                          placeholder="https://twitter.com/yourhandle"
                        />
                      </div>

                      {/* LinkedIn */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <Linkedin className="h-4 w-4 text-blue-700" />
                          LinkedIn
                        </label>
                        <input
                          type="url"
                          value={formData.linkedin}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              linkedin: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                          placeholder="https://linkedin.com/company/yourcompany"
                        />
                      </div>

                      {/* YouTube */}
                      <div className="md:col-span-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <Youtube className="h-4 w-4 text-red-600" />
                          YouTube
                        </label>
                        <input
                          type="url"
                          value={formData.youtube}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              youtube: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e3192] focus:border-transparent"
                          placeholder="https://youtube.com/@yourchannel"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="p-6 bg-gray-50 border-t border-gray-200">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2e3192] to-[#4c46a3] text-white rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-5 w-5" />
                          Save Contact Information
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
