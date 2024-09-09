import logoSVG from "./images/GenesisioLogoSVG.svg";
import logoPNG from "./images/GenesisioLogo.png";
import Globe from "./images/globe.png"
import testimony1 from "./images/testimony1.avif"
import testimony2 from "./images/testimony2.avif"
import testimony3 from "./images/testimony3.jpg"
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
function gsapAnimationBase(identifier, duration = 0.5, y = 100) {
    useGSAP(() => {
        gsap.from(identifier, {
            y: y,
            opacity: 0,
            duration: duration,
            stagger: {
                amount: 2,
                ease: "power1.inOut",
                grid: [2, 1],
                axis: "y",
                from: "start",
            },
        });
    });
}
function gsapAnimationScrollTrigger({ identifier, trigger = identifier, duration = 0.5, y = 100 }) {
    useGSAP(() => {
        gsap.from(identifier, {
            y: y,
            opacity: 0,
            duration: duration,
            stagger: {
                amount: 2,
                ease: "power1.inOut",
                grid: [2, 1],
                axis: "y",
                from: "start",
            },
            scrollTrigger: {
                trigger: trigger,
                start: "20% bottom",
            },
        });
    });
}
function validateFullname(fullname) {
    let arr = fullname.split(" ");
    return arr.length >= 2 ? true : "Expected: firstname lastname";
}
function passwordMatch(input, compare) {
    return input === compare ? true : "Passwords do not match";
}
function isValidPassword(password) {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const result = pattern.test(password);
    return result ? true : "Requires an uppercase, lowercase letter, a number and a symbol"
}
function capitalizeWords(str) {
    return str
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}
function isoToLocaleDateString(isoTimestamp) {
    const date = new Date(isoTimestamp);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
}
function convertISOToDate(isoString) {
    return new Date(isoString).toISOString().split('T')[0];
}
export { logoPNG, logoSVG, Globe, testimony1, testimony2, testimony3, gsapAnimationBase, gsapAnimationScrollTrigger, validateFullname, passwordMatch, isValidPassword, capitalizeWords, isoToLocaleDateString, convertISOToDate };