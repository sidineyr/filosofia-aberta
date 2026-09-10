import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { dialogues, institutions, modules, periods } from "../content/site-data.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const allReadings = [...modules, ...dialogues];
const allPassages = allReadings.flatMap((reading) => reading.passages);
const allSuggestions = allReadings.flatMap((reading) => reading.readings);
const expectedHtml = [
  "index.html",
  "biblioteca.html",
  "fontes.html",
  "404.html",
  ...allReadings.map((reading) => `leituras/${reading.slug}.html`),
];
const failures = [];
let assertions = 0;

function assert(condition, message) {
  assertions += 1;
  if (!condition) failures.push(message);
}

const unique = (values) => new Set(values).size === values.length;

assert(modules.length === 14, `Esperadas 14 etapas cronológicas; recebidas ${modules.length}.`);
assert(dialogues.length >= 3, "Esperadas ao menos 3 rotas em diálogo.");
assert(allPassages.length === 26, `Esperadas 26 passagens; recebidas ${allPassages.length}.`);
assert(allSuggestions.length === 42, `Esperadas 42 sugestões de leitura; recebidas ${allSuggestions.length}.`);
assert(periods.length === 4, "Esperados os quatro períodos do percurso principal.");
assert(unique(allReadings.map((reading) => reading.slug)), "Slugs de leitura precisam ser únicos.");
assert(institutions.some((item) => item.category === "Universidade estadual"), "Falta universidade estadual na matriz.");
assert(institutions.some((item) => item.category === "Comunitária e confessional"), "Falta universidade comunitária/confessional na matriz.");
assert(institutions.some((item) => item.category.includes("privada")), "Falta instituição privada na matriz.");
assert(institutions.some((item) => item.category === "Curso aberto internacional"), "Falta curso aberto internacional na matriz.");
assert(institutions.some((item) => item.category === "Associação acadêmica"), "Falta associação acadêmica na matriz.");

for (const reading of allReadings) {
  assert(Boolean(reading.title && reading.question && reading.context && reading.why), `${reading.slug}: orientação incompleta.`);
  assert(reading.concepts?.length >= 3, `${reading.slug}: inclua ao menos três conceitos.`);
  assert(reading.passages?.length >= 1, `${reading.slug}: falta passagem primária.`);
  assert(reading.readings?.length >= 2 && reading.readings?.length <= 3, `${reading.slug}: “Leia um pouco mais” deve ter 2 ou 3 itens.`);
  assert(reading.reflection?.length === 2, `${reading.slug}: são esperadas duas perguntas de reflexão.`);
  assert(Boolean(reading.discussed && reading.misunderstanding && reading.guide && reading.relation), `${reading.slug}: mediação pedagógica incompleta.`);
  assert(reading.readings.some((item) => item.kind.includes("fonte primária")), `${reading.slug}: falta ao menos uma fonte primária nas leituras.`);
  assert(reading.readings.some((item) => item.kind.includes("acadêmic")), `${reading.slug}: falta ao menos uma introdução ou artigo acadêmico.`);

  for (const passage of reading.passages) {
    assert(Boolean(passage.author && passage.work && passage.locator), `${reading.slug}: passagem sem autor, obra ou localização.`);
    assert(Boolean(passage.quote && passage.original), `${reading.slug}: passagem sem trecho em português ou base original/intermediária.`);
    assert(Boolean(passage.edition && passage.translation), `${reading.slug}: passagem sem edição ou nota de tradução.`);
    assert(Boolean(passage.url && passage.rights), `${reading.slug}: passagem sem fonte ou nota de direitos.`);
    assert(/^https:\/\//.test(passage.url), `${reading.slug}: fonte primária precisa usar HTTPS.`);
  }

  for (const item of reading.readings) {
    assert(Boolean(item.author && item.provider && item.language && item.time && item.difficulty), `${reading.slug}: sugestão de leitura sem autoria ou metadados.`);
    assert(Boolean(item.mission && item.access), `${reading.slug}: sugestão sem missão ou situação de acesso.`);
    assert(/^https:\/\//.test(item.url), `${reading.slug}: sugestão precisa usar HTTPS.`);
  }
}

const htmlCache = new Map();
async function loadHtml(relativePath) {
  if (!htmlCache.has(relativePath)) {
    htmlCache.set(relativePath, await readFile(path.join(root, relativePath), "utf8"));
  }
  return htmlCache.get(relativePath);
}

for (const relativePath of expectedHtml) {
  try {
    await access(path.join(root, relativePath));
  } catch {
    failures.push(`Arquivo gerado ausente: ${relativePath}`);
    continue;
  }

  const html = await loadHtml(relativePath);
  assert(html.startsWith("<!doctype html>"), `${relativePath}: doctype ausente.`);
  assert(html.includes('<html lang="pt-BR">'), `${relativePath}: idioma principal ausente.`);
  assert(html.includes('name="viewport"'), `${relativePath}: viewport ausente.`);
  assert(html.includes('class="skip-link"'), `${relativePath}: link para pular conteúdo ausente.`);
  assert(html.includes('<main id="conteudo">'), `${relativePath}: região principal ausente.`);
  assert((html.match(/<h1(?:\s|>)/g) || []).length === 1, `${relativePath}: esperado exatamente um h1.`);
  assert(/<title>[^<]+<\/title>/.test(html), `${relativePath}: título de documento ausente.`);
  assert(/<meta name="description" content="[^"]+">/.test(html), `${relativePath}: descrição de busca ausente.`);
  assert(html.includes(`<link rel="canonical" href="${siteOriginForInternal()}`), `${relativePath}: URL canônica ausente ou externa ao projeto.`);
  assert(html.includes('aria-label="Navegação principal"'), `${relativePath}: navegação principal sem rótulo.`);
  assert(html.includes('data-font="increase"'), `${relativePath}: controles de leitura ausentes.`);
  assert(!/(?:TODO|conteúdo em breve|planejado)/.test(html), `${relativePath}: marcador de conteúdo incompleto encontrado.`);

  const jsonLdBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  assert(relativePath === "404.html" || jsonLdBlocks.length === 1, `${relativePath}: esperado um bloco JSON-LD.`);
  for (const [, json] of jsonLdBlocks) {
    try {
      JSON.parse(json);
      assertions += 1;
    } catch {
      failures.push(`${relativePath}: JSON-LD inválido.`);
    }
  }

  if (relativePath.startsWith("leituras/")) {
    for (const sectionId of ["orientacao", "passagem", "compreender", "refletir", "ler-mais", "caderno"]) {
      assert(html.includes(`id="${sectionId}"`), `${relativePath}: seção #${sectionId} ausente.`);
    }
    assert(/<label for="([^"]+)">[\s\S]*?<textarea id="\1"/.test(html), `${relativePath}: caderno sem associação entre rótulo e campo.`);
    assert(html.includes("data-complete=") && html.includes('aria-pressed="false"'), `${relativePath}: conclusão sem estado acessível.`);
  }

  const externalAnchors = [...html.matchAll(/<a\s+[^>]*href="https:[^"]+"[^>]*>/g)].map((match) => match[0]);
  for (const anchor of externalAnchors) {
    if (anchor.includes(siteOriginForInternal())) continue;
    if (anchor.includes('target="_blank"')) {
      assert(anchor.includes('rel="noopener noreferrer"'), `${relativePath}: link em nova aba sem proteção rel.`);
    }
  }

  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
  const allIds = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  assert(unique(allIds), `${relativePath}: IDs HTML precisam ser únicos.`);
  const hrefs = [...html.matchAll(/\shref="([^"]+)"/g)].map((match) => match[1]);
  for (const href of hrefs) {
    if (/^(https:|mailto:|tel:)/.test(href)) continue;
    const [rawTarget, fragment] = href.split("#");
    if (!rawTarget && fragment) {
      assert(ids.has(fragment), `${relativePath}: âncora local inexistente #${fragment}.`);
      continue;
    }
    if (!rawTarget || rawTarget.startsWith("/")) continue;
    const resolved = path.normalize(path.join(path.dirname(relativePath), rawTarget));
    try {
      await access(path.join(root, resolved));
      assertions += 1;
    } catch {
      failures.push(`${relativePath}: destino interno inexistente ${href} (resolve para ${resolved}).`);
      continue;
    }
    if (fragment && resolved.endsWith(".html")) {
      const targetHtml = await loadHtml(resolved);
      assert(targetHtml.includes(`id="${fragment}"`), `${relativePath}: ${href} aponta para âncora inexistente.`);
    }
  }
}

function siteOriginForInternal() {
  return "https://sidineyr.github.io/filosofia-aberta/";
}

const stylesheet = await readFile(path.join(root, "assets/styles.css"), "utf8");
assert(stylesheet.includes("@media (prefers-reduced-motion: reduce)"), "CSS não respeita preferência por movimento reduzido.");
assert(stylesheet.includes("overflow-wrap: break-word"), "CSS não protege contra estouro de texto.");
assert(stylesheet.includes(":focus-visible"), "CSS não torna o foco de teclado visível.");
assert(!stylesheet.includes("100vw"), "Evite 100vw, que pode causar rolagem horizontal.");

const indexHtml = await loadHtml("index.html");
assert(indexHtml.includes('role="progressbar"'), "Página inicial sem barra de progresso acessível.");
assert(indexHtml.includes(`aria-valuemax="${modules.length}"`), "Barra de progresso com máximo incorreto.");
const libraryHtml = await loadHtml("biblioteca.html");
assert(libraryHtml.includes("data-library-filter") && libraryHtml.includes("data-filter-status"), "Biblioteca sem filtro e retorno de resultados.");
const notFoundHtml = await loadHtml("404.html");
assert(notFoundHtml.includes('name="robots" content="noindex,follow"'), "Página 404 deve impedir indexação.");

const sitemap = await readFile(path.join(root, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert(sitemapUrls.length === expectedHtml.length - 1, `Sitemap deveria conter ${expectedHtml.length - 1} URLs públicas (sem 404).`);
assert(unique(sitemapUrls), "Sitemap contém URLs duplicadas.");

if (failures.length) {
  console.error(`Falharam ${failures.length} de ${assertions} verificações:`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`OK: ${assertions} verificações de conteúdo, estrutura, links internos e acessibilidade básica.`);
