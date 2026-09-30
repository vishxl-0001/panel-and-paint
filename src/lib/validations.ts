import { z } from 'zod';

export const quoteFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(7, 'Please enter a valid phone number (e.g. 027 123 4567)'),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  vehicleMake: z.string().min(2, 'Vehicle make is required (e.g. Toyota, Holden)'),
  vehicleModel: z.string().min(1, 'Vehicle model is required (e.g. Hilux, Commodore)'),
  vehicleYear: z.string().optional().or(z.literal('')),
  serviceType: z.string().min(1, 'Please select a service type'),
  description: z.string().min(10, 'Please provide at least 10 characters describing the damage or job'),
  honeypot: z.string().max(0, 'Spam detected').optional(), // Anti-spam bot trap
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;

export const businessSettingsSchema = z.object({
  businessName: z.string().min(2),
  phone: z.string().min(5),
  whatsapp: z.string().min(5),
  address: z.string().min(5),
  heroHeadline: z.string().min(5),
  heroSubheadline: z.string().min(10),
});
