function FinishScreen({ points, pointsMax }) {
  return (
    <p className="result">
      You Scored <strong>{points}</strong>/ {pointsMax} (
      {Math.ceil((points / pointsMax) * 100)})%
    </p>
  );
}

export default FinishScreen;
