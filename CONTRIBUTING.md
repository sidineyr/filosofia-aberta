# Como contribuir com o Filosofia Aberta

O Filosofia Aberta é um projeto educacional experimental, gratuito e aberto. Contribuições são bem-vindas quando aumentam o rigor filosófico, a clareza pedagógica, a acessibilidade ou a qualidade das fontes.

## Antes de propor uma alteração

Toda mudança de conteúdo filosófico deve responder a pelo menos uma destas perguntas:

1. A afirmação está apoiada por uma fonte primária ou referência acadêmica adequada?
2. O texto distingue fato histórico, texto primário, tradução, interpretação e síntese pedagógica?
3. O link externo tem uma função explícita no percurso de aprendizagem?
4. A alteração ajuda um iniciante sem simplificar o conceito até torná-lo incorreto?
5. A relação entre autores evita sugerir uma evolução filosófica inevitável?

## Hierarquia de fontes

Preferir, quando aplicável:

1. texto primário;
2. edição crítica ou catálogo acadêmico;
3. Stanford Encyclopedia of Philosophy;
4. Internet Encyclopedia of Philosophy;
5. bibliografia acadêmica reconhecida.

Evitar blogs, agregadores e resumos genéricos quando houver fonte acadêmica melhor.

## Regra de navegação

Links externos devem ter:

- uma pergunta que justifique a consulta;
- uma missão de leitura;
- um destino adequado;
- uma orientação de retorno ao percurso principal.

## Novos módulos

Um módulo só deve ser publicado depois de cumprir a lista de controle registrada em `QA_REVIEW.md`.

O conteúdo fica em `content/site-data.mjs`; os arquivos HTML de `leituras/` são gerados. Evite editar uma página gerada isoladamente, pois a próxima construção substituirá a mudança.

Antes de enviar uma contribuição, execute:

```bash
npm test
```

O teste regenera o site, verifica a sintaxe do JavaScript e confere conteúdo, metadados, acessibilidade básica, links e âncoras internas.

## Direitos e acesso

- Identifique sempre a edição ou base digital e a passagem exata.
- Chame um recurso de “aberto” apenas quando houver licença compatível ou domínio público aplicável.
- Quando o material for apenas gratuito para consulta, descreva-o como “acesso gratuito”.
- Não reproduza trechos longos de obras protegidas.
- Para tradições orais ou saberes comunitários, verifique autoria, proveniência, autorização e contexto antes de publicar.

## Créditos

Concepção e autoria do projeto: **Sidiney Rodrigues**.

O apoio de inteligência artificial deve ser descrito como apoio de desenvolvimento e revisão, nunca como certificação acadêmica, parceria institucional ou endosso.
