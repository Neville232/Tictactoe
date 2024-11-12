// Obtiene la tabla por su ID
const tabla = document.getElementById('tabla1');
const mensaje = document.getElementById('mensaje');
let t = 1; // Variable para alternar entre "X" y "O"
let jugadas = []; // Array para almacenar las celdas jugadas

// Función para verificar si hay un ganador
function verificarGanador() {
    const celdas = [
        [tabla.rows[0].cells[0], tabla.rows[0].cells[1], tabla.rows[0].cells[2]],
        [tabla.rows[1].cells[0], tabla.rows[1].cells[1], tabla.rows[1].cells[2]],
        [tabla.rows[2].cells[0], tabla.rows[2].cells[1], tabla.rows[2].cells[2]],
        [tabla.rows[0].cells[0], tabla.rows[1].cells[0], tabla.rows[2].cells[0]],
        [tabla.rows[0].cells[1], tabla.rows[1].cells[1], tabla.rows[2].cells[1]],
        [tabla.rows[0].cells[2], tabla.rows[1].cells[2], tabla.rows[2].cells[2]],
        [tabla.rows[0].cells[0], tabla.rows[1].cells[1], tabla.rows[2].cells[2]],
        [tabla.rows[0].cells[2], tabla.rows[1].cells[1], tabla.rows[2].cells[0]]
    ];

    for (let i = 0; i < celdas.length; i++) {
        const [a, b, c] = celdas[i];
        if (a.textContent && a.textContent === b.textContent && a.textContent === c.textContent) {
            //--------------------------------------------------------------------
            let perdedor = a.textContent === "X" ? 'O' : 'X';
            let randomNumber = Math.floor(Math.random() * 5);

            switch (randomNumber){
                case 0: mensaje.textContent = "Que bolas, ganó " + a.textContent;
                        break;
                case 1: mensaje.textContent = "Si eres gafo " +  perdedor + " te ganó " + a.textContent;
                        break;
                case 2: mensaje.textContent = "Chamo, " + perdedor + " como te vas a dejar ganar por " + a.textContent;
                        break;
                case 3: mensaje.textContent = "Felicitaciones " + a.textContent;
                        break;
                case 4: mensaje.textContent = "El premio es para " + a.textContent;
                        break;
                case 5: mensaje.textContent = "Que bolas, ganó " + a.textContent;
                        break;
                case 6: mensaje.textContent = "Que bolas, ganó " + a.textContent;
                        break;
                case 7: mensaje.textContent = "Que bolas, ganó " + a.textContent;
                        break;
                case 8: mensaje.textContent = "Que bolas, ganó " + a.textContent;
                        break;
                case 10: mensaje.textContent = "Que bolas, ganó " + a.textContent;
                        break;
                default : mensaje.textContent = "Que bolas, ganó " + a.textContent;
            }

            //--------------------------------------------------------------------
            //mensaje.textContent = "Que bolas, ganó " + a.textContent;
            return true; // Hay un ganador
        }
    }
    return false; // No hay ganador
}

// Itera sobre las filas y celdas de la tabla para agregar el evento de clic
for (let i = 0; i < tabla.rows.length; i++) {
    for (let j = 0; j < tabla.rows[i].cells.length; j++) {
        // Obtiene la celda actual
        const celda = tabla.rows[i].cells[j];
        
        // Agrega un evento de clic a la celda
        celda.addEventListener('click', function() {
            if (celda.textContent === "") { // Verifica si la celda está vacía
                if (t === 1) {
                    celda.textContent = "X";
                    celda.style.color = "white"; // Cambia el color a blanco para "X"
                    jugadas.push(celda); // Almacena la celda jugada
                    t = 0; // Cambia el turno
                } else {
                    celda.textContent = "O";
                    celda.style.color = "red"; // Cambia el color a rojo para "O"
                    jugadas.push(celda); // Almacena la celda jugada
                    t = 1; // Cambia el turno
                }

                // Verifica si hay un ganador después de cada jugada
                if (verificarGanador()) {
                    // Deshabilitar clics en celdas si hay un ganador
                    for (let i = 0; i < tabla.rows.length; i++) {
                        for (let j = 0; j < tabla.rows[i].cells.length; j++) {
                            tabla.rows[i].cells[j].style.pointerEvents = 'none'; // Deshabilita clics
                        }
                    }
                } else {
                    // Manejo de eliminación de jugadas
                    manejarJugadas();
                }
            }
        });
    }
}

// Función para manejar la eliminación de jugadas
function manejarJugadas() {
    const espaciosLibres = Array.from(tabla.getElementsByTagName('td')).filter(celda => celda.textContent === "").length;

    if (espaciosLibres === 2) {
        // Eliminar la jugada más antigua
        if (jugadas.length > 0) {
            const celdaEliminada = jugadas.shift();
            celdaEliminada.textContent = ""; // Elimina la jugada más antigua
            celdaEliminada.style.color = ""; // Limpia el color de la celda
        }
    }
}

// Botón de reinicio
const reset = document.getElementById('reset');

reset.addEventListener('click', function () {
    for (let i = 0; i < tabla.rows.length; i++) {
        for (let j = 0; j < tabla.rows[i].cells.length; j++) {
            const celda = tabla.rows[i].cells[j]; // Obtiene la celda actual
            celda.textContent = ""; // Limpia el contenido de la celda
            celda.style.color = ""; // Limpia el color de la celda
            celda.style.pointerEvents = 'auto'; // Habilita clics nuevamente
        }
    }
    mensaje.textContent = ""; // Limpia el mensaje de ganador
    jugadas = []; // Limpia el array de jugadas
});