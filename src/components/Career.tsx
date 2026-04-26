import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Agent Developer & AI Enthusiast</h4>
                <h5>Independent Work</h5>
              </div>
              <h3></h3>
            </div>
            <p>
              Started building automation workflows using n8n and explored AI,
              focusing on prompt engineering and real-world applications.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI Learner & Web Developer</h4>
                <h5>Personal Projects</h5>
              </div>
              <h3></h3>
            </div>
            <p>
              Developed projects combining web development and automation,
              creating user-friendly digital solutions and strengthening
              technical skills.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Automation Builder</h4>
                <h5>Present</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Teaching AI in a simple and engaging way while building and
              selling automation workflows that turn ideas into practical
              solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
