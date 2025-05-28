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
}

export class QuizQuestion {
    audio
    image
    options
    correctOptionIndex
    replays

    constructor(audio, image, options, correctOptionIndex) {
        this.audio = audio;
        this.image = image;
        this.options = options;
        this.correctOptionIndex = correctOptionIndex;
        this.replays = 0;
    }
}
