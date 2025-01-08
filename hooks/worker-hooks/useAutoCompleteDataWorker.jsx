import React, { useEffect, useRef, useState } from "react";

const useAutoCompleteDataWorker = (workerFunctionUrl) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const workerRef = useRef(null);

  useEffect(() => {
    const workerUrl = new URL(workerFunctionUrl, window.location.origin);

    workerRef.current = new Worker(workerUrl);

    workerRef.current.onmessage = (event) => {
      setLoading(false);
      setResult(event.data);
    };

    workerRef.current.onerror = (err) => {
      setLoading(false);
      setError(err);
      console.error("Worker error:", err);
    };

    return () => {
      workerRef.current.terminate();
    };
  }, [workerFunctionUrl]);

  const runWorker = (data) => {
    if (!workerRef.current) {
      console.error("Worker is not initialized");
      return;
    }
    setLoading(true);
    setResult(null);
    setError(null);
    workerRef.current.postMessage(data);
  };

  return [runWorker, result, error, loading];
};

export default useAutoCompleteDataWorker;
