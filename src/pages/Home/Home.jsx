import About from "../../components/Home/About/About";
import HeroBanner from "../../components/Home/Banner/HeroBanner";
import ContactCTA from "../../components/Home/ContactCTA/ContactCTA";
import FAQ from "../../components/Home/FAQ/FAQ";
import FeaturesShowcase from "../../components/Home/FeaturesShowcase/FeaturesShowcase";
import HowItWorks from "../../components/Home/HowItWorks/HowItWorks";
import Packages from "../../components/Home/Packages/Packages";
import TestimonialsStats from "../../components/Home/TestimonialsStats/TestimonialsStats";

const Home = () => {
  return (
    <div>
      <HeroBanner />
      <About />
      <Packages />
      <FeaturesShowcase />
      <TestimonialsStats />
      <HowItWorks />
      <FAQ />
      <ContactCTA/>
    </div>
  );
};

export default Home;