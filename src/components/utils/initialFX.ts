import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { smoother } from "../Navbar";

export function initialFX() {
  document.body.style.overflowY = "auto";
  if (smoother) {
    smoother.paused(false);
  }
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  var landingIntroText = new SplitText(
    [".landing-info h3", ".landing-intro h2", ".landing-intro h1"],
    {
      type: "chars,lines",
      linesClass: "split-line",
    }
  );
  gsap.fromTo(
    landingIntroText.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  let TextProps = { type: "chars,lines", linesClass: "split-h2" };

  var phrase1 = new SplitText("#phrase1", TextProps);
  var phrase2 = new SplitText("#phrase2", TextProps);
  var phrase3 = new SplitText("#phrase3", TextProps);

  gsap.fromTo(
    phrase1.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  LoopThreePhrases(phrase1, phrase2, phrase3);
}

function LoopThreePhrases(
  Phrase1: SplitText,
  Phrase2: SplitText,
  Phrase3: SplitText
) {
  var tl = gsap.timeline({ repeat: -1 });
  const duration = 1.2;
  const holdTime = 3;

  tl.to(
    Phrase1.chars,
    { y: -80, opacity: 0, duration, ease: "power3.inOut", stagger: 0.05 },
    `+=${holdTime}`
  )
    .fromTo(
      Phrase2.chars,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration,
        ease: "power3.inOut",
        stagger: 0.05,
      },
      "<"
    )
    .to(
      Phrase2.chars,
      { y: -80, opacity: 0, duration, ease: "power3.inOut", stagger: 0.05 },
      `+=${holdTime}`
    )
    .fromTo(
      Phrase3.chars,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration,
        ease: "power3.inOut",
        stagger: 0.05,
      },
      "<"
    )
    .to(
      Phrase3.chars,
      { y: -80, opacity: 0, duration, ease: "power3.inOut", stagger: 0.05 },
      `+=${holdTime}`
    )
    .fromTo(
      Phrase1.chars,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration,
        ease: "power3.inOut",
        stagger: 0.05,
      },
      "<"
    );
}
