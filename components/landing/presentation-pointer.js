const positions = new WeakMap();

// Curved travel for distant controls, a short glide for neighboring menu items.
// Keep the tip fixed while the arrow banks; the hit point remains the real DOM
// control even when the workspace and its child viewer use different scales.
async function movePointer(pointer, target, bounds, cancelled) {
  const start = positions.get(pointer) || {
    x: Math.max(16, target.x - 80), y: Math.min(bounds.height - 24, target.y + 55),
  };
  const dx = target.x - start.x, dy = target.y - start.y;
  const distance = Math.hypot(dx, dy);
  const bend = distance > 196 ? Math.min(90, distance * .2) : Math.min(9, distance * .08);
  const control = {
    x: Math.max(12, Math.min(bounds.width - 12, (start.x + target.x) / 2 - dy / (distance || 1) * bend)),
    y: Math.max(12, Math.min(bounds.height - 12, (start.y + target.y) / 2 + dx / (distance || 1) * bend)),
  };
  const duration = Math.min(1250, 380 + distance * 1.1);
  const arrow = pointer.querySelector("svg");
  const begun = performance.now();
  pointer.dataset.visible = "true";
  await new Promise(resolve => {
    const tick = now => {
      if (cancelled()) { pointer.dataset.visible = "false"; resolve(); return; }
      const t = Math.min(1, (now - begun) / duration);
      // Zero velocity and acceleration at either end, without an abrupt stop.
      const u = t * t * t * (t * (t * 6 - 15) + 10);
      const v = 1 - u;
      const point = {
        x: v * v * start.x + 2 * v * u * control.x + u * u * target.x,
        y: v * v * start.y + 2 * v * u * control.y + u * u * target.y,
      };
      const tx = v * (control.x - start.x) + u * (target.x - control.x);
      const ty = v * (control.y - start.y) + u * (target.y - control.y);
      const direction = ((Math.atan2(ty, tx) * 180 / Math.PI + 135 + 540) % 360) - 180;
      const bank = Math.sin(Math.PI * u) * (distance > 196 ? 1 : .2);
      pointer.style.transform = `translate3d(${point.x - 3}px, ${point.y - 3}px, 0)`;
      if (arrow) arrow.style.transform = `rotate(${direction * bank}deg) scale(${1 - .08 * Math.sin(Math.PI * t)}, 1)`;
      positions.set(pointer, point);
      if (t < 1) requestAnimationFrame(tick); else resolve();
    };
    requestAnimationFrame(tick);
  });
}

export async function pointAtControl(frame, pointer, element, cancelled) {
  if (!pointer || !element || cancelled()) return;
  const rect = element.getBoundingClientRect();
  let x = rect.left + rect.width / 2;
  let y = rect.top + rect.height / 2;
  let owner = element.ownerDocument.defaultView.frameElement;
  while (owner) {
    const bounds = owner.getBoundingClientRect();
    x = bounds.left + x * bounds.width / owner.clientWidth;
    y = bounds.top + y * bounds.height / owner.clientHeight;
    if (owner === frame) break;
    owner = owner.ownerDocument.defaultView.frameElement;
  }
  if (owner !== frame) return;
  const screen = pointer.parentElement.getBoundingClientRect();
  await movePointer(pointer, { x: x - screen.left, y: y - screen.top }, screen, cancelled);
  if (cancelled()) return;
  await new Promise(resolve => setTimeout(resolve, 180));
  if (cancelled()) { pointer.dataset.visible = "false"; return; }
  pointer.querySelector("svg")?.animate(
    [{ transform: "scale(1)" }, { transform: "scale(.9)", offset: .35 }, { transform: "scale(1)" }],
    { duration: 220, easing: "ease-out" }
  );
  pointer.querySelector(".presentation-click-ring")?.animate(
    [{ opacity: .5, transform: "scale(.5)" }, { opacity: 0, transform: "scale(1.5)" }],
    { duration: 360, easing: "ease-out" }
  );
}
