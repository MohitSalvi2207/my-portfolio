import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profilePic from '../../assets/profile.png';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Image reveal
            gsap.fromTo(imageRef.current,
                { opacity: 0, x: -50, scale: 0.9 },
                {
                    opacity: 1, x: 0, scale: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: imageRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Text stagger reveal
            gsap.fromTo(".about-text p",
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="about" className="about-section section-padding" ref={sectionRef}>
            <h2 className="heading-secondary">About Me</h2>

            <div className="about-content">
                <div className="about-image-wrapper" ref={imageRef}>
                    <div className="about-image glass">
                        <img src={profilePic} alt="Mohit Salvi" />
                    </div>
                </div>

                <div className="about-text glass" ref={textRef}>
                    <p>
                        I am Mohit, a dedicated MERN Stack Developer with a strong foundation in modern web development and hands-on experience delivering real-world software solutions. My expertise includes React.js, Chakra UI, Node.js, Express.js, and MongoDB, focusing on scalable, efficient, and reliable applications.
                    </p>
                    <p>
                        During my internship, I contributed to a Printing ERP System, building responsive front-end modules using Chakra UI and backend functionalities using a CRUD Generator library. This strengthened my understanding of enterprise workflows, modular architecture, and seamless data integration.
                    </p>
                    <p>
                        I am committed to writing clean, maintainable code and continuously improving my technical skills to support the creation of high-quality digital products that deliver measurable value.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
