import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import './Education.css';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
    const sectionRef = useRef(null);

    const experiences = [
        {
            id: 1,
            title: "MERN Stack Intern (ERP Printing System)",
            organization: "ERP Printing Project – Ahmedabad",
            duration: "Sept 2025 - Nov 2025",
            type: "experience",
            icon: <FaBriefcase />
        },
        {
            id: 2,
            title: "React Developer (Training)",
            organization: "Infolabz IT Services PVT. LTD. Ahmedabad",
            duration: "Sep 2024 - June 2025",
            type: "education",
            icon: <FaGraduationCap />
        },
        {
            id: 3,
            title: "Master of Computer Applications (MCA)",
            organization: "Dr. Babasaheb Ambedkar Open University",
            duration: "Sep 2024 - Present",
            type: "education",
            icon: <FaGraduationCap />
        },
        {
            id: 4,
            title: "Bachelor of Computer Application (BCA)",
            organization: "Gujarat University",
            duration: "Oct 2021 - Apr 2024",
            type: "education",
            icon: <FaGraduationCap />
        },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".timeline-item", {
                opacity: 0,
                y: 50,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".timeline-container",
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="education" className="education-section section-padding" ref={sectionRef}>
            <h2 className="heading-secondary">Education &amp; Experience</h2>

            <div className="timeline-container">
                {experiences.map((item) => (
                    <div key={item.id} className="timeline-item">
                        <div className={`timeline-icon ${item.type}`}>
                            {item.icon}
                        </div>
                        <div className="timeline-content glass">
                            <span className="duration">{item.duration}</span>
                            <h3 className="title">{item.title}</h3>
                            <p className="organization">{item.organization}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Education;
