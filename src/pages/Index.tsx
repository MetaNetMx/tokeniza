import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import TrustBar from "@/components/landing/TrustBar";
import HowItWorks from "@/components/landing/HowItWorks";
import FeaturedAssets from "@/components/landing/FeaturedAssets";
import AssetTypes from "@/components/landing/AssetTypes";
import ForWhom from "@/components/landing/ForWhom";
import RegulationSecurity from "@/components/landing/RegulationSecurity";
import AcademyPreview from "@/components/landing/AcademyPreview";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <TrustBar />
      <HowItWorks />
      <FeaturedAssets />
      <AssetTypes />
      <ForWhom />
      <RegulationSecurity />
      <AcademyPreview />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
