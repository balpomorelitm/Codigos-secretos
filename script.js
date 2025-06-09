document.addEventListener('DOMContentLoaded', () => {
    const tablero = document.getElementById('tablero');
    const botonNuevoJuego = document.getElementById('nuevoJuego');
    const botonVistaEspia = document.getElementById('vistaEspia');
    const selectorTamano = document.getElementById('tamanoGrid');

    // --- ¡EDITA ESTA LISTA PARA USAR TUS PROPIAS PALABRAS! ---
    const palabras = [
        "Hospital", "Guitarra", "Zumo", "Río", "Biblioteca", "Taxi", "Casa", "Pan",
        "Playa", "Hong Kong", "Teatro", "Semana", "Camina", "Aeropuerto", "Bailar",
        "Supermercado", "Lluvioso", "Mochila", "Viajar", "Gato", "Perro", "Sol",
        "Luna", "Montaña", "Coche", "Libro", "Mesa", "Silla", "Profesor", "Música"
    ];
    // --- FIN DE LA LISTA DE PALABRAS ---

    function iniciarJuego() {
        const tamano = parseInt(selectorTamano.value, 10);
        tablero.style.setProperty('--grid-size', tamano);
        tablero.innerHTML = '';
        tablero.classList.remove('vista-espia');
        const totalCasillas = tamano * tamano;
        const palabrasJuego = palabras.sort(() => 0.5 - Math.random()).slice(0, totalCasillas);
        let roles = [];
        const asesinos = 1;
        const restantes = totalCasillas - asesinos;
        const porColor = Math.floor(restantes / 3);
        for (let i = 0; i < porColor; i++) roles.push('rojo');
        for (let i = 0; i < porColor; i++) roles.push('azul');
        for (let i = 0; i < restantes - porColor * 2; i++) roles.push('neutro');
        roles.push('asesino');
        roles = roles.sort(() => 0.5 - Math.random());
        palabrasJuego.forEach((palabra, i) => {
            const tarjeta = document.createElement('div');
            tarjeta.classList.add('tarjeta');
            tarjeta.textContent = palabra;
            tarjeta.dataset.rol = roles[i];
            tarjeta.addEventListener('click', () => {
                tarjeta.classList.add('revelada', tarjeta.dataset.rol);
            });
            tablero.appendChild(tarjeta);
        });
    }

    botonNuevoJuego.addEventListener('click', iniciarJuego);
    botonVistaEspia.addEventListener('click', () => {
        tablero.classList.toggle('vista-espia');
    });

    iniciarJuego();
});
