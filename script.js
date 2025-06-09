document.addEventListener('DOMContentLoaded', () => {
    const tablero = document.getElementById('tablero');
    const botonNuevoJuego = document.getElementById('nuevoJuego');
    const botonVistaEspia = document.getElementById('vistaEspia');

    const tooltip = document.getElementById('configTooltip');
    const tooltipGrid = document.getElementById('tamanoTooltip');
    const palabrasInput = document.getElementById('palabrasPersonalizadas');
    const comenzarJuegoBtn = document.getElementById('comenzarJuego');
    const cancelarJuegoBtn = document.getElementById('cancelarJuego');
    const modoRadios = document.getElementsByName('modoJuego');

    const turnoTexto = document.getElementById('turno');
    const rojoRestantes = document.getElementById('rojoRestantes');
    const azulRestantes = document.getElementById('azulRestantes');


    let palabrasBase = [];
    let tamanoActual = 5;
    document.documentElement.style.setProperty('--grid-size', tamanoActual);

    function cargarPalabras() {
        return fetch('nombres.json')
            .then(resp => resp.json())
            .then(data => {
                palabrasBase = data.nombres || [];
            })
            .catch(err => console.error('Error al cargar nombres:', err));
    }

    let restantes;
    let equipoInicial;

    function actualizarContador() {
        rojoRestantes.textContent = restantes.rojo;
        azulRestantes.textContent = restantes.azul;
    }

    function iniciarJuego(tamano = tamanoActual, listaPalabras = null) {
        tamanoActual = tamano;
        document.documentElement.style.setProperty('--grid-size', tamanoActual);

        let lista = listaPalabras ? listaPalabras.slice() : palabrasBase.slice();

        if (lista.length === 0) {
            console.error('La lista de palabras est\u00e1 vac\u00eda');
            return;
        }

        tablero.innerHTML = '';
        tablero.classList.remove('vista-espia');

        const totalCasillas = tamanoActual * tamanoActual;
        const palabrasJuego = lista.sort(() => 0.5 - Math.random()).slice(0, totalCasillas);

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

    botonNuevoJuego.addEventListener('click', () => {
        tooltip.classList.remove('oculto');
        tooltipGrid.value = tamanoActual;
        palabrasInput.value = '';
        modoRadios.forEach(r => r.checked = r.value === 'normal');
    });

    comenzarJuegoBtn.addEventListener('click', () => {
        const nuevo = parseInt(tooltipGrid.value);
        let modo = 'normal';
        modoRadios.forEach(r => { if (r.checked) modo = r.value; });
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

    cargarPalabras();
});
