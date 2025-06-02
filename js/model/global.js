import {Quiz} from "./quiz.js";

export const genres = []
export const musicians = []
export const albums = []
export const songs = []

let currentFormState;
export function getCurrentFormState() {
    return currentFormState;
}
export function setCurrentFormState(state) {
    currentFormState = state;
}

export function getCurrentQuiz() {
    const storedQuiz = localStorage.getItem('quiz');
    if (storedQuiz === null)
        return null;

    return Object.assign(new Quiz(), JSON.parse(storedQuiz));
}

export function setCurrentQuiz(quiz) {
    if (quiz === null) {
        localStorage.removeItem('quiz');
    }
    else {
        localStorage.setItem('quiz', JSON.stringify(quiz));
    }
}
