# Revisão de qualidade — Filosofia Aberta

Data da revisão atual: 2026-09-08

## Perspectiva de teste

O projeto foi revisto simultaneamente como material de História da Filosofia, introdução à leitura de fontes primárias, experiência de aprendizagem para iniciantes e interface web acessível.

Perguntas de controle:

- O estudante sabe por que está em cada etapa?
- Cada link tem missão pedagógica e filosófica explícita?
- Está claro o que é texto primário, contexto, tradução, interpretação e produção do projeto?
- O Sócrates histórico é distinguido do Sócrates representado por Platão?
- A passagem citada está em seu contexto dramático?
- O percurso histórico evita sugerir evolução filosófica linear?
- A interface oferece um próximo passo intelectualmente justificável?

## Auditoria prévia e decisões

| Local | Problema | Classificação | Correção realizada | Justificativa |
|---|---|---|---|---|
| Percurso editorial | “Sócrates leva a Platão...” sugeria sequência excessivamente linear | AMBÍGUO | Reescrito como rede de problemas, continuidades, rupturas e reformulações | Cronologia não deve ser confundida com progresso inevitável |
| Conceitos | “Diálogo” ocupava uma das quatro lentes e faltava cuidado da alma | CORREÇÃO NECESSÁRIA | Incluído “cuidado da alma”, ancorado em *Apologia* 29d–30b | Tema diretamente relevante ao modo de vida defendido na obra |
| 38a | Frase famosa aparecia sem explicitar suficientemente a situação dramática | FORA DE CONTEXTO | 38a agora é apresentado depois da condenação, durante a discussão da pena | Evita transformar uma passagem argumentativa em slogan |
| Tradução de 38a | “não vale a pena ser vivida” podia parecer equivalência literal única | CORRETO, MAS SIMPLIFICADO | Acrescentada tradução de trabalho mais próxima da construção grega e mantida formulação idiomática tradicional | Mostra ao iniciante que tradução envolve escolhas |
| Fonte de 38a | Gutenberg/Jowett aparecia como principal acesso ao texto | LINK INADEQUADO PARA A FUNÇÃO | Perseus 38a passou a ser fonte primária principal; Gutenberg virou tradução histórica complementar | Respeita a hierarquia texto primário → edição/tradução → comentário |
| Ignorância socrática | Risco de slogan “sabia que nada sabia” | AMBÍGUO | Explicada via episódio do oráculo 21a–23b, sem usar o slogan como citação | Evita atribuição textual falsa ou simplificadora |
| Interpretação | Questões críticas contemporâneas podiam parecer parte do texto antigo | INTERPRETAÇÃO APRESENTADA SEM CAMADA VISUAL SUFICIENTE | Criadas camadas visuais para texto, contexto, conceito, interpretação e resposta do estudante | O aluno deve reconhecer a natureza epistêmica do que lê |
| CSS `.sr` | `clip:rect(...)` estava sintaticamente incompleto | CORREÇÃO NECESSÁRIA | Sintaxe corrigida | Remove erro objetivo e preserva padrão de acessibilidade |
| Mapa | Decoração de seta absoluta podia se posicionar de forma imprevisível | CORREÇÃO TÉCNICA | Regra removida e os itens passaram a usar posicionamento estável | Evita defeito visual em diferentes larguras |

## Fontes verificadas na revisão

### Texto primário e edição

- **Perseus — Platão, *Apologia* 38a, tradução de Harold North Fowler**: confirma que a afirmação sobre a vida não examinada aparece junto da referência a conversar diariamente sobre *aretê* e examinar a si e aos outros.
- **Perseus — texto grego de 38a, edição de John Burnet**: usado para conferir a construção `ὁ δὲ ἀνεξέταστος βίος οὐ βιωτὸς ἀνθρώπῳ` e evitar apresentar uma única tradução idiomática como literal.
- **Perseus Catalog — Plato, *Apology***: confirma autoria, obra, edições gregas e tradução inglesa catalogada.

### Referências acadêmicas

- **Stanford Encyclopedia of Philosophy — “Socrates”**: confirma que Sócrates nada escreveu, que as informações são indiretas e disputadas e que distinguir o Sócrates histórico das representações posteriores constitui o problema socrático.
- **Internet Encyclopedia of Philosophy — “Socrates”**: usada para conferir as distinções entre ignorância socrática, prioridade do cuidado da alma, vida examinada, ironia e *elenchus*, inclusive registrando controvérsias interpretativas.

### Tradução histórica complementar

- **Project Gutenberg — *Apology*, Benjamin Jowett**: permanece disponível para comparação histórica de tradução, mas não exerce mais a função de fonte principal da passagem 38a.

## Correções filosófico-pedagógicas realizadas

1. A pergunta central foi ancorada diretamente na *Apologia* em vez de formular uma tese geral sobre o Sócrates histórico.
2. A distinção “Sócrates histórico ≠ personagem socrático ≠ filosofia de Platão” foi tornada explícita logo no início.
3. O percurso histórico deixou de usar linguagem de sucessão necessária entre filósofos.
4. *Aretê* passou a ser apresentada como termo cuja tradução depende do contexto.
5. O cuidado da alma foi incluído e relacionado a 29d–30b.
6. A ignorância socrática foi associada ao episódio do oráculo 21a–23b, evitando o falso estatuto de citação para “só sei que nada sei”.
7. 38a foi contextualizado como parte da discussão posterior à condenação e ligado ao argumento sobre continuar a atividade filosófica.
8. As duas leituras apresentadas no site foram marcadas explicitamente como interpretações pedagógicas, não como texto de Platão ou consenso acadêmico.
9. O futuro módulo de Platão passou a ser anunciado como nova investigação, não como continuação evolutiva automática.

## UX educacional

O módulo foi reorganizado para que cada etapa termine com uma indicação predominante de **PRÓXIMA PERGUNTA →**.

As camadas agora são rotuladas visualmente como:

- CONTEXTO HISTÓRICO;
- QUESTÃO PARA O ESTUDANTE;
- CONCEITOS;
- TEXTO PRIMÁRIO;
- INTERPRETAÇÃO;
- RESPOSTA DO ESTUDANTE;
- NOVA PERGUNTA.

Os links externos seguem o padrão:

**origem → missão → destino → retorno**.

Todos os links externos presentes no módulo revisado usam `target="_blank"` e `rel="noopener noreferrer"`.

## Teste pedagógico por conteúdo

Após o percurso, o estudante deve conseguir responder:

1. Quem foi Sócrates e por que sua reconstrução histórica é difícil?
2. Por que a *Apologia* deve ser lida como obra de Platão e não ata judicial neutra?
3. Qual é o contexto dramático de 38a?
4. O que a passagem efetivamente menciona antes de afirmar que a vida não examinada não é vivível?
5. Qual a diferença entre tradução, texto antigo, reconstrução acadêmica e interpretação pessoal?

A nova arquitetura foi construída explicitamente para fornecer elementos para essas cinco respostas.

## Verificação técnica realizada nesta revisão

- CSS `.sr` corrigido.
- Regra visual problemática do mapa corrigida.
- Links externos principais conferidos contra os destinos oficiais/acadêmicos.
- Links internos foram reestruturados para apontar somente para IDs existentes no novo documento.
- Navegação móvel mantém os breakpoints já existentes e as novas camadas usam componentes responsivos existentes.
- Controles de foco, tamanho de fonte, espaçamento, impressão e armazenamento local foram preservados.

## Publicação verificada

A revisão foi enviada para a branch `gh-pages` no SHA `4694d7a982585e76386c21c8c60d42e325da42f3`.

GitHub Actions run **34218918384 — pages build and deployment**:

- `build`: **success**;
- `report-build-status`: **success**;
- `deploy`: **success**.

Portanto, a revisão filosófica e de UX correspondente a esse SHA foi publicada com sucesso pelo fluxo nativo do GitHub Pages.

## Limites da verificação

Esta revisão não substitui teste com leitor de tela real, Lighthouse, axe, smartphone físico ou múltiplos navegadores. Esses testes continuam recomendados antes de chamar a versão de estável.

## Indexação

SEO, sitemap, robots e IndexNow continuam sendo mecanismos de descoberta; nenhum deles garante indexação.

## Regra para novos módulos

Nenhum módulo deve ser marcado como disponível antes de conter:

1. pergunta filosófica explícita e vinculada a uma obra/passagem;
2. contexto mínimo verificável;
3. obra, edição e passagem localizáveis;
4. distinção entre fonte, tradução, paráfrase e interpretação;
5. termos técnicos apresentados com cautela tradutória;
6. links externos com missão pedagógica declarada;
7. caminho de retorno ao fio principal;
8. pelo menos uma questão de leitura e uma objeção;
9. relações históricas descritas sem teleologia simplificadora;
10. referências verificadas;
11. créditos e direitos quando aplicável;
12. revisão de acessibilidade e navegação;
13. deploy bem-sucedido e teste da versão pública.
