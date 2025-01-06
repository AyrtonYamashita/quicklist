export function checkBeforeInsert(value) {
  const has_characters = /[^\p{L}0-9 ]+/gu

  // Verifica se o input está vázio
  if (value == "") {
    alert("Digite um item para adicionar a lista.")
    return false
  }

  // Verifica se o valor possui caracteres especiais
  if (has_characters.test(value)) {
    alert("Não utilize caracteres especiais na sua lista de compras!")
    return false
  }

  // Verifica se o valor inserido no input possui mais de 3 caracteres
  if (value.length < 3) {
    alert("Item inválido")
    return false
  }

  return true
}

export function checkItensLength(values) {
  if (values > 0) {
    return false
  }

  return true
}