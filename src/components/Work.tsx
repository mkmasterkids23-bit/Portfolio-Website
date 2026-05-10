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
    const boxWidth = workBoxes[0]?.getBoundingClientRect().width || 600;
    const totalWidth = projectsData.length * boxWidth;
    const viewportWidth = window.innerWidth;
    const scrollAmount = totalWidth - viewportWidth + (viewportWidth * 0.1); // Add small buffer based on viewport

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
    <div className="work-section" id="work" style={{ position: 'relative' }}>
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
