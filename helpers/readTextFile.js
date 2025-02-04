const createObjectsFromText = (text) => {
  const rows = text
    .replace(/"((?:[^"]*(?:\r\n|\n\r|\n|\r))+[^"]+)"/gm, function (match, p1) {
      return p1.replace(/""/g, '"').replace(/\r\n|\n\r|\n|\r/g, " ");
    })
    .split(/\r\n|\n\r|\n|\r/g);

  return rows
    .map((r) => {
      const [value, caption] = r.split("\t");
      return { value: value.trim(), caption: caption.trim() };
    })
    .filter((cell) => cell.caption && cell.value);
};

const getClipboardDataOnPaste = (window, event) => {
  const clipboardData =
    window.clipboardData ||
    event.clipboardData ||
    (event.originalEvent && event.originalEvent.clipboardData);

  return clipboardData;
};

const parseClipboardDataOnPaste = async () => {
  try {
    const pastedText = await navigator.clipboard.readText();

    if (!pastedText && pastedText.length) return;
    const objects = createObjectsFromText(pastedText);
    return objects;
  } catch (error) {
    console.log("parseClipboardDataOnPaste", { error });
  }
};

const parseClipboardDataOnClick = (clipboardData) => {
  const pastedText =
    clipboardData.getData("Text") || clipboardData.getData("text/plain");

  if (!pastedText && pastedText.length) {
    return;
  }
  const objects = createObjectsFromText(pastedText);
  return objects;
};

export const parseClipboardText = async (window, event) => {
  let clipboardData = getClipboardDataOnPaste(window, event);
  if (clipboardData) {
    return parseClipboardDataOnClick(clipboardData);
  } else {
    return await parseClipboardDataOnPaste();
  }

  // // console.log({ pastedText });
  // const rows = pastedText
  //   .replace(/"((?:[^"]*(?:\r\n|\n\r|\n|\r))+[^"]+)"/gm, function (match, p1) {
  //     return p1.replace(/""/g, '"').replace(/\r\n|\n\r|\n|\r/g, " ");
  //   })
  //   .split(/\r\n|\n\r|\n|\r/g);

  // // console.log({ rows });

  // return rows
  //   .map((r) => {
  //     const [value, caption] = r.split("\t");
  //     return { value, caption };
  //   })
  //   .filter((cell) => cell.caption && cell.value);
};
