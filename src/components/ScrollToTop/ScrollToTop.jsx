import React, { useState, useEffect, useRef } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import gsap from 'gsap';
import './ScrollToTop.css';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const buttonRef = useRef(null);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    useEffect(() => {
        if (isVisible) {
            gsap.to(buttonRef.current, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.4,
                ease: "back.out(1.7)",
                display: "flex"
            });
        } else {
            gsap.to(buttonRef.current, {
                y: 20,
                opacity: 0,
                scale: 0.5,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    if (buttonRef.current) buttonRef.current.style.display = "none";
                }
            });
        }
    }, [isVisible]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button
            ref={buttonRef}
            className="scroll-to-top"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            style={{ display: 'none' }}
        >
            <FaArrowUp />
        </button>
    );
};

export default ScrollToTop;
