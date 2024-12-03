type ParticleType = {
  size: number;
  top: number;
  left: number;
  upVelocity: number;
  sideVelocity: number;
  spinVal: number;
  spinVelocity: number;
  direction: number;
  element: HTMLDivElement;
};

// Function to create a particle
function createParticle() {
  const parentEl = document.querySelector(this.selector);
  if (!parentEl) {
    return;
  }
  const particle = document.createElement("img");
  let upVelocity = Math.random() * this.yVelocityMax;
  const sideVelocity = Math.random() * this.xVelocityMax;
  const spinVal = Math.random() * 360;
  const spinVelocity =
    Math.random() * this.spinVelocityMax * (Math.random() <= 0.5 ? -1 : 1);
  const direction = Math.random() <= 0.5 ? -1 : 1;
  const size = this.sizes[Math.floor(Math.random() * this.sizes.length)];

  const left = this.position.x;
  const top = this.position.y;

  const imgLength = this.images.length;
  const img = imgLength
    ? this.images[0]
    : this.images[Math.floor(Math.random() * imgLength)];
  particle.src = img; //img as string url
  particle.classList.add("particle");
  particle.setAttribute(
    "style",
    [
      `min-width:${size}px`,
      `width:${size}px`,
      "z-index:1000",
      "pointer-events:none",
      "position:absolute",
      "will-change:transform",
      `top:${top}px`,
      `left:${left}px`,
      `transform:rotate(${spinVal}deg)`,
    ].join(";")
  );

  if (parentEl) {
    parentEl.appendChild(particle);
  }

  this.particles.push({
    left,
    top,
    size,
    sideVelocity,
    upVelocity,
    spinVal,
    spinVelocity,
    direction,
    element: particle,
  });
}

function updateParticles() {
  this.particles = (this.particles as []).filter((p: ParticleType, i) => {
    p.left = p.left - p.sideVelocity * p.direction;
    p.top = p.top - p.upVelocity;
    p.upVelocity = Math.min(p.size, p.upVelocity - 1);
    p.spinVal = p.spinVal + p.spinVelocity;

    p.element.style.top = p.top + "px";
    p.element.style.left = p.left + "px";
    p.element.style.transform = `rotate(${p.spinVal}deg)`;

    if (p.top > window.innerHeight + 50) {
      p.element.remove();
    }
    return true;
  });
}

// Animation loop
function RUN(onComplete: () => void) {
  if (this.particles.length < this.limit) {
    this.createParticle();
  }
  this.updateParticles();

  const allOff = this.particles.every(
    (p: ParticleType) => p.top > window.innerHeight + 50
  );

  if (!allOff) {
    this.animationFrame = requestAnimationFrame(() => this.RUN(onComplete));
  } else {
    this.cancelAnimation();
    this.particles = [];
    onComplete();
  }
}

function cancelAnimation() {
  if (this.animationFrame) {
    cancelAnimationFrame(this.animationFrame);
  }
}

function generate() {
  this.cancelAnimation();
  return new Promise((resolve) => {
    this.RUN(resolve);
  });
}

export function createConfettiInstance(config: {
  selector: string;
  position: { x: number; y: number };
  images: string[];
  sizes?: number[];
  limit?: number;
  yVelocityMax?: number;
  xVelocityMax?: number;
  spinVelocityMax?: number;
}) {
  const defaultConfig = {
    limit: 50,
    sizes: [10, 15, 20, 25, 30, 35],
    yVelocityMax: 40,
    xVelocityMax: 15,
    spinVelocityMax: 35,
    ...config,
  };

  // Validate the required properties
  if (!defaultConfig.selector || typeof defaultConfig.selector !== "string") {
    throw new Error(
      "The 'selector' property is required and must be a string."
    );
  }

  if (
    !defaultConfig.position ||
    typeof defaultConfig.position.x !== "number" ||
    typeof defaultConfig.position.y !== "number"
  ) {
    throw new Error(
      "The 'position' property is required and must be an object with 'x' and 'y' as numbers."
    );
  }

  if (
    !defaultConfig.images ||
    !Array.isArray(defaultConfig.images) ||
    defaultConfig.images.length === 0
  ) {
    throw new Error(
      "The 'images' property is required and must be a non-empty array of image"
    );
  }

  const instance = {
    ...defaultConfig,

    particles: [] as ParticleType[],
    animationFrame: undefined as number | undefined,

    // Create a single particle
    createParticle,

    // Update particle positions
    updateParticles,

    // Main animation loop
    RUN,

    //Cancel the animation
    cancelAnimation,

    // Public method to generate confetti
    generate,
  };
  return instance;
}
