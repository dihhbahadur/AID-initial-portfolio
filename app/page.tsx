import HeroSection from "@/components/HeroSection";
import TeamBentoGrid from "@/components/TeamBentoGrid";
import WorksShowcase from "@/components/WorksShowcase";
import ServicesGrid from "@/components/ServicesGrid";
import AboutSection from "@/components/AboutSection";
import Explore3DSection from "@/components/Explore3DSection"; // <-- Updated import
import FooterCTA from "@/components/FooterCTA";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0A0A0A] text-[#F2F1ED] overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <TeamBentoGrid />
      <WorksShowcase />
      <ServicesGrid />
      <Explore3DSection /> {/* <-- Replaced InteractiveOrb */}
      <FooterCTA />
    </main>
  );
}