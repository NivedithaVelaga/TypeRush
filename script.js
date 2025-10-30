// TypeRush - Typing Speed Test Application
const quotes = [
    "The quick brown fox jumps over the lazy dog.",
    "Programming is the art of telling another human what one wants the computer to do.",
    "Coding is not just code, that is a live thing to serve everyone.",
    "Practice makes perfect when it comes to typing speed and accuracy.",
    "The only way to learn a new programming language is by writing programs in it."
];

class TypeRush {
    constructor() {
        this.quotes = quotes;
        this.currentQuote = '';
        this.startTime = null;
        this.timerInterval = null;
        this.isCompleted = false;
        
        this.initializeElements();
        this.setupEventListeners();
        this.startGame();
    }
    
    initializeElements() {
        this.quoteElement = document.getElementById('quote');
        this.inputElement = document.getElementById('input');
        this.timerElement = document.getElementById('timer');
        this.speedElement = document.getElementById('speed');
        this.accuracyElement = document.getElementById('accuracy');
        this.restartButton = document.getElementById('restart');
    }
    
    setupEventListeners() {
        this.inputElement.addEventListener('input', () => this.handleInput());
        this.restartButton.addEventListener('click', () => this.startGame());
        
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && this.inputElement.disabled) {
                this.startGame();
            }
        });
    }
    
    getRandomQuote() {
        return this.quotes[Math.floor(Math.random() * this.quotes.length)];
    }
    
    startGame() {
        this.currentQuote = this.getRandomQuote();
        this.quoteElement.textContent = this.currentQuote;
        this.inputElement.value = '';
        this.inputElement.disabled = false;
        this.inputElement.focus();
        this.isCompleted = false;
        
        this.resetStats();
        this.startTimer();
    }
    
    resetStats() {
        this.timerElement.textContent = '0';
        this.speedElement.textContent = '0';
        this.accuracyElement.textContent = '0';
        
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
    
    startTimer() {
        this.startTime = new Date();
        this.timerInterval = setInterval(() => this.updateTimer(), 1000);
    }
    
    updateTimer() {
        const currentTime = new Date();
        const elapsedTime = Math.floor((currentTime - this.startTime) / 1000);
        this.timerElement.textContent = elapsedTime;
    }
    
    handleInput() {
        this.calculateStats();
        this.updateQuoteDisplay();
        this.checkCompletion();
    }
    
    calculateStats() {
        const typedText = this.inputElement.value;
        const elapsedTime = Math.floor((new Date() - this.startTime) / 1000);
        
        // Calculate WPM
        const wordsTyped = typedText.trim().split(/\s+/).length;
        const minutes = elapsedTime / 60;
        const wpm = minutes > 0 ? Math.round(wordsTyped / minutes) : 0;
        this.speedElement.textContent = wpm;
        
        // Calculate Accuracy
        let correctChars = 0;
        for (let i = 0; i < typedText.length; i++) {
            if (i < this.currentQuote.length && typedText[i] === this.currentQuote[i]) {
                correctChars++;
            }
        }
        
        const accuracy = typedText.length > 0 ? Math.round((correctChars / typedText.length) * 100) : 0;
        this.accuracyElement.textContent = accuracy;
    }
    
    updateQuoteDisplay() {
        const typedText = this.inputElement.value;
        let styledQuote = '';
        
        for (let i = 0; i < this.currentQuote.length; i++) {
            if (i < typedText.length) {
                if (typedText[i] === this.currentQuote[i]) {
                    styledQuote += `<span class="correct">${this.currentQuote[i]}</span>`;
                } else {
                    styledQuote += `<span class="incorrect">${this.currentQuote[i]}</span>`;
                }
            } else {
                styledQuote += this.currentQuote[i];
            }
        }
        
        this.quoteElement.innerHTML = styledQuote;
    }
    
    checkCompletion() {
        if (this.inputElement.value === this.currentQuote) {
            // Stop the timer immediately
            clearInterval(this.timerInterval);
            this.inputElement.disabled = true;
            this.isCompleted = true;
            
            // Calculate final stats one more time
            this.calculateStats();
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TypeRush();
});