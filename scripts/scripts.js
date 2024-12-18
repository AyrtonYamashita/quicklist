const form = document.querySelector("form")
const item_value = document.querySelector("input");
const list_purchase = document.querySelector(".list")
const message = document.querySelector("#message")
const alert_message = document.querySelector("#message span")
const close_message = document.querySelector(".close-alert")
const show_popup = document.querySelector(".show-popup")
const container = document.querySelector(".container")
const save_list = document.querySelector(".save_list")
const has_characters = /[^\p{L}0-9 ]+/gu

let item = item_value.value
let timeoutId;
let json_file = {}

container.addEventListener("click", (e) => {
  if (e.target == container) {
    container.style.display = "none"
  }
})

show_popup.addEventListener('click', () => {
  const list_items = document.querySelectorAll(".purchase-item")
  const pack_list = document.querySelector(".pack-list")
  const quantity = document.querySelector(".item-quantity")
  pack_list.innerHTML = ''

  list_items.forEach((item) => {
    const items = item.id.slice(5)
    let storage = `<li>${items}</li>`
    pack_list.innerHTML += storage
  })

  let message;

  if (list_items.length <= 0) {
    message = `Sua lista não possui itens`
  } else if (list_items.length == 1) {
    message = `Sua lista possui <span> ${list_items.length} item</span>.`
  } else {
    message = `Sua lista possui <span> ${list_items.length} itens</span>.`
  }
  quantity.innerHTML = ''
  quantity.innerHTML += message
  container.style.display = "flex"
})

if (save_list) {
  save_list.addEventListener("click", () => saveList())
}

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

list_purchase.onclick = (e) => {
  if (e.target.classList.contains("check-item")) {
    e.target.closest(".purchase-item").classList.toggle("checked")
  }
}

form.onsubmit = (e) => {
  e.preventDefault();

  if (item == "") {
    item_value.classList.toggle("error")
    setTimeout(() => {
      item_value.classList.toggle("error")
    }, 4000)
    return showWarning("danger", "Você precisa escrever algo para adicionar na lista.")
  }

  if (has_characters.test(item)) {
    item = ""
    item_value.classList.toggle("error")
    setTimeout(() => {
      item_value.classList.toggle("error")
    }, 4000)
    return showWarning("danger", "Não utilize caracteres especiais na sua lista de compras!")
  }

  if (item.length < 3) {
    item_value.classList.toggle("error")
    setTimeout(() => {
      item_value.classList.toggle("error")
    }, 4000)
    return showWarning("danger", "Item inválido")
  }

  let purchase_item =
    `
        <div class="purchase-item" id="item-${item}">
          <input type="checkbox" name="${item}" class="check-item" />
          <label for="${item}" class="itemp">${item}</label>
          <button onclick="removeItem('item-${item}')"></button>
        </div>
        `
  list_purchase.innerHTML += purchase_item
  showWarning("success", `${item} foi adicionado a lista.`)
  item = item_value.value = ""
  updateShowPopup()

}

function removeItem(id) {
  const item = document.getElementById(id)

  if (item) {
    item.remove()
    showWarning("danger", "Item removido!")
    updateShowPopup()
  }
}

function showWarning(type, details) {
  message.classList.remove("danger")
  message.classList.remove("success")
  message.style.opacity = 1
  message.style.scale = 1
  message.classList.add(type)
  alert_message.textContent = details

  clearTimeout(timeoutId)

  timeoutId = setTimeout(() => {
    message.style.opacity = 0
    message.style.scale = .875
    message.classList.remove("danger")
    message.classList.remove("success")
  }, 4000)
}

function updateShowPopup() {
  const list_items = document.querySelectorAll(".purchase-item")

  if (list_items.length) {
    show_popup.classList.remove("show-popup")
  } else {
    show_popup.classList.add("show-popup")
  }
}

function saveList() {
  const name_list = document.querySelector("#name-list")
  const list_items = document.querySelectorAll(".purchase-item")
  const name = name_list.value.trim()

  if (!name) {
    return alert(`Sua lista não tem nome: ${name}`)
  }

  let currentList = []

  list_items.forEach((item) => {
    const items = item.id.slice(5)
    currentList.push(items)
  })

  name_list.value = ''
  container.style.display = "none"
  showWarning("success", `Lista '${name}' criada com sucesso.`)
  return localStorage.setItem(name, JSON.stringify(currentList))
}


