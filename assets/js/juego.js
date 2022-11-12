const nuevoJuego = (() => {
  'use strict'

  let deck = [],
    puntosJugadores = [];

  const specialCard = ['A', 'J', 'Q', 'K'],
    typeCard = ['C', 'D', 'H', 'S'],
    pedir = document.querySelector('#btnPedir'),
    quedarse = document.querySelector('#quedarse'),
    nuevoJuego = document.querySelector('#nuevoJuego'),
    puntaje = document.querySelectorAll('small'),
    divCartas = document.querySelectorAll('.divCartas');

  const inicializarJuego = (numJugadores = 2) => {
    deck = crearDeck();

    puntosJugadores = [];
    for (let i = 0; i < numJugadores; i++) {

      puntosJugadores.push(0);
    }

    divCartas.forEach(item => item.innerText = '');
    puntaje.forEach(item => item.innerText = 0);

    pedir.disabled = false;
    quedarse.disabled = false;
  }

  const crearDeck = () => {
    for(let i = 2; i <= 10; i++) {
      for(let type of typeCard) {
        deck.push( i + type);
      }
    }

    for(let type of typeCard) {
      for(let especial of specialCard) {
        deck.push(especial + type);
      }
    }

    deck = deck.concat(deck, deck, deck);
    deck = _.shuffle(deck);

    return deck;
  }

  const pedirCarta = () => {

    if(deck.length === 0) throw 'No hay mas cartas';

    return deck.pop();
  }

  const valorCarta = (card) => {
    const valor = card.substring(0, card.length - 1);

    return (isNaN(valor))
      ? ((valor === 'A')
        ? 11
        :10)
      : (valor *1);

  }

  const acumularPuntos = (carta, turno) => {
    puntosJugadores[turno] += valorCarta(carta);
    puntaje[turno].innerText = puntosJugadores[turno];

    return puntosJugadores[turno];
  }

  const showCard = (carta, turno) => {

    const imagenCartaComputadora = document.createElement('img');
    imagenCartaComputadora.src = `assets/cartas/${carta}.png`;
    imagenCartaComputadora.alt = carta;
    imagenCartaComputadora.classList.add('carta');

    divCartas[turno].append(imagenCartaComputadora);
  }

  const showWinner = () => {
    const [minimoValor, puntosComputadora] = puntosJugadores;

    setTimeout(() => {
      (puntosComputadora <=21)
        ? (puntosComputadora > minimoValor
          ? alert('Gano el Computador')
          : (puntosComputadora === minimoValor)
            ? window.alert('Empate!!')
            : (minimoValor <= 21 || alert('Te pasaste!!')) )
        : alert("Gano Jugador")
    }, 200)
  }


  const juegoComputadora = (minimoValor) => {

    let puntosComputadora = 0;
    do {
      const carta = pedirCarta();
      puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
      showCard(carta, puntosJugadores.length - 1);

    } while ((puntosComputadora <= minimoValor || puntosComputadora < 17) && minimoValor <= 21)

    showWinner();
  }

  pedir.addEventListener('click', () => {
    const carta = pedirCarta();

    const puntosJugador = acumularPuntos(carta, 0);

    showCard(carta, 0);

    if (puntosJugador > 21) {
      pedir.disabled = true;
      quedarse.disabled = true;
      juegoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
      pedir.disabled = true;
      quedarse.disabled = true;
      juegoComputadora(puntosJugador);
    }

  });

  quedarse.addEventListener('click', () => {
    if (puntosJugadores[0] > 0) {
      juegoComputadora(puntosJugadores[0]);
      pedir.disabled = true;
      quedarse.disabled = true;
    } else {
      alert('Debe pedir al menos una carta');
    }
  });

  nuevoJuego.addEventListener('click', () => {

    inicializarJuego();
  });

  return {
    nuevoJuego: inicializarJuego
  }
})()



