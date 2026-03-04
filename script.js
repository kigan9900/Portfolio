// script.js
(() => {
    // Helpers
    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

    document.addEventListener('DOMContentLoaded', () => {
        // NAV TOGGLE (mobile)
        const navToggle = $('.nav-toggle');
        const nav = $('nav') || $('.nav');
        if (navToggle && nav) {
            navToggle.addEventListener('click', () => {
                nav.classList.toggle('open');
                navToggle.setAttribute('aria-expanded', String(nav.classList.contains('open')));
            });
        }

        // SMOOTH SCROLL FOR INTERNAL LINKS
        $$('a[href^="#"]').forEach(a => {
            a.addEventListener('click', (e) => {
                const targetId = a.getAttribute('href').slice(1);
                const target = document.getElementById(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // close nav if open (mobile)
                    if (nav && nav.classList.contains('open')) nav.classList.remove('open');
                }
            });
        });

        // ACTIVE NAV LINK ON SCROLL
        const sections = $$('section[id]');
        const navLinks = $$('nav a[href^="#"]');
        if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
            const obs = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const id = entry.target.id;
                    const link = $('nav a[href="#' + id + '"]');
                    if (link) link.classList.toggle('active', entry.isIntersecting);
                });
            }, { root: null, rootMargin: '0px 0px -40% 0px', threshold: 0.05 });
            sections.forEach(s => obs.observe(s));
        }

        // REVEAL ON SCROLL
        $$('.reveal-on-scroll').forEach(el => el.classList.add('will-reveal'));
        if ('IntersectionObserver' in window) {
            const revObs = new IntersectionObserver((entries, o) => {
                entries.forEach(ent => {
                    if (ent.isIntersecting) {
                        ent.target.classList.add('revealed');
                        o.unobserve(ent.target);
                    }
                });
            }, { threshold: 0.12 });
            $$('.will-reveal').forEach(el => revObs.observe(el));
        } else {
            // fallback
            $$('.will-reveal').forEach(el => el.classList.add('revealed'));
        }

        // PROJECT MODAL (click .project elements with data attributes)
        const projects = $$('.project[data-title]');
        let modal = null;
        function createModal() {
            modal = document.createElement('div');
            modal.className = 'project-modal';
            modal.innerHTML = `