import React, { useState } from "react";

const FeedbackForm = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Feedback submitted: " + message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-semibold mb-2">Feedback</h2>
      <textarea
        className="w-full border p-2 rounded mb-2"
        rows="3"
        placeholder="Enter your feedback..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default FeedbackForm;
