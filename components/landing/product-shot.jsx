import ExpandableShot from "./expandable-shot";

// Kept as the name every section already imports, but the frame itself now lives
// in ExpandableShot so the card and the opened dialog cannot drift apart.
export default function ProductShot(props) {
  return <ExpandableShot {...props} />;
}
