"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { 
  X, 
  Send, 
  CheckCircle2, 
  Building2, 
  User, 
  Mail, 
  Phone,
  AlertCircle,
} from "lucide-react";
import { SERVICE_CARDS_15 } from "@/lib/data";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export default function ConsultationModal({
  isOpen,
  onClose,
  initialService = "",
}: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    orgType: "International Donor / Bilateral Mission",
    service: initialService || "General inquiry",
    projectScope: "",
    timeline: "Immediate (Within 30 Days)",
    website: "", // honeypot — must stay empty
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<{
    confirmationSent: boolean;
  } | null>(null);

  const firstInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, service: initialService || "General inquiry" }));
  }, [initialService]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      // Capture currently focused element to restore upon close
      openerRef.current = document.activeElement as HTMLElement | null;

      // Auto-focus first input for screen-reader & keyboard accessibility
      const timer = setTimeout(() => {
        firstInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setSubmissionResult(null);
      setSubmissionError(null);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleReset = useCallback(() => {
    setSubmissionResult(null);
    setSubmissionError(null);
    setIsSubmitting(false);
    onClose();
    // Restore focus to opener element
    setTimeout(() => {
      openerRef.current?.focus();
    }, 50);
  }, [onClose]);

  // Trap focus and handle Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleReset();
        return;
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const visibleFocusable = Array.from(focusableElements).filter(
          (el) => !el.hasAttribute("disabled") && el.offsetParent !== null
        );

        if (visibleFocusable.length === 0) return;

        const firstEl = visibleFocusable[0];
        const lastEl = visibleFocusable[visibleFocusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, submissionResult, handleReset]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "We could not email your inquiry. Please contact info@pulconsulting.com directly.");
      }

      setSubmissionResult({
        confirmationSent: Boolean(data.confirmationSent),
      });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Unable to reach PMO server. Please reach us via direct email or telephone.";
      setSubmissionError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-corp-navyDark/75 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleReset();
        }
      }}
    >
      <div 
        ref={modalRef}
        className="relative w-full max-w-2xl max-h-[92vh] sm:max-h-[88vh] rounded-md bg-gradient-to-br from-white to-sky-50/60 border border-corp-line shadow-executive flex flex-col overflow-hidden"
      >
        {/* Pinned Header - Executive Navy */}
        <div className="px-6 py-4 border-b border-corp-navySubtle flex items-center justify-between bg-corp-navy text-white flex-shrink-0">
          <div>
            <h3 id="consultation-modal-title" className="text-base font-serif font-bold text-white">
              Project Consultation &amp; RFP Inquiry
            </h3>
            <p className="text-xs text-sky-200">
              Tell us about your project and the support you need.
            </p>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 rounded text-slate-300 hover:text-white hover:bg-corp-navySubtle transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {submissionResult ? (
            /* Clear Confirmation Screen: Email Sent to PMO */
            <div className="max-w-lg mx-auto py-5 sm:py-8 px-2 sm:px-4 text-center">
              <div className="w-16 h-16 rounded-full bg-corp-ice border border-sky-200 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-corp-blue" aria-hidden="true" />
              </div>
              <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-corp-blue">
                Submission complete
              </p>
              <h4 className="mt-2 text-2xl sm:text-3xl font-serif font-bold text-corp-ink">
                Thank you, {formData.name}.
              </h4>
              <p className="mt-3 text-sm text-corp-muted leading-relaxed">
                PUL Consulting Services has received your inquiry about{" "}
                <strong className="text-corp-ink">{formData.service}</strong> for{" "}
                <strong className="text-corp-ink">{formData.organization}</strong>. Our team will review the details and contact you about next steps.
              </p>

              <div className="mt-6 rounded-md border border-slate-200 bg-white px-4 py-4 text-left shadow-xs">
                <p className="text-sm font-semibold text-corp-ink">Email confirmation</p>
                <p className="mt-1 text-xs text-corp-muted leading-relaxed">
                  {submissionResult.confirmationSent
                    ? <>A confirmation has been sent to <strong className="text-corp-ink">{formData.email}</strong>.</>
                    : <>Your inquiry reached our team, but we could not send a confirmation to <strong className="text-corp-ink">{formData.email}</strong>. For assistance, email <a href="mailto:info@pulconsulting.com" className="text-corp-blue underline underline-offset-2">info@pulconsulting.com</a>.</>}
                </p>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleReset}
                  className="px-8 py-2.5 rounded-md bg-corp-navy text-white font-bold text-xs uppercase tracking-wider shadow-xs hover:bg-corp-navyDark transition-colors"
                >
                  Return to website
                </button>
              </div>
            </div>
          ) : (
            <form id="consultation-form" onSubmit={handleSubmit} className="space-y-4">
              {isSubmitting && (
                <div role="status" aria-live="polite" className="flex items-start gap-3 rounded-md border border-sky-200 bg-sky-50 px-4 py-3 text-corp-ink">
                  <span className="mt-0.5 inline-block h-4 w-4 shrink-0 rounded-full border-2 border-corp-blue border-t-transparent animate-spin" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-semibold">Sending your inquiry</p>
                    <p className="mt-0.5 text-[11px] text-corp-muted">Please keep this window open while we send your message to PUL Consulting Services.</p>
                  </div>
                </div>
              )}
              {/* Error banner if submission fails */}
              {submissionError && (
                <div role="alert" className="p-3 rounded bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold">{submissionError}</p>
                    <p className="mt-1">
                      You can also reach our PMO directly at{" "}
                      <a href="mailto:info@pulconsulting.com" className="underline font-bold">
                        info@pulconsulting.com
                      </a>{" "}
                      or call +93 (786) 600 597.
                    </p>
                  </div>
                </div>
              )}

              {/* Honeypot (hidden from people, visible to bots) */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="consult-website">Website</label>
                <input
                  id="consult-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
              </div>

              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="consult-name" className="block text-xs font-bold text-corp-ink mb-1">
                    Contact Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      ref={firstInputRef}
                      id="consult-name"
                      maxLength={120}
                      type="text"
                      required
                      placeholder="e.g. John Doe / Ahmad Wahidi"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded border border-slate-300 text-corp-ink text-xs focus:outline-none focus:border-corp-blue"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="consult-email" className="block text-xs font-bold text-corp-ink mb-1">
                    Official Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      id="consult-email"
                      maxLength={200}
                      type="email"
                      required
                      placeholder="e.g. j.doe@organization.org"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded border border-slate-300 text-corp-ink text-xs focus:outline-none focus:border-corp-blue"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Organization & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="consult-organization" className="block text-xs font-bold text-corp-ink mb-1">
                    Organization / Entity *
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      id="consult-organization"
                      maxLength={200}
                      type="text"
                      required
                      placeholder="e.g. USAID Contractor / Enterprise"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded border border-slate-300 text-corp-ink text-xs focus:outline-none focus:border-corp-blue"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="consult-phone" className="block text-xs font-bold text-corp-ink mb-1">
                    Phone / WhatsApp (optional)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      id="consult-phone"
                      type="text"
                      maxLength={60}
                      placeholder="+93 ... / +1 ..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded border border-slate-300 text-corp-ink text-xs focus:outline-none focus:border-corp-blue"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Practice Area & Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="consult-service" className="block text-xs font-bold text-corp-ink mb-1">
                    Primary Service Requirement
                  </label>
                  <select
                    id="consult-service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-slate-300 text-corp-ink text-xs focus:outline-none focus:border-corp-blue"
                  >
                    <option value="General inquiry">General inquiry</option>
                    {initialService && !SERVICE_CARDS_15.some((service) => service.title === initialService) && initialService !== "General inquiry" && (
                      <option value={initialService}>{initialService}</option>
                    )}
                    {SERVICE_CARDS_15.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="consult-timeline" className="block text-xs font-bold text-corp-ink mb-1">
                    Deployment Timeline
                  </label>
                  <select
                    id="consult-timeline"
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-slate-300 text-corp-ink text-xs focus:outline-none focus:border-corp-blue"
                  >
                    <option value="Immediate (Within 30 Days)">Immediate (Within 30 Days)</option>
                    <option value="Upcoming Quarter (1-3 Months)">Upcoming Quarter (1-3 Months)</option>
                    <option value="Upcoming Bid / RFP Stage">Upcoming Bid / RFP Stage</option>
                    <option value="General Capability Inquiry">General Capability Inquiry</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Scope */}
              <div>
                <label htmlFor="consult-scope" className="block text-xs font-bold text-corp-ink mb-1">
                  Project Scope &amp; Location
                </label>
                <textarea
                  id="consult-scope"
                  maxLength={5000}
                  rows={3}
                  placeholder="Describe your objectives, project location, estimated team size, and any specific requirements."
                  value={formData.projectScope}
                  onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-slate-300 text-corp-ink text-xs focus:outline-none focus:border-corp-blue resize-none"
                />
              </div>
              <p className="text-xs text-corp-muted leading-relaxed">
                We use the information you provide to respond to your inquiry. Please review our{" "}
                <a href="/privacy" className="text-corp-blue underline underline-offset-2">Privacy Policy</a>
                {" "}and avoid including sensitive or confidential project documents at this stage.
              </p>
            </form>
          )}
        </div>

        {/* Pinned Footer */}
        {!submissionResult && (
          <div className="px-6 py-3.5 border-t border-slate-200 bg-corp-ice flex flex-wrap gap-3 items-center justify-between flex-shrink-0">
            <span className="text-[11px] text-corp-muted">
              An NDA can be discussed before sharing confidential materials.
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-3.5 py-1.5 rounded text-xs font-semibold text-corp-muted hover:text-corp-ink hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="consultation-form"
                disabled={isSubmitting}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-corp-blue hover:bg-corp-blueHover disabled:bg-slate-400 text-white font-bold text-xs uppercase tracking-wider shadow-xs transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Inquiry</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
