import ReactMarkdown from "react-markdown";

export default function Feedback({ feedback }) {
  return (
    <div className="feedback">
      {feedback.selectedAnswer !== undefined ? (
        <>
          <p className="feedans" style={{ color: "green", fontSize: "2rem" }}>
            Your answer: <span>{feedback.selectedAnswer}</span>
          </p>
          {feedback.isCorrect ? (
            <p style={{ color: "green", fontSize: "2rem" }}>Correct!</p>
          ) : (
            <p style={{ color: "red", fontSize: "2rem" }}>
              Correct answer: <span>{feedback.correctAnswer}</span>
            </p>
          )}
        </>
      ) : (
        <p style={{ color: "blue", fontSize: "2rem" }}>No option selected.</p>
      )}
      <div className="explanation">
        <ReactMarkdown
          components={{
            p: ({ node, ...props }) => <p style={{ fontSize: "1.5rem", fontWeight: "400", lineHeight: "1.5", color: "#333" }} {...props} />,
            strong: ({ node, ...props }) => <strong style={{ color: "black", fontWeight: "600", fontSize: "1.5rem", lineHeight: "1.5", margin: "0" }} {...props} />,
          }}
        >
          {feedback.detailedSolution}
        </ReactMarkdown>
      </div>
    </div>
  );
}
