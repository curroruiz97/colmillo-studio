import { readFile, readdir, stat } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';
import process from 'node:process';
import { fileURLToPath, URL } from 'node:url';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const forbidden = [
  'data-dev-placeholder',
  'DEMO FICTICIA',
  'demo-fauce-elastica',
  'demo-pulso-molar',
  'demo-rastro-naranja',
  'demo-muesca-doble',
  'demo-capas-en-tension',
  'demo-materia',
  'demo-umbral',
  'demo-volumen',
  'demo-ritmo',
  'demo-fragmento',
  'Fauce Elástica',
  'Pulso Molar',
  'Rastro Naranja',
  'Muesca Doble',
  'Capas en Tensión',
  'Caso de demostración técnica',
  'Sin cliente: demostración interna',
  /*
   * The demonstration case studies' invented client names (2026-09-23). Every
   * project in `src/data/caseStudies.ts` carries one, and they are listed here
   * in full: the template prints a client's name as a real brand, so a demo
   * string that now looks like a client must be caught exactly like a demo
   * slug or title.
   */
  'Cerámica Nava',
  'Lácteos Brío',
  'Tinta Meridiana',
  'Ferretería Ovalle',
  'Textil Arganza',
  'Hormigones Sela',
  'Banca Lindero',
  'Radio Peñalta',
  'Zapatillas Kime',
  'Editorial Quiebro',
  'fallback provisional',
  'listado de servicios aprobado',
  'Texto provisional de demostración',
  'colección está preparada',
];
const limits = {
  largestJavaScript: 150_000,
  totalJavaScript: 220_000,
};

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? walk(path) : path;
    }),
  );
  return nested.flat();
}

const files = await walk(root);
const textFiles = files.filter((file) =>
  ['.html', '.js'].includes(extname(file)),
);

for (const file of textFiles) {
  const source = await readFile(file, 'utf8');
  for (const marker of forbidden) {
    if (source.includes(marker)) {
      throw new Error(
        `Production marker "${marker}" found in ${relative(root, file)}`,
      );
    }
  }
}

const gifs = files.filter((file) => extname(file).toLowerCase() === '.gif');
if (gifs.length > 0) {
  throw new Error(
    `Raw GIF files found in production output: ${gifs.join(', ')}`,
  );
}

const scriptSizes = await Promise.all(
  files
    .filter((file) => extname(file) === '.js')
    .map(async (file) => ({ file, bytes: (await stat(file)).size })),
);
const totalJavaScript = scriptSizes.reduce(
  (sum, script) => sum + script.bytes,
  0,
);
const largestJavaScript = Math.max(
  0,
  ...scriptSizes.map((script) => script.bytes),
);

if (largestJavaScript > limits.largestJavaScript) {
  throw new Error(
    `Largest JavaScript asset is ${largestJavaScript} bytes; budget is ${limits.largestJavaScript}`,
  );
}
if (totalJavaScript > limits.totalJavaScript) {
  throw new Error(
    `Total JavaScript is ${totalJavaScript} bytes; budget is ${limits.totalJavaScript}`,
  );
}

process.stdout.write(
  `Production integrity passed: ${files.length} files, ${totalJavaScript} JS bytes, no demo content, placeholders or GIFs.\n`,
);
