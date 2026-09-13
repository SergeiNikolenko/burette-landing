"use client";

import { useState } from "react";
import records from "@/public/live-data/collection.json";
import LiveScene from "./live-scene";

// A descriptor plot of supplied values, not a simulated embedding or activity map.
const xValue = (row) => Number(row.props["Molecular weight"]);
const yValue = (row) => Number(row.props.SLogP);
const xMin = Math.floor(Math.min(...records.map(xValue)) / 50) * 50;
const xMax = Math.ceil(Math.max(...records.map(xValue)) / 50) * 50;
const yMin = Math.floor(Math.min(...records.map(yValue)));
const yMax = Math.ceil(Math.max(...records.map(yValue)));
const x = (value) => 62 + (value - xMin) / (xMax - xMin) * 442;
const y = (value) => 324 - (value - yMin) / (yMax - yMin) * 288;

export default function PropertyMap() {
  const [selection, setSelection] = useState(null);
  const selected = selection ? records[selection.index] : null;
  const choose = (index) => setSelection({ index });
  return <div className="property-map">
    <div className="property-map-chart">
      <div className="property-map-heading">
        <span>MOSES · descriptor space</span>
        <span>48 molecules</span>
      </div>
      <svg viewBox="0 0 550 390" role="img" aria-label="Molecular weight against SLogP for 48 MOSES molecules. Choose a point or use the molecule selector to inspect its structure.">
        {Array.from({ length: 5 }, (_, i) => {
          const v = yMin + (yMax - yMin) * i / 4;
          return <g key={i}><line x1="62" x2="504" y1={y(v)} y2={y(v)} className="map-grid-line" /><text x="49" y={y(v) + 4} textAnchor="end">{v.toFixed(1)}</text></g>;
        })}
        {Array.from({ length: 5 }, (_, i) => {
          const v = xMin + (xMax - xMin) * i / 4;
          return <text key={i} x={x(v)} y="347" textAnchor="middle">{v.toFixed(0)}</text>;
        })}
        <text x="283" y="379" textAnchor="middle">Molecular weight · g/mol</text>
        <text x="18" y="182" transform="rotate(-90 18 182)" textAnchor="middle">SLogP</text>
        {records.map(row => <circle key={row.index} cx={x(xValue(row))} cy={y(yValue(row))}
          r={selected?.index === row.index ? 8 : 5.5} className={selected?.index === row.index ? "map-point selected" : "map-point"}
          onClick={() => choose(row.index)} aria-hidden="true">
          <title>{`${row.name}: MW ${row.props["Molecular weight"]}, SLogP ${row.props.SLogP}`}</title>
        </circle>)}
      </svg>
      <label className="property-map-select">Inspect a molecule
        <select value={selected?.index ?? ""} onChange={event => { if (event.target.value !== "") choose(Number(event.target.value)); }}>
          <option value="" disabled>Choose a point or molecule</option>
          {records.map(row => <option key={row.index} value={row.index}>{row.name}</option>)}
        </select>
      </label>
      <p className="property-map-detail" aria-live="polite">{selected ? `${selected.name} · MW ${selected.props["Molecular weight"]} · SLogP ${selected.props.SLogP} · TPSA ${selected.props.TPSA} Å²` : "Select a point to bring its structure into view."}</p>
    </div>
    <LiveScene scene="collection" label={selected?.name || "From the map to the molecule"} selection={selection} light="/assets/chemical-space-light.png" dark="/assets/chemical-space-dark.png" />
  </div>;
}
