/**
 * Logica Principal do Jogo LGPD
 */

const Game = {
    // Estado do jogo
    mode: 'solo', // 'solo' ou 'multiplayer'
    players: [],
    currentPlayerIndex: 0,
    usedQuestions: [],
    isRunning: false,
    selectedAnswer: null,

    // Cores dos jogadores
    playerColors: ['#3b82f6', '#ef4444', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899'],

    // Inicializar jogo
    start(mode, playerCount = 1, playerNames = []) {
        this.mode = mode;
        this.players = [];
        this.currentPlayerIndex = 0;
        this.usedQuestions = [];
        this.isRunning = true;

        // Criar jogadores
        if (mode === 'solo') {
            this.players.push({
                name: 'Jogador',
                score: 0,
                position: 0,
                color: this.playerColors[0]
            });
            this.players.push({
                name: 'Computador',
                score: 0,
                position: 0,
                color: this.playerColors[1],
                isBot: true
            });
        } else {
            for (let i = 0; i < playerCount; i++) {
                this.players.push({
                    name: playerNames[i] || `Jogador ${i + 1}`,
                    score: 0,
                    position: 0,
                    color: this.playerColors[i % this.playerColors.length]
                });
            }
        }

        // Inicializar componentes
        Board.init();
        Dice.init();
        this.updateScoreboard();
        this.updateCurrentPlayer();
        this.showScreen('screen-game');

        // Desabilitar dado se for bot
        if (this.players[this.currentPlayerIndex].isBot) {
            Dice.disable();
            setTimeout(() => this.botTurn(), 1000);
        }
    },

    // Mostrar tela
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
    },

    // Atualizar placar
    updateScoreboard() {
        const list = document.getElementById('scoreboard-list');
        list.innerHTML = this.players.map((player, index) => `
            <div class="scoreboard-item ${index === this.currentPlayerIndex ? 'active' : ''}">
                <div class="player-color" style="background: ${player.color}"></div>
                <div class="player-info">
                    <div class="player-name">${player.name}</div>
                </div>
                <div class="player-score">${player.score}</div>
            </div>
        `).join('');
    },

    // Atualizar jogador atual
    updateCurrentPlayer() {
        const player = this.players[this.currentPlayerIndex];
        document.getElementById('current-player-name').textContent = player.name;
        document.getElementById('current-player-name').style.color = player.color;
    },

    // Rolar dado
    async rollDice() {
        if (!this.isRunning) return;

        const result = await Dice.roll();
        if (!result) return;

        const player = this.players[this.currentPlayerIndex];
        const oldPosition = player.position;
        player.position = Math.min(player.position + result, Board.totalHouses - 1);

        // Animar movimento
        await this.animateMovement(player, oldPosition, player.position);

        // Verificar se chegou ao final
        if (player.position >= Board.totalHouses - 1) {
            this.endGame();
            return;
        }

        // Processar casa
        const houseType = Board.getHouseType(player.position);
        await this.processHouse(houseType);
    },

    // Animar movimento da peca
    async animateMovement(player, from, to) {
        for (let i = from + 1; i <= to; i++) {
            player.position = i;
            Board.drawPlayers(this.players, this.currentPlayerIndex);
            await this.sleep(200);
        }
    },

    // Processar tipo de casa
    async processHouse(houseType) {
        switch (houseType) {
            case 'green':
                await this.showQuestion('question', 10);
                break;
            case 'blue':
                await this.showQuestion('challenge', 15);
                break;
            case 'yellow':
                this.showEvent();
                break;
            case 'red':
                this.applyMulta();
                break;
            case 'gold':
                this.applyBonus();
                break;
            default:
                this.nextTurn();
        }
    },

    // Mostrar pergunta
    async showQuestion(type, points) {
        const availableQuestions = QUESTIONS.filter(q => !this.usedQuestions.includes(q.id));
        if (availableQuestions.length === 0) {
            this.usedQuestions = [];
            return this.showQuestion(type, points);
        }

        const question = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
        this.usedQuestions.push(question.id);
        this.selectedAnswer = null;

        const modal = document.getElementById('modal-question');
        const badge = document.getElementById('modal-type');
        const pointsEl = document.getElementById('modal-points');
        const questionText = document.getElementById('modal-question-text');
        const optionsEl = document.getElementById('modal-options');
        const feedbackEl = document.getElementById('modal-feedback');
        const btnAnswer = document.getElementById('btn-answer');
        const btnNext = document.getElementById('btn-next');

        badge.textContent = type === 'question' ? 'Pergunta' : 'Desafio';
        badge.className = 'modal-badge ' + (type === 'question' ? 'question' : 'challenge');
        pointsEl.textContent = `+${points} pts`;
        questionText.textContent = question.question;
        feedbackEl.className = 'modal-feedback hidden';
        btnAnswer.classList.remove('hidden');
        btnNext.classList.add('hidden');

        optionsEl.innerHTML = question.options.map((opt, i) => `
            <button class="option-btn" onclick="Game.selectAnswer(${i})">
                <span class="option-letter">${String.fromCharCode(65 + i)}</span>
                <span class="option-text">${opt.substring(3)}</span>
            </button>
        `).join('');

        modal.classList.add('active');

        // Guardar dados para processar resposta
        this.currentQuestion = question;
        this.currentPoints = points;
    },

    // Selecionar resposta
    selectAnswer(index) {
        this.selectedAnswer = index;
        document.querySelectorAll('.option-btn').forEach((btn, i) => {
            btn.classList.toggle('selected', i === index);
        });
    },

    // Confirmar resposta
    submitAnswer() {
        if (this.selectedAnswer === null) return;

        const question = this.currentQuestion;
        const points = this.currentPoints;
        const isCorrect = this.selectedAnswer === question.correct;

        const feedbackEl = document.getElementById('modal-feedback');
        const btnAnswer = document.getElementById('btn-answer');
        const btnNext = document.getElementById('btn-next');

        // Mostrar feedback
        feedbackEl.className = `modal-feedback ${isCorrect ? 'correct' : 'wrong'}`;
        feedbackEl.innerHTML = isCorrect 
            ? `<strong>Correto!</strong> ${question.explanation}`
            : `<strong>Incorreto!</strong> A resposta correta e: ${question.options[question.correct]}. ${question.explanation}`;

        // Atualizar pontuacao
        const player = this.players[this.currentPlayerIndex];
        player.score = Math.max(0, player.score + (isCorrect ? points : 0));
        this.updateScoreboard();

        // Mostrar botoes
        btnAnswer.classList.add('hidden');
        btnNext.classList.remove('hidden');

        // Destacar resposta correta
        document.querySelectorAll('.option-btn').forEach((btn, i) => {
            btn.classList.remove('selected');
            if (i === question.correct) btn.classList.add('correct');
            else if (i === this.selectedAnswer && !isCorrect) btn.classList.add('wrong');
        });
    },

    // Fechar modal de pergunta
    closeModal() {
        document.getElementById('modal-question').classList.remove('active');
        this.nextTurn();
    },

    // Mostrar evento
    showEvent() {
        const event = EVENTS[Math.floor(Math.random() * EVENTS.length)];
        const modal = document.getElementById('modal-event');
        const icon = document.getElementById('event-icon');
        const text = document.getElementById('event-text');
        const points = document.getElementById('event-points');

        icon.innerHTML = event.icon;
        text.textContent = event.text;
        points.textContent = event.positive ? `+${event.points} pontos` : `${event.points} pontos`;
        points.className = `event-points ${event.positive ? 'positive' : 'negative'}`;

        // Aplicar pontuacao
        const player = this.players[this.currentPlayerIndex];
        player.score = Math.max(0, player.score + event.points);
        this.updateScoreboard();

        modal.classList.add('active');
    },

    // Fechar modal de evento
    closeEventModal() {
        document.getElementById('modal-event').classList.remove('active');
        this.nextTurn();
    },

    // Aplicar multa
    applyMulta() {
        const player = this.players[this.currentPlayerIndex];
        player.score = Math.max(0, player.score - 10);
        this.updateScoreboard();

        const modal = document.getElementById('modal-event');
        const icon = document.getElementById('event-icon');
        const text = document.getElementById('event-text');
        const points = document.getElementById('event-points');

        icon.innerHTML = '&#128176;';
        text.textContent = 'Multa LGPD! Sua empresa foi penalizada por nao cumprir a norma.';
        points.textContent = '-10 pontos';
        points.className = 'event-points negative';

        modal.classList.add('active');
    },

    // Aplicar bonus
    applyBonus() {
        const player = this.players[this.currentPlayerIndex];
        player.score += 20;
        this.updateScoreboard();

        const modal = document.getElementById('modal-event');
        const icon = document.getElementById('event-icon');
        const text = document.getElementById('event-text');
        const points = document.getElementById('event-points');

        icon.innerHTML = '&#127775;';
        text.textContent = 'Bonus! Sua empresa ganha pontos por boas praticas de protecao de dados!';
        points.textContent = '+20 pontos';
        points.className = 'event-points positive';

        modal.classList.add('active');
    },

    // Proximo turno
    nextTurn() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        this.updateScoreboard();
        this.updateCurrentPlayer();
        Dice.reset();

        // Se for bot, fazer turno automatico
        if (this.players[this.currentPlayerIndex].isBot) {
            Dice.disable();
            setTimeout(() => this.botTurn(), 1500);
        }
    },

    // Turno do bot
    async botTurn() {
        if (!this.isRunning) return;

        const result = Math.floor(Math.random() * 6) + 1;
        Dice.lastResult = result;
        document.getElementById('dice').textContent = result;

        await this.sleep(500);

        const player = this.players[this.currentPlayerIndex];
        const oldPosition = player.position;
        player.position = Math.min(player.position + result, Board.totalHouses - 1);

        await this.animateMovement(player, oldPosition, player.position);

        if (player.position >= Board.totalHouses - 1) {
            this.endGame();
            return;
        }

        const houseType = Board.getHouseType(player.position);
        
        // Bot sempre acerta (simulacao)
        if (houseType === 'green' || houseType === 'blue') {
            const points = houseType === 'green' ? 10 : 15;
            player.score += points;
            this.updateScoreboard();
            await this.sleep(800);
            this.nextTurn();
        } else {
            await this.processHouse(houseType);
        }
    },

    // Finalizar jogo
    endGame() {
        this.isRunning = false;
        Dice.disable();

        // Ordenar jogadores por pontuacao
        const sortedPlayers = [...this.players].sort((a, b) => b.score - a.score);
        const winner = sortedPlayers[0];

        // Mostrar tela de vitoria
        document.getElementById('winner-name').textContent = winner.name;
        document.getElementById('winner-name').style.color = winner.color;

        const finalScores = document.getElementById('final-scores');
        finalScores.innerHTML = sortedPlayers.map((player, index) => `
            <div class="final-score-item">
                <span class="rank">${index === 0 ? '&#127942;' : `#${index + 1}`}</span>
                <span class="name" style="color: ${player.color}">${player.name}</span>
                <span class="score">${player.score} pts</span>
            </div>
        `).join('');

        this.showScreen('screen-victory');
    },

    // Resetar jogo
    reset() {
        this.isRunning = false;
        this.players = [];
        this.currentPlayerIndex = 0;
        this.usedQuestions = [];
        Dice.reset();
        this.showScreen('screen-start');
    },

    // Utilitario
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};

// =============================================
// FUNCOES GLOBAIS (chamadas pelo HTML)
// =============================================

function showScreen(screenId) {
    Game.showScreen(screenId);
}

function startGame(mode) {
    Game.start(mode);
}

function showMultiplayerSetup() {
    Game.showScreen('screen-setup');
    updatePlayerInputs();
}

function showRules() {
    Game.showScreen('screen-rules');
}

let playerCount = 2;

function changePlayerCount(delta) {
    playerCount = Math.max(2, Math.min(6, playerCount + delta));
    document.getElementById('player-count').textContent = playerCount;
    updatePlayerInputs();
}

function updatePlayerInputs() {
    const container = document.getElementById('player-names');
    container.innerHTML = '';
    for (let i = 0; i < playerCount; i++) {
        const div = document.createElement('div');
        div.className = 'player-name-input';
        div.innerHTML = `
            <label>Jogador ${i + 1}:</label>
            <input type="text" id="player-name-${i}" value="Jogador ${i + 1}" maxlength="15">
        `;
        container.appendChild(div);
    }
}

function startMultiplayer() {
    const names = [];
    for (let i = 0; i < playerCount; i++) {
        const input = document.getElementById(`player-name-${i}`);
        names.push(input.value.trim() || `Jogador ${i + 1}`);
    }
    Game.start('multiplayer', playerCount, names);
}

function rollDice() {
    Game.rollDice();
}

function selectAnswer(index) {
    Game.selectAnswer(index);
}

function submitAnswer() {
    Game.submitAnswer();
}

function closeModal() {
    Game.closeModal();
}

function closeEventModal() {
    Game.closeEventModal();
}

function resetGame() {
    Game.reset();
}

// Inicializar quando a pagina carregar
window.addEventListener('load', () => {
    Game.showScreen('screen-start');
});
