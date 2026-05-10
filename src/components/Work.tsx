import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    name: "Expense Tracker",
    category: "Dashboard",
    tools: "html, css, js",
    image: "/images/expense-tracker.png"
  },
  {
    name: "Author Website",
    category: "Website",
    tools: "html, css, js",
    image: "/images/author-website.png"
  },
  {
    name: "Iron Man",
    category: "Website",
    tools: "html, tailwind css",
    image: "/images/iron-man.png"
  },
  {
    name: "Math Game",
    category: "Web Game",
    tools: "html, css, js",
    image: "/images/math-game.png"
  },
  {
    name: "Trivia Time",
    category: "Web Game",
    tools: "html, css, js",
    image: "/images/trivia-time.png"
  },
  {
    name: "Project Management",
    category: "Dashboard",
    tools: "react, tailwind css",
    image: "/images/project-management.png"
  },
  {
    name: "Gwen Stacy",
    category: "Website",
    tools: "html, css, js",
    image: "/images/gwen-stacy.png"
  },
  {
    name: "Calculator",
    category: "Web App",
    tools: "html, css, js",
    image: "/images/calc.png"
  },
  {
    name: "Sign Up Page",
    category: "UI Component",
    tools: "html, css, js",
    image: "/images/sign-up-page.png"
  }
];

const Work = () => {
  useGSAP(() => {
    const refresh = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", refresh);
    setTimeout(refresh, 500);
    setTimeout(refresh, 2000);

    const workBoxes = document.querySelectorAll(".work-box");
    const isMobile = window.innerWidth <= 500;
    const boxWidth = workBoxes[0]?.getBoundingClientRect().width || (isMobile ? window.innerWidth * 0.9 : 600);
    const totalWidth = projectsData.length * boxWidth;
    const viewportWidth = window.innerWidth;
    
    // Calculate scroll amount: total width minus what's already visible
    // For mobile, we want to ensure the last project is fully visible, so we add a bit more buffer
    const scrollAmount = totalWidth - viewportWidth + (isMobile ? viewportWidth * 0.1 : 300);

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: "+=1500",
        scrub: 1, // Smooth scrubbing
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
      },
    });

    timeline.to(".work-flex", {
      x: -scrollAmount,
      ease: "none",
    });

    return () => {
      window.removeEventListener("resize", refresh);
      timeline.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work" style={{ position: 'relative', zIndex: 10 }}>
      <div className="work-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projectsData.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image={project.image} alt={project.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
