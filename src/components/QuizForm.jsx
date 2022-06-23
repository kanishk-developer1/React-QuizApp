import React from "react";

const QuizForm = ({ quizOperators, setOperator, quizHeading, setQuizLength, setOperandsLimit, setQuizStarted }) => {

    /**
     * Handle Checkbox toggle
     * @param {*} param0 
     */
    const handleToggle = ({ target }) => {
        setOperator(s => {
            return { ...s, [target.name]: !s[target.name] }
        });
    }

    /**
     * Handle form submit
     * @param {*} event 
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('form submitted ✅');
        const allFalse = Object.keys(quizOperators).every(item => (quizOperators[item] === false));
        if (allFalse) {
            alert('Please choose operators!')
        } else {
            setQuizStarted(true);
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center">
            <div className="p-3 py-5 md:p-8 bg-white shadow rounded-lg max-w-[800px] w-11/12 min-h-[300px] mt-4">
                <h3 className="text-right pb-2 text-green-600 text-primary">
                    {quizHeading}</h3>
                <div className="mt-3">
                    <form onSubmit={handleSubmit} className="form-inline">
                        <div className="form-group"> <label className="sr-only">
                            No. of Questions:
                            <input type="number" placeholder="Enter length" className="form-control" name="quizLength" min="1" max="15" onChange={(e) => { setQuizLength(e.target.value) }} required />
                        </label>
                        </div>

                        <div className="form-group mt-2"> <label className="sr-only">
                            Operands Limit:
                            <input type="number" placeholder="Enter Limit" className="form-control" name="quizOperands" min="0" max="15" onChange={(e) => { setOperandsLimit(e.target.value) }} required />
                        </label></div>
                        <div className="form-group mt-2">
                            <label className="sr-only">
                                Select Operators:
                                <div className="checkbox">
                                    {Object.keys(quizOperators).map(key => (
                                        <label className="px-2 font-weight-bold fsL" key={key.toString()}>
                                            <input
                                                type="checkbox"
                                                onChange={handleToggle}
                                                key={key}
                                                name={key}
                                                checked={quizOperators[key]}
                                            />
                                            <span className=".margin-5l"> {key}</span>
                                        </label>
                                    ))}
                                </div>
                            </label>
                        </div>
                        <input type="submit" className="py-2 px-7 text-medium flex rounded-lg text-white btn btn-primary mt-4" value="Start Quiz" />
                    </form>
                </div>
            </div>
        </main>
    )
}

export default QuizForm;
