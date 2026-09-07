# Revisão — pesquisador aprendiz

Data: 2026-09-07

## Perspectiva de teste

A página foi relida como se eu fosse um estudante iniciante tentando responder três perguntas: **por onde começo?**, **o que é fonte e o que é interpretação?** e **o que já está realmente disponível?**

## Problemas encontrados e correções

- **O percurso parecia mais pronto do que estava.** Agora cada pensador está marcado como `disponível` ou `planejado`, e a abertura informa explicitamente que existe 1 módulo piloto.
- **A pergunta inicial era ampla demais para uma única passagem.** O módulo agora conduz o leitor da pergunta à passagem e da passagem à objeção.
- **Risco de confundir Sócrates histórico e Sócrates de Platão.** A distinção foi reforçada antes da leitura e na apresentação da *Apologia*.
- **A tradução pedagógica de 38a soava mais interpretativa que o necessário.** Foi substituída por “a vida sem exame não vale a pena ser vivida”, mantendo a identificação explícita como tradução de trabalho.
- **A biblioteca não deixava tão evidente a função de cada recurso.** As referências agora são rotuladas como texto/catálogo, tradução histórica, referência acadêmica e referência complementar.
- **A navegação precisava de melhores pistas de acessibilidade.** Foram adicionados link “pular para o conteúdo”, `aria-label`, `aria-pressed`, `aria-live`, foco visível, melhor adaptação móvel e tratamento para bloqueio de `localStorage`.
- **SEO básico incompleto na página.** Foram adicionados canonical, robots, author e metadados Open Graph.
- **Expansão de cânone podia parecer conteúdo já produzido.** A seção foi reescrita como compromisso editorial futuro, com cautela contra enquadrar tradições distintas numa narrativa única.

## Verificação de fontes

Foram conferidos em 2026-09-07:

1. Stanford Encyclopedia of Philosophy — `Socrates`.
2. Perseus Catalog — registro de *Apology* de Platão e suas edições/traduções.
3. Project Gutenberg — *Apology*, tradução de Benjamin Jowett; registro identifica Jowett (1817–1893).
4. Internet Encyclopedia of Philosophy — `Socrates`, usada como referência complementar.

## Limites desta revisão

A revisão cobre conteúdo, estrutura, semântica HTML, comportamento do JavaScript e coerência dos destinos externos principais. Teste visual em uma matriz real de navegadores/dispositivos e auditoria automatizada Lighthouse/axe ainda devem ser tratados como uma etapa separada antes de chamar a versão de estável.

## Critério para novos módulos

Nenhum módulo deve ser marcado como disponível antes de conter: contexto mínimo; obra e passagem localizável; distinção entre fonte e interpretação; perguntas de leitura; pelo menos uma objeção; referências verificáveis; e revisão pedagógica para iniciante.
