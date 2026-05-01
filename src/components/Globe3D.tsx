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
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(1.8, 4);
    const wire = new THREE.WireframeGeometry(geometry);
    const material = new THREE.LineBasicMaterial({
      color: new THREE.Color("#E8192C"),
      transparent: true,
      opacity: 0.35,
    });
    const lines = new THREE.LineSegments(wire, material);
    scene.add(lines);

    // Inner darker sphere for depth
    const innerGeo = new THREE.IcosahedronGeometry(1.78, 2);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0x0A0A0F });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    scene.add(inner);

    let raf = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      const dt = clock.getDelta();
      // 22s per revolution = 2π/22 rad/s
      lines.rotation.y += (Math.PI * 2 / 22) * dt * speedRef.current;
      inner.rotation.y = lines.rotation.y;
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

    const onEnter = () => { speedRef.current = 1.8; };
    const onLeave = () => { speedRef.current = 1; };
    mount.addEventListener("mouseenter", onEnter);
    mount.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      mount.removeEventListener("mouseenter", onEnter);
      mount.removeEventListener("mouseleave", onLeave);
      renderer.dispose();
      geometry.dispose();
      wire.dispose();
      material.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <div ref={mountRef} className="absolute inset-0 hidden md:block" />
      {/* Mobile fallback */}
      <div className="md:hidden absolute inset-0 red-radial" />
    </div>
  );
}
