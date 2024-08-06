const form = document.querySelector("form")
const item_value = document.querySelector("input");
const list_purchase = document.querySelector(".list")
const message = document.querySelector("#message")
const alert_message = document.querySelector("#message span")



form.onsubmit = (e) => {
  setTimeout(overWarning, 4000)
  e.preventDefault();

  if (item_value.value == "") {
    return showWarning("danger", "Você precisa escrever algo para adicionar na lista.")

  }

  let purchase_item = `
        <div class="purchase-item" id="item-${item_value.value}">
          <input type="checkbox" name="${item_value.value}" />
          <label for="${item_value.value}">${item_value.value}</label>
          <button onclick="removeItem('item-${item_value.value}')"></button>
        </div>
        `

  list_purchase.innerHTML += purchase_item
  showWarning("success", "Item adicionado a lista.")
  setTimeout(overWarning, 4000)
  item_value.value = ""

}

function removeItem(id) {
  const item = document.getElementById(id)

  if (item) {
    item.remove()
    showWarning("danger", "Item removido!")
    setTimeout(overWarning, 4000)
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
}

function overWarning() {
  message.style.opacity = 0
  message.style.scale = .875
  message.classList.remove("danger")
  message.classList.remove("success")
}


