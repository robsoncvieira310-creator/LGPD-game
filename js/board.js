/**
 * Tabuleiro do Jogo LGPD
 * Renderiza o tabuleiro em Canvas
 */

// Funcao auxiliar para desenhar retangulos arredondados (compatibilidade)
function drawRoundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
}

const Board = {
    canvas: null,
    ctx: null,
    totalHouses: 30,
    houseTypes: [],
    housePositions: [],

    // Cores dos tipos de casa
    colors: {
        green: '#22c55e',
        blue: '#3b82f6',
        yellow: '#eab308',
        red: '#ef4444',
        gold: '#f59e0b',
        start: '#64748b',
        end: '#8b5cf6'
    },

    // Simbolos dos tipos
    symbols: {
        green: '?',
        blue: '!',
        yellow: '*',
        red: '$',
        gold: '#'
    },

    init() {
        this.canvas = document.getElementById('board-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.setupCanvas();
        this.generateHouseTypes();
        this.calculatePositions();
        this.draw();
    },

    setupCanvas() {
        const container = this.canvas.parentElement;
        let size = Math.min(container.clientWidth, container.clientHeight);
        // Garantir tamanho minimo para o canvas
        if (size < 100) {
            size = 400;
        }
        this.canvas.width = size * 2; // Retina
        this.canvas.height = size * 2;
        this.canvas.style.width = size + 'px';
        this.canvas.style.height = size + 'px';
        this.ctx.scale(2, 2);
    },

    generateHouseTypes() {
        this.houseTypes = [];
        for (let i = 0; i < this.totalHouses; i++) {
            if (i === 0) {
                this.houseTypes.push('start');
            } else if (i === this.totalHouses - 1) {
                this.houseTypes.push('end');
            } else {
                const rand = Math.random();
                if (rand < 0.40) this.houseTypes.push('green');
                else if (rand < 0.55) this.houseTypes.push('blue');
                else if (rand < 0.70) this.houseTypes.push('yellow');
                else if (rand < 0.85) this.houseTypes.push('red');
                else this.houseTypes.push('gold');
            }
        }
    },

    calculatePositions() {
        this.housePositions = [];
        const size = this.canvas.width / 2;
        const padding = 40;
        const innerSize = size - padding * 2;
        const cols = 6;
        const rows = Math.ceil(this.totalHouses / cols);
        const houseW = innerSize / cols;
        const houseH = innerSize / rows;

        for (let i = 0; i < this.totalHouses; i++) {
            const row = Math.floor(i / cols);
            const colInRow = i % cols;
            const isReverseRow = row % 2 === 1;
            const col = isReverseRow ? (cols - 1 - colInRow) : colInRow;

            const x = padding + col * houseW + houseW / 2;
            const y = padding + (rows - 1 - row) * houseH + houseH / 2;

            this.housePositions.push({ x, y, w: houseW * 0.7, h: houseH * 0.7 });
        }
    },

    draw() {
        const size = this.canvas.width / 2;
        const ctx = this.ctx;

        // Fundo
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, size, size);

        // Desenhar casas
        for (let i = 0; i < this.totalHouses; i++) {
            this.drawHouse(i);
        }

        // Desenhar caminho entre casas
        this.drawPath();
    },

    drawPath() {
        const ctx = this.ctx;
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);

        ctx.beginPath();
        for (let i = 0; i < this.housePositions.length - 1; i++) {
            const from = this.housePositions[i];
            const to = this.housePositions[i + 1];
            ctx.moveTo(from.x, from.y);
            ctx.lineTo(to.x, to.y);
        }
        ctx.stroke();
        ctx.setLineDash([]);
    },

    drawHouse(index) {
        const ctx = this.ctx;
        const pos = this.housePositions[index];
        const type = this.houseTypes[index];
        const color = this.colors[type];

        // Sombra
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;

        // Casa
        ctx.fillStyle = '#1e293b';
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;

        const w = pos.w;
        const h = pos.h;
        const r = 8;

        drawRoundRect(ctx, pos.x - w/2, pos.y - h/2, w, h, r);
        ctx.fill();
        ctx.stroke();

        ctx.shadowBlur = 0;

        // Numero da casa
        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 10px Segoe UI';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(index.toString(), pos.x, pos.y - h/4);

        // Simbolo do tipo
        ctx.fillStyle = color;
        ctx.font = 'bold 14px Segoe UI';
        ctx.fillText(this.symbols[type], pos.x, pos.y + h/6);
    },

    drawPlayers(players, currentPlayerIndex) {
        const ctx = this.ctx;
        const size = this.canvas.width / 2;

        // Limpar apenas as pecas (redesenhar tudo)
        this.draw();

        // Desenhar pecas dos jogadores
        players.forEach((player, pIndex) => {
            const posIndex = Math.min(player.position, this.totalHouses - 1);
            const pos = this.housePositions[posIndex];
            const isActive = pIndex === currentPlayerIndex;

            // Calcular offset para jogadores na mesma casa
            const playersOnSameHouse = players.filter((p, i) => 
                i !== pIndex && Math.min(p.position, this.totalHouses - 1) === posIndex
            ).length;

            const offsetX = (playersOnSameHouse % 2) * 12 - 6;
            const offsetY = Math.floor(playersOnSameHouse / 2) * 12 - 6;

            const x = pos.x + offsetX;
            const y = pos.y + pos.h / 2 + 10 + offsetY;

            // Peca
            ctx.beginPath();
            ctx.arc(x, y, isActive ? 10 : 8, 0, Math.PI * 2);
            ctx.fillStyle = player.color;
            ctx.fill();

            if (isActive) {
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            // Inicial do jogador
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 10px Segoe UI';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(player.name.charAt(0).toUpperCase(), x, y);
        });
    },

    getHouseType(index) {
        return this.houseTypes[index] || 'green';
    },

    resize() {
        this.setupCanvas();
        this.calculatePositions();
        this.draw();
    }
};
