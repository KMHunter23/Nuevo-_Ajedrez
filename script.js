const tablero = document.getElementById("tablero");
const filas = 8;
const columnas = 8;

// Posición inicial del peón (ejemplo: fila 3, col 3)
let peonFila = 3;
let peonCol = 3;

// Crear tablero
for (let fila = 0; fila < filas; fila++) {
  for (let col = 0; col < columnas; col++) {
    const celda = document.createElement("div");
    celda.classList.add("celda");
    celda.dataset.fila = fila;
    celda.dataset.col = col;
    tablero.appendChild(celda);
  }
}

function actualizarTablero() {
  document.querySelectorAll(".celda").forEach(celda => {
    celda.innerHTML = "";
    celda.classList.remove("destino");

    const fila = parseInt(celda.dataset.fila);
    const col = parseInt(celda.dataset.col);

    // Marcar posibles destinos
    if (Math.abs(fila - peonFila) <= 1 && Math.abs(col - peonCol) <= 1) {
      celda.classList.add("destino");
    }

    // Colocar el peón
    if (fila === peonFila && col === peonCol) {
      celda.innerHTML = "♟";
      celda.classList.add("peon");
    } else {
      celda.classList.remove("peon");
    }
  });
}

// Evento de movimiento
tablero.addEventListener("click", e => {
  const celda = e.target;
  const fila = parseInt(celda.dataset.fila);
  const col = parseInt(celda.dataset.col);

  if (Math.abs(fila - peonFila) <= 1 && Math.abs(col - peonCol) <= 1) {
    peonFila = fila;
    peonCol = col;
    actualizarTablero();
  }
});

actualizarTablero();

function actualizarTablero() {
  document.querySelectorAll(".celda").forEach(celda => {
    celda.innerHTML = "";
    celda.classList.remove("destino", "peon", "amenaza");
  });

  // Marcar destinos posibles
  for (let fila = 0; fila < filas; fila++) {
    for (let col = 0; col < columnas; col++) {
      const index = fila * columnas + col;
      const celda = tablero.children[index];

      if (esMovimientoValido(fila, col)) {
        celda.classList.add("destino");

        // Ahora marcamos las celdas alrededor del destino como amenaza
        for (let df = -1; df <= 1; df++) {
          for (let dc = -1; dc <= 1; dc++) {
            const af = fila + df;
            const ac = col + dc;

            if (
              af >= 0 && af < filas &&
              ac >= 0 && ac < columnas &&
              !(af === fila && ac === col)
            ) {
              const amenazaIndex = af * columnas + ac;
              const celdaAmenaza = tablero.children[amenazaIndex];
              if (!celdaAmenaza.classList.contains("destino")) {
                celdaAmenaza.classList.add("amenaza");
              }
            }
          }
        }
      }

      if (fila === peonFila && col === peonCol) {
        celda.innerHTML = "♟";
        celda.classList.add("peon");
      }
    }
  }
}

