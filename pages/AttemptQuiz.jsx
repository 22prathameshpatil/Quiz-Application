import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function AttemptQuiz() {
  const { id } = useParams();
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    const quiz = storedQuizzes[id];
    if (quiz) {
      setSelectedQuiz(quiz);
      setAnswers(new Array(quiz.questions.length).fill(null));
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  function handleOptionChange(qIndex, oIndex) {
    const updatedAnswers = [...answers];
    updatedAnswers[qIndex] = oIndex;
    setAnswers(updatedAnswers);
  }

  function handleSubmit() {
    let correct = 0;
    selectedQuiz.questions.forEach((question, index) => {
      if (question.correctAnsIndex === answers[index]) {
        correct++;
      }
    });
    setScore(correct);
  }

  if (!selectedQuiz) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {selectedQuiz.title}
      </h2>

      {selectedQuiz.questions.map((question, qIndex) => (
        <div key={qIndex} className="mb-8 p-4 border rounded shadow-sm">
          <h3 className="font-semibold mb-4 text-lg">{`Q${qIndex + 1}. ${
            question.questionText
          }`}</h3>

        <div className="space-y-2">
        {question.options.map((option, oIndex) => {
          const isCorrect =  score !== null && oIndex === question.correctAnsIndex;
          const isWrong =  score !== null &&  answers[qIndex] === oIndex && oIndex !== question.correctAnsIndex;
          const isSelected = answers[qIndex] === oIndex;
              return (
                <label
                  key={oIndex}
                  className={`block p-2 rounded border cursor-pointer text-base transition-all
                   ${
            isSelected ? "bg-blue-100" : "border-gray-300"
                   }
                  ${isCorrect ? "bg-green-300" : ""}
                    ${isWrong ? "bg-red-300" : ""}
                 `}
                >
                  <input
                    type="radio"
                    name={`question-${qIndex}`}
                    value={oIndex}
                    checked={isSelected}
                    onChange={() => handleOptionChange(qIndex, oIndex)}
                    disabled={score !== null}
                    className="hidden"
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </div>
      ))}

      {score === null ? (
        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit Quiz
          </button>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-xl font-bold mb-4">
            You scored {score} out of {selectedQuiz.questions.length}
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
}

export default AttemptQuiz;
