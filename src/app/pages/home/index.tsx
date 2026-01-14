import About from "../../../components/pages/About";
import ContactUs from "../../../components/pages/ContactUs";
import Education from "../../../components/pages/Education";
import FreelanceWork from "../../../components/pages/FreelanceWork";
import Hero from "../../../components/pages/Hero";
import Projects from "../../../components/pages/Project";
import Skills from "../../../components/pages/Skills";

const Home = () => {
    return (
        <div className="">
            <Hero />
            <About />
            <Education />
            <Skills />
            <Projects />
            <FreelanceWork />
            <ContactUs />
        </div>
    );
};

export default Home;