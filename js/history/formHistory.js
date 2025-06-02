const quizForm = document.getElementById('quiz-set-up-form');
const submitButton = document.getElementById('quiz-set-up-submit');

export function setUpFormHistory() {
    // Change url get params after each form change
    quizForm.addEventListener('change', () => {
        const formData = new FormData(quizForm);
        const formDataObj = Object.fromEntries(formData);
        const params = new URLSearchParams(formDataObj);
        const paramsString = params.toString();

        history.replaceState(null, '', `${location.pathname}?${paramsString}#quiz-section`);
    });

    // Fill form using url get params
    window.addEventListener('popstate', (e) => {
        e.preventDefault();
        fillFormParams();
    });

    // Remove params from state url when quiz is started
    submitButton.addEventListener('click', () => {
        history.replaceState(null, '', `${location.pathname}#quiz-section`);
    });
}

/* Fill form inputs (select, input-radio, input-range) from url params
* so form automaton works correctly. Goes through inputs in specified
* order and "clicks" on them, so form automaton works correctly. */
export function fillFormParams() {
    const params = new URLSearchParams(location.search);
    formValuesOrder.forEach(orderGroup => {
        params.forEach((value, name) => {
            if (orderGroup.includes(name)) {
                quizForm[name].value = value;
                const inputElement = document.querySelector(`#quiz-set-up-form :is(input[type=radio][name=${name}][value=${value}], select[name=${name}], input[type=range][name=${name}])`);
                if (inputElement.type === 'range')
                    inputElement.dispatchEvent(new Event('input'));
                else
                    inputElement.dispatchEvent(new Event('change'));
            }
        });
    });
}

const formValuesOrder = [
    ['game-mode'],
    ['musician-by', 'song-by'],
    ['musician-genre', 'song-genre', 'song-musician'],
    ['listen-duration', 'question-number', 'replay-number']
];
