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
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(4.5, 3.5, 7);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const lineColor = new THREE.Color("#E8192C");
    const innerColor = 0x0A0A0F;

    const group = new THREE.Group();
    scene.add(group);

    const matsToResize: LineMaterial[] = [];

    const makeThickEdges = (
      geo: THREE.BufferGeometry,
      linewidth: number,
      opacity = 1
    ) => {
      const edges = new THREE.EdgesGeometry(geo);
      const lsg = new LineSegmentsGeometry().fromEdgesGeometry(edges);
      const mat = new LineMaterial({
        color: lineColor.getHex(),
        linewidth,
        transparent: true,
        opacity,
        depthTest: true,
      });
      mat.resolution.set(width, height);
      const seg = new LineSegments2(lsg, mat);
      seg.computeLineDistances();
      return { seg, mat };
    };

    // Stack of 3 symmetric wireframe cubes, offset horizontally + vertically
    const cubeGeo = new THREE.BoxGeometry(2, 2, 2);
    const offsets: Array<[number, number, number, number, number]> = [
      // x, y, z, linewidth, opacity
      [-1.4, 1.4, -0.6, 4.5, 1],
      [0, 0, 0, 5, 1],
      [1.4, -1.4, 0.6, 4.5, 1],
    ];

    offsets.forEach(([x, y, z, lw, op]) => {
      const fill = new THREE.Mesh(
        cubeGeo,
        new THREE.MeshBasicMaterial({ color: innerColor })
      );
      fill.position.set(x, y, z);
      group.add(fill);

      const { seg, mat } = makeThickEdges(cubeGeo, lw, op);
      seg.position.set(x, y, z);
      group.add(seg);
      matsToResize.push(mat);
    });

    let raf = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      const dt = clock.getDelta();
      group.rotation.y += (Math.PI * 2 / 30) * dt * speedRef.current;
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
