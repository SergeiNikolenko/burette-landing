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
  pointer.style.transform = `translate(${x - screen.left - 2.5}px, ${y - screen.top - 2.5}px)`;
  pointer.dataset.visible = "true";
  await new Promise(resolve => setTimeout(resolve, 700));
  if (cancelled()) { pointer.dataset.visible = "false"; return; }
  pointer.querySelector("svg")?.animate([{ transform: "scale(1)" }, { transform: "scale(.88)", offset: .35 }, { transform: "scale(1)" }], { duration: 220, easing: "ease-out" });
  pointer.querySelector(".presentation-click-ring")?.animate([{ opacity: .65, transform: "scale(.5)" }, { opacity: 0, transform: "scale(1.6)" }], { duration: 420, easing: "ease-out" });
}
