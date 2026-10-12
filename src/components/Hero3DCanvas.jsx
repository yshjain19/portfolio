import { useEffect, useRef } from 'react';

/**
 * Interactive 3D Wireframe Polytope & Particle Swarm Canvas
 * Pure mathematical 3D perspective projection (X, Y, Z -> 2D Screen)
 * Interactive mouse-directed rotation, ambient floating drift, and theme adaptation.
 */
export default function Hero3DCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = canvas.getContext('2d');
    let animId;
    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    // 3D Geometry: Regular Icosahedron vertices (Golden ratio φ)
    const phi = (1 + Math.sqrt(5)) / 2;
    const baseVertices = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1],
    ].map(([x, y, z]) => {
      const len = Math.hypot(x, y, z);
      return [x / len, y / len, z / len];
    });

    // Outer ring nodes & connecting edges
    const edges = [];
    for (let i = 0; i < baseVertices.length; i++) {
      for (let j = i + 1; j < baseVertices.length; j++) {
        const dx = baseVertices[i][0] - baseVertices[j][0];
        const dy = baseVertices[i][1] - baseVertices[j][1];
        const dz = baseVertices[i][2] - baseVertices[j][2];
        const dist = Math.hypot(dx, dy, dz);
        // Golden ratio edge length in normalized sphere is ~1.05
        if (dist > 0.95 && dist < 1.15) {
          edges.push([i, j]);
        }
      }
    }

    // 3D Orbiting Particle Dust
    const PARTICLE_COUNT = 36;
    const particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phiAngle = Math.acos(Math.random() * 2 - 1);
      const radius = 1.35 + Math.random() * 0.9;
      particles.push({
        x: radius * Math.sin(phiAngle) * Math.cos(theta),
        y: radius * Math.sin(phiAngle) * Math.sin(theta),
        z: radius * Math.cos(phiAngle),
        speed: (Math.random() * 0.006 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
        size: Math.random() * 1.8 + 1.2,
      });
    }

    // Rotation and physics state
    let rotX = 0.2;
    let rotY = 0.4;
    let rotZ = 0;
    let targetRotSpeedX = 0.003;
    let targetRotSpeedY = 0.005;
    let mouseX = 0;
    let mouseY = 0;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / width - 0.5;
      mouseY = (e.clientY - rect.top) / height - 0.5;
      targetRotSpeedY = mouseX * 0.035;
      targetRotSpeedX = -mouseY * 0.035;
    };

    const handlePointerLeave = () => {
      targetRotSpeedX = 0.003;
      targetRotSpeedY = 0.005;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);

    // 3D Matrix Math
    const rotatePoint = (x, y, z, ax, ay, az) => {
      // Rotate X
      const cosX = Math.cos(ax);
      const sinX = Math.sin(ax);
      const y1 = y * cosX - z * sinX;
      const z1 = y * sinX + z * cosX;

      // Rotate Y
      const cosY = Math.cos(ay);
      const sinY = Math.sin(ay);
      const x2 = x * cosY + z1 * sinY;
      const z2 = -x * sinY + z1 * cosY;

      // Rotate Z
      const cosZ = Math.cos(az);
      const sinZ = Math.sin(az);
      const x3 = x2 * cosZ - y1 * sinZ;
      const y3 = x2 * sinZ + y1 * cosZ;

      return [x3, y3, z2];
    };

    // Perspective Projection
    const project = (x, y, z, scale, cx, cy) => {
      const cameraDistance = 3.2;
      const pz = z + cameraDistance;
      const fov = 420;
      const factor = (fov / pz) * scale;
      return [cx + x * factor, cy + y * factor, pz];
    };


    const render = () => {

      // Check current theme
      const isDark = document.documentElement.classList.contains('dark');

      // Update rotation
      rotX += targetRotSpeedX;
      rotY += targetRotSpeedY;
      rotZ += 0.001;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const geoScale = Math.min(width, height) * 0.28;

      // Project vertices
      const projectedVertices = baseVertices.map(([vx, vy, vz]) => {
        const [rx, ry, rz] = rotatePoint(vx, vy, vz, rotX, rotY, rotZ);
        const [sx, sy, depth] = project(rx, ry, rz, geoScale, cx, cy);
        return { sx, sy, rz, depth };
      });

      // Draw Edges with depth fading
      edges.forEach(([i, j]) => {
        const v1 = projectedVertices[i];
        const v2 = projectedVertices[j];
        const avgZ = (v1.rz + v2.rz) / 2;
        // Normalized depth alpha: foreground is bright, background is dimmer
        const alpha = Math.max(0.12, Math.min(0.85, (avgZ + 1.2) / 2.4));

        ctx.beginPath();
        ctx.moveTo(v1.sx, v1.sy);
        ctx.lineTo(v2.sx, v2.sy);

        if (isDark) {
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.45})`;
          ctx.lineWidth = alpha > 0.5 ? 1.4 : 0.85;
        } else {
          ctx.strokeStyle = `rgba(37, 99, 235, ${alpha * 0.35})`;
          ctx.lineWidth = alpha > 0.5 ? 1.3 : 0.75;
        }
        ctx.stroke();
      });

      // Draw Vertices / Glowing nodes
      projectedVertices.forEach((v) => {
        const alpha = Math.max(0.25, Math.min(1, (v.rz + 1.2) / 2.4));
        const radius = Math.max(1.8, (v.rz + 1.4) * 2.2);

        // Halo glow
        if (alpha > 0.55) {
          ctx.beginPath();
          ctx.arc(v.sx, v.sy, radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = isDark
            ? `rgba(99, 102, 241, ${alpha * 0.22})`
            : `rgba(59, 130, 246, ${alpha * 0.15})`;
          ctx.fill();
        }

        // Core dot
        ctx.beginPath();
        ctx.arc(v.sx, v.sy, radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(224, 242, 254, ${alpha})`
          : `rgba(30, 58, 138, ${alpha})`;
        ctx.fill();
      });

      // Update and Draw Orbiting Particles
      particles.forEach((p) => {
        // Orbit around Y axis
        const cosSpeed = Math.cos(p.speed);
        const sinSpeed = Math.sin(p.speed);
        const px = p.x * cosSpeed - p.z * sinSpeed;
        const pz = p.x * sinSpeed + p.z * cosSpeed;
        p.x = px;
        p.z = pz;

        const [rx, ry, rz] = rotatePoint(p.x, p.y, p.z, rotX * 0.7, rotY * 0.7, rotZ);
        const [sx, sy] = project(rx, ry, rz, geoScale, cx, cy);
        const alpha = Math.max(0.15, Math.min(0.9, (rz + 2) / 4));

        ctx.beginPath();
        ctx.arc(sx, sy, p.size * (alpha + 0.3), 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(52, 211, 153, ${alpha * 0.7})`
          : `rgba(16, 185, 129, ${alpha * 0.6})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return (
    <div className="hero-3d-canvas-wrap" aria-hidden="true">
      <canvas ref={canvasRef} className="hero-3d-canvas" />
      <div className="hero-3d-glow" />
    </div>
  );
}
