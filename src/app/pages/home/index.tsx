import About from "../../../components/pages/Home/About";
import BlogSection from "../../../components/pages/Home/BlogSection";
import ContactUs from "../../../components/pages/Home/ContactUs";
import Education from "../../../components/pages/Home/Education";
import ExperienceSection from "../../../components/ExperienceSection";
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
            <ExperienceSection />
            <BlogSection />
            <ContactUs />
        </div>
    );
};

export default Home;
