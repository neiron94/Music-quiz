export class Quiz {
    questions
    currentQuestionIndex
    correctAnswersCount
    maxReplays
    finished

    constructor(questions, maxReplays) {
        this.questions = questions;
        this.maxReplays = maxReplays;
        this.currentQuestionIndex = 0;
        this.correctAnswersCount = 0;
        this.finished = false;
    }

    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }
}

export class QuizQuestion {
    audio
    fullAudio
    image
    options
    correctOptionIndex
    replays
    answered

    constructor(audio, fullAudio, image, options, correctOptionIndex) {
        this.audio = audio;
        this.fullAudio = fullAudio;
        this.image = image;
        this.options = options;
        this.correctOptionIndex = correctOptionIndex;
        this.replays = 0;
        this.answered = false;
    }
}
