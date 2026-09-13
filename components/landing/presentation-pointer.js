// Resolve a real control through the scaled, nested workspace frames.
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
  pointer.style.transform = `translate(${x - screen.left}px, ${y - screen.top}px)`;
  pointer.dataset.visible = "true";
  await new Promise(resolve => setTimeout(resolve, 420));
  if (cancelled()) { pointer.dataset.visible = "false"; return; }
  pointer.animate([{ opacity: 1 }, { opacity: .55 }, { opacity: 1 }], { duration: 160 });
}
