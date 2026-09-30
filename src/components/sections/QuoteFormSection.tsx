'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useContent } from '@/context/ContentContext';
import { QuoteFormData } from '@/lib/validations';
import { getWhatsAppUrl, formatFileSize } from '@/lib/utils';
import {
  Camera,
  Upload,
  CheckCircle2,
  AlertCircle,
  Phone,
  MessageSquare,
  X,
  Loader2,
  Car,
  FileText,
} from 'lucide-react';

interface QuoteFormSectionProps {
  preselectedService?: string;
}

export function QuoteFormSection({ preselectedService }: QuoteFormSectionProps) {
  const { addQuote, services, settings } = useContent();
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<QuoteFormData>({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      serviceType: preselectedService || 'Panel Beating & Chassis Repair',
      description: '',
      honeypot: '',
    },
  });

  useEffect(() => {
    if (preselectedService) {
      setValue('serviceType', preselectedService);
    }
  }, [preselectedService, setValue]);

  // Handle Photo File Upload & Previews
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (photoPreviews.length + files.length > 5) {
      setUploadError('Maximum 5 photos allowed per quote request.');
      return;
    }

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        setUploadError('Only image files (JPEG, PNG, WebP) are supported.');
        return;
      }
      if (file.size > 8 * 1024 * 1024) {
        setUploadError(`File ${file.name} is too large. Max 8MB per photo.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotoPreviews((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setPhotoPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: QuoteFormData) => {
    // Spam check
    if (data.honeypot && data.honeypot.length > 0) {
      console.warn('Bot detected by honeypot');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await addQuote({
        name: data.name,
        phone: data.phone,
        email: data.email || undefined,
        vehicleMake: data.vehicleMake,
        vehicleModel: data.vehicleModel,
        vehicleYear: data.vehicleYear || undefined,
        serviceType: data.serviceType,
        description: data.description,
        photoUrls: photoPreviews,
        status: 'new',
      });

      setSubmittedId(res.id);
      reset();
      setPhotoPreviews([]);
    } catch (err) {
      console.error('Quote submission error', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="quote" className="py-20 sm:py-28 bg-brand-dark relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-brand-accent/10 blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-accent font-semibold px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/30 inline-flex items-center gap-1.5 mb-3">
            <FileText className="w-3.5 h-3.5" />
            <span>Fast & Free Estimate</span>
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight">
            Request Your Free Quote
          </h2>
          <p className="mt-3 text-sm sm:text-base text-brand-muted leading-relaxed max-w-xl mx-auto">
            Upload damage photos from your phone or describe the repair. Darren will assess your vehicle and reply promptly with transparent pricing.
          </p>
        </div>

        {/* Success Confirmation Card */}
        {submittedId ? (
          <div className="bg-brand-card border border-emerald-500/40 rounded-3xl p-8 sm:p-10 text-center shadow-glass animate-scaleUp">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Quote Request Received!</h3>
            <p className="text-sm sm:text-base text-brand-silver max-w-md mx-auto mb-6">
              Thank you! Your quote request has been saved to our inbox. We will review your vehicle details and call or text you shortly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={getWhatsAppUrl(settings.whatsapp, `Hi Darren, I just submitted quote request #${submittedId} on your website.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Message Darren on WhatsApp</span>
              </a>
              <button
                onClick={() => setSubmittedId(null)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-brand-dark hover:bg-brand-card border border-brand-border text-xs font-semibold text-brand-silver hover:text-white"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          /* Main Form Card */
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-brand-card/90 border border-brand-border rounded-3xl p-6 sm:p-10 shadow-glass space-y-6"
          >
            {/* Honeypot anti-spam trap */}
            <input
              type="text"
              {...register('honeypot')}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Row 1: Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
                  Your Full Name <span className="text-brand-accent">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mike Thompson"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full min-h-[48px] px-4 rounded-xl bg-brand-dark border border-brand-border text-base text-white placeholder-brand-muted/60 focus:outline-none focus:border-brand-accent transition-colors"
                />
                {errors.name && (
                  <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
                  Phone Number <span className="text-brand-accent">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 027 684 1468"
                  {...register('phone', { required: 'Phone is required' })}
                  className="w-full min-h-[48px] px-4 rounded-xl bg-brand-dark border border-brand-border text-base text-white placeholder-brand-muted/60 focus:outline-none focus:border-brand-accent transition-colors"
                />
                {errors.phone && (
                  <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            {/* Row 2: Email & Service */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
                  Email Address <span className="text-brand-muted font-normal">(Optional)</span>
                </label>
                <input
                  type="email"
                  placeholder="e.g. mike@example.co.nz"
                  {...register('email')}
                  className="w-full min-h-[48px] px-4 rounded-xl bg-brand-dark border border-brand-border text-base text-white placeholder-brand-muted/60 focus:outline-none focus:border-brand-accent transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
                  Service Required <span className="text-brand-accent">*</span>
                </label>
                <select
                  {...register('serviceType')}
                  className="w-full min-h-[48px] px-4 rounded-xl bg-brand-dark border border-brand-border text-base text-white focus:outline-none focus:border-brand-accent transition-colors cursor-pointer"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="General Inspection / Other">General Inspection / Other</option>
                </select>
              </div>
            </div>

            {/* Row 3: Vehicle Make, Model, Year */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
                  Vehicle Make <span className="text-brand-accent">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Toyota, Ford"
                  {...register('vehicleMake', { required: 'Vehicle make required' })}
                  className="w-full min-h-[48px] px-4 rounded-xl bg-brand-dark border border-brand-border text-base text-white placeholder-brand-muted/60 focus:outline-none focus:border-brand-accent transition-colors"
                />
                {errors.vehicleMake && (
                  <p className="text-xs text-red-400 mt-1">{errors.vehicleMake.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
                  Model <span className="text-brand-accent">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Hilux, Falcon"
                  {...register('vehicleModel', { required: 'Model required' })}
                  className="w-full min-h-[48px] px-4 rounded-xl bg-brand-dark border border-brand-border text-base text-white placeholder-brand-muted/60 focus:outline-none focus:border-brand-accent transition-colors"
                />
                {errors.vehicleModel && (
                  <p className="text-xs text-red-400 mt-1">{errors.vehicleModel.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
                  Year <span className="text-brand-muted font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2018"
                  {...register('vehicleYear')}
                  className="w-full min-h-[48px] px-4 rounded-xl bg-brand-dark border border-brand-border text-base text-white placeholder-brand-muted/60 focus:outline-none focus:border-brand-accent transition-colors"
                />
              </div>
            </div>

            {/* Damage Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-silver mb-2">
                Describe the Damage or Job <span className="text-brand-accent">*</span>
              </label>
              <textarea
                rows={3}
                placeholder="Where is the damage located? (e.g. Front bumper scrape, driver door dent, chassis rust under passenger sill for WoF)"
                {...register('description', {
                  required: 'Please describe the damage',
                  minLength: { value: 10, message: 'Please provide at least 10 characters' },
                })}
                className="w-full p-4 rounded-xl bg-brand-dark border border-brand-border text-base text-white placeholder-brand-muted/60 focus:outline-none focus:border-brand-accent transition-colors"
              />
              {errors.description && (
                <p className="text-xs text-red-400 mt-1">{errors.description.message}</p>
              )}
            </div>

            {/* Photo Upload Area */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-silver">
                  Upload Damage Photos <span className="text-brand-muted font-normal">(Up to 5 photos)</span>
                </label>
                <span className="text-[11px] text-brand-muted">Direct from camera or gallery</span>
              </div>

              {/* Upload Drop Zone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-brand-border/80 hover:border-brand-accent/60 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-brand-dark/50"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  capture="environment"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-full bg-brand-card flex items-center justify-center mx-auto mb-2 text-brand-accent border border-brand-border">
                  <Camera className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-white">Tap here to take a photo or choose files</p>
                <p className="text-xs text-brand-muted mt-0.5">JPEG, PNG, WebP up to 8MB each</p>
              </div>

              {uploadError && (
                <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {uploadError}
                </p>
              )}

              {/* Photo Previews */}
              {photoPreviews.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-4">
                  {photoPreviews.map((preview, idx) => (
                    <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden border border-brand-border group">
                      <img src={preview} alt="Damage Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removePhoto(idx)}
                        className="absolute top-1 right-1 p-1 rounded-full bg-brand-dark/90 text-white hover:text-red-400"
                        title="Remove photo"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[52px] py-4 rounded-xl bg-gradient-to-r from-brand-accent to-red-600 hover:from-red-600 hover:to-brand-accent text-white font-bold text-base shadow-glow-red hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Submitting Quote Request...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Quote Request for Darren</span>
                    <CheckCircle2 className="w-5 h-5" />
                  </>
                )}
              </button>
              <p className="text-center text-xs text-brand-muted mt-3">
                No spam, no hidden charges. Your details remain confidential under our privacy policy.
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
