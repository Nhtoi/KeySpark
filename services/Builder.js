export class Builder {
  constructor(element, cssPath, templateId) {
    this.element = element;
    this.cssPath = cssPath;
    this.templateId = templateId;
  }
  async build() {
    const shadow = this.element.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    if (this.cssPath) {
      const res = await fetch(this.cssPath);
      const css = await res.text();
      style.textContent = css;
    }

    const template = document.getElementById(this.templateId);
    const content =
      template?.content?.cloneNode(true) || document.createDocumentFragment();

    shadow.appendChild(style);
    shadow.appendChild(content);

    return shadow;
  }
}

export function initializeCompleted() {
  if (!localStorage.getItem("completed")) {
    const data = { completed: {} };
    ["Beginner", "Intermediate", "Advanced"].forEach((level) => {
      data.completed[level] = {};
    });
    localStorage.setItem("completed", JSON.stringify(data));
  }
}

export function getCompleted(difficulty, id) {
  const data = JSON.parse(localStorage.getItem("completed")) || {
    completed: {},
  };
  return data.completed[difficulty]?.[id] ?? false;
}

export function setCompleted(difficulty, id, value = true) {
  const data = JSON.parse(localStorage.getItem("completed")) || {
    completed: {},
  };
  if (!data.completed[difficulty]) data.completed[difficulty] = {};
  data.completed[difficulty][id] = value;
  localStorage.setItem("completed", JSON.stringify(data));
}
export default Builder;
