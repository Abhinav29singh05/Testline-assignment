import { useEffect, useState, useRef } from "react";
import Question from "./Question";
import "./Quiz.css";

export default function Quiz() {
  const [data, setData] = useState([]);
  const [questions, setQuestions] = useState([]); // Store the questions array
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Store selected answers
  const [result, setResult] = useState(null); // Store result after submission

  const resultRef = useRef(null); // Reference for scrolling

  // to fetch data from the api and path is in vite.config.js
  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        const formattedData = Array.isArray(json) ? json : [json];
        setData(formattedData);
        setQuestions(json.questions ?? []); // 🔹 Set questions state
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  //   everytime an option is choosen to store for its qus
  const handleOptionChange = (questionIndex, optionId) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: optionId,
    });
  };

  //   on submit button
  const handleSubmit = () => {
    let score = 0;
    const updatedQuestions = questions.map((q, index) => {
      const correctOption = q.options.find((option) => option.is_correct);
      const selectedOptionId = selectedAnswers[index];

      if (correctOption) {
        if (selectedOptionId === correctOption.id) {   //if correct option chhosen
          score += 4;   // +4 for correct answer
          return { ...q, feedback: { selectedAnswer: correctOption.description, isCorrect: true, detailedSolution: q.detailed_solution } };
        } else if (selectedOptionId !== undefined) {    //if incorrect option chhosen
          score -= 1;  // -1 for incorrect answer
          return { ...q, feedback: { selectedAnswer: q.options.find((option) => option.id === selectedOptionId)?.description, correctAnswer: correctOption.description, isCorrect: false, detailedSolution: q.detailed_solution } };
        } else {
            // No option selected - only show the detailed solution
          return { ...q, feedback: { detailedSolution: q.detailed_solution } };
        }
      }
      return q;
    });

    setQuestions(updatedQuestions); // 🔹 Update questions with feedback
    setResult(`You scored ${score} points`);

    // to move to the score when submitted the quiz
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 0);
  };

  return (
    <div>
      {data.length > 0 && <p className="para">Topic: {data[0].title}</p>}

      {/* 🔹 Use questions here */}
      {questions.length > 0 ? (
        questions.map((q, index) => (
            //using the question component
          <Question key={index} index={index} question={q} onOptionChange={handleOptionChange} />
        ))
      ) : (
        <p>No questions available.</p>
      )}

      {result && <p ref={resultRef} className="result">{result}</p>}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
