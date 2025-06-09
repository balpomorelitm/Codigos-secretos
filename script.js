document.addEventListener('DOMContentLoaded', () => {
    const tablero = document.getElementById('tablero');
    const botonNuevoJuego = document.getElementById('nuevoJuego');
    const botonVistaEspia = document.getElementById('vistaEspia');
    const tamanoGridSelect = document.getElementById('tamanoGrid');
    const botonEquipoRojo = document.getElementById('equipoRojo');
    const botonEquipoAzul = document.getElementById('equipoAzul');
    const botonTerminarTurno = document.getElementById('terminarTurno');

    const turnoTexto = document.getElementById('turno');
    const rojoRestantes = document.getElementById('rojoRestantes');
    const azulRestantes = document.getElementById('azulRestantes');

    function colorearTitulo() {
        const titulo = document.querySelector('h1');
        const texto = titulo.textContent;
        titulo.innerHTML = '';
        [...texto].forEach((letra, idx) => {
            const span = document.createElement('span');
            span.textContent = letra;
            if (letra.trim() !== '') {
                span.classList.add(idx % 2 === 0 ? 'rojo' : 'azul');
            }
            titulo.appendChild(span);
        });
    }


    let palabras = [];
    let tamanoActual = parseInt(tamanoGridSelect.value);
    document.documentElement.style.setProperty('--grid-size', tamanoActual);

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
    let equipoActual;

    function mostrarTurno(mensajeInicio = false) {
        if (mensajeInicio) {
            turnoTexto.textContent = `Empieza el equipo ${equipoActual.toUpperCase()}`;
        } else {
            turnoTexto.textContent = `Turno de: EQUIPO ${equipoActual.toUpperCase()}`;
        }
        turnoTexto.classList.remove('rojo', 'azul');
        turnoTexto.classList.add(equipoActual);
    }

    function actualizarContador() {
        rojoRestantes.textContent = restantes.rojo;
        azulRestantes.textContent = restantes.azul;
    }

    function iniciarJuego(tamano = tamanoActual) {
        tamanoActual = tamano;
        document.documentElement.style.setProperty('--grid-size', tamanoActual);

        if (palabras.length === 0) {
            console.error('La lista de palabras est\u00e1 vac\u00eda');
            return;
        }

        tablero.innerHTML = '';
        tablero.classList.remove('vista-espia');

        const totalCasillas = tamanoActual * tamanoActual;
        const palabrasJuego = palabras.sort(() => 0.5 - Math.random()).slice(0, totalCasillas);

        equipoInicial = Math.random() < 0.5 ? 'rojo' : 'azul';
        const base = Math.round(totalCasillas * 0.36);
        restantes = {
            rojo: equipoInicial === 'rojo' ? base : base - 1,
            azul: equipoInicial === 'azul' ? base : base - 1
        };
        equipoActual = equipoInicial;
        mostrarTurno(true);
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

    botonEquipoRojo.addEventListener('click', () => {
        equipoActual = 'rojo';
        mostrarTurno();
    });

    botonEquipoAzul.addEventListener('click', () => {
        equipoActual = 'azul';
        mostrarTurno();
    });

    botonTerminarTurno.addEventListener('click', () => {
        equipoActual = equipoActual === 'rojo' ? 'azul' : 'rojo';
        mostrarTurno();
    });

    colorearTitulo();
    cargarPalabras().then(iniciarJuego);
});
