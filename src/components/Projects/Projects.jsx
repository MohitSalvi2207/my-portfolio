import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const sectionRef = useRef(null);

    const projects = [
        {
            id: 1,
            title: "ShopEase",
            description: "Developed a full-featured e-commerce app with CRUD, authentication, and cart management. Integrated third-party APIs, Bootstrap UI, and real-time updates.",
            liveLink: "https://comfy-palmier-76ae74.netlify.app/",
            codeLink: "https://github.com/MohitSalvi2207/ShopEase.git",
            tags: ["React", "Bootstrap", "API", "Auth"]
        },
        {
            id: 2,
            title: "StreamView",
            description: "Built a responsive UI like YouTube. Includes dynamic search, video fetching, and a custom player with full controls.",
            liveLink: "https://streamview-6nz0.onrender.com/",
            codeLink: "https://github.com/MohitSalvi2207/StreamView.git",
            tags: ["HTML", "CSS", "Vanilla JS", "API"]
        },
        {
            id: 3,
            title: "IntelliQuiz",
            description: "Interactive quiz web app with MCQs, score tracking, and instant feedback. Designed for engaging learning with a clean interface.",
            liveLink: null,
            codeLink: "https://github.com/MohitSalvi2207/IntelliQuiz",
            tags: ["React", "JavaScript", "CSS"]
        },
        {
            id: 4,
            title: "Weather App",
            description: "Provides real-time weather updates based on the user's city name, area, or pincode input. Features a clean UI and error handling.",
            liveLink: "https://weather-app-6irr.onrender.com/",
            codeLink: "https://github.com/MohitSalvi2207/Weather-App",
            tags: ["React", "Weather API", "CSS"]
        },
        {
            id: 5,
            title: "Text to Speech Converter",
            description: "A simple Text to Speech Converter using the Web Speech API to read text aloud in different voices and languages with speed controls.",
            liveLink: "https://text-to-speech-converter-ohuy.onrender.com/",
            codeLink: "https://github.com/MohitSalvi2207/text-to-speech-converter",
            tags: ["HTML", "CSS", "Web Speech API"]
        },
        {
            id: 6,
            title: "Currency-Converter",
            description: "Responsive web app to convert currencies in real-time. Features flag-based dropdowns, live exchange rates, and a one-click swap button.",
            liveLink: "https://currency-converter-sch3.onrender.com/",
            codeLink: "https://github.com/MohitSalvi2207/Currency-Converter",
            tags: ["React", "Exchange Rate API", "CSS"]
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".project-card",
                { opacity: 0, y: 50, scale: 0.9 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom-=100px",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Subtle tilt effect on hover for cards
            const cards = sectionRef.current.querySelectorAll('.project-card');
            cards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const { left, top, width, height } = card.getBoundingClientRect();
                    const x = (e.clientX - left) / width - 0.5;
                    const y = (e.clientY - top) / height - 0.5;

                    gsap.to(card, {
                        rotateY: x * 10,
                        rotateX: -y * 10,
                        transformPerspective: 1000,
                        duration: 0.4,
                        ease: "power2.out"
                    });
                });

                card.addEventListener('mouseleave', () => {
                    gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "power3.out" });
                });
            });

            // Initial refresh
            ScrollTrigger.refresh();
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="projects" className="projects-section section-padding" ref={sectionRef}>
            <h2 className="heading-secondary">Featured Projects</h2>

            <div className="projects-grid">
                {projects.map((project) => (
                    <div key={project.id} className="project-card glass">
                        <div className="project-content">
                            <h3 className="project-title">{project.title}</h3>
                            <p className="project-desc">{project.description}</p>

                            <div className="project-tags">
                                {project.tags.map(tag => (
                                    <span key={tag} className="tag">{tag}</span>
                                ))}
                            </div>
                        </div>

                        <div className="project-links">
                            {project.codeLink && (
                                <a href={project.codeLink} target="_blank" rel="noreferrer" className="project-link" title="Source Code">
                                    <FaGithub /> <span>Code</span>
                                </a>
                            )}
                            {project.liveLink && (
                                <a href={project.liveLink} target="_blank" rel="noreferrer" className="project-link" title="Live Site">
                                    <FaExternalLinkAlt /> <span>Live Preview</span>
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
