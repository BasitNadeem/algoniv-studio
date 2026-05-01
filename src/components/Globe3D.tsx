import { useEffect, useRef } from "react";
import * as THREE from "three";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { LineSegments2 } from "three/examples/jsm/lines/LineSegments2.js";
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry.js";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";

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

    const lineColor = new THREE.Color("#E8192C");
    const innerColor = 0x0A0A0F;

    const group = new THREE.Group();
    scene.add(group);

    const makeThickEdges = (
      geo: THREE.BufferGeometry,
      linewidth: number,
      opacity = 0.95
    ) => {
      const edges = new THREE.EdgesGeometry(geo);
      const lsg = new LineSegmentsGeometry().fromEdgesGeometry(edges);
      const mat = new LineMaterial({
        color: lineColor.getHex(),
        linewidth, // in pixels
        transparent: true,
        opacity,
        depthTest: true,
      });
      mat.resolution.set(width, height);
      const seg = new LineSegments2(lsg, mat);
      seg.computeLineDistances();
      return { seg, mat };
    };

    const matsToResize: LineMaterial[] = [];

    // --- Core: icosahedron (symmetric, premium) ---
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 0);
    const coreFill = new THREE.Mesh(
      coreGeo,
      new THREE.MeshBasicMaterial({ color: innerColor })
    );
    group.add(coreFill);
    const core = makeThickEdges(coreGeo, 4.5, 1);
    group.add(core.seg);
    matsToResize.push(core.mat);

    // --- Outer dodecahedron shell (slightly larger, faded) ---
    const shellGeo = new THREE.DodecahedronGeometry(2.4, 0);
    const shell = makeThickEdges(shellGeo, 3, 0.45);
    group.add(shell.seg);
    matsToResize.push(shell.mat);

    // --- Three orthogonal orbital rings ---
    const ringGroup = new THREE.Group();
    group.add(ringGroup);

    const makeRing = (
      radius: number,
      rotX: number,
      rotY: number,
      rotZ: number,
      lw: number,
      opacity: number
    ) => {
      const segments = 128;
      const positions: number[] = [];
      for (let i = 0; i <= segments; i++) {
        const a = (i / segments) * Math.PI * 2;
        positions.push(Math.cos(a) * radius, Math.sin(a) * radius, 0);
      }
      const geo = new LineGeometry();
      geo.setPositions(positions);
      const mat = new LineMaterial({
        color: lineColor.getHex(),
        linewidth: lw,
        transparent: true,
        opacity,
      });
      mat.resolution.set(width, height);
      const line = new Line2(geo, mat);
      line.computeLineDistances();
      line.rotation.set(rotX, rotY, rotZ);
      ringGroup.add(line);
      matsToResize.push(mat);
      return line;
    };

    makeRing(2.9, 0, 0, 0, 3, 0.7);
    makeRing(2.9, Math.PI / 2, 0, 0, 3, 0.55);
    makeRing(2.9, 0, Math.PI / 2, Math.PI / 4, 3, 0.4);

    let raf = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      const dt = clock.getDelta();
      group.rotation.y += (Math.PI * 2 / 50) * dt * speedRef.current;
      group.rotation.x += (Math.PI * 2 / 120) * dt * speedRef.current;
      ringGroup.rotation.z += (Math.PI * 2 / 80) * dt * speedRef.current;
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
      matsToResize.forEach((m) => m.resolution.set(w, h));
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
