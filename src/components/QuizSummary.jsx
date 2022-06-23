import React from "react";

const QuizSummary = ({ quizArray, quizNumber }) => {
    return (
        <main className="min-h-screen flex items-center justify-center">
            <div className="p-3 py-5 md:p-8 bg-white shadow rounded-lg max-w-[800px] w-11/12 min-h-[300px]">
                <h4 className="text-right pb-2 text-green-600 text-primary">
                    Quiz-{quizNumber} Result Summary :

                </h4>
                <div className="mt-3">
                    {quizArray.map((question, index) => (
                        <section className={(question.correct ? "text-success" : "text-danger")} key={index}>
                            <p className="text-center font-medium text-2xl lg:text-3xl leading-loose">
                                Question {question.id} : <b> ({question.question})</b>
                            </p>
                            <p className="text-center font-medium text-2xl lg:text-3xl leading-loose">
                                Answer:  <b>{question.answer}</b>
                            </p>
                            <p className="text-center font-medium text-2xl lg:text-3xl leading-loose">
                                User Answer:  <b>{question.userAnswer === null ? 'Not Attempted' : question.userAnswer}</b>
                            </p>
                            <p className="text-center font-medium text-2xl lg:text-3xl leading-loose">
                                Correct:  <b>{question.correct ? 'Yes' : 'No'} </b>
                            </p>
                            <hr />
                        </section>
                    ))
                    }
                    <section className="text-primary">
                        <p className="text-center font-medium text-2xl lg:text-3xl leading-loose">
                        <i>Total Score : <b>{quizArray.filter(item => item.correct).length} Out of {quizArray.length}</b></i>
                        </p>

                    </section>
                </div>
            </div>
        </main>
    );
}

export default QuizSummary;
