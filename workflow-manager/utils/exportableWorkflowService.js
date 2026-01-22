export const createWorkflowJsonFile = (content, cb) => {
  const jsonString = JSON.stringify(content, null, 2);

  const blob = new Blob([jsonString], { type: "application/json" });
  const downloadLink = URL.createObjectURL(blob);
  if (typeof cb === "function") {
    cb(downloadLink);
  }
  URL.revokeObjectURL(downloadLink);
};

export const retrieveContentOfJsonFile = (callback) => {
  const fileInput = document.createElement("input");

  fileInput.setAttribute("type", "file");
  fileInput.setAttribute("accept", ".json");

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonContent = JSON.parse(e.target.result);
        console.log("JSON content:", jsonContent);
        callback(jsonContent);
      } catch (error) {
        alert("Error parsing JSON file: " + error.message);
      }
    };

    reader.onerror = () => {
      alert("Error reading file");
    };

    reader.readAsText(file);
    fileInput.value = "";
  });
  fileInput.click();
};
