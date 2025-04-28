import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  

function Home() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    setQuizzes(storedQuizzes);
  }, []);

  function handleAttempt(index) {
    navigate(`/attempt/${index}`);
  }

  return (
    <div className="p-6 mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Available Quizzes</h1>

      {quizzes.length === 0 ? (
        <p className='text-xl'>No quizzes available. Please create one!</p>
      ) : (
        quizzes.map((quiz, index) => (
          <div key={index} className="mb-6 p-4 border rounded shadow-sm flex justify-between">
            <h2 className="text-xl font-semibold mb-2 inline">{quiz.title} <sub className='text-sm'> Created By : {quiz.createdBy}</sub></h2>

            <button
            
              onClick={() => handleAttempt(index)}
              className="inline px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Attempt Quiz
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
