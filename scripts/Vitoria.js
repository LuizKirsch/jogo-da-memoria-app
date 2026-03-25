export function vitoria(board) {

  return board.every((cell) => cell !== "");
}

export function criarTabuleiroVazio(rows, cols) {
  return Array.from({ length: rows * cols }, () => "");
}

export function reiniciarJogo(rows, cols) {
  return criarTabuleiroVazio(rows, cols);
}