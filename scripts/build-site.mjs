import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  dialogues,
  institutions,
  modules,
  periods,
  site,
  sourceNetworks,
} from "../content/site-data.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const readingDirectory = path.join(root, "leituras");
const coreSlugs = modules.map((module) => module.slug).join(",");
const cleanOutput = (value) => value.replace(/[ \t]+$/gm, "");

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const externalLink = (url, label) =>
  `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}<span class="sr-only"> (abre em nova aba)</span></a>`;

const toolsMarkup = `
  <div class="reading-tools" aria-label="Ferramentas de leitura">
    <button class="tool-button" type="button" data-focus aria-pressed="false" title="Alternar modo de foco">Foco</button>
    <button class="tool-button" type="button" data-font="decrease" aria-label="Diminuir tamanho do texto">A−</button>
    <button class="tool-button" type="button" data-font="increase" aria-label="Aumentar tamanho do texto">A+</button>
    <button class="tool-button" type="button" data-space aria-pressed="false" aria-label="Alternar espaçamento ampliado">↕</button>
  </div>`;

function header(prefix, active) {
  const nav = [
    ["percurso", `${prefix}index.html#percurso`, "Percurso"],
    ["rotas", `${prefix}index.html#rotas`, "Rotas"],
    ["biblioteca", `${prefix}biblioteca.html`, "Biblioteca"],
    ["fontes", `${prefix}fontes.html`, "Fontes e método"],
  ];
  return `
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="${prefix}index.html" aria-label="Filosofia Aberta — página inicial">
        <span class="brand-mark" aria-hidden="true">Φ</span><span class="brand-name">Filosofia Aberta</span>
      </a>
      <nav class="site-nav" aria-label="Navegação principal">
        ${nav
          .map(
            ([id, href, label]) =>
              `<a href="${href}"${active === id ? ' aria-current="page"' : ""}>${label}</a>`,
          )
          .join("")}
      </nav>
      ${toolsMarkup}
    </div>
  </header>`;
}

function footer(prefix) {
  return `
  <footer class="site-footer">
    <div class="wrap footer-grid">
      <div>
        <strong>Filosofia Aberta</strong><br>
        Concepção e autoria: ${escapeHtml(site.author)}. Conteúdo autoral sob ${escapeHtml(site.license)}, salvo indicação diferente. Projeto educacional gratuito e experimental.
      </div>
      <nav class="footer-links" aria-label="Navegação do rodapé">
        <a href="${prefix}biblioteca.html">Biblioteca</a>
        <a href="${prefix}fontes.html">Fontes, método e direitos</a>
        <a href="${site.repository}">Código no GitHub</a>
      </nav>
    </div>
  </footer>`;
}

function layout({
  title,
  description,
  canonicalPath = "",
  prefix = "",
  active = "",
  bodyClass = "",
  robots = "index,follow",
  content,
  schema,
}) {
  const canonical = `${site.baseUrl}${canonicalPath}`;
  const pageTitle = title === site.name ? site.name : `${title} — ${site.name}`;
  const jsonLd = schema
    ? `<script type="application/ld+json">${JSON.stringify(schema).replaceAll("<", "\\u003c")}</script>`
    : "";
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="author" content="${escapeHtml(site.author)}">
  <meta name="robots" content="${escapeHtml(robots)}">
  <meta name="theme-color" content="#16483a">
  <link rel="canonical" href="${canonical}">
  <link rel="stylesheet" href="${prefix}assets/styles.css">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(pageTitle)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${canonical}">
  <title>${escapeHtml(pageTitle)}</title>
  ${jsonLd}
</head>
<body class="${escapeHtml(bodyClass)}" data-core-modules="${escapeHtml(coreSlugs)}">
  <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
  ${header(prefix, active)}
  <main id="conteudo">${content}</main>
  ${footer(prefix)}
  <script src="${prefix}assets/app.js" defer></script>
</body>
</html>
`;
}

function renderPeriod(period, index) {
  const periodModules = modules.filter((module) => module.period === period.id);
  return `
    <details class="period"${index === 0 ? " open" : ""}>
      <summary>
        <h3>
          <time>${escapeHtml(period.dates)}</time>
          <span class="period-copy"><span class="period-name">${escapeHtml(period.title)}</span><span class="meta period-description">${escapeHtml(period.description)}</span></span>
        </h3>
      </summary>
      <ol class="stop-list">
        ${periodModules
          .map(
            (module) => `
          <li class="stop">
            <span class="stop-number" aria-hidden="true">${module.number}</span>
            <a href="leituras/${module.slug}.html">${escapeHtml(module.shortTitle)}</a>
            <p class="meta">${escapeHtml(module.question)} · ${escapeHtml(module.duration)}</p>
          </li>`,
          )
          .join("")}
      </ol>
    </details>`;
}

function renderRouteCard(route) {
  return `
    <article class="route-card">
      <p class="card-label">${escapeHtml(route.routeLabel)}</p>
      <h3>${escapeHtml(route.shortTitle)}</h3>
      <p>${escapeHtml(route.question)}</p>
      <div class="chip-row" aria-label="Informações da leitura">
        <span class="chip">${escapeHtml(route.duration)}</span>
        <span class="chip">${escapeHtml(route.difficulty)}</span>
      </div>
      <p><a class="card-link" href="leituras/${route.slug}.html">Abrir esta rota</a></p>
    </article>`;
}

function renderHome() {
  const first = modules[0];
  const content = `
    <section class="wrap hero" id="inicio">
      <div class="hero-copy">
        <p class="eyebrow">Um percurso aberto de leitura filosófica</p>
        <h1>Leia uma passagem. Siga a pergunta.</h1>
        <p class="lead">Filosofia Aberta conduz você por textos primários, explicações breves e perguntas que levam à próxima leitura. A cronologia orienta; não transforma a Filosofia numa lista de nomes.</p>
        <div class="actions">
          <a class="button button-primary" data-continue href="leituras/${first.slug}.html">Começar pelo início</a>
          <a class="button" href="#percurso">Ver as 14 etapas</a>
        </div>
        <p class="meta">Sem cadastro. Progresso e anotações permanecem somente neste navegador.</p>
      </div>
      <aside class="hero-panel" aria-labelledby="seu-percurso">
        <p class="eyebrow">Seu percurso</p>
        <h2 id="seu-percurso" style="font-size:clamp(1.8rem,3vw,2.7rem)">Do fragmento à pergunta contemporânea.</h2>
        <div class="progress-track" data-progress-track role="progressbar" aria-label="Progresso no percurso principal" aria-valuemin="0" aria-valuemax="14" aria-valuenow="0" aria-valuetext="0 de 14 leituras concluídas"><div class="progress-fill" data-progress-fill aria-hidden="true"></div></div>
        <p class="meta" data-progress-text role="status" aria-live="polite" style="color:#e7eee9">0 de 14 leituras concluídas (0%)</p>
        <div class="stat-row" aria-label="Conteúdo disponível">
          <div class="stat"><strong>14</strong><span class="meta">etapas cronológicas</span></div>
          <div class="stat"><strong>3</strong><span class="meta">rotas em diálogo</span></div>
          <div class="stat"><strong>42</strong><span class="meta">leituras sugeridas</span></div>
        </div>
      </aside>
    </section>

    <section class="section" aria-labelledby="como-funciona">
      <div class="wrap">
        <div class="section-heading">
          <div><p class="eyebrow">Como funciona</p><h2 id="como-funciona">Ler → compreender → refletir → continuar.</h2></div>
          <p class="muted">Cada etapa começa por uma pergunta, apresenta um trecho localizável, distingue tradução de interpretação e oferece uma pequena seleção de fontes legalmente acessíveis.</p>
        </div>
        <div class="principle-grid">
          <article class="principle-card"><span class="principle-number">01</span><h3>Ler</h3><p>Encontre autor, obra, passagem, edição e situação de acesso antes de repetir uma frase.</p></article>
          <article class="principle-card"><span class="principle-number">02</span><h3>Compreender</h3><p>Reconstrua o problema e os conceitos sem esconder dificuldades ou divergências.</p></article>
          <article class="principle-card"><span class="principle-number">03</span><h3>Refletir</h3><p>Teste o argumento com duas perguntas e registre sua própria posição.</p></article>
          <article class="principle-card"><span class="principle-number">04</span><h3>Continuar</h3><p>Veja a relação — continuidade, crítica ou ruptura — que abre a leitura seguinte.</p></article>
        </div>
      </div>
    </section>

    <section class="section" id="percurso" aria-labelledby="titulo-percurso">
      <div class="wrap">
        <div class="section-heading">
          <div><p class="eyebrow">Percurso principal</p><h2 id="titulo-percurso">Quatorze paradas, uma conversa em movimento.</h2></div>
          <p class="muted">Antiga, Medieval, Moderna e Contemporânea são um eixo pedagógico recorrente — não uma história universal completa nem uma marcha inevitável de progresso.</p>
        </div>
        <div class="path">${periods.map(renderPeriod).join("")}</div>
      </div>
    </section>

    <section class="section" id="rotas" aria-labelledby="titulo-rotas">
      <div class="wrap">
        <div class="section-heading">
          <div><p class="eyebrow">Rotas em diálogo</p><h2 id="titulo-rotas">A linha europeia não contém todas as perguntas.</h2></div>
          <p class="muted">Estas entradas correm ao lado do eixo cronológico. Aproximar não é declarar equivalência: cada rota explicita idioma, transmissão, contexto e limite da comparação.</p>
        </div>
        <div class="route-grid">${dialogues.map(renderRouteCard).join("")}</div>
      </div>
    </section>

    <section class="section" aria-labelledby="titulo-base">
      <div class="wrap">
        <div class="section-heading">
          <div><p class="eyebrow">Base acadêmica ampliada</p><h2 id="titulo-base">Muitas instituições, nenhum currículo único.</h2></div>
          <p class="muted">O percurso agora compara universidades federais, estaduais e comunitárias/confessionais, além de associações, bibliotecas e cursos internacionais abertos.</p>
        </div>
        <div class="institution-grid">
          ${institutions
            .slice(0, 6)
            .map(
              (institution) => `
            <article class="institution-card">
              <p class="card-label">${escapeHtml(institution.category)}</p>
              <h3>${externalLink(institution.url, institution.name)}</h3>
              <p>${escapeHtml(institution.use)}</p>
            </article>`,
            )
            .join("")}
        </div>
        <div class="actions"><a class="button" href="fontes.html">Ver todas as fontes e o método</a></div>
      </div>
    </section>

    <section class="section section-compact">
      <div class="wrap dark-panel">
        <p class="eyebrow">Próxima ação</p>
        <h2>Comece com uma pergunta pequena.</h2>
        <p class="lead" style="color:#e7eee9">Como algo permanece reconhecível enquanto muda? Heráclito abre o percurso com um fragmento — e com um aviso para não confundir a voz do autor com a razão que você pode examinar.</p>
        <div class="actions"><a class="button button-primary" href="leituras/${first.slug}.html">Ler Heráclito</a><a class="button" style="color:#fff;border-color:#fff" href="biblioteca.html">Explorar a biblioteca</a></div>
      </div>
    </section>`;

  return layout({
    title: site.name,
    description: "Percurso gratuito e guiado de leitura filosófica: passagens verificáveis, contexto, perguntas e fontes abertas ou gratuitas.",
    active: "percurso",
    content,
    schema: {
      "@context": "https://schema.org",
      "@type": "Course",
      name: "Filosofia Aberta — percurso de leitura filosófica",
      description: "Percurso gratuito e guiado por textos primários, contexto e perguntas filosóficas.",
      provider: { "@type": "Person", name: site.author },
      isAccessibleForFree: true,
      inLanguage: "pt-BR",
      url: site.baseUrl,
    },
  });
}

function renderPassage(passage) {
  return `
    <figure class="passage">
      <div class="passage-head">
        <strong>${escapeHtml(passage.author)}</strong>
        <span>${escapeHtml(passage.work)} · ${escapeHtml(passage.locator)}</span>
      </div>
      <blockquote>“${escapeHtml(passage.quote)}”</blockquote>
      <div class="passage-original" lang="${passage.originalLanguage || (passage.original.includes("Wir ") || passage.original.includes("Der Satz") ? "de" : passage.original.includes("Hombres") ? "es" : passage.original.includes("On ne") ? "fr" : "en")}">${escapeHtml(passage.original)}</div>
      <figcaption>
        <p><strong>Edição/base:</strong> ${escapeHtml(passage.edition)}</p>
        <p><strong>Nota de tradução:</strong> ${escapeHtml(passage.translation)}</p>
        <dl class="source-meta">
          <dt>Fonte</dt><dd>${externalLink(passage.url, passage.source)}</dd>
          <dt>Localização</dt><dd>${escapeHtml(passage.locator)}</dd>
          <dt>Acesso e direitos</dt><dd>${escapeHtml(passage.rights)}</dd>
          <dt>Consulta</dt><dd>${escapeHtml(site.accessDate)}</dd>
        </dl>
      </figcaption>
    </figure>`;
}

function renderReading(reading) {
  const reason = reading.kind.includes("fonte primária")
    ? "Permite conferir o texto em seu contexto e testar a interpretação desta etapa."
    : reading.kind.includes("acadêmic")
      ? "Acrescenta contexto, controvérsias e bibliografia acadêmica à leitura."
      : "Oferece uma segunda edição ou mediação para comparar escolhas de leitura.";
  return `
    <article class="reading-link-card">
      <p class="card-label">${escapeHtml(reading.kind)}</p>
      <h3>${externalLink(reading.url, reading.title)}</h3>
      <ul class="reading-details">
        <li><strong>Autoria:</strong> ${escapeHtml(reading.author)}</li>
        <li><strong>Instituição:</strong> ${escapeHtml(reading.provider)}</li>
        <li><strong>Idioma:</strong> ${escapeHtml(reading.language)}</li>
        <li><strong>Extensão:</strong> ${escapeHtml(reading.time)}</li>
        <li><strong>Dificuldade:</strong> ${escapeHtml(reading.difficulty)}</li>
      </ul>
      <p><strong>Por que ler:</strong> ${reason}</p>
      <p><strong>Missão:</strong> ${escapeHtml(reading.mission)}</p>
      <p class="meta">${escapeHtml(reading.access)} · acesso verificado em ${escapeHtml(site.accessDate)}</p>
    </article>`;
}

function breadcrumbs(item, isDialogue) {
  return `
    <nav class="wrap breadcrumbs" aria-label="Navegação estrutural">
      <ol>
        <li><a href="../index.html">Início</a></li>
        <li><a href="../index.html#${isDialogue ? "rotas" : "percurso"}">${isDialogue ? "Rotas em diálogo" : "Percurso"}</a></li>
        <li aria-current="page">${escapeHtml(item.shortTitle)}</li>
      </ol>
    </nav>`;
}

function pagerItem(item, label, className = "") {
  if (!item) return `<span class="${className}" aria-hidden="true"></span>`;
  return `<a class="${className}" href="${item.slug}.html"><small>${escapeHtml(label)}</small><strong>${escapeHtml(item.shortTitle)}</strong></a>`;
}

function renderModulePage(item, isDialogue = false) {
  const collection = isDialogue ? dialogues : modules;
  const currentIndex = collection.findIndex((entry) => entry.slug === item.slug);
  const previous = collection[currentIndex - 1];
  const next = collection[currentIndex + 1];
  const position = isDialogue
    ? `${item.routeLabel} · rota ${currentIndex + 1} de ${collection.length}`
    : `${periods.find((period) => period.id === item.period)?.title} · etapa ${item.number} de ${modules.length}`;
  const nextDestination = next
    ? `<p><a class="card-link" href="${next.slug}.html">Continuar: ${escapeHtml(next.shortTitle)}</a></p>`
    : `<p><a class="card-link" href="../index.html#rotas">Continuar pelas rotas em diálogo</a></p>`;
  const content = `
    ${breadcrumbs(item, isDialogue)}
    <article>
      <header class="module-hero">
        <div class="wrap module-hero-grid">
          <div>
            <p class="eyebrow">${escapeHtml(item.kicker)}</p>
            <h1>${escapeHtml(item.title)}</h1>
            <p class="question-callout">${escapeHtml(item.question)}</p>
          </div>
          <div class="module-meta" aria-label="Informações do módulo">
            <div><span class="meta-label">Posição</span><strong>${escapeHtml(position)}</strong></div>
            <div><span class="meta-label">Tempo</span><strong>${escapeHtml(item.duration)}</strong></div>
            <div><span class="meta-label">Dificuldade</span><strong>${escapeHtml(item.difficulty)}</strong></div>
            <div><span class="meta-label">Obra-guia</span><strong>${escapeHtml(item.work)}</strong></div>
          </div>
        </div>
      </header>

      <div class="wrap module-layout">
        <aside class="module-aside" aria-label="Etapas desta leitura">
          <p>Nesta leitura</p>
          <a href="#orientacao">1. Orientação</a>
          <a href="#passagem">2. Passagem</a>
          <a href="#compreender">3. Compreender</a>
          <a href="#refletir">4. Refletir</a>
          <a href="#ler-mais">5. Ler mais</a>
          <a href="#caderno">6. Caderno</a>
        </aside>

        <div class="module-content">
          <section class="content-card" id="orientacao" aria-labelledby="orientacao-titulo">
            <p class="card-label">Onde estou?</p>
            <h2 id="orientacao-titulo">Contexto antes da frase.</h2>
            <p>${escapeHtml(item.context)}</p>
            <h3>Por que ler isto?</h3>
            <p>${escapeHtml(item.why)}</p>
            <ul class="concept-list" aria-label="Conceitos principais">${item.concepts.map((concept) => `<li>${escapeHtml(concept)}</li>`).join("")}</ul>
          </section>

          <section class="content-card" id="passagem" aria-labelledby="passagem-titulo">
            <p class="card-label">Leia o trecho</p>
            <h2 id="passagem-titulo">Fonte, localização e tradução visíveis.</h2>
            <p class="warning-note"><strong>Antes de citar:</strong> a versão em português abaixo é identificada como tradução de trabalho, atualização ortográfica ou citação breve. Para trabalho acadêmico, consulte a edição indicada e siga a norma de citação adotada.</p>
            ${item.passages.map(renderPassage).join("")}
          </section>

          <section class="content-card" id="compreender" aria-labelledby="compreender-titulo">
            <p class="card-label">Compreender</p>
            <h2 id="compreender-titulo">O que está em jogo?</h2>
            <h3>O que o trecho discute</h3>
            <p>${escapeHtml(item.discussed)}</p>
            <h3>Um equívoco provável</h3>
            <p>${escapeHtml(item.misunderstanding)}</p>
            <h3>Pergunta-guia</h3>
            <p class="question-callout">${escapeHtml(item.guide)}</p>
          </section>

          <section class="content-card" id="refletir" aria-labelledby="refletir-titulo">
            <p class="card-label">Depois da leitura</p>
            <h2 id="refletir-titulo">Pense antes de continuar.</h2>
            <ol class="reflection-list">${item.reflection.map((question) => `<li>${escapeHtml(question)}</li>`).join("")}</ol>
          </section>

          <section class="content-card" id="ler-mais" aria-labelledby="ler-mais-titulo">
            <p class="card-label">Leia um pouco mais</p>
            <h2 id="ler-mais-titulo">Fontes abertas ou de acesso gratuito.</h2>
            <p>Abra com uma missão clara e depois retorne ao percurso. “Gratuito” não é sinônimo de licença aberta; a situação de cada item está indicada.</p>
            <div class="reading-grid">${item.readings.map(renderReading).join("")}</div>
          </section>

          <section class="content-card notebook" id="caderno" aria-labelledby="caderno-titulo">
            <p class="card-label">Seu caderno local</p>
            <h2 id="caderno-titulo">O que você sustenta agora?</h2>
            <label for="notes-${item.slug}">Registre uma resposta, objeção ou dúvida. O texto fica somente neste navegador.</label>
            <textarea id="notes-${item.slug}" data-notes="${item.slug}" placeholder="Escreva com suas palavras..."></textarea>
            <div class="notebook-actions">
              <button class="button completion-button" type="button" data-complete="${item.slug}" aria-pressed="false">Marcar como concluída</button>
              <span class="meta" data-notes-status role="status" aria-live="polite"></span>
            </div>
          </section>

          <section class="next-reading" aria-labelledby="proxima-titulo">
            <p class="eyebrow">Relação com a próxima</p>
            <h2 id="proxima-titulo" style="font-size:clamp(1.65rem,3vw,2.4rem)">A pergunta continua.</h2>
            <p>${escapeHtml(item.relation)}</p>
            ${nextDestination}
          </section>

          <nav class="pager" aria-label="Navegação entre leituras">
            ${pagerItem(previous, "Leitura anterior")}
            ${pagerItem(next, "Próxima leitura", "pager-next")}
          </nav>
        </div>
      </div>
    </article>`;

  return layout({
    title: item.title,
    description: `${item.question} Leitura guiada com trecho verificável, contexto e fontes abertas ou gratuitas.`,
    canonicalPath: `leituras/${item.slug}.html`,
    prefix: "../",
    bodyClass: "reading-page",
    content,
    schema: {
      "@context": "https://schema.org",
      "@type": "LearningResource",
      name: item.title,
      description: item.question,
      author: { "@type": "Person", name: site.author },
      educationalLevel: item.difficulty,
      inLanguage: "pt-BR",
      isAccessibleForFree: true,
      url: `${site.baseUrl}leituras/${item.slug}.html`,
    },
  });
}

function libraryCard(item, isDialogue = false) {
  const period = isDialogue ? item.routeLabel : periods.find((entry) => entry.id === item.period)?.title;
  const searchText = [item.title, item.question, period, ...item.concepts, ...item.passages.map((p) => p.author)].join(" ");
  return `
    <article class="library-card" data-search="${escapeHtml(searchText)}">
      <div class="chip-row"><span class="chip">${escapeHtml(period)}</span><span class="chip">${escapeHtml(item.duration)}</span></div>
      <h2 style="font-size:clamp(1.4rem,2.5vw,2rem)">${escapeHtml(item.shortTitle)}</h2>
      <p>${escapeHtml(item.question)}</p>
      <p class="meta"><strong>Trecho${item.passages.length > 1 ? "s" : ""}:</strong> ${escapeHtml(item.passages.map((passage) => passage.author).join(" · "))}</p>
      <p><a class="card-link" href="leituras/${item.slug}.html">Abrir leitura</a></p>
    </article>`;
}

function renderLibrary() {
  const allItems = [...modules.map((item) => [item, false]), ...dialogues.map((item) => [item, true])];
  const content = `
    <header class="wrap page-hero">
      <p class="eyebrow">Biblioteca guiada</p>
      <h1>Escolha pela pergunta, não apenas pelo nome.</h1>
      <p class="lead">Todas as 17 leituras incluem trecho, localização, nota de tradução, questões de reflexão e uma seleção curta de fontes abertas ou de acesso gratuito.</p>
      <div class="filter-bar">
        <label for="library-filter">Filtrar leituras</label>
        <input id="library-filter" type="search" inputmode="search" data-library-filter placeholder="Ex.: liberdade, tempo, Beauvoir, Antiga">
      </div>
      <p class="meta" data-filter-status role="status" aria-live="polite">17 leituras encontradas.</p>
    </header>
    <section class="wrap section-compact" aria-label="Leituras disponíveis">
      <div class="library-grid">${allItems.map(([item, isDialogue]) => libraryCard(item, isDialogue)).join("")}</div>
    </section>`;
  return layout({
    title: "Biblioteca",
    description: "Dezessete leituras guiadas de Filosofia, pesquisáveis por autor, período, conceito ou pergunta.",
    canonicalPath: "biblioteca.html",
    active: "biblioteca",
    content,
    schema: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Biblioteca — Filosofia Aberta",
      description: "Dezessete leituras guiadas de Filosofia, pesquisáveis por autor, período, conceito ou pergunta.",
      inLanguage: "pt-BR",
      isAccessibleForFree: true,
      url: `${site.baseUrl}biblioteca.html`,
      mainEntity: { "@type": "ItemList", numberOfItems: allItems.length },
    },
  });
}

function renderSources() {
  const content = `
    <header class="wrap page-hero">
      <p class="eyebrow">Fontes e método</p>
      <h1>De onde vem cada escolha?</h1>
      <p class="lead">O Filosofia Aberta compara documentos institucionais, localiza textos primários e declara onde começa a tradução ou a interpretação. A amostra é plural e auditável; não pretende listar literalmente toda instituição que ensina Filosofia.</p>
    </header>

    <section class="section" aria-labelledby="metodo-titulo">
      <div class="wrap">
        <div class="section-heading">
          <div><p class="eyebrow">Método editorial</p><h2 id="metodo-titulo">Recorrência orienta; não cria unanimidade.</h2></div>
          <p class="muted">Uma fonte curricular justifica o desenho pedagógico. Uma fonte primária sustenta o que atribuímos a uma obra. Uma referência acadêmica ajuda a contextualizar — nunca substitui o texto.</p>
        </div>
        <div class="principle-grid">
          <article class="principle-card"><span class="principle-number">01</span><h3>Comparar</h3><p>PPCs, matrizes, ementas, disciplinas e cursos abertos de naturezas institucionais distintas.</p></article>
          <article class="principle-card"><span class="principle-number">02</span><h3>Localizar</h3><p>Autor, obra, passagem, edição, tradutor e data de consulta sempre que aplicável.</p></article>
          <article class="principle-card"><span class="principle-number">03</span><h3>Distinguir</h3><p>Texto original, testemunho, tradução de trabalho, paráfrase e interpretação pedagógica.</p></article>
          <article class="principle-card"><span class="principle-number">04</span><h3>Revisar</h3><p>Corrigir quando melhores edições, pesquisas ou retornos de acessibilidade justificarem mudança.</p></article>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="instituicoes-titulo">
      <div class="wrap">
        <div class="section-heading">
          <div><p class="eyebrow">Panorama institucional</p><h2 id="instituicoes-titulo">Além das universidades federais.</h2></div>
          <p class="muted">A matriz reúne exemplos representativos de universidades federais, estadual e comunitária/confessional, cursos abertos internacionais e associação acadêmica. Nenhuma instituição é parceira ou endossa o projeto.</p>
        </div>
        <div class="institution-table-wrap">
          <table class="institution-table">
            <thead><tr><th>Tipo</th><th>Instituição e fonte</th><th>Uso no percurso</th></tr></thead>
            <tbody>${institutions
              .map(
                (institution) => `<tr><td>${escapeHtml(institution.category)}</td><td>${externalLink(institution.url, institution.name)}<br><span class="meta">Consulta: ${escapeHtml(site.accessDate)}</span></td><td>${escapeHtml(institution.use)}</td></tr>`,
              )
              .join("")}</tbody>
          </table>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="redes-titulo">
      <div class="wrap">
        <div class="section-heading">
          <div><p class="eyebrow">Redes de acesso e referência</p><h2 id="redes-titulo">Ler legalmente também exige precisão.</h2></div>
          <p class="muted">Acesso gratuito, domínio público e licença aberta não são sinônimos. Cada cartão de leitura informa a situação declarada pela plataforma e lembra que jurisdições podem divergir.</p>
        </div>
        <div class="source-network-grid">${sourceNetworks
          .map(
            (network) => `
          <article class="source-network">
            <h3>${escapeHtml(network.category)}</h3>
            <ul>${network.items
              .map(([name, url, use]) => `<li>${externalLink(url, name)} — ${escapeHtml(use)}</li>`)
              .join("")}</ul>
          </article>`,
          )
          .join("")}</div>
      </div>
    </section>

    <section class="section" aria-labelledby="limites-titulo">
      <div class="wrap">
        <div class="section-heading">
          <div><p class="eyebrow">Escopo e limites</p><h2 id="limites-titulo">Um mapa responsável deixa bordas visíveis.</h2></div>
          <p class="muted">O percurso é uma porta de entrada, não substitui graduação, edição crítica, tradução publicada ou orientação docente.</p>
        </div>
        <div class="content-card">
          <ul>
            <li>A cronologia europeia é um eixo entre outros; as rotas paralelas tornam essa limitação explícita.</li>
            <li>Filosofias africanas, indígenas, islâmicas, indianas, chinesas e latino-americanas não cabem em cartões genéricos. A expansão exige fontes primárias, atribuição comunitária quando pertinente e competência linguística.</li>
            <li>Trechos protegidos são mantidos breves e usados para estudo e crítica; nenhuma obra contemporânea integral é redistribuída.</li>
            <li>Traduções de trabalho servem à orientação. Para citação acadêmica, consulte uma edição adequada e informe o tradutor.</li>
            <li>Links externos podem mudar. A data de consulta está visível, e correções podem ser propostas no repositório.</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="section section-compact" aria-labelledby="creditos-titulo">
      <div class="wrap dark-panel">
        <p class="eyebrow">Créditos e transparência</p>
        <h2 id="creditos-titulo">Projeto aberto, autoria declarada.</h2>
        <p>Concepção e autoria: <strong>${escapeHtml(site.author)}</strong>. Desenvolvimento e revisão técnica/editorial com apoio de inteligência artificial da OpenAI. Isso não constitui parceria institucional, certificação acadêmica ou endosso das instituições citadas.</p>
        <p>Conteúdo autoral do projeto: ${externalLink("https://creativecommons.org/licenses/by/4.0/deed.pt-br", "Creative Commons Atribuição 4.0 Internacional")}, salvo indicação diferente. Obras e plataformas de terceiros preservam seus próprios direitos e termos.</p>
      </div>
    </section>`;

  return layout({
    title: "Fontes e método",
    description: "Metodologia, fontes curriculares, bibliotecas abertas, direitos e limites editoriais do Filosofia Aberta.",
    canonicalPath: "fontes.html",
    active: "fontes",
    content,
    schema: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "Fontes e método — Filosofia Aberta",
      description: "Metodologia, fontes curriculares, bibliotecas abertas, direitos e limites editoriais do Filosofia Aberta.",
      inLanguage: "pt-BR",
      isAccessibleForFree: true,
      url: `${site.baseUrl}fontes.html`,
    },
  });
}

function render404() {
  const content = `
    <section class="wrap page-hero" style="min-height:65vh">
      <p class="eyebrow">Erro 404</p>
      <h1>Esta página saiu para pensar.</h1>
      <p class="lead">O endereço não existe ou mudou. O percurso principal continua disponível.</p>
      <div class="actions"><a class="button button-primary" href="${site.baseUrl}">Voltar ao início</a><a class="button" href="${site.baseUrl}biblioteca.html">Abrir a biblioteca</a></div>
    </section>`;
  return layout({
    title: "Página não encontrada",
    description: "Página não encontrada no Filosofia Aberta.",
    canonicalPath: "404.html",
    robots: "noindex,follow",
    content,
  });
}

function renderSitemap() {
  const paths = ["", "biblioteca.html", "fontes.html", ...modules.map((m) => `leituras/${m.slug}.html`), ...dialogues.map((m) => `leituras/${m.slug}.html`)];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (pagePath) => `  <url>
    <loc>${site.baseUrl}${pagePath}</loc>
    <lastmod>2026-09-10</lastmod>
    <changefreq>${pagePath ? "monthly" : "weekly"}</changefreq>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
}

await mkdir(readingDirectory, { recursive: true });
await writeFile(path.join(root, "index.html"), cleanOutput(renderHome()), "utf8");
await writeFile(path.join(root, "biblioteca.html"), cleanOutput(renderLibrary()), "utf8");
await writeFile(path.join(root, "fontes.html"), cleanOutput(renderSources()), "utf8");
await writeFile(path.join(root, "404.html"), cleanOutput(render404()), "utf8");
await writeFile(path.join(root, "sitemap.xml"), cleanOutput(renderSitemap()), "utf8");

for (const module of modules) {
  await writeFile(path.join(readingDirectory, `${module.slug}.html`), cleanOutput(renderModulePage(module)), "utf8");
}

for (const dialogue of dialogues) {
  await writeFile(path.join(readingDirectory, `${dialogue.slug}.html`), cleanOutput(renderModulePage(dialogue, true)), "utf8");
}

console.log(`Site gerado: ${modules.length} etapas, ${dialogues.length} rotas e ${modules.length + dialogues.length + 4} páginas HTML.`);
