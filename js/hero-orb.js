// Interactive 3D "creative core" — a glowing wireframe icosahedron orbited by
// scattering nodes, standing in for sound/motion/light. Responds to mouse /
// touch drag and drifts on its own when idle.
(function () {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas || typeof THREE === "undefined") return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 7;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const group = new THREE.Group();
  scene.add(group);

  // Core: layered wireframe icosahedron
  const coreGeo = new THREE.IcosahedronGeometry(2, 1);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0xff8a3d,
    wireframe: true,
    transparent: true,
    opacity: 0.55,
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  group.add(core);

  const innerGeo = new THREE.IcosahedronGeometry(1.35, 0);
  const innerMat = new THREE.MeshBasicMaterial({
    color: 0xff3d7f,
    wireframe: true,
    transparent: true,
    opacity: 0.35,
  });
  const inner = new THREE.Mesh(innerGeo, innerMat);
  group.add(inner);

  // Orbiting node points
  const NODES = 60;
  const nodePositions = new Float32Array(NODES * 3);
  for (let i = 0; i < NODES; i++) {
    const r = 3.1 + Math.random() * 0.9;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    nodePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    nodePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    nodePositions[i * 3 + 2] = r * Math.cos(phi);
  }
  const nodeGeo = new THREE.BufferGeometry();
  nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));
  const nodeMat = new THREE.PointsMaterial({ color: 0xffc78a, size: 0.06, transparent: true, opacity: 0.9 });
  const nodes = new THREE.Points(nodeGeo, nodeMat);
  group.add(nodes);

  // A few connecting arcs from core to random nodes
  const arcGeo = new THREE.BufferGeometry();
  const arcVerts = [];
  for (let i = 0; i < 18; i++) {
    const idx = Math.floor(Math.random() * NODES);
    arcVerts.push(0, 0, 0, nodePositions[idx * 3], nodePositions[idx * 3 + 1], nodePositions[idx * 3 + 2]);
  }
  arcGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(arcVerts), 3));
  const arcMat = new THREE.LineBasicMaterial({ color: 0xff6a1a, transparent: true, opacity: 0.25 });
  const arcs = new THREE.LineSegments(arcGeo, arcMat);
  group.add(arcs);

  function resize() {
    const w = canvas.clientWidth || canvas.parentElement.clientWidth;
    const h = canvas.clientHeight || canvas.parentElement.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize);
  resize();

  // Pointer interaction: drag to rotate, otherwise auto-rotate + subtle mouse parallax.
  let dragging = false;
  let lastX = 0, lastY = 0;
  let targetRotX = 0.15, targetRotY = 0;
  let autoRotate = true;
  let parallaxX = 0, parallaxY = 0;

  function pointerDown(x, y) {
    dragging = true;
    autoRotate = false;
    lastX = x; lastY = y;
    canvas.style.cursor = "grabbing";
  }
  function pointerMove(x, y, clientRect) {
    if (dragging) {
      const dx = x - lastX;
      const dy = y - lastY;
      targetRotY += dx * 0.006;
      targetRotX += dy * 0.006;
      lastX = x; lastY = y;
    } else {
      const nx = (x - clientRect.left) / clientRect.width - 0.5;
      const ny = (y - clientRect.top) / clientRect.height - 0.5;
      parallaxX = nx * 0.4;
      parallaxY = ny * 0.4;
    }
  }
  function pointerUp() {
    dragging = false;
    canvas.style.cursor = "grab";
  }

  canvas.addEventListener("mousedown", (e) => pointerDown(e.clientX, e.clientY));
  window.addEventListener("mousemove", (e) => pointerMove(e.clientX, e.clientY, canvas.getBoundingClientRect()));
  window.addEventListener("mouseup", pointerUp);

  canvas.addEventListener("touchstart", (e) => {
    const t = e.touches[0];
    pointerDown(t.clientX, t.clientY);
  }, { passive: true });
  canvas.addEventListener("touchmove", (e) => {
    const t = e.touches[0];
    pointerMove(t.clientX, t.clientY, canvas.getBoundingClientRect());
  }, { passive: true });
  canvas.addEventListener("touchend", pointerUp);

  canvas.addEventListener("mouseleave", () => { parallaxX = 0; parallaxY = 0; });

  let idleTimer = null;
  canvas.addEventListener("mouseup", () => {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => { autoRotate = true; }, 2500);
  });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let t = 0;

  function animate() {
    requestAnimationFrame(animate);
    t += 0.01;

    if (autoRotate && !reduceMotion) {
      targetRotY += 0.003;
    }

    group.rotation.x += (targetRotX + parallaxY - group.rotation.x) * 0.08;
    group.rotation.y += (targetRotY + parallaxX - group.rotation.y) * 0.08;

    if (!reduceMotion) {
      core.rotation.z = t * 0.15;
      inner.rotation.z = -t * 0.2;
      nodes.rotation.y = t * 0.05;
      const pulse = 1 + Math.sin(t * 1.2) * 0.03;
      core.scale.setScalar(pulse);
    }

    renderer.render(scene, camera);
  }
  animate();
})();
