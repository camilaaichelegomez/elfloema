// Estilos de la ficha imprimible (B&N). Se renderiza una vez por página.
// Todo en tinta negra; el fondo de la ficha es transparente al imprimir para
// que el papel (kraft) se vea. En pantalla se muestra como una hoja blanca.
export default function FichaEstilos() {
  return (
    <style>{`
      .ficha-page { background:#e9e5db; min-height:100vh; padding:0 0 24mm; }
      .ficha-toolbar {
        display:flex; align-items:center; justify-content:space-between;
        gap:1rem; max-width:170mm; margin:0 auto; padding:1.4rem 1rem 1rem;
        font-family: var(--font-cinzel), serif;
      }
      .ficha-toolbar a {
        color:#3a3226; text-decoration:none; font-size:0.72rem;
        letter-spacing:0.14em; text-transform:uppercase;
      }
      .ficha-toolbar button {
        font-family: var(--font-cinzel), serif; font-size:0.72rem;
        letter-spacing:0.16em; text-transform:uppercase; cursor:pointer;
        color:#f4f1ea; background:#2a241b; border:1px solid #2a241b;
        border-radius:3px; padding:0.7rem 1.6rem;
      }
      .ficha-note {
        text-align:center; font-family: var(--font-crimson), serif;
        font-style:italic; color:#6a5f4e; font-size:0.85rem; margin:0 auto 1rem;
        max-width:170mm; padding:0 1rem;
      }

      .ficha {
        width:150mm; max-width:100%;
        margin:0 auto 10mm; padding:15mm 16mm;
        background:#fff; color:#1a1a1a;
        font-family: var(--font-crimson), Georgia, serif;
        box-shadow:0 3px 22px rgba(0,0,0,0.16);
        box-sizing:border-box;
      }
      .ficha-head { text-align:center; }
      .ficha-marca { font-family: var(--font-cinzel), serif; letter-spacing:0.28em; font-size:11pt; margin:0; }
      .ficha-marca-sub { font-size:7.5pt; letter-spacing:0.16em; text-transform:uppercase; opacity:0.65; margin:1.5mm 0 0; }
      .ficha-rule { height:1px; background:#1a1a1a; opacity:0.3; margin:5mm auto; width:62%; }
      .ficha-nombre { font-family: var(--font-cinzel), serif; font-size:19pt; letter-spacing:0.03em; line-height:1.15; margin:0 0 2mm; }
      .ficha-cat { font-family: var(--font-cinzel), serif; font-size:7.5pt; letter-spacing:0.2em; text-transform:uppercase; opacity:0.6; margin:0; }
      .ficha-meta { font-size:9pt; font-style:italic; opacity:0.72; margin:1.5mm 0 0; }
      .ficha-esencia { font-style:italic; font-size:11pt; line-height:1.5; text-align:center; margin:6mm 0; }
      .ficha-sec { margin:5mm 0; }
      .ficha-h2 { font-family: var(--font-cinzel), serif; font-size:8.5pt; letter-spacing:0.18em; text-transform:uppercase; border-bottom:1px solid rgba(0,0,0,0.22); padding-bottom:1.5mm; margin:0 0 2.5mm; }
      .ficha-lista { list-style:none; padding:0; margin:0; }
      .ficha-lista li { font-size:10.5pt; line-height:1.5; padding-left:6mm; position:relative; margin-bottom:1.2mm; }
      .ficha-lista li::before { content:"\\2767"; position:absolute; left:0; }
      .ficha-texto { font-size:10.5pt; line-height:1.55; margin:0; }
      .ficha-inci { font-size:7.5pt; line-height:1.4; opacity:0.6; margin:6mm 0 0; }
      .ficha-foot { text-align:center; margin-top:7mm; font-size:8pt; opacity:0.72; }
      .ficha-foot p { margin:0.5mm 0; }

      @media print {
        .no-print,
        [aria-label="Abrir carrito"],
        [role="dialog"][aria-label="Carrito de compra"] { display:none !important; }
        .ficha-page { background:#fff; padding:0; }
        .ficha { box-shadow:none; width:auto; max-width:none; margin:0; padding:0; }
        .ficha + .ficha { page-break-before: always; }
        @page { size:A4; margin:16mm; }
      }
    `}</style>
  );
}
