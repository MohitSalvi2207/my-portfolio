import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { HiSun, HiMoon } from 'react-icons/hi2';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

const navItems = [
    { emoji: '🧑‍💼', label: 'ABOUT', href: '#about' },
    { emoji: '🛠️', label: 'SKILLS', href: '#skills' },
    { emoji: '🎓', label: 'EDUCATION', href: '#education' },
    { emoji: '💼', label: 'PROJECTS', href: '#projects' },
    { emoji: '📬', label: 'CONTACT', href: '#contact' },
];

const Navbar = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleRef = useRef(null);

    useEffect(() => {
        if (toggleRef.current) {
            gsap.from(toggleRef.current, {
                rotate: isDarkMode ? -180 : 180,
                scale: 0.5,
                opacity: 0,
                duration: 0.5,
                ease: "back.out(1.7)"
            });
        }
    }, [isDarkMode]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when drawer is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            {/* Dim overlay */}
            <div
                className={`nav-overlay ${menuOpen ? 'active' : ''}`}
                onClick={closeMenu}
            />

            {/* Side drawer */}
            <aside className={`nav-drawer ${menuOpen ? 'active' : ''}`}>
                <div className="nav-drawer-header">
                    <span className="nav-drawer-title">MENU</span>
                    <button className="nav-drawer-close" onClick={closeMenu} aria-label="Close menu">
                        ✕
                    </button>
                </div>
                <nav className="nav-drawer-links">
                    {navItems.map(({ emoji, label, href }) => (
                        <a
                            key={label}
                            href={href}
                            className="nav-drawer-item"
                            onClick={closeMenu}
                        >
                            <span className="nav-drawer-emoji">{emoji}</span>
                            {label}
                        </a>
                    ))}
                </nav>
            </aside>

            {/* Top Navbar */}
            <nav className={`navbar ${scrolled ? 'glass' : ''}`}>
                <div className="nav-container">
                    <a href="#" className="logo">
                        Mohit.<span>dev</span>
                    </a>

                    {/* Desktop links */}
                    <div className="nav-links">
                        {navItems.map(({ label, href }) => (
                            <a key={label} href={href}>{label.charAt(0) + label.slice(1).toLowerCase()}</a>
                        ))}
                    </div>

                    <div className="nav-actions">
                        <button
                            className="theme-toggle"
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                        >
                            <span ref={toggleRef} style={{ display: 'flex' }}>
                                {isDarkMode ? <HiSun className="sun-icon" /> : <HiMoon className="moon-icon" />}
                            </span>
                        </button>

                        <button
                            className={`hamburger ${menuOpen ? 'open' : ''}`}
                            onClick={() => setMenuOpen(prev => !prev)}
                            aria-label="Toggle navigation"
                        >
                            <span className="bar" />
                            <span className="bar" />
                            <span className="bar" />
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
