import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/FooterFinale.css";

gsap.registerPlugin(ScrollTrigger);

const FooterFinale = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".footer-finale-text",
      {
        opacity: 0,
        y: 100,
        scale: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".footer-finale",
          start: "top 80%",
          end: "bottom bottom",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section className="footer-finale">
      <h1 className="footer-finale-text">
        Maheen <span>Mubasher</span>
      </h1>
    </section>
  );
};

export default FooterFinale;
