const createRows = (text) => {
  return text
    .replace(/"((?:[^"]*(?:\r\n|\n\r|\n|\r))+[^"]+)"/gm, (match, p1) => {
      return p1.replace(/""/g, '"').replace(/\r\n|\n\r|\n|\r/g, " ");
    })
    .split(/\r\n|\n\r|\n|\r/g);
};

const fetchText = async () => {
  fetch("myText.txt")
    .then((res) => res.text())
    .then((text) => {
      // do something with "text"
      console.log({ rawText: text });

      const editedText = createRows(text);
      console.log({ editedText });
    })
    .catch((e) => console.error(e));
};

export const parseClipboardText = (window, event) => {
  const clipboardData =
    window.clipboardData ||
    event.clipboardData ||
    (event.originalEvent && event.originalEvent.clipboardData);
  console.log({ clipboardData });
  const pastedText =
    clipboardData.getData("Text") || clipboardData.getData("text/plain");

  if (!pastedText && pastedText.length) {
    return;
  }
  console.log({ pastedText });
  const rows = pastedText
    .replace(/"((?:[^"]*(?:\r\n|\n\r|\n|\r))+[^"]+)"/gm, function (match, p1) {
      return p1.replace(/""/g, '"').replace(/\r\n|\n\r|\n|\r/g, " ");
    })
    .split(/\r\n|\n\r|\n|\r/g);

  console.log({ rows });

  rows.forEach((r) => {
    const cells = r.split("\t");
    console.log(cells);
  });
};
