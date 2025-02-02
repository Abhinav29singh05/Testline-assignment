import Feedback from "./Feedback";
import ReactMarkdown from "react-markdown";

export default function Question({ index, question, onOptionChange }) {
  return (
    <div className="qus">
      <h3 style={{ fontSize: "1.5rem" }}>
        {index + 1}. {question.description || "No title available"}
      </h3>
      {question.options && question.options.length > 0 ? (
        <ul>
          {question.options.map((option, optIndex) => (
            <label key={optIndex} style={{ color: "black", fontSize: "1.5rem" }}>
              <input type="radio" name={`question-${index}`} value={option.id} onChange={() => onOptionChange(index, option.id)} />
              {option.description || "No option text available"}
              <br />
            </label>
          ))}
        </ul>
      ) : (
        <p>No options available.</p>
      )}

      {question.feedback && <Feedback feedback={question.feedback} />}
    </div>
  );
}
