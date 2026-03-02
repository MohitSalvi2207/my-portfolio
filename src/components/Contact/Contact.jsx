import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaEnvelope, FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const sectionRef = useRef(null);
    const infoRef = useRef(null);
    const formRef = useRef(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [status, setStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Get your Web3Forms Access Key at https://web3forms.com/
    // Add it to the .env file as VITE_WEB3FORMS_ACCESS_KEY
    const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR-WEB3FORMS-ACCESS-KEY-HERE";

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check for placeholder key - Enter "Demo Mode" if key is missing
        const isDemoMode = WEB3FORMS_ACCESS_KEY === "YOUR-WEB3FORMS-ACCESS-KEY-HERE";

        setIsSubmitting(true);
        setStatus(isDemoMode ? 'Demo Mode: Simulating...' : 'Sending...');

        try {
            if (isDemoMode) {
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 1500));

                console.log("--- CONTACT FORM DEMO MODE ---");
                console.log("To: mohitsalvi227@gmail.com");
                console.log("Data:", formData);
                console.log("Setup: Get a key for mohitsalvi227@gmail.com at https://web3forms.com/");

                setStatus(
                    <span>
                        Submitted to Demo! <a href={`mailto:mohitsalvi227@gmail.com?subject=Contact from ${formData.name}&body=${formData.message}`} style={{ color: 'white', textDecoration: 'underline' }}>Send via Email Client Instead?</a>
                    </span>
                );
                setFormData({ name: '', email: '', message: '' });
                return;
            }

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    access_key: WEB3FORMS_ACCESS_KEY,
                    ...formData
                })
            });

            const result = await response.json();

            if (result.success) {
                setStatus("Message sent successfully!");
                setFormData({ name: '', email: '', message: '' }); // Reset form
            } else {
                setStatus("Failed to send message: " + (result.message || "Please try again."));
            }
        } catch (error) {
            console.error(error);
            setStatus("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
            // Clear status message after 5 seconds
            setTimeout(() => setStatus(''), 5000);
        }
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(infoRef.current, {
                x: -50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });

            gsap.from(formRef.current, {
                x: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="contact" className="contact-section section-padding" ref={sectionRef}>
            <h2 className="heading-secondary">Let's Get in Touch</h2>

            <div className="contact-container glass">
                <div className="contact-info" ref={infoRef}>
                    <h3>Contact Information</h3>
                    <p>Feel free to reach out for collaborations, opportunities, or just to say hi!</p>

                    <div className="contact-methods">
                        <a href="mailto:mohitsalvi227@gmail.com" className="method-item">
                            <div className="method-icon"><FaEnvelope /></div>
                            <span>mohitsalvi227@gmail.com</span>
                        </a>

                        <a href="https://wa.me/9974737469" target="_blank" rel="noreferrer" className="method-item">
                            <div className="method-icon"><FaWhatsapp /></div>
                            <span>Whatsapp (9974737469)</span>
                        </a>

                        <a href="https://linkedin.com/in/salvimohit" target="_blank" rel="noreferrer" className="method-item">
                            <div className="method-icon"><FaLinkedin /></div>
                            <span>LinkedIn</span>
                        </a>

                        <a href="https://github.com/MohitSalvi2207" target="_blank" rel="noreferrer" className="method-item">
                            <div className="method-icon"><FaGithub /></div>
                            <span>GitHub</span>
                        </a>
                    </div>
                </div>

                <div className="contact-form" ref={formRef}>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Your Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Your Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="5"
                                placeholder="Your message here..."
                                required
                                disabled={isSubmitting}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className={`btn btn-primary submit-btn ${isSubmitting ? 'submitting' : ''}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>

                        {status && (
                            <div className={`form-status ${typeof status === 'string'
                                    ? (status.toLowerCase().includes('success') ? 'success' : 'error')
                                    : 'success'
                                }`}>
                                {status}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
