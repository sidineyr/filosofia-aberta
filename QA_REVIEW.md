# Revisão de qualidade — pesquisador aprendiz e revisão editorial rigorosa

Data: 2026-09-07

## Perspectiva de teste

O projeto foi relido como se fosse material de uma escola organizada, por um estudante iniciante e por um revisor editorial rigoroso. As perguntas de controle foram:

- Por onde o aluno começa?
- Cada link tem uma função clara?
- O aluno sabe por que está abrindo uma fonte externa?
- É possível voltar ao ponto exato da investigação sem perder o fio?
- Está claro o que é fonte, tradução, interpretação e produção do projeto?
- Está claro o que já existe e o que ainda é planejado?
- Autoria, direitos, apoio de IA e caráter experimental estão explícitos?
- O site está realmente publicado ou apenas commitado?
- Indexação foi apenas preparada ou efetivamente confirmada?

## Problemas encontrados e correções

- **Links externos estavam soltos.** O módulo foi reorganizado como um fio: contexto → pergunta → conceitos → obra → passagem → análise → interpretações → caderno → ponte para o próximo problema.
- **As fontes podiam parecer uma lista bibliográfica desconectada.** Agora cada fonte tem uma missão pedagógica declarada antes de ser aberta e uma ligação de retorno ao ponto de origem.
- **Saídas externas podiam quebrar a continuidade.** As consultas externas usam nova aba (`target="_blank"` com `rel="noopener noreferrer"`) para preservar o percurso principal.
- **O percurso parecia mais pronto do que estava.** A abertura identifica explicitamente o módulo de Sócrates como piloto e os módulos futuros como planejados.
- **Risco de confundir Sócrates histórico e Sócrates de Platão.** A distinção foi reforçada antes da leitura da *Apologia*.
- **A biblioteca não deixava evidente a função de cada recurso.** SEP, Perseus, Gutenberg e IEP passaram a ser classificados pelo papel que desempenham na investigação.
- **Créditos e caráter experimental precisavam virar política editorial.** Foi criado `CREDITS_AND_SOURCES.md` e o README agora explicita autoria, CC BY 4.0, fontes de terceiros, apoio de IA e natureza experimental.
- **SEO e descoberta precisavam ser separados de indexação real.** O repositório possui canonical, robots, sitemap e chave IndexNow; porém envio e indexação são estados distintos e não devem ser anunciados como equivalentes.

## Verificação de fontes

Conferidas em 2026-09-07:

1. **Stanford Encyclopedia of Philosophy — “Socrates”**: sustenta a cautela sobre fontes indiretas e o chamado problema socrático.
2. **Perseus Catalog — Plato, *Apology***: usado para identificação bibliográfica e tradição textual da obra.
3. **Project Gutenberg — *Apology*, tradução de Benjamin Jowett**: usado para a tradução inglesa histórica relacionada à passagem 38a.
4. **Internet Encyclopedia of Philosophy — “Socrates”**: usada como referência complementar para comparação.

Nenhuma dessas instituições é apresentada como parceira ou endossante do projeto.

## Créditos e direitos

- Concepção e autoria: **Sidiney Rodrigues**.
- Projeto: **experimental, gratuito e em desenvolvimento**.
- Conteúdo autoral do projeto: **CC BY 4.0**, salvo indicação diferente.
- Materiais externos mantêm seus próprios direitos, licenças e termos.
- Desenvolvimento e revisão com apoio de IA da **OpenAI**, sem implicar parceria institucional, certificação acadêmica ou endosso.

## Publicação: estado real

O repositório informa `has_pages: true`, portanto GitHub Pages está habilitado. Entretanto, os últimos runs do workflow personalizado `Deploy GitHub Pages` falharam. Por isso, **não se deve afirmar que a revisão mais recente está publicada enquanto não houver um deploy bem-sucedido e uma checagem da URL pública**.

Esse ponto é um bloqueador de publicação, não um detalhe cosmético.

## Indexação: estado real

Preparado no repositório:

- `robots.txt` com permissão de rastreamento e referência ao sitemap;
- `sitemap.xml` com URL canônica e `lastmod`;
- metadados de indexação e canonical no HTML;
- arquivo público de chave IndexNow;
- workflow `indexnow.yml` programado para notificar mecanismos compatíveis **somente depois de um deploy bem-sucedido**.

Ainda precisa de comprovação operacional:

- deploy público bem-sucedido;
- leitura pública de `robots.txt`, `sitemap.xml` e chave IndexNow;
- confirmação de submissão/recebimento no Bing Webmaster Tools / IndexNow;
- propriedade e sitemap acompanhados no Google Search Console;
- verificação posterior de rastreamento e indexação.

Enviar sitemap ou IndexNow não garante indexação.

## Limites desta revisão

Ainda não deve ser chamada de versão estável. Permanecem como etapas de aprovação:

- resolver o bloqueio de deploy do GitHub Pages;
- validar a versão pública após o deploy;
- testar navegação por teclado e leitor de tela em navegador real;
- testar pelo menos desktop e smartphone;
- executar auditorias Lighthouse/axe ou equivalentes;
- confirmar todos os destinos externos na versão publicada;
- corrigir qualquer erro de validação HTML/CSS encontrado na etapa final.

## Regra para novos módulos

Nenhum módulo deve ser marcado como disponível antes de conter:

1. pergunta filosófica explícita;
2. contexto mínimo verificável;
3. obra e passagem localizáveis;
4. distinção entre fonte, tradução, paráfrase e interpretação;
5. links externos com finalidade pedagógica declarada;
6. caminho de retorno ao fio principal;
7. perguntas de leitura e pelo menos uma objeção;
8. referências verificadas;
9. créditos e direitos quando aplicável;
10. revisão de acessibilidade e navegação;
11. deploy bem-sucedido e teste da versão pública.
