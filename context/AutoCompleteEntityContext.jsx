import useAutoCompleteDataWorker from "@/hooks/worker-hooks/useAutoCompleteDataWorker";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AutoCompleteEntityContext = createContext();

export const AutoCompleteEntityProvider = ({ children }) => {
  const [autoCompleteEntities, setAutoCompleteEntities] = useState([]);

  const entities = useSelector((state) => state.attensam.data?.entities);

  const [runWorker, entitiesFromWorker] = useAutoCompleteDataWorker(
    "/workers/prepareEntitiesWorker.js"
  );

  useEffect(() => {
    if (entities && !autoCompleteEntities.length) {
      runWorker(entities);
      console.log({ context_Run_Worker: entities[0] });
    }
  }, [entities]);

  useEffect(() => {
    if (entitiesFromWorker) {
      setAutoCompleteEntities(entitiesFromWorker);
    }
  }, [entitiesFromWorker]);

  const contextValue = { autoCompleteEntities };
  return (
    <AutoCompleteEntityContext.Provider value={contextValue}>
      {children}
    </AutoCompleteEntityContext.Provider>
  );
};

export const useAutoCompleteEntities = () => {
  return useContext(AutoCompleteEntityContext);
};
