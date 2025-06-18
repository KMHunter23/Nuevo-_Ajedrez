const tablero = document.getElementById("tablero");

for (let i = 0; i < 64; i++) {
  const celda = document.createElement("div");
  celda.classList.add("celda");
  tablero.appendChild(celda);
}
