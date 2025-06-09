document.addEventListener('DOMContentLoaded', () => {
    const tablero = document.getElementById('tablero');
    const botonNuevoJuego = document.getElementById('nuevoJuego');
    const botonVistaEspia = document.getElementById('vistaEspia');

    const turnoTexto = document.getElementById('turno');
    const rojoRestantes = document.getElementById('rojoRestantes');
    const azulRestantes = document.getElementById('azulRestantes');


    let palabras = [];

    function cargarPalabras() {
        return fetch('nombres.json')
            .then(resp => resp.json())
            .then(data => {
                palabras = data.nombres || [];
            })
            .catch(err => console.error('Error al cargar nombres:', err));
    }

    let restantes;
    let equipoInicial;

    function actualizarContador() {
        rojoRestantes.textContent = restantes.rojo;
        azulRestantes.textContent = restantes.azul;
    }

    function iniciarJuego() {

        if (palabras.length === 0) {
            console.error('La lista de palabras est\u00e1 vac\u00eda');
            return;
        }

        tablero.innerHTML = '';
        tablero.classList.remove('vista-espia');

        const palabrasJuego = palabras.sort(() => 0.5 - Math.random()).slice(0, 25);

        equipoInicial = Math.random() < 0.5 ? 'rojo' : 'azul';
        restantes = { rojo: equipoInicial === 'rojo' ? 9 : 8, azul: equipoInicial === 'azul' ? 9 : 8 };
        turnoTexto.textContent = `Empieza el equipo ${equipoInicial.toUpperCase()}`;
        actualizarContador();

        let roles = [];
        for (let i = 0; i < restantes.rojo; i++) roles.push('rojo');
        for (let i = 0; i < restantes.azul; i++) roles.push('azul');
        for (let i = 0; i < 7; i++) roles.push('neutro');

        roles.push('asesino');
        roles = roles.sort(() => 0.5 - Math.random());
        palabrasJuego.forEach((palabra, i) => {
            const tarjeta = document.createElement('div');
            tarjeta.classList.add('tarjeta');
            tarjeta.textContent = palabra;
            tarjeta.dataset.rol = roles[i];
            tarjeta.addEventListener('click', () => {
                if (tarjeta.classList.contains('revelada')) return;
                tarjeta.classList.add('revelada');
                tarjeta.classList.add(tarjeta.dataset.rol);
                if (tarjeta.dataset.rol === 'rojo' || tarjeta.dataset.rol === 'azul') {
                    restantes[tarjeta.dataset.rol]--;
                    actualizarContador();
                }

            });
            tablero.appendChild(tarjeta);
        });
    }

    botonNuevoJuego.addEventListener('click', iniciarJuego);
    botonVistaEspia.addEventListener('click', () => {
        tablero.classList.toggle('vista-espia');
    });

    cargarPalabras().then(iniciarJuego);
});
