"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import {
  CalendarIcon,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Activity,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BACKEND_URL } from "@/lib/config";
import { useContactInfo } from "../hooks/useContactInfo";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  dateOfBirth: z
    .string()
    .min(1, { message: "Please select your date of birth." }),
  service: z.string().min(1, { message: "Please select a service." }),
  preferredDate: z
    .string()
    .min(1, { message: "Please select a preferred date." }),
  preferredTime: z
    .string()
    .min(1, { message: "Please select a preferred time." }),
  appointmentType: z
    .string()
    .min(1, { message: "Please select an appointment type." }),
  urgency: z.string().min(1, { message: "Please select an urgency level." }),
  previousTreatment: z.boolean().default(false),
  insuranceProvider: z.string().optional(),
  referralSource: z.string().optional(),
  symptoms: z.string().min(10, {
    message: "Please describe your symptoms in at least 10 characters.",
  }),
  medicalHistory: z.string().optional(),
  currentMedications: z.string().optional(),
  emergencyContactName: z.string().min(2, {
    message: "Emergency contact name must be at least 2 characters.",
  }),
  emergencyContactPhone: z.string().min(10, {
    message: "Please enter a valid emergency contact phone number.",
  }),
  emergencyContactRelation: z
    .string()
    .min(2, { message: "Please specify the relationship." }),
  agreeToTerms: z.literal(true, {
    errorMap: () => ({
      message: "You must agree to the terms and conditions.",
    }),
  }),
  agreeToPrivacy: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the privacy policy." }),
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const { contactInfo } = useContactInfo();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      service: "",
      preferredDate: "",
      preferredTime: "",
      appointmentType: "in-person",
      urgency: "normal",
      previousTreatment: false,
      insuranceProvider: "",
      referralSource: "",
      symptoms: "",
      medicalHistory: "",
      currentMedications: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      emergencyContactRelation: "",
      agreeToTerms: true,
      agreeToPrivacy: true,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      setSubmissionResult(result);
      if (result.success) {
        setStep(4); // Move to success step
        toast({
          title: "Appointment Request Submitted",
          description: "We'll contact you shortly to confirm your appointment.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Submission Failed",
          description: result.message || "Please try again later.",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    const fieldsToValidate: Record<number, (keyof FormValues)[]> = {
      1: ["firstName", "lastName", "email", "phone", "dateOfBirth"],
      2: [
        "service",
        "preferredDate",
        "preferredTime",
        "appointmentType",
        "urgency",
        "symptoms",
      ],
      3: [
        "emergencyContactName",
        "emergencyContactPhone",
        "emergencyContactRelation",
        "agreeToTerms",
        "agreeToPrivacy",
      ],
    };

    form.trigger(fieldsToValidate[step]).then((isValid) => {
      if (isValid) {
        setStep((prev) => prev + 1);
        window.scrollTo(0, 0);
      }
    });
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
    window.scrollTo(0, 0);
  };

  const services = [
    "Manual Therapy",
    "Sports Rehabilitation",
    "Post-Surgical Rehabilitation",
    "Pediatric Physiotherapy",
    "Geriatric Physiotherapy",
    "Dry Needling",
    "Electrotherapy",
  ];

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
  ];

  const renderStepIndicator = () => {
    return (
      <div className="flex justify-center mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all",
                step === s
                  ? "bg-[#2e3192] text-white"
                  : step > s
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-500"
              )}
            >
              {step > s ? <CheckCircle className="h-5 w-5" /> : s}
            </div>
            {s < 3 && (
              <div
                className={cn(
                  "h-1 w-16 mx-2",
                  step > s ? "bg-green-500" : "bg-gray-200"
                )}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderStepTitle = () => {
    const titles = [
      "",
      "Personal Information",
      "Appointment Details",
      "Emergency Contact & Consent",
      "Appointment Request Submitted",
    ];
    return (
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
        {titles[step]}
      </h1>
    );
  };

  const renderStepDescription = () => {
    const descriptions = [
      "",
      "Please provide your basic information so we can get to know you better.",
      "Tell us about your preferred appointment details and health concerns.",
      "Please provide emergency contact information and review our policies.",
      "Thank you for choosing Reflex Physiotherapy & Rehab Center!",
    ];
    return (
      <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
        {descriptions[step]}
      </p>
    );
  };

  return (
    <>
      <Navbar />
      <div className=" bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4">
        <div className="container mx-auto">
          {step < 4 && renderStepIndicator()}
          {renderStepTitle()}
          {renderStepDescription()}

          <motion.div
            key={`step-${step}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="max-w-4xl mx-auto border-0 shadow-lg">
              <CardContent className="p-6 md:p-8">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    {step === 1 && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="John" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input
                                    type="email"
                                    placeholder="john.doe@example.com"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="01XXXXXXXXX" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="dateOfBirth"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Date of Birth</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(new Date(field.value), "PPP")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={
                                      field.value
                                        ? new Date(field.value)
                                        : undefined
                                    }
                                    onSelect={(date) =>
                                      field.onChange(
                                        date ? format(date, "yyyy-MM-dd") : ""
                                      )
                                    }
                                    disabled={(date) =>
                                      date > new Date() ||
                                      date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-6">
                        <FormField
                          control={form.control}
                          name="service"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Service</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a service" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {services.map((service) => (
                                    <SelectItem key={service} value={service}>
                                      {service}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="preferredDate"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Preferred Date</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-full pl-3 text-left font-normal",
                                          !field.value &&
                                            "text-muted-foreground"
                                        )}
                                      >
                                        {field.value ? (
                                          format(new Date(field.value), "PPP")
                                        ) : (
                                          <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={
                                        field.value
                                          ? new Date(field.value)
                                          : undefined
                                      }
                                      onSelect={(date) =>
                                        field.onChange(
                                          date ? format(date, "yyyy-MM-dd") : ""
                                        )
                                      }
                                      disabled={(date) =>
                                        date <
                                          new Date(
                                            new Date().setHours(0, 0, 0, 0)
                                          ) ||
                                        date >
                                          new Date(
                                            new Date().setMonth(
                                              new Date().getMonth() + 3
                                            )
                                          )
                                      }
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="preferredTime"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Preferred Time</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a time" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {timeSlots.map((time) => (
                                      <SelectItem key={time} value={time}>
                                        {time}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="appointmentType"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel>Appointment Type</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                  >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="in-person" />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        In-Person
                                      </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="virtual" />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        Virtual Consultation
                                      </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="home-visit" />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        Home Visit
                                      </FormLabel>
                                    </FormItem>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="urgency"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel>Urgency Level</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                  >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="normal" />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        Normal
                                      </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="urgent" />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        Urgent
                                      </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="emergency" />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        Emergency
                                      </FormLabel>
                                    </FormItem>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="previousTreatment"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Previous Treatment</FormLabel>
                                <FormDescription>
                                  Have you received physiotherapy treatment for
                                  this condition before?
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="insuranceProvider"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Insurance Provider (Optional)
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Insurance company name"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="referralSource"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  How did you hear about us? (Optional)
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select an option" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="doctor">
                                      Doctor Referral
                                    </SelectItem>
                                    <SelectItem value="friend">
                                      Friend/Family
                                    </SelectItem>
                                    <SelectItem value="internet">
                                      Internet Search
                                    </SelectItem>
                                    <SelectItem value="social">
                                      Social Media
                                    </SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="symptoms"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Current Symptoms</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Please describe your current symptoms, pain level, and how it affects your daily activities"
                                  className="min-h-[120px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="medicalHistory"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Medical History (Optional)
                                </FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Any relevant medical history, surgeries, or conditions"
                                    className="min-h-[100px]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="currentMedications"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Current Medications (Optional)
                                </FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="List any medications you are currently taking"
                                    className="min-h-[100px]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-6">
                        <div className="bg-blue-50 p-4 rounded-lg mb-6">
                          <h3 className="font-semibold text-[#2e3192] mb-2">
                            Emergency Contact Information
                          </h3>
                          <p className="text-sm text-gray-600">
                            Please provide details of someone we can contact in
                            case of an emergency.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="emergencyContactName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Emergency Contact Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Full name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="emergencyContactPhone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Emergency Contact Phone</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Phone number"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="emergencyContactRelation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Relationship to Patient</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. Spouse, Parent, Friend"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="bg-amber-50 p-4 rounded-lg mb-6">
                          <h3 className="font-semibold text-amber-800 mb-2">
                            Consent and Agreements
                          </h3>
                          <p className="text-sm text-amber-700">
                            Please review and agree to our terms and privacy
                            policy to proceed.
                          </p>
                        </div>

                        <FormField
                          control={form.control}
                          name="agreeToTerms"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Terms and Conditions</FormLabel>
                                <FormDescription>
                                  I agree to the terms and conditions of Reflex
                                  Physiotherapy & Rehab Center, including
                                  cancellation policies and payment terms.
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="agreeToPrivacy"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Privacy Policy</FormLabel>
                                <FormDescription>
                                  I consent to the collection and processing of
                                  my personal and health information as
                                  described in the privacy policy.
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    {step === 4 && (
                      <div className="text-center py-8">
                        <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                          <CheckCircle className="h-12 w-12 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                          Appointment Request Submitted!
                        </h2>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                          Thank you for choosing Reflex Physiotherapy & Rehab
                          Center. We have received your appointment request and
                          will contact you shortly to confirm your booking.
                        </p>
                        <div className="bg-blue-50 p-6 rounded-lg max-w-md mx-auto mb-8">
                          <h3 className="font-semibold text-[#2e3192] mb-2">
                            What happens next?
                          </h3>
                          <ul className="text-left text-gray-600 space-y-2">
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>
                                Our team will review your request within 24
                                hours
                              </span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>
                                We'll contact you by phone or email to confirm
                                your appointment
                              </span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>
                                You'll receive a confirmation email with
                                appointment details
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <Link href="/">
                            <Button
                              variant="outline"
                              className="min-w-[150px] bg-transparent"
                            >
                              Return to Home
                            </Button>
                          </Link>
                          <Link href="/services">
                            <Button className="min-w-[150px] bg-[#2e3192] hover:bg-[#252a7a]">
                              Explore Our Services
                            </Button>
                          </Link>
                        </div>
                      </div>
                    )}

                    {step < 4 && (
                      <div className="flex justify-between pt-4">
                        {step > 1 ? (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={prevStep}
                          >
                            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                          </Button>
                        ) : (
                          <div></div>
                        )}
                        {step < 3 ? (
                          <Button
                            type="button"
                            onClick={nextStep}
                            className="bg-[#2e3192] hover:bg-[#252a7a]"
                          >
                            Next <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        ) : (
                          <Button
                            type="submit"
                            className="bg-[#2e3192] hover:bg-[#252a7a]"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                                Submitting...
                              </>
                            ) : (
                              <>Submit Request</>
                            )}
                          </Button>
                        )}
                      </div>
                    )}
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>

          <div className="mt-12 text-center text-gray-600">
            <p>
              Need assistance? Call us at{" "}
              <a
                href={`tel:${contactInfo?.phone[0] || "01684522924"}`}
                className="text-[#2e3192] font-semibold"
              >
                {contactInfo?.phone[0] || "01684522924"}
              </a>
            </p>
          </div>

          {/* Find Us / Google Maps Section */}
          <div className="mt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Find Us on the Map
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Visit our clinic at Uttara — we're easy to reach and happy to
                help you on your recovery journey.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 items-stretch">
              {/* Info Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 flex flex-col justify-center"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#2e3192]/10 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-[#2e3192]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      Reflex Physiotherapy & Rehab Center
                    </h3>
                    <p className="text-sm text-gray-500">Uttara, Dhaka</p>
                  </div>
                </div>

                {contactInfo?.address && contactInfo.address.length > 0 && (
                  <div className="space-y-3 text-gray-600 mb-8">
                    {contactInfo.address.map((addr, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5 text-[#2e3192]" />
                        <span className="whitespace-pre-line">{addr}</span>
                      </div>
                    ))}
                  </div>
                )}

                {contactInfo?.phone && contactInfo.phone.length > 0 && (
                  <div className="flex items-center gap-3 text-gray-600 mb-8">
                    <Phone className="h-5 w-5 flex-shrink-0 text-[#2e3192]" />
                    <a
                      href={`tel:${contactInfo.phone[0]}`}
                      className="hover:text-[#2e3192] transition-colors"
                    >
                      {contactInfo.phone[0]}
                    </a>
                  </div>
                )}

                {contactInfo?.mapLink && (
                  <a
                    href={contactInfo.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#2e3192] hover:bg-[#252a7a] text-white font-semibold shadow-lg shadow-[#2e3192]/30 transition-all hover:translate-y-[-2px]"
                  >
                    <Navigation className="h-5 w-5" />
                    Get Directions
                  </a>
                )}
              </motion.div>

              {/* Embedded Map */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 min-h-[320px]"
              >
                <iframe
                  title="Reflex Physiotherapy & Rehab Center location on Google Maps"
                  src="https://maps.google.com/maps?q=23.8719731,90.3841249&z=17&output=embed"
                  className="w-full h-full min-h-[320px] border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
