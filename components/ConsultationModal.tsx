"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  X, 
  Send, 
  CheckCircle2, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  FileText,
  AlertCircle,
  ExternalLink,
  MessageSquare
} from "lucide-react";
import { SERVICE_CARDS_15, COMPANY_INFO } from "@/lib/data";

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
    service: initialService || SERVICE_CARDS_15[0].title,
    projectScope: "",
    timeline: "Immediate (Within 30 Days)",
    website: "", // honeypot — must stay empty
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<{
    referenceId: string;
    receivedAt: string;
    confirmationSent: boolean;
  } | null>(null);

  const firstInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

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
  }, [isOpen, submissionResult]);

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
        throw new Error(data.error || "Failed to log inquiry. Please use direct institutional contact channels.");
      }

      setSubmissionResult({
        referenceId: data.referenceId,
        receivedAt: data.receivedAt,
        confirmationSent: Boolean(data.confirmationSent),
      });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Unable to reach PMO server. Please reach us via direct email or telephone.";
      setSubmissionError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmissionResult(null);
    setSubmissionError(null);
    setIsSubmitting(false);
    onClose();
    // Restore focus to opener element
    setTimeout(() => {
      openerRef.current?.focus();
    }, 50);
  };

  // Generate mailto link with pre-filled subject and body
  const mailtoSubject = encodeURIComponent(`[RFP Inquiry Ref: ${submissionResult?.referenceId || "Pending"}] ${formData.service} - ${formData.organization}`);
  const mailtoBody = encodeURIComponent(
    `Dear PUL Consulting Services PMO,\n\n` +
    `I am submitting an official project inquiry generated through your institutional portal:\n\n` +
    `Tracking Reference: ${submissionResult?.referenceId || "Pending"}\n` +
    `Contact Name: ${formData.name}\n` +
    `Official Email: ${formData.email}\n` +
    `Organization / Entity: ${formData.organization}\n` +
    `Phone / WhatsApp: ${formData.phone}\n` +
    `Practice Area: ${formData.service}\n` +
    `Deployment Timeline: ${formData.timeline}\n` +
    `Project Scope & Parameters:\n${formData.projectScope || "To be discussed during initial terms-of-reference consultation."}\n\n` +
    `Respectfully,\n${formData.name}`
  );

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
        className="relative w-full max-w-2xl max-h-[92vh] sm:max-h-[88vh] rounded-md bg-white border border-corp-line shadow-executive flex flex-col overflow-hidden"
      >
        {/* Pinned Header - Executive Navy */}
        <div className="px-6 py-4 border-b border-corp-navySubtle flex items-center justify-between bg-corp-navy text-white flex-shrink-0">
          <div>
            <h3 id="consultation-modal-title" className="text-base font-serif font-bold text-white">
              Project Consultation &amp; RFP Inquiry
            </h3>
            <p className="text-xs text-sky-200">
              PUL Consulting Services • Direct PMO Office (Kabul HQ &amp; U.S. Partner)
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
            <div className="text-center py-6 px-4 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-sky-100 text-corp-navy border border-sky-300">
                  Tracking Code: {submissionResult.referenceId}
                </span>
                <h4 className="text-xl sm:text-2xl font-serif font-bold text-corp-ink mt-2">
                  Thank You! Your Inquiry Has Been Sent
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-corp-muted max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-corp-ink">{formData.name}</strong>. Your inquiry regarding{" "}
                <strong className="text-corp-blue">{formData.service}</strong> for{" "}
                <strong className="text-corp-ink">{formData.organization}</strong> has been successfully delivered to our executive team.
              </p>

              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 max-w-md mx-auto text-center space-y-1">
                <p className="font-bold text-emerald-900 text-sm">
                  ✓ Inquiry received by PUL Consulting
                </p>
                <p className="text-[11px] text-emerald-700">
                  Our operations team has registered your request under reference <strong>{submissionResult.referenceId}</strong> and will contact you within 24 business hours.{" "}
                  {submissionResult.confirmationSent
                    ? <>A confirmation email is on its way to <strong>{formData.email}</strong>.</>
                    : <>If you do not receive a confirmation email shortly, please write to info@pulconsulting.com quoting this reference.</>}
                </p>
              </div>

              {/* Instant WhatsApp alternative if urgent */}
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-corp-ink max-w-md mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
                <div>
                  <span className="font-semibold text-corp-navy block text-xs">Need an Immediate Response?</span>
                  <span className="text-[11px] text-corp-muted">Contact our Kabul PMO directly via WhatsApp</span>
                </div>
                <a
                  href={`https://wa.me/93786199696?text=${encodeURIComponent(`Hello PUL Consulting PMO, I have submitted project inquiry reference ${submissionResult.referenceId} regarding ${formData.service} on behalf of ${formData.organization}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shrink-0 shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp PMO</span>
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="px-8 py-2.5 rounded bg-corp-navy text-white font-bold text-xs uppercase tracking-wider shadow-xs hover:bg-corp-navyDark transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form id="consultation-form" onSubmit={handleSubmit} className="space-y-4">
              {/* Error banner if submission fails */}
              {submissionError && (
                <div className="p-3 rounded bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold">{submissionError}</p>
                    <p className="mt-1">
                      You can also reach our PMO directly at{" "}
                      <a href="mailto:info@pulconsulting.com" className="underline font-bold">
                        info@pulconsulting.com
                      </a>{" "}
                      or call +93 (786) 19 96 96.
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
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      id="consult-phone"
                      type="text"
                      required
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
                  Project Scope &amp; Geographic Parameters
                </label>
                <textarea
                  id="consult-scope"
                  rows={3}
                  placeholder="Outline geographic scope (provinces), personnel numbers, or specific terms of reference..."
                  value={formData.projectScope}
                  onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-slate-300 text-corp-ink text-xs focus:outline-none focus:border-corp-blue resize-none"
                />
              </div>
            </form>
          )}
        </div>

        {/* Pinned Footer */}
        {!submissionResult && (
          <div className="px-6 py-3.5 border-t border-slate-200 bg-corp-ice flex items-center justify-between flex-shrink-0">
            <span className="text-[11px] text-corp-muted">
              Confidentiality assured under NDA.
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
                    <span>Verifying...</span>
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
