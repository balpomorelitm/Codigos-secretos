document.addEventListener('DOMContentLoaded', () => {
    const tablero = document.getElementById('tablero');
    const botonNuevoJuego = document.getElementById('nuevoJuego');
    const botonVistaEspia = document.getElementById('vistaEspia');
    const botonTabletMode = document.getElementById('tabletMode');

    const botonTerminarTurno = document.getElementById('terminarTurno');
    const botonConfirmar = document.getElementById('confirmar');


    const tooltip = document.getElementById('configTooltip');
    const tooltipGrid = document.getElementById('tamanoTooltip');
    const nivelTooltip = document.getElementById('nivelTooltip');
    const palabrasInput = document.getElementById('palabrasPersonalizadas');
    const comenzarJuegoBtn = document.getElementById('comenzarJuego');
    const cancelarJuegoBtn = document.getElementById('cancelarJuego');
    const modoRadios = document.getElementsByName('modoJuego');

    const emojiA1Map = {
        "pelo": "\uD83D\uDC88",
        "ojo": "\uD83D\uDC41\uFE0F",
        "nariz": "\uD83D\uDC43",
        "levantarse": "\uD83D\uDECC",
        "ducharse": "\uD83D\uDEBF",
        "escuchar": "\uD83D\uDC42",
        "sexo": "\uD83D\uDEBB",
        "nacer": "\uD83C\uDF7C",
        "crecer": "\uD83C\uDF31",
        "tener un hijo": "\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67",
        "morir": "\uD83D\uDC80",
        "simp\u00E1tico": "\uD83D\uDE0A",
        "antip\u00E1tico": "\uD83D\uDE20",
        "inteligente": "\uD83D\uDCA1",
        "trabajador": "\uD83D\uDC77",
        "alegre": "\uD83D\uDE04",
        "serio": "\uD83D\uDE10",
        "t\u00EDmido": "\uD83D\uDE33",
        "sociable": "\uD83E\uDD17",
        "estar triste": "\uD83D\uDE22",
        "estar contento": "\uD83D\uDE01",
        "estar enfadado": "\uD83D\uDE21",
        "estar nervioso": "\uD83D\uDE2C",
        "estar preocupado": "\uD83D\uDE1F",
        "gustar": "\uD83D\uDC4D",
        "encantar": "\u2764\uFE0F",
        "odiar": "\uD83D\uDC4E",
        "tener miedo": "\uD83D\uDE28",
        "tener calor": "\uD83E\uDD75",
        "tener fr\u00EDo": "\uD83E\uDD76",
        "tener sue\u00F1o": "\uD83D\uDE34",
        "tener sed": "\uD83D\uDCA7",
        "tener hambre": "\uD83C\uDF54",
        "tener dolor": "\uD83E\uDD15",
        "estar cansado": "\uD83D\uDE29",
        "doler la cabeza": "\uD83E\uDD2F",
        "doler el cuello": "\uD83E\uDDE3",
        "ver": "\uD83D\uDC40",
        "mirar": "\uD83E\uDD0E",
        "o\u00EDr": "\uD83D\uDC42",
        "ego\u00EDsta": "\uD83D\uDE4B\u200D\u2642\uFE0F",
        "tolerante": "\uD83D\uDE4F",
        "nombre": "\uD83D\uDC9B",
        "apellido": "\uD83D\uDCDD",
        "se\u00F1or": "\uD83D\uDC68\u200D\uD83D\uDCBC",
        "se\u00F1ora": "\uD83D\uDC69\u200D\uD83D\uDCBC",
        "firmar": "\u270D\uFE0F",
        "direcci\u00F3n": "\uD83C\uDFE0",
        "correo electr\u00F3nico": "\uD83D\uDCE7",
        "calle": "\uD83D\uDEDE\uFE0F",
        "plaza": "\u26F2",
        "piso": "\uD83C\uDFE2",
        "c\u00F3digo postal": "\uD83D\uDCEC",
        "casa": "\uD83C\uDFE1",
        "habitaci\u00F3n": "\uD83D\uDEAA",
        "pa\u00EDs": "\uD83C\uDF0D",
        "ciudad": "\uD83C\uDF06",
        "pueblo": "\uD83C\uDFE8",
        "m\u00F3vil": "\uD83D\uDCF1",
        "nacionalidad": "\uD83C\uDF10",
        "extranjero": "\uD83D\uDC7D",
        "espa\u00F1ol": "\uD83C\uDDEA\uD83C\uDDF8",
        "alem\u00E1n": "\uD83C\uDDE9\uD83C\uDDEA",
        "mexicano": "\uD83C\uDDF2\uD83C\uDDFD",
        "japon\u00E9s": "\uD83C\uDDEF\uD83C\uDDF5",
        "marroqu\u00ED": "\uD83C\uDDF2\uD83C\uDDE6",
        "edad": "\uD83C\uDF82",
        "ni\u00F1o": "\uD83D\uDC66",
        "joven": "\uD83E\uDDD1",
        "viejo": "\uD83D\uDC75",
        "hombre": "\uD83D\uDC68",
        "mujer": "\uD83D\uDC69",
        "estado civil": "\uD83D\uDC8D",
        "soltero": "\uD83E\uDDD1",
        "casado": "\u26AD",
        "separado": "\uD83D\uDC94",
        "pasaporte": "\uD83D\uDE82",
        "carn\u00E9 de identidad": "\uD83C\uDD94",
        "llaves": "\uD83D\uDD11",
        "cartera": "\uD83D\uDC5B",
        "bolso": "\uD83D\uDC5C",
        "maleta": "\uD83E\uDDF3",
        "reloj": "\u231A",
        "gafas": "\uD83D\uDC53",
        "ordenador": "\uD83D\uDCBB",
        "tarjeta de cr\u00E9dito": "\uD83D\uDCB3",
        "familia": "\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC66",
        "padres": "\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67",
        "padre": "\uD83D\uDC68",
        "madre": "\uD83D\uDC69",
        "hijo": "\uD83D\uDC66",
        "hermano": "\uD83E\uDDD1\u200D\uD83E\uDDD1",
        "abuelo": "\uD83D\uDC75",
        "primo": "\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66",
        "pareja": "\uD83D\uDC91",
        "amigo": "\uD83E\uDD17",
        "jefe": "\uD83D\uDC51",
        "fiesta": "\uD83C\uDF89",
        "desayuno": "\uD83E\uDD50",
        "comida": "\uD83C\uDF54",
        "cena": "\uD83C\uDF5D",
        "leche": "\uD83E\uDD5B",
        "t\u00E9": "\uD83C\uDF75",
        "caf\u00E9": "\u2615",
        "cerveza": "\uD83C\uDF7A",
        "vino": "\uD83C\uDF77",
        "beber": "\uD83E\uDD64",
        "carne": "\uD83E\uDD69",
        "pescado": "\uD83D\uDC1F",
        "fruta": "\uD83C\uDF4E",
        "verdura": "\uD83E\uDD66",
        "huevos": "\uD83E\uDD5A",
        "pan": "\uD83C\uDF5E",
        "hamburguesa": "\uD83C\uDF54",
        "sopa": "\uD83E\uDD63",
        "ensalada": "\uD83E\uDD57",
        "paella": "\uD83E\uDD58",
        "tortilla": "\uD83C\uDF73",
        "postre": "\uD83C\uDF70",
        "plato": "\uD83C\uDF7D\uFE0F",
        "vaso": "\uD83E\uDD5B",
        "taza": "\u2615",
        "botella": "\uD83C\uDF7E",
        "servilleta": "\uD83E\uDDFB",
        "bar": "\uD83C\uDF7B",
        "restaurante": "\uD83C\uDF7D\uFE0F",
        "camarero": "\uD83D\uDC68\u200D\uD83C\uDF73",
        "mesa": "\uD83E\uDEA6",
        "men\u00FA": "\uD83D\uDCDC",
        "cuenta": "\uD83E\uDDFE",
        "instituto": "\uD83C\uDFEB",
        "universidad": "\uD83C\uDF93",
        "clase": "\uD83D\uDC68\u200D\uD83C\uDFEB",
        "biblioteca": "\uD83D\uDCDA",
        "profesor": "\uD83D\uDC68\u200D\uD83C\uDFEB",
        "estudiante": "\uD83D\uDC68\u200D\uD83C\uDF93",
        "horario": "\uD83D\uDD52",
        "examen": "\uD83D\uDCDD",
        "aprender": "\uD83D\uDCA1",
        "estudiar": "\uD83D\uDCD6",
        "libro": "\uD83D\uDCD6",
        "diccionario": "\uD83D\uDCDA",
        "mapa": "\uD83D\uDDFA\uFE0F",
        "abogado": "\uD83D\uDC68\u200D\u2696\uFE0F",
        "m\u00E9dico": "\uD83D\uDC68\u200D\u2695\uFE0F",
        "taxista": "\uD83D\uDE95",
        "tienda": "\uD83C\uDFEA",
        "tel\u00E9fono": "\u260E\uFE0F",
        "trabajo": "\uD83D\uDCBC",
        "comprar": "\uD83D\uDED2",
        "vender": "\uD83D\uDCB0",
        "vacaciones": "\uD83C\uDFD6\uFE0F",
        "turista": "\uD83D\uDDFA\uFE0F",
        "viajar": "\u2708\uFE0F",
        "televisi\u00F3n": "\uD83D\uDCFA",
        "radio": "\uD83D\uDCFB",
        "pel\u00EDcula": "\uD83C\uDFAC",
        "m\u00FAsica": "\uD83C\uDFB6",
        "cantar": "\uD83C\uDFA4",
        "bailar": "\uD83D\uDC83",
        "correr": "\uD83C\uDFC3",
        "nadar": "\uD83C\uDFCA",
        "esquiar": "\u26F7\uFE0F",
        "f\u00FAtbol": "\u26BD",
        "baloncesto": "\uD83C\uDFC0",
        "tenis": "\uD83C\uDFBE",
        "juego": "\uD83C\uDFAE",
        "banco": "\uD83C\uDFE6",
        "dinero": "\uD83D\uDCB0",
        "hospital": "\uD83C\uDFE5",
        "polic\u00EDa": "\uD83D\uDC6E",
        "bombero": "\uD83D\uDE92",
        "pantalones": "\uD83D\uDC56",
        "falda": "\uD83D\uDC57",
        "camisa": "\uD83D\uDC55",
        "zapatos": "\uD83D\uDC5E",
        "precio": "\uD83D\uDCB2",
        "billete": "\uD83C\uDF9F\uFE0F",
        "estar enfermo": "\uD83E\uDD22",
        "farmacia": "\u2695\uFE0F",
        "jab\u00F3n": "\uD83E\uDDE4",
        "hotel": "\uD83C\uDFE8",
        "aeropuerto": "\u2708\uFE0F",
        "puerto": "\uD83D\uDEA2",
        "estaci\u00F3n de tren": "\uD83D\uDE89",
        "estaci\u00F3n de metro": "\uD83D\uDE87",
        "autob\u00FAs": "\uD83D\uDE8C",
        "avi\u00F3n": "\u2708\uFE0F",
        "barco": "\uD83D\uDEA2",
        "conductor": "\uD83D\uDC68\u200D\u2708\uFE0F",
        "coche": "\uD83D\uDE97",
        "taxi": "\uD83D\uDE95",
        "tren": "\uD83D\uDE86",
        "metro": "\uD83D\uDE87",
        "aparcamiento": "\uD83C\uDD7F\uFE0F",
        "garaje": "\uD83D\uDE97",
        "caro": "\uD83D\uDCB0",
        "barato": "\uD83E\uDE99",
        "ciencia": "\uD83D\uDD2C",
        "tecnolog\u00EDa": "\uD83D\uDCBB",
        "cient\u00EDfico": "\uD83D\uDD2C",
        "rey": "\uD83D\uDC51",
        "reina": "\uD83D\uDC78",
        "guerra": "\u2694\uFE0F",
        "paz": "\u262E\uFE0F",
        "cine": "\uD83C\uDFAC",
        "teatro": "\uD83C\uDFAD",
        "museo": "\uD83C\uDFAA",
        "exposici\u00F3n": "\uD83D\uDDBC\uFE0F",
        "edificio": "\uD83C\uDFE2",
        "monumento": "\uD83D\uDDFF",
        "catedral": "\u26EA",
        "iglesia": "\u26EA",
        "foto": "\uD83D\uDCF8",
        "actor": "\uD83C\uDFAD",
        "actriz": "\uD83C\uDFAD",
        "relig\u00ED\u00F3n": "\uD83D\uDD0C",
        "sol": "\u2600\uFE0F",
        "mar": "\uD83C\uDF0A",
        "r\u00EDo": "\uD83C\uDFDE\uFE0F",
        "primavera": "\uD83C\uDF38",
        "verano": "\u2600\uFE0F",
        "oto\u00F1o": "\uD83C\uDF42",
        "invierno": "\u2744\uFE0F",
        "llover": "\uD83C\uDF27\uFE0F",
        "nevar": "\uD83C\uDF28\uFE0F",
        "animal": "\uD83D\uDC3E",
        "planta": "\uD83C\uDF31",
        "flor": "\uD83C\uDF37"
    };

    function aplicarEmojiA1(palabra) {
        const emoji = emojiA1Map[palabra];
        return emoji ? `${palabra} ${emoji}` : palabra;
    }

    modoRadios.forEach(r => r.addEventListener('change', actualizarPalabrasInput));
    tooltipGrid.addEventListener('change', actualizarPalabrasInput);

    function actualizarPalabrasInput() {
        let modo = 'normal';
        modoRadios.forEach(r => { if (r.checked) modo = r.value; });
        const tam = parseInt(tooltipGrid.value) || tamanoActual;
        const total = tam * tam;
        if (modo === 'normal') {
            palabrasInput.disabled = true;
            palabrasInput.value = `${total} palabras seleccionadas al azar.`;
        } else if (modo === 'custom') {
            palabrasInput.disabled = false;
            palabrasInput.value = '';
            palabrasInput.placeholder = `Incluye ${total} palabras separadas por coma.`;
        } else {
            palabrasInput.disabled = false;
            palabrasInput.value = '';
            palabrasInput.placeholder = `Puedes añadir palabras opcionalmente para complementar las ${total} elegidas.`;
        }
    }


    const turnoTexto = document.getElementById('turno');
    const rojoRestantes = document.getElementById('rojoRestantes');
    const azulRestantes = document.getElementById('azulRestantes');
    const mensajeVictoria = document.getElementById('mensajeVictoria');

    // Permite cerrar el mensaje de victoria al hacer clic en él
    mensajeVictoria.addEventListener('click', (e) => {
        e.stopPropagation();
        mensajeVictoria.classList.add('oculto');
    });

    function colorearTitulo() {
        const titulo = document.querySelector('h1.eft2');
        const texto = titulo.textContent;
        titulo.innerHTML = '';
        [...texto].forEach(letra => {
            if (letra === ' ') {
                titulo.appendChild(document.createTextNode(' '));
            } else {
                const span = document.createElement('span');
                span.textContent = letra;
                titulo.appendChild(span);
            }
        });
    }

    let palabrasA1 = [];
    let palabrasA2 = [];
    let tamanoActual = 5; // tamaño por defecto del tablero
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
            tarjeta.textContent = aplicarEmojiA1(palabra);
            tarjeta.dataset.rol = roles[i];
            tarjeta.dataset.palabra = palabra;
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
        actualizarPalabrasInput();
    });

    comenzarJuegoBtn.addEventListener('click', () => {
        const nuevo = parseInt(tooltipGrid.value);
        nivelActual = nivelTooltip.value;
        let modo = 'normal';
        modoRadios.forEach(r => { if (r.checked) modo = r.value; });
        const palabrasBase = obtenerListaNivel(nivelActual);
        let ingresadas = [];
        if (modo !== 'normal') {
            ingresadas = palabrasInput.value.split(',').map(p => p.trim()).filter(p => p);
        }
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

    botonTabletMode.addEventListener('click', () => {
        tablero.classList.toggle('modo-tablet');
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

    /* --- Lógica para el Tooltip de Ayuda --- */
    const iconoAyuda = document.getElementById('icono-ayuda');
    const tooltipAyuda = document.getElementById('tooltip-ayuda');

    iconoAyuda.addEventListener('click', (event) => {
        event.stopPropagation();
        tooltipAyuda.classList.toggle('tooltip-oculto');
    });

    window.addEventListener('click', () => {
        if (!tooltipAyuda.classList.contains('tooltip-oculto')) {
            tooltipAyuda.classList.add('tooltip-oculto');
        }
    });

    tooltipAyuda.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    colorearTitulo();
    cargarPalabras().then(iniciarJuego);

});
