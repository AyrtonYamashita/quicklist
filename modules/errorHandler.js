export function checkBeforeInsert(value) {
  if (value == "") {
    alert("Digite um item para adicionar a lista.")
    return false
  } else {
    return true
  }
}