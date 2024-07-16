export function qs(selector, parent = document) {
    return parent.querySelector(selector);
}
  
export function qsall(selector, parent = document) {
    return parent.querySelectorAll(selector);
}
export function setClickAll(element, callback) {
    const elements = qsall(element);
    elements.forEach((element) => {
      element.addEventListener("click", callback)
      element.addEventListener("touchend", (event) => {
        event.preventDefault();
        callback();
      });
    });
  
}