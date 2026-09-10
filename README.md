# Filosofia Aberta

**Leia uma passagem. Siga a pergunta.**

Projeto educacional experimental, gratuito e aberto para leitura orientada de Filosofia, concebido por **Sidiney Rodrigues**.

Site público: https://sidineyr.github.io/filosofia-aberta/

## O que está disponível

- 14 etapas cronológicas completas, da Filosofia Antiga a debates contemporâneos;
- 3 rotas paralelas: Leste Asiático, Sul da Ásia e América Latina/Brasil;
- 26 passagens identificadas por obra e localização;
- 42 sugestões curtas de fontes primárias e introduções acadêmicas abertas ou de acesso gratuito;
- progresso, preferências de leitura e caderno salvos apenas no navegador;
- páginas individuais navegáveis, biblioteca pesquisável, fontes e método;
- interface responsiva, navegação por teclado, foco visível, tamanho e espaçamento ajustáveis e suporte a movimento reduzido.

O fluxo pedagógico de cada leitura é:

**ler → compreender → refletir → continuar**

## Base acadêmica

O desenho deixou de tomar universidades federais como único ponto de referência. A matriz compara fontes públicas de:

- universidades federais: UFSC, UFSCar, UFPel e UFBA;
- universidade estadual: USP;
- universidades e faculdades privadas comunitárias/confessionais: PUC-SP, FAJE e Mackenzie;
- cursos abertos internacionais: MIT OpenCourseWare e Open Yale Courses;
- associação acadêmica: ANPOF;
- bibliotecas e redes abertas: Perseus, Project Gutenberg, Wikisource, Internet Archive, Biblioteca Digital do Senado, SEP, IEP e SciELO.

Isso não constitui um currículo único nem uma lista exaustiva de instituições. Consulte [`RESEARCH_MATRIX.md`](RESEARCH_MATRIX.md) e a página pública [Fontes e método](https://sidineyr.github.io/filosofia-aberta/fontes.html).

## Arquitetura

O projeto é um site estático, sem rastreamento e sem dependências de produção.

```text
content/site-data.mjs   conteúdo estruturado e fontes
scripts/build-site.mjs gerador das páginas estáticas
scripts/check-site.mjs verificações editoriais e técnicas
assets/styles.css      sistema visual responsivo
assets/app.js          preferências, progresso, notas e filtro
leituras/              páginas HTML geradas
```

## Desenvolvimento

Requisito: Node.js 20 ou posterior.

```bash
npm test
```

O comando regenera o site, verifica a sintaxe JavaScript e executa mais de mil asserções sobre estrutura editorial, metadados, acessibilidade básica, páginas, âncoras e links internos. O workflow `Quality checks` repete a verificação no GitHub Actions e confirma que os arquivos gerados estão versionados.

## Regra editorial

Uma leitura só é publicada quando contém:

1. posição, contexto e pergunta filosófica;
2. obra e passagem localizáveis;
3. edição/base, nota de tradução, fonte, direitos e data de consulta;
4. explicação, conceitos e alerta contra um equívoco provável;
5. duas perguntas de reflexão;
6. duas ou três leituras legalmente acessíveis, incluindo fonte primária e apoio acadêmico;
7. relação explícita com a leitura seguinte;
8. revisão de navegação e acessibilidade.

## Direitos e créditos

Concepção e autoria: **Sidiney Rodrigues**.

Conteúdo autoral do projeto: **CC BY 4.0**, salvo indicação diferente. Textos e plataformas de terceiros preservam suas próprias licenças, direitos e condições. Traduções produzidas para orientação são marcadas como “tradução de trabalho” e não substituem edições publicadas.

Desenvolvimento e revisão técnica/editorial com apoio de inteligência artificial da **OpenAI**. Isso não implica parceria, certificação ou endosso das instituições citadas.
