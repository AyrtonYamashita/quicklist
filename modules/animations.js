import { checkItensLength } from "./errorHandler.js"

export function startProgram() {
  const button_logo = document.querySelector("header img")
  const header = document.querySelector("header")
  button_logo.addEventListener("click", () => {
    button_logo.classList.toggle("stop-animation")
    header.classList.toggle("head-up-header")
  })
}

export function headupContainer() {
  const list_itens = document.querySelectorAll("li")
  if (checkItensLength(list_itens.length)) {
    const container = document.querySelector(".container")
    container.classList.toggle("head-up-container")
  }
}