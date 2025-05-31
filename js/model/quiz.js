export class Quiz {
    questions
    currentQuestionIndex
    correctAnswersCount
    maxReplays

    constructor(questions, maxReplays) {
        this.questions = questions;
        this.maxReplays = maxReplays;
        this.currentQuestionIndex = 0;
        this.correctAnswersCount = 0;
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

    constructor(audio, fullAudio, image, options, correctOptionIndex) {
        this.audio = audio;
        this.fullAudio = fullAudio;
        this.image = image;
        this.options = options;
        this.correctOptionIndex = correctOptionIndex;
        this.replays = 0;
    }
}
