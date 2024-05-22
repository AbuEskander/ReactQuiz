function Question({ question, dispatch, answer }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, index) => {
          return (
            <button
              key={option}
              className={`btn btn-option ${answer === index ? "answer" : ""} ${
                answer !== null &&
                (index === question.correctOption ? "correct" : "wrong")
              }`}
              disabled={answer !== null}
              onClick={() => dispatch({ type: "newAnswer", payload: index })}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Question;
