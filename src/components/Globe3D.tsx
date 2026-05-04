import { useEffect, useRef } from "react";
import * as THREE from "three";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { LineSegments2 } from "three/examples/jsm/lines/LineSegments2.js";
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry.js";

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
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0, 11);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const lineColor = new THREE.Color("#E8192C");
    const innerColor = 0x0A0A0F;

    const root = new THREE.Group();
    scene.add(root);

    const matsToResize: LineMaterial[] = [];

    // Build a slab: wireframe box + internal horizontal line "ribs" on the front face
    const buildSlab = (
      w: number,
      h: number,
      d: number,
      ribCount: number,
      edgeLW: number,
      ribLW: number
    ) => {
      const slab = new THREE.Group();

      // solid inner fill to occlude back edges
      const fill = new THREE.Mesh(
        new THREE.BoxGeometry(w, h, d),
        new THREE.MeshBasicMaterial({ color: innerColor })
      );
      slab.add(fill);

      // outline edges
      const edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d));
      const lsg = new LineSegmentsGeometry().fromEdgesGeometry(edges);
      const edgeMat = new LineMaterial({
        color: lineColor.getHex(),
        linewidth: edgeLW,
        transparent: true,
        opacity: 1,
      });
      edgeMat.resolution.set(width, height);
      const edgeSeg = new LineSegments2(lsg, edgeMat);
      edgeSeg.computeLineDistances();
      slab.add(edgeSeg);
      matsToResize.push(edgeMat);

      // internal horizontal ribs (front + top faces) — gives the striped slab look
      const ribPositions: number[] = [];
      const halfW = w / 2;
      const halfH = h / 2;
      const halfD = d / 2;
      // front face ribs (vary y)
      for (let i = 1; i < ribCount; i++) {
        const y = -halfH + (h * i) / ribCount;
        ribPositions.push(-halfW, y, halfD, halfW, y, halfD);
      }
      // top face ribs (vary z)
      for (let i = 1; i < ribCount; i++) {
        const z = -halfD + (d * i) / ribCount;
        ribPositions.push(-halfW, halfH, z, halfW, halfH, z);
      }
      const ribGeo = new LineSegmentsGeometry();
      ribGeo.setPositions(ribPositions);
      const ribMat = new LineMaterial({
        color: lineColor.getHex(),
        linewidth: ribLW,
        transparent: true,
        opacity: 0.55,
      });
      ribMat.resolution.set(width, height);
      const ribSeg = new LineSegments2(ribGeo, ribMat);
      ribSeg.computeLineDistances();
      slab.add(ribSeg);
      matsToResize.push(ribMat);

      return slab;
    };

    // Three stacked slabs, offset horizontally + vertically with depth
    const slabSpecs: Array<{ pos: [number, number, number] }> = [
      { pos: [-1.6, 1.7, -0.6] },
      { pos: [0, 0, 0] },
      { pos: [1.6, -1.7, 0.6] },
    ];

    slabSpecs.forEach(({ pos }) => {
      const s = buildSlab(4.2, 1.4, 1.4, 14, 3.5, 1.5);
      s.position.set(...pos);
      root.add(s);
    });

    // Tilt the whole composition for that isometric / architectural feel
    root.rotation.x = -0.35;
    root.rotation.z = 0.15;

    let raf = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      const dt = clock.getDelta();
      root.rotation.y += (Math.PI * 2 / 40) * dt * speedRef.current;
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
