import gsap from "gsap";
import { Build } from "@/core/build";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  scroller: "#scroll-container",
});

export default function startupAnimation(build: Build) {
  // 3D animation & DOM animation
  console.log(build);
}
