import React from "react";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { Globe } from "../../assets/utils";
import { checkIcon } from "../../assets/utilities";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Herosection = () => {
  useGSAP(() => {
    gsap.from(".hero", {
      opacity: 0,
      y: 80,
      scrub: 5.5,
      duration: 2,
      ease: "power2.inOut",
      stagger: {
        amount: 1,
        ease: "power1.in",
        grid: [2, 1],
        axis: "y",
        from: "start",
      },
      scrollTrigger: {
        trigger: ".hero",
        start: "10% bottom",
      },
    });
    gsap.from(".cta", {
      opacity: 0,
      y: 80,
      duration: 2,
      scrub: 5.5,
      ease: "power2.in",
      scrollTrigger: {
        trigger: ".cta",
        start: "10% bottom",
      },
    });
    gsap.from(".cta2", {
      opacity: 0,
      y: 80,
      duration: 2,
      scrub: 5.5,
      ease: "power1.in",
      scrollTrigger: {
        trigger: ".hero",
        start: "10% bottom",
      },
    });
    gsap.fromTo(
      ".globe",
      {
        opacity: 0.75,
        yoyo: true,
        repeat: -1,
        scale: 0.975,
        rotateZ: "2.5",
        duration: 5,
        scrub: 5.5,
        ease: "back",
      },
      {
        rotateZ: "-2.5",
        opacity: 1,
        yoyo: true,
        repeat: -1,
        scale: 1,
        duration: 5,
        scrub: 5.5,
        ease: "back",
      }
    );
  });
  function ctaBTN(className) {
    return (
      <Link
        to="/auth/sign-in"
        className="sm:flex sm:justify-center lg:justify-start"
      >
        <Button size="lg" className={`${className} xs:w-full`}>
          Get started
        </Button>
      </Link>
    );
  }
  return (
    <section className="bg-inherit">
      <div className="flex flex-col py-10 mx-auto space-y-6 lg:h-[54rem] lg:py-16 lg:flex-row lg:items-center sm:mx-2">
        <div className="w-full lg:w-1/2">
          <div className="lg:max-w-lg">
            <h1 className="text-3xl font-semibold tracking-wide text-white lg:text-4xl hero">
              Instant access to
            </h1>
            <h1 className="text-3xl font-black tracking-wide text-accent-green lg:text-6xl hero">
              Investments
            </h1>
            <h1 className="text-3xl font-semibold tracking-wide text-white lg:text-4xl hero">
              Anytime & Anywhere
            </h1>

            <div className="mt-8 space-y-5 capitalize">
              <p className="flex items-center -mx-2 text-white hero">
                {checkIcon}
                <span className="mx-2">Secure trading platform</span>
              </p>

              <p className="flex items-center -mx-2 text-white hero">
                {checkIcon}
                <span className="mx-2">Trade variety of assets</span>
              </p>

              <p className="flex items-center -mx-2 text-white hero">
                {checkIcon}
                <span className="mx-2">User friendly platform</span>
              </p>
              {ctaBTN("bg-accent-green text-white mt-5 hidden lg:block cta")}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center w-full lg:h-[40rem] lg:w-1/2 h-[30rem]">
          <img
            className="object-contain w-full h-full mx-auto rounded-md lg:max-w-2xl globe"
            src={Globe}
            alt="Globe"
          />
        </div>
        {ctaBTN("bg-accent-green text-white mt-5 lg:hidden cta2")}
      </div>
    </section>
  );
};
export default Herosection;
