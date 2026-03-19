import HeroSection from "../components/sections/HeroSection";
import GardenSection from "../components/sections/GardenSection";
import ImageSearchSection from "../components/sections/ImageSearchSection";
import VirtualGardenSection from "../components/sections/VirtualGardenSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <GardenSection />
      <ImageSearchSection />
      <VirtualGardenSection />
    </>
  );
}
