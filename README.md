# LGPD: O Desafio da Protecao de Dados 

Jogo educativo digital sobre a Lei Geral de Protecao de Dados Pessoais (LGPD).

## Descricao

**LGPD: O Desafio da Protecao de Dados** e um jogo de tabuleiro digital que ensina os principais conceitos da LGPD de forma divertida e interativa. Os jogadores assumem o papel de Encarregados de Protecao de Dados (DPOs) e precisam navegar por um tabuleiro enfrentando desafios sobre a lei.

## Funcionalidades

- Modo Solo (vs computador)
- Modo Multiplayer (2-6 jogadores)
- 30 perguntas sobre LGPD
- Tabuleiro com 30 casas
- Sistema de pontuacao
- Feedback educativo

## Como Jogar

### Online (GitHub Pages)

Acesse: [Inserir URL do GitHub Pages]

### Local

1. Clone o repositorio
2. Abra o arquivo `index.html` em qualquer navegador moderno

```bash
git clone https://github.com/usuario/lgpd-game.git
cd lgpd-game
# Abra index.html no navegador
```

## Estrutura do Projeto

```
lgpd-game/
├── index.html          # Pagina principal
├── css/
│   └── style.css       # Estilos
├── js/
│   ├── game.js         # Logica principal
│   ├── questions.js    # Banco de perguntas
│   ├── board.js        # Logica do tabuleiro
│   └── dice.js         # Animacao do dado
├── img/                # Imagens
├── docs/               # Documentacao
│   ├── REGRAS.md       # Regras do jogo
│   ├── SOBRE.md        # Sobre o jogo
│   └── REFERENCIAS.md  # Referencias
└── README.md           # Este arquivo
```

## Regras do Jogo

### Objetivo

Seja o primeiro a percorrer o tabuleiro com pelo menos 100 pontos.

### Casas

| Cor | Tipo | Pontuacao |
|-----|------|-----------|
| 🟢 Verde | Pergunta | +10 pts |
| 🔵 Azul | Desafio | +15 pts |
| 🟡 Amarelo | Evento | Variavel |
| 🔴 Vermelho | Multa | -10 pts |
| ⭐ Dourado | Bonus | +20 pts |

### Como Jogar

1. Rola o dado
2. Move a peca
3. Responde a pergunta/desafio
4. Ganha ou perde pontos
5. Passa a vez

## Conteudo

O jogo aborda os seguintes temas da LGPD:

- Conceitos basicos
- Direitos dos titulares
- Bases legais
- Principios de tratamento
- Punicoes e multas
- Papeis e responsabilidades
- Seguranca da informacao

## Tecnologias

- HTML5
- CSS3
- JavaScript (vanilla)
- Canvas API

## Desenvolvimento

### Pré-requisitos

- Navegador moderno (Chrome, Firefox, Edge, Safari)
- Editor de codigo (VS Code, etc.)

### Instalacao

1. Faca o fork do repositorio
2. Crie uma branch para sua feature
3. Faca commit das alteracoes
4. Faca push para a branch
5. Abra um Pull Request

## Documentacao

- [Regras do Jogo](docs/REGRAS.md)
- [Sobre o Jogo](docs/SOBRE.md)
- [Referencias](docs/REFERENCIAS.md)

## Contexto Academico

Este jogo foi desenvolvido como atividade pratica para a disciplina de **Qualidade e Auditoria de Tecnologia da Informacao**.

- **Curso:** Analise e Desenvolvimento de Sistemas / Gestao da Tecnologia da Informacao
- **Professor:** Stefani Mano Valmini
- **Turma:** 120-0029SEXNT
- **Ano/Semestre:** 2026/2

## Licenca

Este projeto e para uso academico.
