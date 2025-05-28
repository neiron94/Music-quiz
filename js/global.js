export const genres = []
export const musicians = []
export const songs = []

let currentFormState;
export function getCurrentFormState() {
    return currentFormState;
}
export function setCurrentFormState(state) {
    currentFormState = state;
}

let currentQuiz;
export function getCurrentQuiz() {
    return currentQuiz;
}
export function setCurrentQuiz(quiz) {
    currentQuiz = quiz;
}
