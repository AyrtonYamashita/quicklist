export function startProgram() {
  const button_logo = document.querySelector("header img")
  const header = document.querySelector("header")
  button_logo.addEventListener("click", () => {
    button_logo.classList.toggle("stop-animation")
    header.classList.toggle("head-up-header")
  })
}

export function headupContainer() {
  const container = document.querySelector(".container")
  const add_item_button = document.querySelector(".btn-new-item")
  add_item_button.addEventListener("click", () => {
    console.log("cliquei")
    container.classList.toggle("head-up-container")
  })
}