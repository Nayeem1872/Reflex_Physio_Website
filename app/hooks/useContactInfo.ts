import { useState, useEffect } from "react";
import { BACKEND_URL } from "@/lib/config";

export interface ContactInfo {
  _id: string;
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
  createdAt: string;
  updatedAt: string;
}

export const useContactInfo = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${BACKEND_URL}/api/contact-info`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch contact info");
        }

        const data = await response.json();
        setContactInfo(data);
      } catch (err) {
        console.error("Error fetching contact info:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  return { contactInfo, isLoading, error };
};
