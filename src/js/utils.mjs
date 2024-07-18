// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function qsall(selector, parent = document) {
  return parent.querySelectorAll(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
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

export function getParam(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param)
  return product
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  const items = list.map((item) => templateFn(item));
  parentElement.insertAdjacentHTML(position, items.join(""));
}

export function renderWithTemplate(template, parentElement, data = false, callback = false) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if(callback) {
    callback(data);
  }
}

export async function loadTemplate(url) {
  try {
    const response = await fetch(url);
    const template = await response.text();
    return template;
  } catch (error) {
    console.log("Error fetching temmplate: ", error);
  }
}

export async function loadHeaderFooter() {
  try {
    const headerElement = document.getElementById("main-header");
    const footerElement = document.getElementById("main-footer");

    const headerTemplate = await loadTemplate("/partials/header.html");
    const footerTemplate = await loadTemplate("/partials/footer.html");
    
    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);
  } catch (error) {
    console.log("Error fetching: ", error);
  }
}