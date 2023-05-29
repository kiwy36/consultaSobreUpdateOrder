import { useEffect, useState } from "react";
import "./Footer.css";

const Footer = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
        setIsVisible(isBottom);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
        window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return <footer className={`footer ${isVisible ? "visible" : ""}`}>Mail de contacto: mailfalsodecontacto@gmail.com</footer>;
};

export default Footer;
