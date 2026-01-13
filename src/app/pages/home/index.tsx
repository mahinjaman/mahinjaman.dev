import About from "../../../components/pages/About";
import Education from "../../../components/pages/Education";
import Hero from "../../../components/pages/Hero";
import SkillSection from "../../../components/pages/Skills";

const Home = () => {
    return (
        <div className="">
            <Hero />
            <About />
            <Education />
            <SkillSection />
        </div>
    );
};

export default Home;