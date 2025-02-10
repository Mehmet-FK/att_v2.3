const createObjectsFromText = (text) => {
  const rows = text
    .replace(/"((?:[^"]*(?:\r\n|\n\r|\n|\r))+[^"]+)"/gm, function (match, p1) {
      return p1.replace(/""/g, '"').replace(/\r\n|\n\r|\n|\r/g, " ");
    })
    .split(/\r\n|\n\r|\n|\r/g);

  return rows
    .map((r) => {
      const [value, caption] = r.split("\t");
      return { value: value.trim(), caption: caption?.trim() };
    })
    .filter((cell) => cell.value);
};

const getClipboardDataOnPaste = (window, event) => {
  const clipboardData =
    window.clipboardData ||
    event.clipboardData ||
    (event.originalEvent && event.originalEvent.clipboardData);

  return clipboardData;
};

export const parseClipboardText = async () => {
  try {
    const pastedText = await navigator.clipboard.readText();
    if (!pastedText && !pastedText.length) return;
    return createObjectsFromText(pastedText);
  } catch (error) {
    console.log("parseClipboardDataOnPaste", { error });
  }
};
