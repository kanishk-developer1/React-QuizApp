
/**
 * Store values in local storage
 * @param {*} quiz 
 * @param {*} value 
 */
export const setSessionQuizData = (quiz, value) => {
    let sessionValue = value;
    if (typeof value === 'object') {
        sessionValue = JSON.stringify(sessionValue);
    }
    localStorage.setItem(quiz, sessionValue);
}

/**
 * Remove values from localstorage
 * @param {*} quiz 
 */
export const removeSessionQuizData = (quiz) => {
    localStorage.removeItem(quiz);
}

/**
 * get quiz questions from localstorage
 * @param {*} quiz 
 */
export const getQuizQuestionArray = (quiz) => {
    return JSON.parse(localStorage.getItem(quiz));
}

/**
 * get quiz state from localstorage
 * @param {*} quiz 
 */
export const getQuizState = (quiz) => {
    return localStorage.getItem(quiz);
}