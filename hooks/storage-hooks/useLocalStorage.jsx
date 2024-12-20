const useLocalStorage = () => {
  const getDataFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };

  const setDataToLocalStorage = (key, data) => {
    const stringData = JSON.stringify(data);
    localStorage.setItem(key, stringData);
  };

  const removeDataFromLocalStorage = (key) => {
    localStorage.removeItem(key);
  };

  return {
    getDataFromLocalStorage,
    setDataToLocalStorage,
    removeDataFromLocalStorage,
  };
};

export default useLocalStorage;
