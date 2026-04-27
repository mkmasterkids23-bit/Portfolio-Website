import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

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
    let translateX: number = 0;

    function setTranslateX() {
      const boxes = document.querySelectorAll(".work-box");
      if (boxes.length === 0) return;
      
      let totalWidth = 0;
      boxes.forEach((box) => {
        totalWidth += (box as HTMLElement).offsetWidth;
      });
      
      // Calculate exactly how much to move to see the last pixel of the finale
      translateX = totalWidth - window.innerWidth + 100; 
    }

    setTranslateX();
    
    const refresh = () => {
      setTranslateX();
      ScrollTrigger.refresh();
    };
    
    window.addEventListener("resize", refresh);
    // Multiple intervals to catch image loads
    const intervals = [100, 500, 1000, 2000, 5000];
    intervals.forEach(ms => setTimeout(refresh, ms));

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => `+=${translateX + 1500}`, // Increased buffer
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    timeline.to(".work-flex", {
      x: () => -translateX,
      ease: "none",
    });

    timeline.fromTo(".finale-text", 
      { opacity: 0, scale: 0.5, y: 100 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" },
      ">"
    );

    return () => {
      window.removeEventListener("resize", refresh);
      timeline.kill();
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
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
          <div className="work-box finale-box">
             <h1 className="finale-text">Maheen <span>Mubasher</span></h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
