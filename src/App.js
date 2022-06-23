import { useEffect, useState, useRef } from 'react';
import './App.css';
import QuizForm from './components/QuizForm';
import QuizComponent from './components/QuizComponent';
import QuizSummary from './components/QuizSummary';
import { randomInteger, random_item, getCorrectAnswer } from './shared/utils'
import { getQuizQuestionArray, getQuizState, removeSessionQuizData, setSessionQuizData } from './shared/sessionService'

const App = () => {

  const quizTiming = 20; let quiz1Interval = useRef(null); let quiz2Interval = useRef(null);
  const oprtrs = {
    '+': false,
    '-': false,
    '*': false,
    '/': false
  };

  const [quiz1Operators, setQuiz1Operators] = useState(oprtrs);
  const [quiz1Started, setQuiz1Started] = useState(false);
  const [quiz1Length, setQuiz1Length] = useState(0);
  const [quiz1OperandsLimit, setQuiz1OperandLimit] = useState(null);
  const [quiz1QuestionsArray, setQuiz1QuestionsArray] = useState([]);
  const [quiz1CurrentQuestion, setQuiz1CurrentQuestion] = useState(null);
  const [quiz1Completed, setQuiz1Completed] = useState(false);
  const [quiz1Counter, setQuiz1Counter] = useState(null);

  const [quiz2Operators, setQuiz2Operators] = useState(oprtrs);
  const [quiz2Started, setQuiz2Started] = useState(false);
  const [quiz2Length, setQuiz2Length] = useState(0);
  const [quiz2OperandsLimit, setQuiz2OperandLimit] = useState(null);
  const [quiz2QuestionsArray, setQuiz2QuestionsArray] = useState([]);
  const [quiz2CurrentQuestion, setQuiz2CurrentQuestion] = useState(null);
  const [quiz2Completed, setQuiz2Completed] = useState(false);
  const [quiz2Counter, setQuiz2Counter] = useState(null);

  useEffect(() => {
    clearInterval(quiz1Interval.current);
    if (getQuizState('quiz1Started') && getQuizQuestionArray('quiz1')) {
      const quiz1Storage = getQuizQuestionArray('quiz1');
      const questionFrom = quiz1Storage.find(item => item.attempted === false && item.skipped === false);
      if (questionFrom) {
        setQuiz1QuestionsArray(quiz1Storage);
        setQuiz1CurrentQuestion(quiz1Storage[questionFrom.id - 1]);
        let intervalTemp = quizTiming;
        quiz1Interval.current = setInterval(() => {
          intervalTemp--;
          if (intervalTemp === 0) {
            clearInterval(quiz1Interval.current);
          }
          if (intervalTemp > -1) {
            setQuiz1Counter(intervalTemp);
          }
        }, 1000);

      }
    }
  }, [])

  useEffect(() => {
    clearInterval(quiz2Interval.current);
    if (getQuizState('quiz2Started') && getQuizQuestionArray('quiz2')) {
      const quiz2Storage = getQuizQuestionArray('quiz2');
      const questionFrom = quiz2Storage.find(item => item.attempted === false && item.skipped === false);
      if (questionFrom) {
        setQuiz2QuestionsArray(quiz2Storage);
        setQuiz2CurrentQuestion(quiz2Storage[questionFrom.id - 1]);
        let intervalTemp = quizTiming;
        quiz2Interval.current = setInterval(() => {
          intervalTemp--;
          if (intervalTemp === 0) {
            clearInterval(quiz2Interval.current);
          }
          if (intervalTemp > -1) {
            setQuiz2Counter(intervalTemp);
          }
        }, 1000);

      }
    }
  }, [])

  useEffect(() => {
    if (quiz1Started && !getQuizState('quiz1Started')) {
      setSessionQuizData('quiz1Started', 'true');
      const quiz1QuestionsArray = createQuestionsArray(quiz1Length, Object.keys(quiz1Operators).filter(o => quiz1Operators[o]).map(o => o), quiz1OperandsLimit, 1)
      setQuiz1QuestionsArray(quiz1QuestionsArray);
      setSessionQuizData('quiz1', quiz1QuestionsArray);
      setQuiz1CurrentQuestion(quiz1QuestionsArray[0]);
      let intervalTemp = quizTiming;
      quiz1Interval.current = setInterval(() => {
        intervalTemp--;
        if (intervalTemp === 0) {
          clearInterval(quiz1Interval.current);
        }
        if (intervalTemp > -1) {
          setQuiz1Counter(intervalTemp);
        }
      }, 1000);
    }
  }, [quiz1Started])

  useEffect(() => {
    if (quiz2Started && !getQuizState('quiz2Started')) {
      setSessionQuizData('quiz2Started', 'true');
      const quiz2QuestionsArray = createQuestionsArray(quiz2Length, Object.keys(quiz2Operators).filter(o => quiz2Operators[o]).map(o => o), quiz2OperandsLimit, 2)
      setQuiz2QuestionsArray(quiz2QuestionsArray);
      setSessionQuizData('quiz2', quiz2QuestionsArray);
      setQuiz2CurrentQuestion(quiz2QuestionsArray[0]);
      let intervalTemp = quizTiming;
      quiz2Interval.current = setInterval(() => {
        intervalTemp--;
        if (intervalTemp === 0) {
          clearInterval(quiz2Interval.current);
        }
        if (intervalTemp > -1) {
          setQuiz2Counter(intervalTemp);
        }
      }, 1000);
    }
  }, [quiz2Started])

  useEffect(() => {
    if (!quiz1Completed && (quiz1Started || getQuizState('quiz1Started')) && quiz1Counter === 0) {
      setQuizCurrentQuestionAnswer({ ...quiz1CurrentQuestion, correct: false, attempted: false, skipped: true, userAnswer: null });
    }

  }, [quiz1Counter])

  useEffect(() => {
    if (!quiz2Completed && (quiz2Started || getQuizState('quiz2Started')) && quiz2Counter === 0) {
      setQuizCurrentQuestionAnswer({ ...quiz2CurrentQuestion, correct: false, attempted: false, skipped: true, userAnswer: null });
    }

  }, [quiz2Counter])

  const resetQuiz1 = () => {
    clearInterval(quiz1Interval);
    setQuiz1Started(false);
    setQuiz1Length(0);
    setQuiz1OperandLimit(null);
    setQuiz1QuestionsArray([]);
    setQuiz1CurrentQuestion(null);
    setQuiz1Completed(false);
    setQuiz1Counter(null);
    setQuiz1Operators(oprtrs);
    removeSessionQuizData('quiz1');
    removeSessionQuizData('quiz1Started');
  }

  const resetQuiz2 = () => {
    clearInterval(quiz2Interval);
    setQuiz2Started(false);
    setQuiz2Length(0);
    setQuiz2OperandLimit(null);
    setQuiz2QuestionsArray([]);
    setQuiz2CurrentQuestion(null);
    setQuiz2Completed(false);
    setQuiz2Counter(null);
    setQuiz2Operators(oprtrs);
    removeSessionQuizData('quiz2');
    removeSessionQuizData('quiz2Started')
  }

  /**
   * setting the logic for current question to display and update the question array
   * @param {*} answeredQuestionObj 
   */
  const setQuizCurrentQuestionAnswer = (answeredQuestionObj) => {
    if (answeredQuestionObj.quiz === 1) {
      if (quiz1Interval.current) {
        clearInterval(quiz1Interval.current);
      }

      const updatedQuizArray = quiz1QuestionsArray.map(item => {
        return item.id === answeredQuestionObj.id ? answeredQuestionObj : item;
      });
      setQuiz1QuestionsArray(updatedQuizArray);
      setSessionQuizData('quiz1', updatedQuizArray);

      if (answeredQuestionObj.id !== updatedQuizArray.length) {
        setQuiz1CurrentQuestion(updatedQuizArray[answeredQuestionObj.id]);
        let intervalTemp = quizTiming;
        quiz1Interval.current = setInterval(() => {
          intervalTemp--;
          if (intervalTemp === 0) {
            clearInterval(quiz1Interval.current);
          }
          if (intervalTemp > -1) {
            setQuiz1Counter(intervalTemp);
          }
        }, 1000);
      } else {
        setQuiz1CurrentQuestion(null);
        setQuiz1Completed(true)
        removeSessionQuizData('quiz1');
        removeSessionQuizData('quiz1Started')
        if (quiz1Interval.current) {
          clearInterval(quiz1Interval.current);
        }
        setQuiz1Counter(null);
      }

    } else {
      if (quiz2Interval.current) {
        clearInterval(quiz2Interval.current);
      }

      const updatedQuizArray = quiz2QuestionsArray.map(item => {
        return item.id === answeredQuestionObj.id ? answeredQuestionObj : item;
      });
      setQuiz2QuestionsArray(updatedQuizArray);
      setSessionQuizData('quiz2', updatedQuizArray);

      if (answeredQuestionObj.id !== updatedQuizArray.length) {
        setQuiz2CurrentQuestion(updatedQuizArray[answeredQuestionObj.id]);
        let intervalTemp = quizTiming;
        quiz2Interval.current = setInterval(() => {
          intervalTemp--;
          if (intervalTemp === 0) {
            clearInterval(quiz2Interval.current);
          }
          if (intervalTemp > -1) {
            setQuiz2Counter(intervalTemp);
          }
        }, 1000);
      } else {
        setQuiz2CurrentQuestion(null);
        setQuiz2Completed(true);
        removeSessionQuizData('quiz2');
        removeSessionQuizData('quiz2Started')
        // localStorage.removeItem('quiz2');
        // localStorage.removeItem('quiz2Started');
        if (quiz2Interval.current) {
          clearInterval(quiz2Interval.current);
        }
        setQuiz2Counter(null);
      }
    }
  }

  /**
   * @description Making the question array data structure
   * @param {*} quizLength 
   * @param {*} operators 
   * @param {*} operandLimit 
   * @param {*} quizNumber 
   * @returns 
   */
  const createQuestionsArray = (quizLength, operators, operandLimit, quizNumber) => {
    const quesArray = [];
    for (let i = 0; i < quizLength; i++) {
      const r_Operand1 = randomInteger(0, operandLimit);
      const r_Operand2 = randomInteger(0, operandLimit);
      const r_Operator = random_item(operators);

      const correctAnswer = getCorrectAnswer(r_Operand1, r_Operand2, r_Operator);
      quesArray.push({
        id: i + 1,
        quiz: quizNumber,
        question: `${r_Operand1} ${r_Operator} ${r_Operand2} `,
        answer: Number(correctAnswer),
        userAnswer: null,
        correct: false,
        attempted: false,
        skipped: false
      })
    }
    return quesArray;
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            {(!quiz1Started && !getQuizQuestionArray('quiz1') && !quiz1Completed) ?
              <QuizForm
                quizOperators={quiz1Operators}
                setOperator={setQuiz1Operators}
                quizHeading={'Quiz-1'}
                quizLength={quiz1Length}
                setQuizLength={setQuiz1Length}
                setQuizStarted={setQuiz1Started}
                setOperandsLimit={setQuiz1OperandLimit}
              />
              : !quiz1Completed ? <QuizComponent
                quizCurrentQuestion={quiz1CurrentQuestion}
                quizArray={quiz1QuestionsArray}
                setQuizCurrentQuestionAnswer={setQuizCurrentQuestionAnswer}
                quizTimer={quiz1Counter}
                resetQuiz={resetQuiz1}
              /> : <QuizSummary
                quizArray={quiz1QuestionsArray}
                quizNumber={1}
              />
            }
          </div>
          <div className="col-md-6">
            {(!quiz2Started && !getQuizQuestionArray('quiz2') && !quiz2Completed) ?
              <QuizForm
                quizOperators={quiz2Operators}
                setOperator={setQuiz2Operators}
                quizHeading={'Quiz-2'}
                quizLength={quiz2Length}
                setQuizLength={setQuiz2Length}
                setQuizStarted={setQuiz2Started}
                setOperandsLimit={setQuiz2OperandLimit}
              />
              : !quiz2Completed ? <QuizComponent
                quizCurrentQuestion={quiz2CurrentQuestion}
                quizArray={quiz2QuestionsArray}
                setQuizCurrentQuestionAnswer={setQuizCurrentQuestionAnswer}
                quizTimer={quiz2Counter}
                resetQuiz={resetQuiz2}
              /> : <QuizSummary
                quizArray={quiz2QuestionsArray}
                quizNumber={2}
              />
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
