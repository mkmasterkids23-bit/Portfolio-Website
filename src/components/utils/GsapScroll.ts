import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let flickerInterval: NodeJS.Timeout | null = null;
let intensity: number = 0;

export function setCharTimeline(
  character: THREE.Object3D | null,
  camera: THREE.PerspectiveCamera
) {
  if (!character) return;

  // Clear existing interval if any
  if (flickerInterval) clearInterval(flickerInterval);
  flickerInterval = setInterval(() => {
    intensity = Math.random();
  }, 200);

  const landingSection = document.querySelector(".landing-section");
  const tl1 = landingSection ? gsap.timeline({
    scrollTrigger: {
      trigger: landingSection,
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  }) : null;

  const aboutSection = document.querySelector(".about-section");
  const tl2 = aboutSection ? gsap.timeline({
    scrollTrigger: {
      trigger: aboutSection,
      start: "center 55%",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  }) : null;

  const whatIDOSection = document.querySelector(".whatIDO");
  const tl3 = whatIDOSection ? gsap.timeline({
    scrollTrigger: {
      trigger: whatIDOSection,
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  }) : null;

  let screenLight: any, monitor: any;
  character.children.forEach((object: any) => {
    if (object.name === "Plane004") {
      object.children.forEach((child: any) => {
        if (child.material) {
          child.material.transparent = true;
          child.material.opacity = 0;
          if (child.material.name === "Material.027") {
            monitor = child;
            child.material.color.set("#FFFFFF");
          }
        }
      });
    }
    if (object.name === "screenlight") {
      if (object.material) {
        object.material.transparent = true;
        object.material.opacity = 0;
        object.material.emissive.set("#C8BFFF");
        gsap.to(object.material, {
          emissiveIntensity: 5,
          repeat: -1,
          yoyo: true,
          duration: 0.5,
          ease: "sine.inOut"
        });
        screenLight = object;
      }
    }
  });

  const neckBone = character.getObjectByName("spine005");
  
  if (window.innerWidth > 1024) {
    if (tl1) {
      tl1
        .fromTo(character.rotation, { y: 0 }, { y: 0.7, duration: 1 }, 0)
        .to(camera.position, { z: 22 }, 0)
        .fromTo(".character-model", { x: 0 }, { x: "-25%", duration: 1 }, 0)
        .to(".landing-container", { opacity: 0, duration: 0.4, pointerEvents: "none" }, 0)
        .to(".landing-container", { y: "40%", duration: 0.8 }, 0)
        .fromTo(".about-me", { y: "-50%" }, { y: "0%" }, 0);
    }

    if (tl2) {
      if (neckBone) {
        tl2.to(neckBone.rotation, { x: 0.6, delay: 2, duration: 3 }, 0);
      }
      if (monitor) {
        tl2
          .to(monitor.material, { opacity: 1, duration: 0.8, delay: 3.2 }, 0)
          .fromTo(
            monitor.position,
            { y: -10, z: 2 },
            { y: 0, z: 0, delay: 1.5, duration: 3 },
            0
          );
      }
      if (screenLight) {
        tl2.to(screenLight.material, { opacity: 1, duration: 0.8, delay: 4.5 }, 0);
      }
      tl2
        .to(
          camera.position,
          { z: 75, y: 8.4, duration: 6, delay: 2, ease: "power3.inOut" },
          0
        )
        .to(".about-section", { y: "30%", duration: 6 }, 0)
        .to(".about-section", { opacity: 0, delay: 3, duration: 2, pointerEvents: "none" }, 0)
        .fromTo(
          ".character-model",
          { pointerEvents: "inherit" },
          { pointerEvents: "none", x: "-12%", delay: 2, duration: 5 },
          0
        )
        .to(character.rotation, { y: 0.92, x: 0.12, delay: 3, duration: 3 }, 0)
        .fromTo(
          ".what-box-in",
          { display: "none" },
          { display: "flex", duration: 0.1, delay: 6 },
          0
        );

      const characterRim = document.querySelector(".character-rim");
      if (characterRim) {
        tl2.fromTo(
          characterRim,
          { opacity: 1, scaleX: 1.4 },
          { opacity: 0, scale: 0, y: "-70%", duration: 5, delay: 2 },
          0.3
        );
      }
    }

    if (tl3) {
      tl3
        .fromTo(
          ".character-model",
          { y: "0%" },
          { y: "-100%", duration: 4, ease: "none", delay: 1 },
          0
        )
        .fromTo(".whatIDO", { y: 0 }, { y: "15%", duration: 2 }, 0)
        .to(character.rotation, { x: -0.04, duration: 2, delay: 1 }, 0);
    }
  } else {
    const whatBoxIn = document.querySelector(".what-box-in");
    if (whatBoxIn) {
      gsap.timeline({
        scrollTrigger: {
          trigger: whatBoxIn,
          start: "top 70%",
          end: "bottom top",
        },
      }).to(whatBoxIn, { display: "flex", duration: 0.1 }, 0);
    }
  }
}

export function setAllTimeline() {
  const careerSection = document.querySelector(".career-section");
  if (!careerSection) return;

  const careerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: careerSection,
      start: "top 30%",
      end: "100% center",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  careerTimeline
    .fromTo(".career-timeline", { maxHeight: "10%", opacity: 0 }, { maxHeight: "100%", opacity: 1, duration: 0.5 }, 0)
    .fromTo(".career-info-box", { opacity: 0 }, { opacity: 1, stagger: 0.1, duration: 0.5 }, 0)
    .fromTo(".career-dot", { animationIterationCount: "infinite" }, { animationIterationCount: "1", delay: 0.3, duration: 0.1 }, 0);

  if (window.innerWidth > 1024) {
    careerTimeline.fromTo(".career-section", { y: 0 }, { y: "20%", duration: 0.5, delay: 0.2 }, 0);
  }
}

