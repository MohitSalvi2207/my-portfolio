import { useEffect } from 'react';
import gsap from 'gsap';

const useGsapCursor = () => {
    useEffect(() => {
        // Create cursor elements
        const dot = document.createElement('div');
        dot.id = 'gsap-cursor-dot';
        dot.style.cssText = `
            position: fixed; top: 0; left: 0; width: 8px; height: 8px;
            background: #6366f1; border-radius: 50%; pointer-events: none;
            z-index: 99999; transform: translate(-50%, -50%);
            box-shadow: 0 0 12px 4px rgba(99,102,241,0.6);
        `;

        const ring = document.createElement('div');
        ring.id = 'gsap-cursor-ring';
        ring.style.cssText = `
            position: fixed; top: 0; left: 0; width: 36px; height: 36px;
            border: 1.5px solid rgba(99,102,241,0.5); border-radius: 50%;
            pointer-events: none; z-index: 99998; transform: translate(-50%, -50%);
        `;

        document.body.appendChild(dot);
        document.body.appendChild(ring);

        const moveCursor = (e) => {
            gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' });
            gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.4, ease: 'power2.out' });
        };

        const onEnter = () => gsap.to(ring, { scale: 1.6, borderColor: 'rgba(99,102,241,0.9)', duration: 0.3 });
        const onLeave = () => gsap.to(ring, { scale: 1, borderColor: 'rgba(99,102,241,0.5)', duration: 0.3 });

        window.addEventListener('mousemove', moveCursor);
        document.querySelectorAll('a, button, .skill-item, .project-card').forEach(el => {
            el.addEventListener('mouseenter', onEnter);
            el.addEventListener('mouseleave', onLeave);
        });

        // Hide on mobile
        if (window.matchMedia('(hover: none)').matches) {
            dot.style.display = 'none';
            ring.style.display = 'none';
        }

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            dot.remove();
            ring.remove();
        };
    }, []);
};

export default useGsapCursor;
