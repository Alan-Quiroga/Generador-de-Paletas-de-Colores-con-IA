document.getElementById('generateBtn').addEventListener('click', () => {
  const color = document.getElementById('colorInput').value;
  generarPaletaCompleta(color);
});

function generarPaletaCompleta(baseColor) {
  const bestPalette = generarPaletaIA(baseColor);
  mostrarPaleta(bestPalette, 'bestPalette');

  const fondos = sugerirFondos(bestPalette);
  mostrarFondos(fondos, 'bestBackgrounds', baseColor);

  mostrarPaleta(generarAnalogos(baseColor), 'analogousPalette', 'Análogos');
  mostrarPaleta(generarComplementarios(baseColor), 'complementaryPalette', 'Complementarios');
  mostrarPaleta(generarMonocromatica(baseColor), 'monochromePalette', 'Monocromáticos');
  mostrarPaleta(generarPasteles(baseColor), 'pastelPalette', 'Pasteles');
  mostrarPaleta(generarTriadicos(baseColor), 'triadicPalette', 'Triádicos');
  mostrarPaleta(generarTetradicos(baseColor), 'tetradicPalette', 'Tetrádicos');
  mostrarPaleta(generarSplitComplementarios(baseColor), 'splitComplementaryPalette', 'Split-Complementarios');
}

// ================= PALETA PRINCIPAL IA =================
function generarPaletaIA(baseHex) {
  const base = hexToHSL(baseHex);

  const sombraProfunda = hslToHex(base.h, base.s * 0.6, base.l * 0.35);  // menos saturación y luz
  const sombraSuave = hslToHex(base.h, base.s, base.l * 0.6);
  const luz = hslToHex(base.h, base.s, Math.min(base.l * 1.2, 95));
  const brillo = hslToHex(base.h, base.s * 0.5, Math.min(base.l * 1.4, 98));

  return [
    baseHex,          // Medio tono
    sombraProfunda,   // Sombra intensa
    sombraSuave,      // Sombra leve
    luz,              // Luz
    brillo            // Resalte
  ];
}


function sugerirFondos(paleta) {
  return paleta.map(color => {
    const hsl = hexToHSL(color);
    return hslToHex(hsl.h, hsl.s * 0.2, Math.min(hsl.l * 1.5, 95));
  });
}

// ============== FUNCIONES DE PALETAS CLÁSICAS ==============

function generarAnalogos(hex) {
  const hsl = hexToHSL(hex);
  return [
    hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l),
    hex,
    hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l)
  ];
}

function generarComplementarios(hex) {
  const hsl = hexToHSL(hex);
  return [
    hex,
    hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l)
  ];
}

function generarMonocromatica(hex) {
  const hsl = hexToHSL(hex);
  return [
    hslToHex(hsl.h, hsl.s, hsl.l * 0.7),
    hex,
    hslToHex(hsl.h, hsl.s, Math.min(hsl.l * 1.3, 100))
  ];
}

function generarPasteles(hex) {
  const hsl = hexToHSL(hex);
  return [
    hslToHex(hsl.h, hsl.s * 0.3, 90),
    hslToHex(hsl.h, hsl.s * 0.4, 85),
    hslToHex(hsl.h, hsl.s * 0.2, 92)
  ];
}

function generarTriadicos(hex) {
  const hsl = hexToHSL(hex);
  return [
    hex,
    hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l),
    hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l)
  ];
}

function generarTetradicos(hex) {
  const hsl = hexToHSL(hex);
  return [
    hex,
    hslToHex((hsl.h + 90) % 360, hsl.s, hsl.l),
    hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l),
    hslToHex((hsl.h + 270) % 360, hsl.s, hsl.l)
  ];
}

function generarSplitComplementarios(hex) {
  const hsl = hexToHSL(hex);
  return [
    hex,
    hslToHex((hsl.h + 150) % 360, hsl.s, hsl.l),
    hslToHex((hsl.h + 210) % 360, hsl.s, hsl.l)
  ];
}

// ============== VISUALIZACIÓN ==============

function mostrarPaleta(colores, contenedorId, titulo = '') {
  const contenedor = document.getElementById(contenedorId);
  contenedor.innerHTML = '';

  if (titulo) {
    const h3 = document.createElement('h3');
    h3.textContent = titulo;
    contenedor.appendChild(h3);
  }

  const roles = [
    '🎨 Medio Tono',
    '🌑 Sombra Intensa',
    '🌘 Sombra Suave',
    '💡 Luz',
    '✨ Brillo'
  ];

  colores.forEach((color, i) => {
    const swatch = document.createElement('div');
    swatch.className = 'color-swatch palette-block';
    swatch.style.backgroundColor = color;
    swatch.title = roles[i] || color;

    const code = document.createElement('span');
    code.textContent = color;

    swatch.appendChild(code);
    contenedor.appendChild(swatch);
  });
}


function mostrarFondos(fondos, contenedorId, baseColor = '#000') {
  const contenedor = document.getElementById(contenedorId);
  contenedor.innerHTML = '';

  fondos.forEach(fondo => {
    const label = document.createElement('div');
    label.className = 'color-box';
    label.style.backgroundColor = fondo;
    label.style.color = baseColor; // ← aquí aplicamos el color base como texto
    label.textContent = fondo;
    contenedor.appendChild(label);
  });
}



// ============== UTILIDADES HEX <-> HSL ==============

function hexToHSL(H) {
  let r = parseInt(H.slice(1, 3), 16) / 255;
  let g = parseInt(H.slice(3, 5), 16) / 255;
  let b = parseInt(H.slice(5, 7), 16) / 255;

  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin;

  let h = 0, s = 0, l = 0;

  if (delta === 0) h = 0;
  else if (cmax === r) h = ((g - b) / delta) % 6;
  else if (cmax === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);
  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return { h, s, l };
}

function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs((h / 60) % 2 - 1));
  let m = l - c / 2, r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) { r = c; g = x; }
  else if (60 <= h && h < 120) { r = x; g = c; }
  else if (120 <= h && h < 180) { g = c; b = x; }
  else if (180 <= h && h < 240) { g = x; b = c; }
  else if (240 <= h && h < 300) { r = x; b = c; }
  else { r = c; b = x; }

  r = Math.round((r + m) * 255).toString(16).padStart(2, '0');
  g = Math.round((g + m) * 255).toString(16).padStart(2, '0');
  b = Math.round((b + m) * 255).toString(16).padStart(2, '0');

  return `#${r}${g}${b}`;
}

