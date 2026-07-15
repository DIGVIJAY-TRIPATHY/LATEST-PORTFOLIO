import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  CSS3DRenderer,
  CSS3DObject,
} from "three/addons/renderers/CSS3DRenderer.js";

// ---------------------------------------------------------------------------
// Data: skills grouped by real category. The category isn't decorative here —
// it drives the accent color, so the sphere actually encodes information
// (what kind of tool each tag is) instead of alternating colors at random.
// ---------------------------------------------------------------------------
const SKILLS = [
  { name: "React", category: "frontend" },
  { name: "JavaScript", category: "language" },
  { name: "Node.js", category: "backend" },
  { name: "Express.js", category: "backend" },
  { name: "MongoDB", category: "backend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Three.js", category: "frontend" },
  { name: "Git", category: "tools" },
  { name: "REST APIs", category: "backend" },
  { name: "Python", category: "language" },
  { name: "HTML5", category: "frontend" },
  { name: "CSS3", category: "frontend" },
  { name: "Vite", category: "tools" },
  { name: "GSAP", category: "frontend" },
  { name: "Figma", category: "tools" },
  { name: "Docker", category: "tools" },
];

const CATEGORY_META = {
  frontend: { color: "#7F77DD", label: "Frontend" },
  backend: { color: "#1D9E75", label: "Backend" },
  language: { color: "#E85D75", label: "Language" },
  tools: { color: "#E0A458", label: "Tooling" },
};

const BASE_SPHERE_RADIUS = 200;
const BASE_SIZE = 500;
const MIN_ZOOM_Z = 320;
const MAX_ZOOM_Z = 720;

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

function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export default function Skills() {
  const containerRef = useRef(null);
  const webglLayerRef = useRef(null);
  const css3dLayerRef = useRef(null);
  const sectionRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [hinted, setHinted] = useState(false);

  // ---- scroll-triggered reveal for the whole section ----
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      section.classList.add("in-view");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("in-view");
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const webglLayer = webglLayerRef.current;
    const css3dLayer = css3dLayerRef.current;
    if (!container || !webglLayer || !css3dLayer) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let size = container.clientWidth || BASE_SIZE;
    let cameraZ = 500;

    // ---- scene & camera ----
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 2000);
    camera.position.z = cameraZ;

    // ---- WebGLRenderer (transparent ambient particle backdrop) ----
    const webglRenderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    webglRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
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

    // ---- ambient particle shell (fewer on small screens for perf) ----
    const particleCount = size < 400 ? 130 : 220;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSeeds = new Float32Array(particleCount); // twinkle phase offsets
    for (let i = 0; i < particleCount; i++) {
      const r = BASE_SPHERE_RADIUS + 40 + Math.random() * 60;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);
      particleSeeds[i] = Math.random() * Math.PI * 2;
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3),
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

    const points = fibSphere(SKILLS.length, BASE_SPHERE_RADIUS);

    points.forEach((p, i) => {
      const skill = SKILLS[i];
      const meta = CATEGORY_META[skill.category] || CATEGORY_META.tools;

      const el = document.createElement("div");
      el.className = "skill-tag";
      el.textContent = skill.name;
      el.setAttribute("role", "listitem");
      el.setAttribute("tabindex", "0");
      el.setAttribute("aria-label", `${skill.name}, ${meta.label} skill`);
      el.style.setProperty("--accent", meta.color);
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

    // ---- drag-to-rotate with inertia + pinch/wheel zoom ----
    const pointers = new Map(); // pointerId -> {x, y}
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let rotY = 0;
    let rotX = 0;
    let velY = 0;
    let velX = 0;
    let autoRotate = !reduceMotion;
    let resumeTimer = null;
    let pinchStartDist = null;
    let pinchStartZ = cameraZ;

    function clearHint() {
      setHinted(true);
    }

    function onPointerDown(e) {
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      clearHint();
      if (pointers.size === 1) {
        isDragging = true;
        autoRotate = false;
        velX = 0;
        velY = 0;
        clearTimeout(resumeTimer);
        prevX = e.clientX;
        prevY = e.clientY;
      } else if (pointers.size === 2) {
        isDragging = false;
        const [a, b] = [...pointers.values()];
        pinchStartDist = dist(a, b);
        pinchStartZ = cameraZ;
      }
    }
    function onPointerMove(e) {
      if (!pointers.has(e.pointerId)) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (pointers.size === 2) {
        const [a, b] = [...pointers.values()];
        const d = dist(a, b);
        if (pinchStartDist) {
          const ratio = pinchStartDist / d;
          cameraZ = Math.min(
            MAX_ZOOM_Z,
            Math.max(MIN_ZOOM_Z, pinchStartZ * ratio),
          );
          camera.position.z = cameraZ;
        }
        return;
      }

      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      const dampen = reduceMotion ? 0.002 : 0.005;
      velY = dx * dampen;
      velX = dy * dampen;
      rotY += velY;
      rotX += velX;
      rotX = Math.max(Math.min(rotX, Math.PI / 2.2), -Math.PI / 2.2);
      prevX = e.clientX;
      prevY = e.clientY;
    }
    function onPointerUp(e) {
      pointers.delete(e.pointerId);
      if (pointers.size < 2) pinchStartDist = null;
      if (!isDragging) return;
      isDragging = false;
      resumeTimer = setTimeout(
        () => {
          autoRotate = !reduceMotion;
        },
        reduceMotion ? 0 : 1800,
      );
    }
    function onWheel(e) {
      e.preventDefault();
      cameraZ = Math.min(
        MAX_ZOOM_Z,
        Math.max(MIN_ZOOM_Z, cameraZ + e.deltaY * 0.6),
      );
      camera.position.z = cameraZ;
    }

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    container.addEventListener("wheel", onWheel, { passive: false });

    // ---- animation loop ----
    let frameId;
    let t = 0;
    function animate() {
      frameId = requestAnimationFrame(animate);
      t += 0.016;

      if (autoRotate) {
        rotY += 0.0022 * (500 / size);
      } else if (
        !isDragging &&
        (Math.abs(velX) > 0.00005 || Math.abs(velY) > 0.00005)
      ) {
        // inertia: coast and decay after release
        rotY += velY;
        rotX += velX;
        rotX = Math.max(Math.min(rotX, Math.PI / 2.2), -Math.PI / 2.2);
        velX *= 0.94;
        velY *= 0.94;
      }

      tagGroup.rotation.y = rotY;
      tagGroup.rotation.x = rotX;
      particles.rotation.y = rotY * 0.5;
      particles.rotation.x = rotX * 0.5;

      if (!reduceMotion) {
        particlesMat.opacity = 0.28 + Math.sin(t * 0.8) * 0.08;
      }

      webglRenderer.render(scene, camera);
      css3dRenderer.render(scene, camera);
    }
    animate();

    // ---- responsive sizing via ResizeObserver (catches layout changes,
    // not just window resizes — sidebars, orientation, container queries) ----
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const next = Math.round(entry.contentRect.width);
      if (!next || next === size) return;
      size = next;
      webglRenderer.setSize(size, size);
      css3dRenderer.setSize(size, size);
    });
    ro.observe(container);

    setReady(true);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(resumeTimer);
      ro.disconnect();
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      container.removeEventListener("wheel", onWheel);

      webglLayer.removeChild(webglRenderer.domElement);
      css3dLayer.removeChild(css3dRenderer.domElement);

      webglRenderer.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      tagEls.length = 0;
    };
  }, []);

  return (
    <section className="skills-section" ref={sectionRef} id="skills">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&display=swap');

        .skills-section {
          position: relative;
          // background: #0a0b10;
          background-image: radial-gradient(circle, rgba(127,119,221,0.12) 1px, transparent 1px);
          background-size: 32px 32px;
          padding: clamp(64px, 12vw, 120px) clamp(20px, 8vw, 96px);
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 700ms ease, transform 700ms ease;
        }

        .skills-section.in-view {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .skills-section {
            transition: none;
          }
        }

        .skills-section * {
          box-sizing: border-box;
        }

        .skills-header {
          text-align: center;
          margin-bottom: clamp(28px, 5vw, 48px);
          max-width: 560px;
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
          font-size: clamp(28px, 6vw, 40px);
          line-height: 1.1;
          background: linear-gradient(135deg, #ffffff 40%, #b9b3f2 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin: 0;
        }

        .skills-legend {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px 18px;
          margin-top: 20px;
        }

        .skills-legend-item {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: rgba(255,255,255,0.55);
        }

        .skills-legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--dot);
          box-shadow: 0 0 8px var(--dot);
          flex-shrink: 0;
        }

        .skills-sphere-outer {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .skills-glow {
          position: absolute;
          inset: -10%;
          background: radial-gradient(circle, rgba(127,119,221,0.16), transparent 65%);
          filter: blur(20px);
          pointer-events: none;
          z-index: -1;
        }

        .skills-sphere-wrap {
          position: relative;
          width: clamp(280px, 60vw, 500px);
          height: clamp(280px, 60vw, 500px);
          max-width: 90vw;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          border-radius: 24px;
          cursor: grab;
          touch-action: none;
          opacity: 0;
          transition: opacity 500ms ease;
        }

        .skills-sphere-wrap.ready {
          opacity: 1;
        }

        .skills-sphere-wrap:active {
          cursor: grabbing;
        }

        .skills-hint {
          margin-top: 18px;
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.02em;
          transition: opacity 400ms ease;
        }

        .skills-hint.hidden {
          opacity: 0;
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
          padding: clamp(6px, 1.6vw, 8px) clamp(12px, 3vw, 18px);
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: clamp(11px, 2.6vw, 14px);
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

        .skill-tag:hover,
        .skill-tag:focus-visible {
          transform: scale(1.15);
          background: color-mix(in srgb, var(--accent) 18%, rgba(255,255,255,0.05));
          border-color: var(--accent);
          color: #ffffff;
          box-shadow: 0 0 24px color-mix(in srgb, var(--accent) 45%, transparent);
        }

        .skill-tag:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 3px;
        }

        @media (prefers-reduced-motion: reduce) {
          .skill-tag {
            transition: background 220ms ease, border-color 220ms ease,
              box-shadow 220ms ease, color 220ms ease;
          }
          .skill-tag:hover,
          .skill-tag:focus-visible {
            transform: none;
          }
        }
      `}</style>

      <div className="skills-header">
        <p className="skills-label">— tech stack</p>
        <h2 className="skills-heading">Skills &amp; Tools</h2>
        <div className="skills-legend" aria-hidden="true">
          {Object.values(CATEGORY_META).map((meta) => (
            <span className="skills-legend-item" key={meta.label}>
              <span
                className="skills-legend-dot"
                style={{ "--dot": meta.color }}
              />
              {meta.label}
            </span>
          ))}
        </div>
      </div>

      <div className="skills-sphere-outer">
        <div className="skills-glow" aria-hidden="true" />
        <div
          className={`skills-sphere-wrap${ready ? " ready" : ""}`}
          ref={containerRef}
          role="list"
          aria-label={`Skill sphere: ${SKILLS.map((s) => s.name).join(", ")}. Drag to rotate, scroll or pinch to zoom.`}
        >
          <div className="skills-webgl-layer" ref={webglLayerRef} />
          <div className="skills-css3d-layer" ref={css3dLayerRef} />
        </div>
        <p
          className={`skills-hint${hinted ? " hidden" : ""}`}
          aria-hidden="true"
        >
          drag to rotate · scroll to zoom
        </p>
      </div>
    </section>
  );
}
