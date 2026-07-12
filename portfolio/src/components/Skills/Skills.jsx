import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  CSS3DRenderer,
  CSS3DObject,
} from "three/addons/renderers/CSS3DRenderer.js";

const SKILLS = [
  "React",
  "JavaScript",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Tailwind CSS",
  "Three.js",
  "Git",
  "REST APIs",
  "Python",
  "HTML5",
  "CSS3",
  "Vite",
  "GSAP",
  "Figma",
  "Docker",
];

const ACCENTS = ["#7F77DD", "#1D9E75"];
const SPHERE_RADIUS = 180;
const BASE_SIZE = 500;

// ---- fibonacci sphere point distribution ----
function fibSphere(n, radius) {
  const points = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    points.push({
      x: Math.cos(theta) * r * radius,
      y: y * radius,
      z: Math.sin(theta) * r * radius,
    });
  }
  return points;
}

export default function Skills() {
  const containerRef = useRef(null);
  const webglLayerRef = useRef(null);
  const css3dLayerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const webglLayer = webglLayerRef.current;
    const css3dLayer = css3dLayerRef.current;
    if (!container || !webglLayer || !css3dLayer) return;

    let size = container.clientWidth || BASE_SIZE;

    // ---- scene & camera ----
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 500;

    // ---- WebGLRenderer (transparent ambient particle backdrop) ----
    const webglRenderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    webglRenderer.setClearColor(0x000000, 0);
    webglRenderer.setSize(size, size);
    Object.assign(webglRenderer.domElement.style, {
      position: "absolute",
      top: "0",
      left: "0",
      zIndex: "0",
    });
    webglLayer.appendChild(webglRenderer.domElement);

    // ---- CSS3DRenderer (real DOM tags) ----
    const css3dRenderer = new CSS3DRenderer();
    css3dRenderer.setSize(size, size);
    Object.assign(css3dRenderer.domElement.style, {
      position: "absolute",
      top: "0",
      left: "0",
      zIndex: "1",
      pointerEvents: "none", // re-enabled per-tag below so drag-to-rotate still works on empty space
    });
    css3dLayer.appendChild(css3dRenderer.domElement);

    // ---- ambient particles (subtle depth cue behind the tag sphere) ----
    const particleCount = 220;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = SPHERE_RADIUS + 40 + Math.random() * 60;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    const particlesMat = new THREE.PointsMaterial({
      color: 0x7f77dd,
      size: 2,
      transparent: true,
      opacity: 0.35,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    // ---- tag group: fibonacci-distributed CSS3DObjects ----
    const tagGroup = new THREE.Object3D();
    const tagEls = [];

    const points = fibSphere(SKILLS.length, SPHERE_RADIUS);

    points.forEach((p, i) => {
      const el = document.createElement("div");
      el.className = "skill-tag";
      el.textContent = SKILLS[i];
      el.style.setProperty("--accent", ACCENTS[i % ACCENTS.length]);
      tagEls.push(el);

      const object = new CSS3DObject(el);
      object.position.set(p.x, p.y, p.z);
      // orient the tag's front face outward, away from the sphere's center,
      // so every tag reads correctly as the sphere rotates
      object.lookAt(0, 0, 0);
      object.rotateY(Math.PI);

      tagGroup.add(object);
    });

    scene.add(tagGroup);

    // ---- drag-to-rotate + gentle auto-rotate ----
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let rotY = 0;
    let rotX = 0;
    let autoRotate = true;
    let resumeTimer = null;

    function onPointerDown(e) {
      isDragging = true;
      autoRotate = false;
      clearTimeout(resumeTimer);
      prevX = e.clientX;
      prevY = e.clientY;
    }
    function onPointerMove(e) {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      rotY += dx * 0.005;
      rotX += dy * 0.005;
      rotX = Math.max(Math.min(rotX, Math.PI / 2.2), -Math.PI / 2.2);
      prevX = e.clientX;
      prevY = e.clientY;
    }
    function onPointerUp() {
      if (!isDragging) return;
      isDragging = false;
      resumeTimer = setTimeout(() => {
        autoRotate = true;
      }, 1800);
    }

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // ---- animation loop ----
    let frameId;
    function animate() {
      frameId = requestAnimationFrame(animate);

      if (autoRotate) {
        rotY += 0.0022;
      }

      tagGroup.rotation.y = rotY;
      tagGroup.rotation.x = rotX;
      particles.rotation.y = rotY * 0.5;
      particles.rotation.x = rotX * 0.5;

      webglRenderer.render(scene, camera);
      css3dRenderer.render(scene, camera);
    }
    animate();

    // ---- resize handling ----
    function handleResize() {
      size = container.clientWidth || BASE_SIZE;
      webglRenderer.setSize(size, size);
      css3dRenderer.setSize(size, size);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(resumeTimer);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);

      webglLayer.removeChild(webglRenderer.domElement);
      css3dLayer.removeChild(css3dRenderer.domElement);

      webglRenderer.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      tagEls.length = 0;
    };
  }, []);

  return (
    <section className="skills-section">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&display=swap');

        .skills-section {
          position: relative;
          background: #0a0b10;
          background-image: radial-gradient(circle, rgba(127,119,221,0.12) 1px, transparent 1px);
          background-size: 32px 32px;
          padding: 120px 8vw;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .skills-section * {
          box-sizing: border-box;
        }

        .skills-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .skills-label {
          font-family: 'Inter', sans-serif;
          text-transform: uppercase;
          color: #7F77DD;
          font-size: 12px;
          letter-spacing: 0.15em;
          font-weight: 500;
          margin: 0 0 16px 0;
        }

        .skills-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 40px;
          color: #ffffff;
          margin: 0;
        }

        .skills-sphere-wrap {
          position: relative;
          width: 500px;
          height: 500px;
          max-width: 90vw;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          border-radius: 24px;
          cursor: grab;
        }

        .skills-sphere-wrap:active {
          cursor: grabbing;
        }

        @media (max-width: 560px) {
          .skills-sphere-wrap {
            width: 320px;
            height: 320px;
          }
        }

        .skills-webgl-layer,
        .skills-css3d-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .skills-css3d-layer {
          z-index: 1;
        }

        .skills-webgl-layer {
          z-index: 0;
        }

        /* real DOM tag elements rendered inside the CSS3D scene */
        .skill-tag {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 8px 18px;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 14px;
          color: rgba(255,255,255,0.92);
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 100px;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          white-space: nowrap;
          user-select: none;
          pointer-events: auto;
          cursor: pointer;
          transition: transform 220ms ease, background 220ms ease,
            border-color 220ms ease, box-shadow 220ms ease, color 220ms ease;
        }

        .skill-tag:hover {
          transform: scale(1.15);
          background: color-mix(in srgb, var(--accent) 18%, rgba(255,255,255,0.05));
          border-color: var(--accent);
          color: #ffffff;
          box-shadow: 0 0 24px color-mix(in srgb, var(--accent) 45%, transparent);
        }
      `}</style>

      <div className="skills-header">
        <p className="skills-label">— tech stack</p>
        <h2 className="skills-heading">Skills &amp; Tools</h2>
      </div>

      <div className="skills-sphere-wrap" ref={containerRef}>
        <div className="skills-webgl-layer" ref={webglLayerRef} />
        <div className="skills-css3d-layer" ref={css3dLayerRef} />
      </div>
    </section>
  );
}