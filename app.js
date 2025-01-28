class QuizApp {
    constructor() {
        this.currentPart = 'part1';
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.totalAnswered = 0;
        this.correctAnswers = new Map();
        this.userAnswers = new Map();
        this.secretCode = '';
        this.secretCodeTimeout = null;
        
        this.trackVisit();
        this.initElements();
        this.initEventListeners();
        this.loadQuestion();
        this.initSecretCode();
    }

    // Nouvelle méthode pour tracker les visiteurs
    trackVisit() {
        // Simuler une IP pour la démo (en production, vous utiliseriez l'IP réelle)
        const ip = this.getVisitorIP();
        
        // Récupérer les données des visiteurs
        const visitors = JSON.parse(localStorage.getItem('visitors') || '{}');
        const blockedIPs = JSON.parse(localStorage.getItem('blockedIPs') || '[]');
        
        // Vérifier si l'IP est bloquée
        if (blockedIPs.includes(ip)) {
            alert('Accès refusé. Votre IP a été bloquée.');
            window.location.href = 'blocked.html';
            return;
        }
        
        // Mettre à jour les données du visiteur
        if (!visitors[ip]) {
            visitors[ip] = {
                visits: 0,
                firstVisit: new Date().toISOString(),
                lastVisit: new Date().toISOString()
            };
        }
        
        visitors[ip].visits++;
        visitors[ip].lastVisit = new Date().toISOString();
        
        // Sauvegarder les données
        localStorage.setItem('visitors', JSON.stringify(visitors));
    }

    // Simuler une IP pour la démo
    getVisitorIP() {
        let ip = localStorage.getItem('visitorIP');
        if (!ip) {
            ip = '192.168.' + Math.floor(Math.random() * 255) + '.' + Math.floor(Math.random() * 255);
            localStorage.setItem('visitorIP', ip);
        }
        return ip;
    }

    initElements() {
        // Boutons de navigation entre parties
        this.part1Btn = document.getElementById('part1Btn');
        this.part2Btn = document.getElementById('part2Btn');
        this.part3Btn = document.getElementById('part3Btn');

        // Éléments de la question
        this.questionContainer = document.getElementById('questionContainer');
        this.questionText = document.getElementById('questionText');
        this.choicesContainer = document.getElementById('choices');
        
        // Navigation et progression
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.validateBtn = document.getElementById('validateBtn');
        this.progressBar = document.getElementById('progressBar');
        this.questionCounter = document.getElementById('questionCounter');
        this.scoreElement = document.getElementById('score');
        
        // Modal de résultat
        this.resultModal = document.getElementById('resultModal');
        this.finalScore = document.getElementById('finalScore');
        this.restartBtn = document.getElementById('restartBtn');
    }

    initEventListeners() {
        this.part1Btn.addEventListener('click', () => this.changePart('part1'));
        this.part2Btn.addEventListener('click', () => this.changePart('part2'));
        this.part3Btn.addEventListener('click', () => this.changePart('part3'));
        
        this.prevBtn.addEventListener('click', () => this.previousQuestion());
        this.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.validateBtn.addEventListener('click', () => this.validateAnswer());
        this.restartBtn.addEventListener('click', () => this.restart());
    }

    changePart(part) {
        this.currentPart = part;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.totalAnswered = 0;
        this.correctAnswers.clear();
        this.userAnswers.clear();
        this.loadQuestion();
        this.updateUI();
    }

    loadQuestion() {
        const question = questionsData[this.currentPart][this.currentQuestionIndex];
        this.questionText.textContent = `${this.currentQuestionIndex + 1}. ${question.question}`;
        
        this.choicesContainer.innerHTML = '';
        question.choices.forEach((choice, index) => {
            const inputType = question.type === 'single' ? 'radio' : 'checkbox';
            const choiceElement = document.createElement('div');
            choiceElement.className = 'flex items-center space-x-2 p-2 hover:bg-gray-100 rounded';
            
            const input = document.createElement('input');
            input.type = inputType;
            input.id = `choice${index}`;
            input.name = "question";
            input.value = index;
            input.className = `form-${inputType} h-4 w-4 text-blue-600`;

            // Restaurer la réponse précédente si elle existe
            if (this.userAnswers.has(this.getCurrentQuestionKey())) {
                const previousAnswers = this.userAnswers.get(this.getCurrentQuestionKey());
                if (previousAnswers.includes(index)) {
                    input.checked = true;
                }
            }

            const label = document.createElement('label');
            label.htmlFor = `choice${index}`;
            label.className = 'text-gray-700 w-full cursor-pointer';
            label.textContent = choice;

            choiceElement.appendChild(input);
            choiceElement.appendChild(label);
            this.choicesContainer.appendChild(choiceElement);
        });

        this.updateUI();
    }

    getCurrentQuestionKey() {
        return `${this.currentPart}-${this.currentQuestionIndex}`;
    }

    validateAnswer() {
        const question = questionsData[this.currentPart][this.currentQuestionIndex];
        const selectedInputs = this.choicesContainer.querySelectorAll('input:checked');
        const selectedAnswers = Array.from(selectedInputs).map(input => parseInt(input.value));

        if (selectedAnswers.length === 0) {
            alert('Veuillez sélectionner une réponse');
            return;
        }

        const questionKey = this.getCurrentQuestionKey();
        const isCorrect = this.checkAnswer(question, selectedAnswers);

        // Mettre à jour le score uniquement si c'est une nouvelle réponse ou une correction
        if (!this.userAnswers.has(questionKey)) {
            this.totalAnswered++;
            if (isCorrect) {
                this.score++;
                this.correctAnswers.set(questionKey, true);
            } else {
                this.correctAnswers.set(questionKey, false);
            }
        } else {
            // Si la réponse est modifiée
            const wasCorrect = this.correctAnswers.get(questionKey);
            if (isCorrect !== wasCorrect) {
                this.score += isCorrect ? 1 : -1;
                this.correctAnswers.set(questionKey, isCorrect);
            }
        }

        // Sauvegarder la réponse
        this.userAnswers.set(questionKey, selectedAnswers);
        
        // Afficher la correction
        this.showCorrection(question, selectedAnswers, isCorrect);
        this.updateUI();
    }

    checkAnswer(question, selectedAnswers) {
        if (question.type === 'single') {
            return selectedAnswers[0] === question.correct;
        } else {
            return question.correct.length === selectedAnswers.length &&
                   question.correct.every(correct => selectedAnswers.includes(correct)) &&
                   selectedAnswers.every(answer => question.correct.includes(answer));
        }
    }

    showCorrection(question, selectedAnswers, isCorrect) {
        const inputs = this.choicesContainer.querySelectorAll('input');
        inputs.forEach(input => input.disabled = true);

        const choices = this.choicesContainer.children;
        for (let i = 0; i < choices.length; i++) {
            const choice = choices[i];
            const isSelected = selectedAnswers.includes(i);
            const isCorrectChoice = question.type === 'single' 
                ? i === question.correct 
                : question.correct.includes(i);

            if (isSelected) {
                if (isCorrectChoice) {
                    choice.classList.add('bg-green-100');
                } else {
                    choice.classList.add('bg-red-100');
                }
            } else if (isCorrectChoice) {
                choice.classList.add('bg-green-50');
            }
        }

        // Afficher un message de feedback
        const feedbackElement = document.createElement('div');
        feedbackElement.className = `mt-4 p-3 rounded ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`;
        feedbackElement.textContent = isCorrect ? 'Bonne réponse !' : 'Mauvaise réponse.';
        this.choicesContainer.appendChild(feedbackElement);

        // Désactiver le bouton de validation
        this.validateBtn.disabled = true;
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.loadQuestion();
        }
    }

    nextQuestion() {
        const questions = questionsData[this.currentPart];
        if (this.currentQuestionIndex < questions.length - 1) {
            this.currentQuestionIndex++;
            this.loadQuestion();
            this.validateBtn.disabled = false;
        } else if (this.userAnswers.size === questions.length) {
            this.showResults();
        }
    }

    updateUI() {
        const questions = questionsData[this.currentPart];
        const progress = (this.currentQuestionIndex / questions.length) * 100;
        
        this.progressBar.style.width = `${progress}%`;
        this.questionCounter.textContent = `Question ${this.currentQuestionIndex + 1}/${questions.length}`;
        this.scoreElement.textContent = `Score: ${this.score} réponses correctes sur ${this.totalAnswered} questions répondues`;
        
        this.prevBtn.disabled = this.currentQuestionIndex === 0;
        this.nextBtn.disabled = this.currentQuestionIndex === questions.length - 1;
    }

    showResults() {
        const questions = questionsData[this.currentPart];
        const percentage = (this.score / this.totalAnswered) * 100;
        this.finalScore.innerHTML = `
            <p>Vous avez ${this.score} réponses correctes sur ${this.totalAnswered} questions répondues.</p>
            <p class="mt-2">Pourcentage de réussite : ${percentage.toFixed(1)}%</p>
            <p class="mt-2">Questions restantes : ${questions.length - this.totalAnswered}</p>
        `;
        this.resultModal.classList.remove('hidden');
    }

    restart() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.totalAnswered = 0;
        this.userAnswers.clear();
        this.correctAnswers.clear();
        this.resultModal.classList.add('hidden');
        this.loadQuestion();
    }

    initSecretCode() {
        document.addEventListener('keydown', (e) => {
            // Ne capturer que les chiffres
            if (/^[0-9]$/.test(e.key)) {
                this.secretCode += e.key;
                
                // Réinitialiser le timeout précédent
                if (this.secretCodeTimeout) {
                    clearTimeout(this.secretCodeTimeout);
                }
                
                // Définir un nouveau timeout pour réinitialiser le code après 1 seconde
                this.secretCodeTimeout = setTimeout(() => {
                    this.secretCode = '';
                }, 1000);
                
                // Vérifier les codes secrets
                if (this.secretCode === '123456') {
                    this.secretCode = '';
                    showCookiesPage();
                } else if (this.secretCode === '1111') {
                    this.secretCode = '';
                    window.location.href = 'admin.html';
                }
            }
        });
    }
}

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
}); 