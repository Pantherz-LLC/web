const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let starsArray = [];
const numberOfStars = 400; // Number of stars

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5; // Slightly larger minimum size to avoid flickering
        this.alpha = Math.random() * 0.5 + 0.5; // Start with a random alpha between 0.5 and 1
        this.fadeDirection = Math.random() > 0.5 ? 1 : -1; // Randomly decide to fade in or out
        this.fadeSpeed = Math.random() * 0.004 + 0.002; // Slightly quicker fading speed
    }

    update() {
        this.alpha += this.fadeSpeed * this.fadeDirection;

        // Ensure stars fade slowly and smoothly
        if (this.alpha <= 0.5) {
            this.fadeDirection = 1;
        }
        if (this.alpha >= 1) {
            this.fadeDirection = -1;
        }
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.restore();
    }
}

function initStars() {
    starsArray = [];
    for (let i = 0; i < numberOfStars; i++) {
        starsArray.push(new Star());
    }
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < starsArray.length; i++) {
        starsArray[i].update();
        starsArray[i].draw();
    }

    requestAnimationFrame(animateStars);
}

initStars();
animateStars();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars(); // Reinitialize stars for the new canvas size
});
