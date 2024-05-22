function StartScreen({ NumOfQ, handleStart }) {
  return (
    <div className="start">
      <h2>Welcome to React Quiz</h2>
      <h3>{NumOfQ} questions to test your react mastrey</h3>
      <button className="btn" onClick={() => handleStart({ type: "start" })}>
        Start Quiz
      </button>
    </div>
  );
}

export default StartScreen;
