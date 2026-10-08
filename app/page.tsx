import HeroSection from "@/components/HeroSection";
import TeamBentoGrid from "@/components/TeamBentoGrid";
import WorksShowcase from "@/components/WorksShowcase";
import ServicesGrid from "@/components/ServicesGrid";
import Testimonials from "@/components/Testimonials";
import FooterCTA from "@/components/FooterCTA";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0A0A0A] text-[#F2F1ED] overflow-x-hidden">
      <HeroSection />
      <TeamBentoGrid />
      <WorksShowcase />
      <ServicesGrid />
      <Testimonials />
      <FooterCTA />
    </main>
  );
}