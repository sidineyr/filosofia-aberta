# Revisão de qualidade — Filosofia Aberta

Data da revisão: 2026-09-10

Versão: 0.3.0

## Escopo

O site oferece um percurso público de leitura filosófica com **14 etapas cronológicas**, **3 rotas em diálogo**, **26 passagens localizáveis** e **42 sugestões de leitura abertas ou de acesso gratuito**.

Critério central de experiência:

**ler → compreender → refletir → continuar**

## Revisão editorial

Cada página publicada foi conferida quanto a:

1. posição no percurso, contexto e pergunta filosófica;
2. identificação de autora ou autor, obra e passagem;
3. separação entre original, tradução de trabalho e interpretação;
4. fonte, edição ou base digital, direitos e data de consulta;
5. explicação, conceitos e alerta contra um equívoco provável;
6. perguntas de reflexão e transição para a próxima leitura;
7. duas ou três sugestões com missão de leitura;
8. distinção entre licença aberta, domínio público e simples acesso gratuito.

As passagens em línguas diferentes do português preservam o original e identificam a tradução como produção de trabalho do projeto. Citações breves de obras ainda protegidas não são apresentadas como conteúdo aberto.

## Pesquisa curricular

A matriz não se limita às universidades federais. Foram verificadas fontes públicas de universidades federais, estadual e comunitária/confessional, cursos abertos internacionais e associação acadêmica:

- UFSC, UFSCar, UFPel e UFBA;
- USP, PUC-SP, FAJE e Mackenzie;
- MIT OpenCourseWare e Open Yale Courses;
- ANPOF.

A seleção é representativa, não exaustiva, e não implica endosso institucional. Metodologia, links e limites estão em `RESEARCH_MATRIX.md` e na página `fontes.html`.

## Arquitetura e navegação

| Elemento | Verificação |
|---|---|
| Página inicial | Apresenta escopo real, períodos, rotas e retomada de leitura. |
| Leituras | 17 páginas individuais com sumário, texto, reflexão, notas e paginação. |
| Biblioteca | Filtro local por autor, tema, pergunta ou período. |
| Fontes | Critérios editoriais, matriz institucional, direitos e limites. |
| Continuidade | Toda leitura possui destino anterior ou seguinte coerente. |
| Persistência | Progresso, notas e preferências ficam apenas no navegador. |
| URLs | Links internos, âncoras, canonical, sitemap e página 404 verificados. |

## Acessibilidade e responsividade

O código inclui:

- idioma `pt-BR`, HTML semântico e ordem coerente de títulos;
- link “Pular para o conteúdo” e navegação por teclado;
- foco visível e estados que não dependem apenas de cor;
- contraste textual alto e áreas de interação identificadas;
- controles de tamanho, espaçamento e modo de foco;
- rótulos e estados ARIA nos controles interativos;
- preferência `prefers-reduced-motion`;
- pontos de quebra para desktop, tablet e celular;
- funcionamento do conteúdo essencial sem JavaScript.

## Verificação automatizada

O comando único é:

```bash
npm test
```

Ele executa:

1. geração determinística de todas as páginas;
2. verificação de sintaxe do JavaScript do navegador;
3. mais de mil asserções sobre estrutura, metadados, passagens, leituras, acessibilidade básica, arquivos, links e âncoras internas.

O workflow `.github/workflows/quality.yml` repete a bateria no GitHub Actions e falha se os arquivos gerados não corresponderem ao conteúdo-fonte.

## Limites declarados

- A organização em quatro períodos é um mapa didático frequente, não uma história universal completa.
- As instituições consultadas formam uma amostra diversificada e ampliável, não “todas as universidades”.
- Tradições africanas, indígenas, islâmicas, chinesas, indianas e latino-americanas exigem expansão com contexto próprio; as três rotas atuais não encerram esse trabalho.
- A inclusão de materiais indígenas dependerá de autoria, proveniência, tradução, autorização e licença seguras.
- A revisão automatizada não substitui pesquisa com estudantes, auditoria por leitor de tela real ou teste em todo dispositivo físico existente.

## Regra para novas leituras

Nenhuma leitura deve ser publicada antes de cumprir os oito critérios editoriais acima, passar pela bateria automatizada e ser verificada na versão pública.
