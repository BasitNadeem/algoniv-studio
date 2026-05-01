import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Globe3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef(1);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    if (window.innerWidth < 768) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Group of angular wireframe boxes — Triage-style
    const group = new THREE.Group();
    scene.add(group);

    type BoxDef = { size: [number, number, number]; pos: [number, number, number]; rot: [number, number, number] };
    const defs: BoxDef[] = [
      { size: [2.4, 1.4, 1.4], pos: [-1.2, 0.8, 0], rot: [0.3, 0.5, 0.15] },
      { size: [2.0, 1.2, 1.2], pos: [1.4, -0.4, -0.5], rot: [-0.2, 0.8, -0.1] },
      { size: [1.6, 1.0, 1.0], pos: [0.2, -1.6, 0.6], rot: [0.4, -0.3, 0.2] },
      { size: [1.4, 0.9, 0.9], pos: [2.6, 1.6, -0.8], rot: [0.1, 1.1, 0.3] },
    ];

    const innerColor = 0x0A0A0F;
    const lineColor = new THREE.Color("#E8192C");

    defs.forEach((d) => {
      const geo = new THREE.BoxGeometry(...d.size);
      // Solid inner fill (matches background) to occlude back edges
      const fill = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: innerColor }));
      fill.position.set(...d.pos);
      fill.rotation.set(...d.rot);
      group.add(fill);

      // Wireframe outline
      const edges = new THREE.EdgesGeometry(geo);
      const lines = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: lineColor, transparent: true, opacity: 0.55 })
      );
      lines.position.set(...d.pos);
      lines.rotation.set(...d.rot);
      group.add(lines);
    });

    let raf = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      const dt = clock.getDelta();
      group.rotation.y += (Math.PI * 2 / 40) * dt * speedRef.current;
      group.rotation.x += (Math.PI * 2 / 90) * dt * speedRef.current;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    const onEnter = () => { speedRef.current = 1.6; };
    const onLeave = () => { speedRef.current = 1; };
    mount.addEventListener("mouseenter", onEnter);
    mount.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      mount.removeEventListener("mouseenter", onEnter);
      mount.removeEventListener("mouseleave", onLeave);
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <div ref={mountRef} className="absolute inset-0 hidden md:block" />
      <div className="md:hidden absolute inset-0 red-radial" />
    </div>
  );
}
