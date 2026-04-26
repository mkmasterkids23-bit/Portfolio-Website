import { PropsWithChildren } from "react";
import "./styles/Landing.css";

import { MorphingText } from "./ui/liquid-text";

const Landing = ({ children }: PropsWithChildren) => {
  const texts = ["vibe coder", "developer", "designer"];

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              MAHEEN
              <br />
              <span>MUBASHER</span>
            </h1>
          </div>
          <div className="landing-info !flex !flex-col !justify-center">
            <MorphingText texts={texts} className="hero-morph-text text-center lg:text-left" />
          </div>

        </div>
        {children}
      </div>
    </>
  );
};


export default Landing;
