# Revisão de qualidade — Filosofia Aberta

Data da revisão: 2026-09-08

## Escopo desta reconstrução

O site foi redefinido a partir do documento-mestre “Filosofia Aberta — Redefinição Completa”. A arquitetura principal deixou de ser uma coleção de filósofos e passou a ser um **percurso cronológico de leituras**.

Critério central de UX:

**ler → compreender → refletir → continuar**

## Pesquisa curricular realizada

Foram verificadas fontes institucionais públicas da UFSC, UFSCar, UFPel e UFBA. A pesquisa sustenta:

- divisão macro em Antiga, Medieval, Moderna e Contemporânea;
- uso da História da Filosofia como eixo estrutural da formação;
- sequência antiga de trabalho que inclui pré-socráticos, sofistas, Sócrates, Platão, Aristóteles, helenismo e neoplatonismo;
- convivência entre História da Filosofia e problemas sistemáticos como lógica, ética, política, conhecimento e estética.

A metodologia e os links institucionais estão documentados em `RESEARCH_MATRIX.md`.

## Decisões de arquitetura

| Problema anterior | Alteração | Motivo |
|---|---|---|
| Home centrada no módulo piloto | Home agora começa pelo percurso e pelo botão “Continuar minha leitura” | Reduz decisão inicial e dá orientação imediata |
| Filósofos apresentados como destinos isolados | Períodos expansíveis e sequência cronológica | Faz o estudante saber onde está e o que vem depois |
| Timeline misturava planejado e disponível | Estados “disponível” e “planejado” ficam explícitos | Evita simular conteúdo ainda não revisado |
| Navegação interna orientada por conceitos do piloto | Navegação principal passa a ser Percurso → Leitura atual → Método → Fontes | Alinha interface à nova unidade pedagógica |
| Progresso sem relação clara com percurso | Progresso local é associado à leitura integral disponível | Não cria falsa porcentagem sobre módulos ainda inexistentes |
| Pesquisa curricular pouco visível | Criada seção “Como construímos este percurso?” e matriz auditável | Transparência metodológica |

## Módulo disponível

O módulo Sócrates / Platão foi preservado, mas reposicionado dentro do percurso antigo.

Mantidas as distinções:

- Sócrates histórico;
- Sócrates representado por Platão;
- texto primário;
- tradução;
- interpretação pedagógica.

A leitura continua centrada na *Apologia* 38a, com retorno recomendado a 21a–23b e 29d–30b.

## Acessibilidade e responsividade

A reconstrução mantém ou introduz:

- link “Pular para o conteúdo”;
- HTML semântico;
- foco visível;
- navegação por teclado;
- contraste textual alto;
- layout responsivo;
- preferência `prefers-reduced-motion`;
- controles de tamanho de fonte;
- controle de espaçamento;
- modo de foco;
- áreas clicáveis com texto descritivo;
- navegação sem dependência exclusiva de cor.

## Persistência local

O navegador pode armazenar:

- anotações do módulo Sócrates;
- estado de conclusão da leitura;
- tamanho de fonte.

Nenhum cadastro é exigido.

## Verificação estrutural

Foi conferido no código:

- `lang="pt-BR"`;
- `meta viewport`;
- descrição, autor, robots e canonical;
- navegação principal para IDs existentes;
- links internos da leitura para seções existentes;
- links externos com `target="_blank"` e `rel="noopener noreferrer"`;
- marcação explícita de módulos planejados;
- armazenamento local sem envio de dados;
- breakpoints para tablet e celular.

## Limites

Esta revisão de código não substitui teste com:

- leitor de tela real;
- Lighthouse;
- axe;
- smartphone físico;
- múltiplos navegadores;
- estudo de usabilidade com estudantes reais.

Esses testes continuam necessários antes de declarar uma versão estável.

## Regra para novos módulos

Nenhum módulo deve ser marcado como disponível antes de conter:

1. pergunta filosófica explícita e vinculada a obra/passagem;
2. contexto mínimo verificável;
3. obra, edição e passagem localizáveis;
4. distinção entre fonte, tradução, paráfrase e interpretação;
5. referência curricular verificável quando aplicável;
6. termos técnicos apresentados com cautela tradutória;
7. links externos com função pedagógica clara;
8. pelo menos uma questão de leitura e uma objeção ou problema;
9. transição para a próxima leitura sem teleologia simplificadora;
10. referências verificadas;
11. créditos e direitos;
12. revisão de acessibilidade e navegação;
13. teste da versão publicada.

## Estado de publicação

A reconstrução foi concluída em `main`. A branch de publicação deve ser sincronizada com o commit final e a versão pública deve ser conferida antes de registrar o deploy como verificado.
