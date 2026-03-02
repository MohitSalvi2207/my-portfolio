import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaReact, FaNodeJs, FaDatabase, FaGithub, FaHtml5, FaCss3Alt, FaJs } from 'react-icons/fa';
import { SiExpress, SiChakraui, SiMongodb, SiRedux } from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
    const gridRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".skill-item",
                { scale: 0, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "elastic.out(1, 0.5)",
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top bottom-=100px",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Initial refresh
            ScrollTrigger.refresh();
        }, gridRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="skills" className="skills-section section-padding">
            <div className="skills-container">
                <h3 className="skills-heading">Core Technologies</h3>
                <div className="skills-grid" ref={gridRef}>
                    <div className="skill-item glass">
                        <FaReact className="skill-icon react" />
                        <span>React.js</span>
                    </div>
                    <div className="skill-item glass">
                        <FaNodeJs className="skill-icon node" />
                        <span>Node.js</span>
                    </div>
                    <div className="skill-item glass">
                        <SiExpress className="skill-icon express" />
                        <span>Express.js</span>
                    </div>
                    <div className="skill-item glass">
                        <SiMongodb className="skill-icon mongo" />
                        <span>MongoDB</span>
                    </div>
                    <div className="skill-item glass">
                        <SiChakraui className="skill-icon chakra" />
                        <span>Chakra UI</span>
                    </div>
                    <div className="skill-item glass">
                        <FaDatabase className="skill-icon database" />
                        <span>SQL/NoSQL</span>
                    </div>
                    <div className="skill-item glass">
                        <SiRedux className="skill-icon redux" />
                        <span>Redux</span>
                    </div>
                    <div className="skill-item glass">
                        <FaHtml5 className="skill-icon html" />
                        <span>HTML</span>
                    </div>
                    <div className="skill-item glass">
                        <FaCss3Alt className="skill-icon css" />
                        <span>CSS</span>
                    </div>
                    <div className="skill-item glass">
                        <FaJs className="skill-icon js" />
                        <span>JavaScript</span>
                    </div>
                    <div className="skill-item glass">
                        <FaGithub className="skill-icon github" />
                        <span>GitHub</span>
                    </div>
                    <div className="skill-item glass">
                        <VscVscode className="skill-icon vscode" />
                        <span>VS Code</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
