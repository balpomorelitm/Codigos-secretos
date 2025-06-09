document.addEventListener('DOMContentLoaded', () => {
    const tablero = document.getElementById('tablero');
    const botonNuevoJuego = document.getElementById('nuevoJuego');
    const botonVistaEspia = document.getElementById('vistaEspia');

    // --- ¡EDITA ESTA LISTA PARA USAR TUS PROPIAS PALABRAS! ---
    const palabras = [
        "Hospital", "Guitarra", "Zumo", "Río", "Biblioteca", "Taxi", "Casa", "Pan",
        "Playa", "Hong Kong", "Teatro", "Semana", "Camina", "Aeropuerto", "Bailar",
        "Supermercado", "Lluvioso", "Mochila", "Viajar", "Gato", "Perro", "Sol",
        "Luna", "Montaña", "Coche", "Libro", "Mesa", "Silla", "Profesor", "Música"
    ];
    // --- FIN DE LA LISTA DE PALABRAS ---

    function iniciarJuego() {
        tablero.innerHTML = '';
        tablero.classList.remove('vista-espia');
        const palabrasJuego = palabras.sort(() => 0.5 - Math.random()).slice(0, 25);
        let roles = [];
        for (let i = 0; i < 8; i++) roles.push('rojo');
        for (let i = 0; i < 8; i++) roles.push('azul');
        for (let i = 0; i < 8; i++) roles.push('neutro');
        roles.push('asesino');
        roles = roles.sort(() => 0.5 - Math.random());
        palabrasJuego.forEach((palabra, i) => {
            const tarjeta = document.createElement('div');
            tarjeta.classList.add('tarjeta');
            tarjeta.textContent = palabra;
            tarjeta.dataset.rol = roles[i];
            tarjeta.addEventListener('click', () => {
                tarjeta.classList.add('revelada');
                tarjeta.classList.add(tarjeta.dataset.rol);
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
