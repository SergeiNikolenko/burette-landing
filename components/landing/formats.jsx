import Link from "next/link";

const FORMATS = [
  [
    "Structures & trajectories",
    "PDB, CIF, mmCIF, SDF, MOL2, XYZ, GRO",
    "Interactive molecular views with Mol*.",
  ],
  [
    "Collections & reactions",
    "SMILES, CSV, TSV, SD, DWAR, RXN, RDF",
    "Structures and properties, ready to search and compare.",
  ],
  [
    "Quantum chemistry",
    "CUBE, LOG, OUT, PSI4, VASP, MAE",
    "Vector artwork with the optional xyzrender engine.",
  ],
];

export default function Formats() {
  return (
    <section
      id="formats"
      aria-labelledby="formats-title"
      className="quiet-section page-width"
    >
      <div className="chapter-heading">
        <div>
          <p className="section-label">Fits your workflow</p>
          <h2 id="formats-title">
            The files you
            <br />
            already work with.
          </h2>
        </div>
        <Link href="/docs/formats" className="text-link">
          View all supported formats <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <dl className="format-list">
        {FORMATS.map(([title, extensions, description]) => (
          <div key={title}>
            <dt>{title}</dt>
            <dd>
              <p>{extensions}</p>
              <p>{description}</p>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
