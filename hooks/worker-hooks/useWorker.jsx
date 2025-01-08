import React, { useCallback, useEffect, useState } from "react";

const useWorker = (workerFunction) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const workerFunctionCb = useCallback(() => workerFunction, [workerFunction]);

  const prepareAndRunWorkerFunction = async () => {
    try {
      setLoading(true);
      // stringifying the function, creating a blob and creating a url for the blob
      const stringifiedFunction = workerFunctionCb.toString();
      const blob = new Blob([`(${stringifiedFunction})()`], {
        type: "application/javascript",
      });
      const scriptUrl = URL.createObjectURL(blob);

      // initializing our worker
      const worker = new Worker(scriptUrl);

      // set the result when our function is done
      worker.onmessage = (e) => {
        setResult(e.data);
        setLoading(false);
        setError(null);
      };

      // set the error if our function throws an error
      worker.onerror = (e) => {
        setResult(null);
        setError(e.message);
        setLoading(false);
      };

      // sending message to the worker
      worker.postMessage({
        sortKey,
        posts,
      });

      // terminating worker on unmount
      return () => {
        worker.terminate();
        URL.revokeObjectURL(scriptUrl);
        setLoading(false);
      };
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    prepareAndRunWorkerFunction();
  }, [workerFunctionCb]);

  return { loading, result, error };
};

export default useWorker;
