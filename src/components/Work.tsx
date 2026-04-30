import { useState, useEffect } from "react";
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
  const [cardWidth, setCardWidth] = useState(600);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      if (window.innerWidth <= 1100) setCardWidth(350);
      else if (window.innerWidth <= 1400) setCardWidth(450);
      else setCardWidth(600);
    };
    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalWidth = projectsData.length * cardWidth;
  const scrollAmount = Math.max(0, totalWidth - viewportWidth);

  useGSAP(() => {
    if (totalWidth === 0) return;

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => `+=${totalWidth}`,
        scrub: true,
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
      },
    });

    timeline.to(".work-flex", {
      x: -scrollAmount,
      ease: "none",
    });

    const debugPanel = document.getElementById('debug-panel');
    if (debugPanel) {
      debugPanel.innerHTML = `
        Total Forced Width: ${totalWidth}px<br/>
        Window Width: ${viewportWidth}px<br/>
        Scroll Amount: ${scrollAmount}px<br/>
        Card Width: ${cardWidth}px
      `;
    }

    return () => {
      timeline.kill();
    };
  }, [totalWidth, scrollAmount]);
  return (
    <div className="work-section" id="work" style={{ position: 'relative' }}>
      <div 
        id="debug-panel" 
        style={{ 
          position: 'absolute', top: '10px', left: '10px', background: 'rgba(0,0,0,0.8)', 
          color: 'lime', padding: '10px', zIndex: 9999, fontFamily: 'monospace', fontSize: '14px' 
        }}
      >
        Waiting for calculation...
      </div>
      <div className="work-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex" style={{ width: totalWidth, position: 'relative' }}>
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
