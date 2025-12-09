import About from "../../components/Home/About/About";
import HeroBanner from "../../components/Home/Banner/HeroBanner";
import Packages from "../../components/Home/Packages/Packages";

const Home = () => {
  return (
    <div>
      <HeroBanner />
      <About />
      <Packages/>
    </div>
  );
};

export default Home;