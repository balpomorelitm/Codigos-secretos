document.addEventListener('DOMContentLoaded', () => {
    const tablero = document.getElementById('tablero');
    const botonNuevoJuego = document.getElementById('nuevoJuego');
    const botonVistaEspia = document.getElementById('vistaEspia');

    const tamanoGridSelect = document.getElementById('tamanoGrid');


    const botonTerminarTurno = document.getElementById('terminarTurno');
    const botonConfirmar = document.getElementById('confirmar');


    const tooltip = document.getElementById('configTooltip');
    const tooltipGrid = document.getElementById('tamanoTooltip');
    const nivelTooltip = document.getElementById('nivelTooltip');
    const palabrasInput = document.getElementById('palabrasPersonalizadas');
    const comenzarJuegoBtn = document.getElementById('comenzarJuego');
    const cancelarJuegoBtn = document.getElementById('cancelarJuego');
    const modoRadios = document.getElementsByName('modoJuego');


    const turnoTexto = document.getElementById('turno');
    const rojoRestantes = document.getElementById('rojoRestantes');
    const azulRestantes = document.getElementById('azulRestantes');
    const mensajeVictoria = document.getElementById('mensajeVictoria');

    // Oculta el mensaje de victoria al hacer clic en cualquier parte
    document.addEventListener('click', () => {
        mensajeVictoria.classList.add('oculto');
    });

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

    let palabrasA1 = [];
    let palabrasA2 = [];
    let tamanoActual = parseInt(tamanoGridSelect.value);
    let nivelActual = nivelTooltip.value;

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
    let equipoActual;
    let juegoTerminado = false;
    let tarjetaSeleccionada = null;

    function mostrarTurno(mensajeInicio = false) {
        const textoBase = mensajeInicio ? 'Empieza el equipo' : 'Turno de: EQUIPO';
        turnoTexto.innerHTML = `${textoBase} <span class="turno-boton ${equipoActual}">${equipoActual.toUpperCase()}</span>`;
    }

    function actualizarContador() {
        rojoRestantes.textContent = restantes.rojo;
        azulRestantes.textContent = restantes.azul;
    }

    function mostrarMensajeVictoria(equipo) {
        mensajeVictoria.innerHTML = equipo === 'rojo'
            ? '🔴 <strong>¡VICTORIA ROJA!</strong> 🎉'
            : '🔵 <strong>¡VICTORIA AZUL!</strong> 🎉';
        mensajeVictoria.classList.remove('rojo', 'azul', 'oculto');
        mensajeVictoria.classList.add(equipo);
    }

    function iniciarJuego(tamano = tamanoActual, listaPalabras = null) {
        tamanoActual = tamano;
        document.documentElement.style.setProperty('--grid-size', tamanoActual);
        juegoTerminado = false;
        mensajeVictoria.classList.add('oculto');

        botonConfirmar.disabled = true;
        tarjetaSeleccionada = null;

        const palabrasBase = listaPalabras || obtenerListaNivel(nivelActual);

        if (palabrasBase.length === 0) {

            console.error('La lista de palabras est\u00e1 vac\u00eda');
            return;
        }

        tablero.innerHTML = '';
        tablero.classList.remove('vista-espia');

        const totalCasillas = tamanoActual * tamanoActual;
        const palabrasJuego = palabrasBase.sort(() => 0.5 - Math.random()).slice(0, totalCasillas);


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
                if (tarjeta.classList.contains('revelada') || juegoTerminado) return;
                if (tarjetaSeleccionada) {
                    tarjetaSeleccionada.classList.remove('seleccionada');
                }
                tarjetaSeleccionada = tarjeta;
                tarjeta.classList.add('seleccionada');
                botonConfirmar.disabled = false;
            });
            tablero.appendChild(tarjeta);
        });
    }

    botonNuevoJuego.addEventListener('click', () => {
        tooltip.classList.remove('oculto');
        tooltipGrid.value = tamanoActual;
        nivelTooltip.value = nivelActual;
        palabrasInput.value = '';
        modoRadios.forEach(r => r.checked = r.value === 'normal');
    });

    comenzarJuegoBtn.addEventListener('click', () => {
        const nuevo = parseInt(tooltipGrid.value);
        nivelActual = nivelTooltip.value;
        let modo = 'normal';
        modoRadios.forEach(r => { if (r.checked) modo = r.value; });
        const palabrasBase = obtenerListaNivel(nivelActual);
        const ingresadas = palabrasInput.value.split(',').map(p => p.trim()).filter(p => p);
        let listaFinal;

        if (modo === 'custom') {
            const necesarias = nuevo * nuevo;
            if (ingresadas.length !== necesarias) {
                alert(`Debes introducir exactamente ${necesarias} palabras.`);
                return;
            }
            listaFinal = ingresadas;
        } else if (modo === 'agregar') {
            listaFinal = palabrasBase.slice();
            if (ingresadas.length) {
                listaFinal.push(...ingresadas);
            }
        } else {
            listaFinal = palabrasBase.slice();
        }

        tooltip.classList.add('oculto');
        iniciarJuego(nuevo, listaFinal);
    });


    cancelarJuegoBtn.addEventListener('click', () => {
        tooltip.classList.add('oculto');
    });

    botonVistaEspia.addEventListener('click', () => {
        tablero.classList.toggle('vista-espia');
    });



    botonTerminarTurno.addEventListener('click', () => {
        equipoActual = equipoActual === 'rojo' ? 'azul' : 'rojo';
        mostrarTurno();
    });

    botonConfirmar.addEventListener('click', () => {
        if (!tarjetaSeleccionada || juegoTerminado) return;
        const tarjeta = tarjetaSeleccionada;
        tarjeta.classList.remove('seleccionada');
        tarjeta.classList.add('revelada');
        tarjeta.classList.add(tarjeta.dataset.rol);

        if (tarjeta.dataset.rol === 'asesino') {
            juegoTerminado = true;
            const ganador = equipoActual === 'rojo' ? 'azul' : 'rojo';
            mostrarMensajeVictoria(ganador);
        } else {
            if (tarjeta.dataset.rol === 'rojo' || tarjeta.dataset.rol === 'azul') {
                restantes[tarjeta.dataset.rol]--;
                actualizarContador();
                if (restantes[tarjeta.dataset.rol] === 0) {
                    juegoTerminado = true;
                    mostrarMensajeVictoria(tarjeta.dataset.rol);
                }
            }
        }

        tarjetaSeleccionada = null;
        botonConfirmar.disabled = true;
    });

    colorearTitulo();
    cargarPalabras().then(iniciarJuego);

});
