document.addEventListener('DOMContentLoaded', () => {
    const tablero = document.getElementById('tablero');
    const botonNuevoJuego = document.getElementById('nuevoJuego');
    const botonVistaEspia = document.getElementById('vistaEspia');
    const tamanoGridSelect = document.getElementById('tamanoGrid');
    const nivelSelect = document.getElementById('nivel');

    const turnoTexto = document.getElementById('turno');
    const rojoRestantes = document.getElementById('rojoRestantes');
    const azulRestantes = document.getElementById('azulRestantes');


    let palabrasA1 = [];
    let palabrasA2 = [];
    let tamanoActual = parseInt(tamanoGridSelect.value);
    document.documentElement.style.setProperty('--grid-size', tamanoActual);

    function cargarPalabras() {
        return fetch('nombres.json')
            .then(resp => resp.json())
            .then(data => {
                palabrasA1 = data.A1 || [];
                palabrasA2 = data.A2 || [];
            })
            .catch(err => console.error('Error al cargar nombres:', err));
    }

    function obtenerListaNivel(nivel) {
        if (nivel === 'a1') return palabrasA1;
        if (nivel === 'a2') return palabrasA2;
        return palabrasA1.concat(palabrasA2);
    }

    let restantes;
    let equipoInicial;

    function actualizarContador() {
        rojoRestantes.textContent = restantes.rojo;
        azulRestantes.textContent = restantes.azul;
    }

    function iniciarJuego(tamano = tamanoActual) {
        tamanoActual = tamano;
        document.documentElement.style.setProperty('--grid-size', tamanoActual);

        const listaPalabras = obtenerListaNivel(nivelSelect.value);

        if (listaPalabras.length === 0) {
            console.error('La lista de palabras est\u00e1 vac\u00eda');
            return;
        }

        tablero.innerHTML = '';
        tablero.classList.remove('vista-espia');

        const totalCasillas = tamanoActual * tamanoActual;
        const palabrasJuego = listaPalabras.sort(() => 0.5 - Math.random()).slice(0, totalCasillas);

        equipoInicial = Math.random() < 0.5 ? 'rojo' : 'azul';
        const base = Math.round(totalCasillas * 0.36);
        restantes = {
            rojo: equipoInicial === 'rojo' ? base : base - 1,
            azul: equipoInicial === 'azul' ? base : base - 1
        };
        turnoTexto.textContent = `Empieza el equipo ${equipoInicial.toUpperCase()}`;
        actualizarContador();

        let roles = [];
        for (let i = 0; i < restantes.rojo; i++) roles.push('rojo');
        for (let i = 0; i < restantes.azul; i++) roles.push('azul');
        const neutros = totalCasillas - restantes.rojo - restantes.azul - 1;
        for (let i = 0; i < neutros; i++) roles.push('neutro');

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

    tamanoGridSelect.addEventListener('change', () => {
        const nuevo = parseInt(tamanoGridSelect.value);
        if (nuevo === tamanoActual) return;
        if (confirm('¿Empezar nueva partida?')) {
            iniciarJuego(nuevo);
        } else {
            tamanoGridSelect.value = tamanoActual;
        }
    });

    nivelSelect.addEventListener('change', iniciarJuego);

    cargarPalabras().then(iniciarJuego);
});
