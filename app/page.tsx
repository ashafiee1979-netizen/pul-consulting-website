"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ClientsMarquee from "@/components/ClientsMarquee";
import Services15Grid from "@/components/Services15Grid";
import ProjectsHomePreview from "@/components/ProjectsHomePreview";
import AboutPartnersHomePreview from "@/components/AboutPartnersHomePreview";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";

export default function HomePage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<string>("");

  const handleOpenConsultation = () => {
    setSelectedServiceForModal("");
    setIsConsultationOpen(true);
  };

  const handleSelectService = (serviceTitle: string) => {
    setSelectedServiceForModal(serviceTitle);
    setIsConsultationOpen(true);
  };

  const handleCloseConsultation = () => {
    setIsConsultationOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-corp-ink">
      {/* Fortune 500 Clean Navigation */}
      <Navbar onOpenConsultation={handleOpenConsultation} />

      {/* Main Flow */}
      <main className="flex-1">
        {/* Executive Hero with Verified Metric Strip */}
        <HeroSection onOpenConsultation={handleOpenConsultation} />

        {/* Practice Capabilities & AI Transformation Grid */}
        <Services15Grid onOpenConsultation={handleOpenConsultation} />

        {/* Verified Past Performance & Flagship Projects Preview (Links to /projects) */}
        <ProjectsHomePreview onOpenConsultation={handleOpenConsultation} />

        {/* Selected Clients & Institutional Heritage Logos */}
        <ClientsMarquee />

        {/* Institutional Governance & Corporate Partners Preview (Links to /about) */}
        <AboutPartnersHomePreview />
      </main>

      {/* Executive Footer */}
      <Footer onOpenConsultation={handleOpenConsultation} />

      {/* Fast Consultation & RFP Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={handleCloseConsultation}
        initialService={selectedServiceForModal}
      />
    </div>
  );
}
