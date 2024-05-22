import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
const initialState = {
  questions: [],
  //Loading , error , Ready , active , finished
  status: "loading",
  currentQ: 0,
  answer: null,
  points: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "DataError":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions[state.currentQ];
      const correct = question.correctOption;

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === correct
            ? state.points + question.points
            : state.points,
      };
    case "next":
      return {
        ...state,
        currentQ: state.currentQ + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
      };
    default:
      throw new Error("Invalid action type");
  }
}
export default function App() {
  const [{ questions, status, currentQ, answer, points }, dispatch] =
    useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const pointsMax = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );
  useEffect(() => {
    fetch("http://localhost:3001/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "DataError" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen NumOfQ={numQuestions} handleStart={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={currentQ}
              numQuestions={numQuestions}
              points={points}
              maxPoints={pointsMax}
              answer={answer === null ? 0 : 1}
            />
            <Question
              question={questions[currentQ]}
              dispatch={dispatch}
              answer={answer}
            />
          </>
        )}
        {answer !== null &&
          status === "active" &&
          (currentQ < numQuestions - 1 ? (
            <button
              className=" btn btn-ui"
              onClick={() => dispatch({ type: "next" })}
              disabled={currentQ === numQuestions - 1}
            >
              Next
            </button>
          ) : (
            <button
              className=" btn btn-ui"
              onClick={() => dispatch({ type: "finish" })}
            >
              Finish
            </button>
          ))}
        {status === "finished" && (
          <FinishScreen points={points} pointsMax={pointsMax} />
        )}
      </Main>
    </div>
  );
}
