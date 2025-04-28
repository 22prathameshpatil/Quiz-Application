import React, { useState } from "react";

function CreateQuiz() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);

  function handleQuestion() {
    const newQuestion = {
      questionText: "",
      options: ["", "", "", ""],
      correctAnsIndex: 0,
    };
    setQuestions([...questions, newQuestion]);
  }

  function handleQuestionRemove() {
    const newQuestions = [...questions];
    newQuestions.pop();
    setQuestions(newQuestions);
  }

  function updateQueText(index, text) {
    const updatedQuestions = [...questions];
    updatedQuestions[index].questionText = text;
    setQuestions(updatedQuestions);
  }

  function updateOption(qIndex, oIndex, text) {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = text;
    setQuestions(updatedQuestions);
  }

  function updateCorrectAns(qIndex, cIndex) {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].correctAnsIndex = cIndex;
    setQuestions(updatedQuestions);
  }

  function saveQuiz() {
    const existingQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      alert("You must Log In to Create a Quiz!");
    }

    const newQuiz = {
      title,
      questions,
      createdBy: currentUser.email,
    };

    existingQuizzes.push(newQuiz);
    localStorage.setItem("quizzes", JSON.stringify(existingQuizzes));
    alert("Quiz saved successfully!");
    setTitle("");
    setQuestions([]);
  }

  return (
    <>
      <div className="p-6 mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">Create a New Quiz</h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Quiz Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {questions.map((question, questionIndex) => (
          <div
            key={questionIndex}
            className="mb-6 p-4 border rounded shadow-sm"
          >
            <input
              type="text"
              placeholder={`Question : ${questionIndex + 1}`}
              value={question.questionText}
              onChange={(e) => updateQueText(questionIndex, e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />

            <div className="grid grid-cols-2 gap-4 mb-4">
              {question.options.map((option, optionIndex) => (
                <input
                  key={optionIndex}
                  type="text"
                  placeholder={`Option ${optionIndex + 1}`}
                  value={option}
                  onChange={(e) =>
                    updateOption(questionIndex, optionIndex, e.target.value)
                  }
                  className="p-2 border rounded"
                />
              ))}
            </div>

            <div>
              <label className="mr-2 font-medium">Correct Option:</label>
              <select
                value={question.correctAnsIndex}
                onChange={(e) =>
                  updateCorrectAns(questionIndex, parseInt(e.target.value))
                }
                className="p-2 border rounded"
              >
                {question.options.map((_, optionIndex) => (
                  <option key={optionIndex} value={optionIndex}>
                    Option {optionIndex + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}

        <div className="mx-2 m-4">
          <div className="mx-2 inline">
            <button
              onClick={handleQuestion}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Question
            </button>
          </div>

          <div className="mx-2 inline">
            <button
              onClick={handleQuestionRemove}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Remove Question
            </button>
          </div>
        </div>

        {questions.length > 0 && (
          <div>
            <button
              onClick={saveQuiz}
              className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save Quiz
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CreateQuiz;
