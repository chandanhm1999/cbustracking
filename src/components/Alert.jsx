import React, { useEffect, useState } from "react";

const Alert = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShow(true);
      setTimeout(() => setShow(false), 3000);
    }, 300000); // 5 mins = 300000ms
    return () => clearInterval(interval);
  }, []);

  return (
    show && (
      <div className="fixed top-4 right-4 bg-yellow-400 text-black px-4 py-2 rounded shadow-lg z-50">
        ⚠️ Check for latest bus updates!
      </div>
    )
  );
};

export default Alert;
