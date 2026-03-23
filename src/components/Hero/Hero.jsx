import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import gsap from 'gsap';
import './Hero.css';

const Hero = () => {
    const heroRef = useRef(null);
    const glowRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Background glow drift
            gsap.to(glowRef.current, {
                x: 'random(-20, 20)',
                y: 'random(-20, 20)',
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            // Text stagger entrance
            gsap.from(".hero-content > *", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "back.out(1.7)"
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="hero" className="hero-section section-padding" ref={heroRef}>
            <div className="hero-content">
                <p className="greeting">Hello, I'm</p>
                <h1 className="name">Mohit Salvi</h1>
                <h2 className="title">MERN Stack Developer</h2>
                <p className="short-bio">Building scalable, efficient, and reliable web applications.</p>

                <div className="hero-cta">
                    <a href="#contact" className="btn btn-primary">HIRE ME</a>
                    <a href="https://drive.google.com/file/d/1VBcn4IGylz3upGGBtQdKJlErEps71Com/view?usp=sharing" target="_blank" rel="noreferrer" className="btn btn-secondary">GET CV</a>
                </div>

                <div className="social-links">
                    <a href="https://github.com/MohitSalvi2207" target="_blank" rel="noreferrer"><FaGithub /></a>
                    <a href="https://linkedin.com/in/salvimohit" target="_blank" rel="noreferrer"><FaLinkedin /></a>
                    <a href="mailto:mohitsalvi227@gmail.com"><FaEnvelope /></a>
                    <a href="https://wa.me/9974737469" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
                </div>
            </div>

            <div className="hero-image-container">
                <div className="glow-circle" ref={glowRef}></div>
            </div>
        </section>
    );
};

export default Hero;
