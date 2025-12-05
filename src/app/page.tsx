"use client";
import AboutSection from "@/components/home/AboutSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import TeamSection from "@/components/home/TeamSection";
import QuoteSection from "@/components/home/QuoteSection";
import ContactSection from "@/components/home/ContactSection";
import Footer from "@/components/home/Footer";
import BlogSection from "@/components/home/BlogSection";
import HeroSection from "@/components/home/HeroSection";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <>
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <BlogSection />
        <QuoteSection />
        <ContactSection />
      </main> 
    </>
  );
}