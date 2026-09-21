/**
 * Dado Virtual do Jogo
 * Gerencia a animacao e resultado do dado
 */

const Dice = {
    isRolling: false,
    lastResult: 0,
    diceElement: null,

    init() {
        this.diceElement = document.getElementById('dice');
    },

    async roll() {
        if (this.isRolling) return null;
        
        this.isRolling = true;
        const btnRoll = document.getElementById('btn-roll');
        btnRoll.disabled = true;
        btnRoll.style.opacity = '0.5';

        // Animacao de rolagem
        this.diceElement.classList.add('rolling');
        
        // Numeros aleatorios durante a animacao
        const animDuration = 800;
        const animInterval = 80;
        const startTime = Date.now();

        await new Promise(resolve => {
            const animIntervalId = setInterval(() => {
                const elapsed = Date.now() - startTime;
                if (elapsed >= animDuration) {
                    clearInterval(animIntervalId);
                    resolve();
                } else {
                    this.diceElement.textContent = Math.floor(Math.random() * 6) + 1;
                }
            }, animInterval);
        });

        // Resultado final
        this.lastResult = Math.floor(Math.random() * 6) + 1;
        this.diceElement.textContent = this.lastResult;
        this.diceElement.classList.remove('rolling');

        return this.lastResult;
    },

    reset() {
        this.isRolling = false;
        this.lastResult = 0;
        this.diceElement.textContent = '?';
        
        const btnRoll = document.getElementById('btn-roll');
        btnRoll.disabled = false;
        btnRoll.style.opacity = '1';
    },

    disable() {
        const btnRoll = document.getElementById('btn-roll');
        btnRoll.disabled = true;
        btnRoll.style.opacity = '0.5';
    },

    enable() {
        const btnRoll = document.getElementById('btn-roll');
        btnRoll.disabled = false;
        btnRoll.style.opacity = '1';
    }
};
