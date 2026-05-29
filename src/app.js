// === NEURAL NETWORK CANVAS ===
const canvas = document.getElementById('neural-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
const PARTICLE_COUNT = 80;
const CONNECTION_DIST = 150;
let mouse = { x: -1000, y: -1000 };

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.r = Math.random() * 1.5 + 0.5;
    }
    update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(74,158,255,0.4)';
        ctx.fill();
    }
}

for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

function animateNetwork() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < CONNECTION_DIST) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(74,158,255,${0.08 * (1 - dist / CONNECTION_DIST)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
        // mouse interaction
        const mdx = particles[i].x - mouse.x;
        const mdy = particles[i].y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 200) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(74,158,255,${0.12 * (1 - mdist / 200)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
        }
    }
    requestAnimationFrame(animateNetwork);
}
animateNetwork();

// Typing effect removed — static subtitle in use

// === HAMBURGER MENU ===
document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('nav-list').classList.toggle('open');
});

// === SMOOTH SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const t = document.querySelector(a.getAttribute('href'));
        if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
        document.getElementById('nav-list').classList.remove('open');
    });
});

// === SCROLL REVEAL ===
const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// === NAV SCROLL SPY ===
window.addEventListener('scroll', () => {
    const secs = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-links a');
    let cur = '';
    secs.forEach(s => {
        if (scrollY >= s.offsetTop - 120) cur = s.id;
    });
    links.forEach(l => {
        l.classList.remove('active');
        if (l.getAttribute('href') === '#' + cur) l.classList.add('active');
    });
});

// === PROJECT FILTER ===
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.cat;
        document.querySelectorAll('.project-card').forEach(card => {
            if (cat === 'all' || card.dataset.cat === cat) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// === CONTACT FORM ===
document.getElementById('contact-form').addEventListener('submit', e => {
    e.preventDefault();
    const btn = e.target.querySelector('.submit-btn');
    btn.textContent = '> TRANSMITTED ✓';
    btn.style.color = '#28c840';
    btn.style.borderColor = '#28c840';
    setTimeout(() => {
        btn.textContent = '> TRANSMIT';
        btn.style.color = '';
        btn.style.borderColor = '';
        e.target.reset();
    }, 2500);
});

// === CV DOWNLOAD ===
function downloadCV() {
    const link = document.createElement('a');
    link.href = 'src/SyedSameer_Resume.pdf';
    link.download = 'SyedSameer_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
