import gsap from "gsap";
import { Build } from "@/core/build";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  scroller: "#scroll-container",
});

const tl3d = gsap.timeline({ defaults: { duration: 1 } });
const tlDom = gsap.timeline({ defaults: { duration: 1 } });

export default function startupAnimation(build: Build) {
  // 3D animation & DOM animation
  tl3d.to(build.model.rotation, { y: Math.PI * 2, x: Math.PI * 2, ease: "none" }, 0);
  tlDom.to("#content-1 h2", { scale: 2, duration: 1, ease: "power1.inOut" }, 0);
  tlDom.to("#content-2 h2", { scale: 2, duration: 1, ease: "power1.inOut" }, 0);

  // ScrollTrigger
  ScrollTrigger.create({
    animation: tlDom,
    scrub: 3,
  });

  ScrollTrigger.create({
    animation: tl3d,
    scrub: true,
  });
}
