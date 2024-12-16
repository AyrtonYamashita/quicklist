const form = document.querySelector("form")
const item_value = document.querySelector("input");
const list_purchase = document.querySelector(".list")
const message = document.querySelector("#message")
const alert_message = document.querySelector("#message span")
const close_message = document.querySelector(".close-alert")
const has_characters = /[^\p{L}0-9 ]+/gu

let item = item_value.value


item_value.addEventListener("input", () => {
  item_value.value = item_value.value.replace(has_characters, "").substring(0, 31)
  item = item_value.value.replace(has_characters, "").substring(0, 31)
  if (item.length >= 32) {
    item_value.style.border = "2px solid var(--color-danger)"
    setTimeout(() => {
      item_value.style.border = "2px solid var(--border-primary)"
    }, 4000)
    return showWarning("danger", "Valor máximo de 32 caracteres excedido!")
  }

})

close_message.onclick = (e) => {
  message.style.opacity = 0
  message.style.scale = .875
  message.classList.remove("danger")
  message.classList.remove("success")
}

form.onsubmit = (e) => {
  e.preventDefault();

  // Validação de valor no input
  if (item == "") {
    item_value.classList.toggle("error")
    setTimeout(() => {
      item_value.classList.toggle("error")
    }, 4000)
    return showWarning("danger", "Você precisa escrever algo para adicionar na lista.")
  }

  // Validação de tipo de valor inserido
  if (has_characters.test(item)) {
    item = ""
    item_value.classList.toggle("error")
    setTimeout(() => {
      item_value.classList.toggle("error")
    }, 4000)
    return showWarning("danger", "Não utilize caracteres especiais na sua lista de compras!")
  }

  // Validação de tamanho do valor inserido
  if (item.length < 3) {
    item_value.classList.toggle("error")
    setTimeout(() => {
      item_value.classList.toggle("error")
    }, 4000)
    return showWarning("danger", "Seu item precisa de pelo o menos 3 caracteres para ser adicionado!")
  }


  let purchase_item =
    `
        <div class="purchase-item" id="item-${item}">
          <input type="checkbox" name="${item}" />
          <label for="${item}">${item}</label>
          <button onclick="removeItem('item-${item}')"></button>
        </div>
        `

  list_purchase.innerHTML += purchase_item
  showWarning("success", "Item adicionado a lista.")
  item = item_value.value = ""

}

function removeItem(id) {
  const item = document.getElementById(id)

  if (item) {
    item.remove()
    showWarning("danger", "Item removido!")
  } else {
    console.log("opa2")
  }
}

function showWarning(type, details) {
  message.classList.remove("danger")
  message.classList.remove("success")
  message.style.opacity = 1
  message.style.scale = 1
  message.classList.add(type)
  alert_message.textContent = details

  setTimeout(() => {
    message.style.opacity = 0
    message.style.scale = .875
    message.classList.remove("danger")
    message.classList.remove("success")
  }, 4000)
}

function closeMessage(id) {
  const message_on = document.getElementById(id)
  if (message_on) {
    message_on.style.opacity = 0
    message_on.style.scale = .875
  } else {
    console.log("Botão não identificado")
  }
}


