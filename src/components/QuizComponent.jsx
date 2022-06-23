import React, { useState, useRef } from "react";

const QuizComponent = ({ quizCurrentQuestion, quizArray, setQuizCurrentQuestionAnswer, quizTimer, resetQuiz }) => {

    const [btnState, setBtnState] = useState(true);
    const [answer, setAnswer] = useState(null);
    const inputRef = useRef();

    const handleAnswerChange = (ans) => {
        setBtnState(!(!!ans || ans === 0));
        if (!!ans || ans === 0) {
            setAnswer(ans);
        }
    }

    /**
     * @description call on submitting the quiz answer
     */
    const submitAnswer = () => {
        if (!btnState) {
            setBtnState(true);
            inputRef.current.value = "";
            setQuizCurrentQuestionAnswer({ ...quizCurrentQuestion, correct: Number(quizCurrentQuestion.answer) === Number(answer), attempted: true, userAnswer: answer });
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center">
            <div className="p-3 py-5 md:p-8 bg-white shadow rounded-lg max-w-[800px] w-11/12 min-h-[300px] mt-4">
                <p className="text-right pb-2 text-green-600">
                    <b>Timer: <span className="text-danger">{quizTimer}</span></b>
                </p>
                <p className="text-right pb-2 text-green-600">
                    <b>Question Running: {quizCurrentQuestion?.id} | {quizArray.length}</b>
                </p>
                <div className="mt-3">
                    <p
                        className="text-center text-primary fw700 fsXL"
                    // dangerouslySetInnerHTML={{ __html:  }}
                    > {quizCurrentQuestion?.question} </p>
                    <p
                        className="text-center font-medium text-2xl lg:text-3xl leading-loose"

                    >
                        <input type="number" placeholder="Enter Answer" ref={inputRef} onChange={(e) => handleAnswerChange(e.target.value)} required />
                    </p>
                    <div className="grid grid-cols-1 my-5 space-y-2 place-content-center">
                        <span className="text-success"> Correct: <b>{quizArray.filter(item => item.correct).length}</b></span> |
                        <span className="text-warning"> Attempted: <b>{quizArray.filter(item => item.attempted).length}</b></span>
                    </div>
                </div>
                <div className="flex justify-center pt-4">
                    <button
                        onClick={submitAnswer}
                        className="py-2 px-7 text-medium flex rounded-lg text-white btn btn-secondary"
                        disabled={btnState}
                    >
                        Next question
                    </button>
                    <button
                        onClick={resetQuiz}
                        className="py-2 px-7 text-medium flex rounded-lg text-black btn btn-info margin-5l"
                    >
                        Reset Quiz
                    </button>
                </div>
            </div>
        </main>
    );
}

export default QuizComponent;
