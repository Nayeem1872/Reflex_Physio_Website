// Contact Info API utility functions
import { BACKEND_URL } from "@/lib/config";

export interface ContactInfo {
  _id?: string;
  phone: string[];
  email: string[];
  address: string[];
  whatsapp: string[];
  mapLink?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactInfoPayload {
  phone: string[];
  email: string[];
  address: string[];
  whatsapp: string[];
  mapLink?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
}

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// Get contact info
export const getContactInfoAPI = async (): Promise<ContactInfo> => {
  const response = await fetch(`${BACKEND_URL}/api/contact-info`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch contact info");
  }

  return response.json();
};

// Create or update contact info
export const updateContactInfoAPI = async (
  payload: ContactInfoPayload
): Promise<ContactInfo> => {
  const response = await fetch(`${BACKEND_URL}/api/contact-info`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update contact info");
  }

  return response.json();
};
