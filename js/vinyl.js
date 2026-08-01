// Interactive turntable: a drawn vinyl record you can grab and scratch.
// Pure Canvas2D, no dependencies. Spins on its own like a running deck,
// slows to a stop while dragged, spins back up once released.
(function () {
  const canvas = document.getElementById("vinyl-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let size = 0;
  let angle = 0;
  let velocity = reduceMotion ? 0 : 0.012;
  const idleVelocity = 0.012;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    size = rect.width;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener("resize", resize);
  resize();

  function draw() {
    ctx.clearRect(0, 0, size, size);
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - 4;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    // vinyl body
    const grad = ctx.createRadialGradient(0, 0, r * 0.2, 0, 0, r);
    grad.addColorStop(0, "#1c1a17");
    grad.addColorStop(1, "#050505");
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    // grooves
    ctx.strokeStyle = "rgba(244,236,223,0.06)";
    for (let gr = r * 0.42; gr < r * 0.97; gr += size * 0.014) {
      ctx.beginPath();
      ctx.arc(0, 0, gr, 0, Math.PI * 2);
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // label
    const labelR = r * 0.38;
    ctx.beginPath();
    ctx.arc(0, 0, labelR, 0, Math.PI * 2);
    ctx.fillStyle = "#ff5a1f";
    ctx.fill();

    ctx.fillStyle = "#0a0908";
    ctx.font = `700 ${labelR * 0.28}px "Helvetica Neue", Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("flomado.", 0, 0);

    // spindle hole
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.035, 0, Math.PI * 2);
    ctx.fillStyle = "#f4ecdf";
    ctx.fill();

    ctx.restore();

    // outer rim highlight
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(244,236,223,0.14)";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  let dragging = false;
  let lastAngleFromCenter = 0;

  function angleAt(x, y) {
    const rect = canvas.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return Math.atan2(y - cy, x - cx);
  }

  function down(x, y) {
    dragging = true;
    lastAngleFromCenter = angleAt(x, y);
    canvas.style.cursor = "grabbing";
  }
  function move(x, y) {
    if (!dragging) return;
    const a = angleAt(x, y);
    let delta = a - lastAngleFromCenter;
    if (delta > Math.PI) delta -= Math.PI * 2;
    if (delta < -Math.PI) delta += Math.PI * 2;
    angle += delta;
    velocity = delta * 0.6;
    lastAngleFromCenter = a;
  }
  function up() {
    dragging = false;
    canvas.style.cursor = "grab";
  }

  canvas.addEventListener("mousedown", (e) => down(e.clientX, e.clientY));
  window.addEventListener("mousemove", (e) => move(e.clientX, e.clientY));
  window.addEventListener("mouseup", up);
  canvas.addEventListener("touchstart", (e) => { const t = e.touches[0]; down(t.clientX, t.clientY); }, { passive: true });
  canvas.addEventListener("touchmove", (e) => { const t = e.touches[0]; move(t.clientX, t.clientY); }, { passive: true });
  canvas.addEventListener("touchend", up);

  function animate() {
    requestAnimationFrame(animate);
    if (!dragging) {
      velocity += (idleVelocity - velocity) * (reduceMotion ? 1 : 0.02);
      angle += reduceMotion ? 0 : velocity;
    } else {
      // angle already updated directly in move()
    }
    draw();
  }
  animate();
})();
