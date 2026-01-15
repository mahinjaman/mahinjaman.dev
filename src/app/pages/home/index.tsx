import About from "../../../components/pages/Home/About";
import ContactUs from "../../../components/pages/Home/ContactUs";
import Education from "../../../components/pages/Home/Education";
import FreelanceWork from "../../../components/pages/Home/FreelanceWork";
import Hero from "../../../components/pages/Home/Hero";
import Projects from "../../../components/pages/Home/Project";
import Skills from "../../../components/pages/Home/Skills";

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