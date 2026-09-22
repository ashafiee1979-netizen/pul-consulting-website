"use client";

import React, { useState, useEffect } from "react";
import { 
  X, 
  Send, 
  CheckCircle2, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  FileText 
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
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-corp-navyDark/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[92vh] sm:max-h-[88vh] rounded-md bg-white border border-corp-line shadow-executive flex flex-col overflow-hidden">
        {/* Pinned Header - Executive Navy */}
        <div className="px-6 py-4 border-b border-corp-navySubtle flex items-center justify-between bg-corp-navy text-white flex-shrink-0">
          <div>
            <h3 className="text-base font-serif font-bold text-white">
              Project Consultation &amp; RFP Inquiry
            </h3>
            <p className="text-xs text-sky-200">
              PUL Consulting Services • Direct PMO Office (Kabul HQ &amp; U.S. Partner)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-slate-300 hover:text-white hover:bg-corp-navySubtle transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {submitted ? (
            <div className="text-center py-8 px-4 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-serif font-bold text-corp-ink">
                Inquiry Successfully Logged
              </h4>
              <p className="text-xs text-corp-muted max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-corp-ink">{formData.name}</span>. 
                Our senior project management office has received your request regarding{" "}
                <span className="text-corp-blue font-semibold">{formData.service}</span>. 
                A practice lead will respond to {formData.email} within 24 business hours.
              </p>

              <div className="p-4 rounded bg-corp-ice border border-slate-200 text-xs text-corp-ink max-w-md mx-auto text-left space-y-1">
                <div className="font-bold text-corp-navy">Direct Institutional Channels:</div>
                <div>Kabul HQ: +93 (786) 19 96 96 / +93 (786) 600 597</div>
                <div>Executive Email: info@pulconsulting.com</div>
              </div>

              <div className="pt-3">
                <button
                  onClick={handleReset}
                  className="px-6 py-2 rounded bg-corp-navy text-white font-bold text-xs uppercase tracking-wider shadow-xs hover:bg-corp-navyDark transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form id="consultation-form" onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-corp-ink mb-1">
                    Contact Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
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
                  <label className="block text-xs font-bold text-corp-ink mb-1">
                    Official Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
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
                  <label className="block text-xs font-bold text-corp-ink mb-1">
                    Organization / Entity *
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
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
                  <label className="block text-xs font-bold text-corp-ink mb-1">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
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
                  <label className="block text-xs font-bold text-corp-ink mb-1">
                    Primary Service Requirement
                  </label>
                  <select
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
                  <label className="block text-xs font-bold text-corp-ink mb-1">
                    Deployment Timeline
                  </label>
                  <select
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
                <label className="block text-xs font-bold text-corp-ink mb-1">
                  Project Scope &amp; Geographic Parameters
                </label>
                <textarea
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
        {!submitted && (
          <div className="px-6 py-3.5 border-t border-slate-200 bg-corp-ice flex items-center justify-between flex-shrink-0">
            <span className="text-[11px] text-corp-muted">
              Confidentiality assured under NDA.
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 rounded text-xs font-semibold text-corp-muted hover:text-corp-ink hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="consultation-form"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-corp-blue hover:bg-corp-blueHover text-white font-bold text-xs uppercase tracking-wider shadow-xs transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
