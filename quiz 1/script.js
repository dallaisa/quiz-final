const questoes = [
    {
        pergunta: "Qual é uma característica interessante dos motores dos carros da Fórmula E?",
        respostas: [
            { texto: "Eles consomem muita energia.", correto: false },
            { texto: "Eles entregam todo o torque instantaneamente.", correto: true },
            { texto: "Eles são movidos a gasolina.", correto: false },
            { texto: "Eles não têm aceleração rápida.", correto: false }
        ]
    },
    {
        pergunta: "O que ajuda os carros da Fórmula E a cortar o ar como uma flecha?",
        respostas: [
            { texto: "Seus motores a combustão.", correto: false },
            { texto: "Seus pneus grandes.", correto: false },
            { texto: "Seu design elegante e aerodinâmico.", correto: true },
            { texto: "Seu peso leve.", correto: false }
        ]
    },
    {
        pergunta: "Qual é a velocidade média que os carros da Fórmula E podem atingir?",
        respostas: [
            { texto: "100 km/h", correto: false },
            { texto: "150 km/h", correto: false },
            { texto: "200 km/h", correto: true },
            { texto: "250 km/h", correto: false }
        ]
    },
    {
        pergunta: "Qual dos seguintes fabricantes de automóveis está participando ativamente na Fórmula E?",
        respostas: [
            { texto: "Ferrari", correto: false },
            { texto: "Mercedes-Benz", correto: true },
            { texto: "Toyota", correto: false },
            { texto: "Honda", correto: false }
        ]
    },
    {
        pergunta: "O que é utilizado nos pneus da Fórmula E para torná-los mais sustentáveis?",
        respostas: [
            { texto: "Plástico reciclado", correto: false },
            { texto: "Óleo de laranja e borracha natural", correto: true },
            { texto: "Algodão", correto: false },
            { texto: "Fibra de vidro", correto: false }
        ]
    },
    {
        pergunta: "Os E-Prix são corridas emocionantes da Fórmula E que acontecem em diferentes cidades ao redor do mundo. Verdadeiro ou Falso?",
        respostas: [
            { texto: "Verdadeiro", correto: true },
            { texto: "Falso", correto: false }
        ]
    },
    {
        pergunta: "Os carros da Fórmula E são projetados para serem pesados e resistentes. Verdadeiro ou Falso?",
        respostas: [
            { texto: "Verdadeiro", correto: false },
            { texto: "Falso", correto: true }
        ]
    },
    {
        pergunta: "As corridas da Fórmula E são apenas sobre velocidade e não têm impacto social significativo. Verdadeiro ou Falso?",
        respostas: [
            { texto: "Verdadeiro", correto: false },
            { texto: "Falso", correto: true }
        ]
    },
    {
        pergunta: "Durante as corridas noturnas da Fórmula E, a visibilidade é reduzida, exigindo que os pilotos ajustem suas técnicas de condução. Verdadeiro ou Falso?",
        respostas: [
            { texto: "Verdadeiro", correto: true },
            { texto: "Falso", correto: false }
        ]
    },
    {
        pergunta: "As corridas da Fórmula E nunca enfrentam desafios climáticos, pois todas acontecem em condições ideais. Verdadeiro ou Falso?",
        respostas: [
            { texto: "Verdadeiro", correto: false },
            { texto: "Falso", correto: true }
        ]
    },
    {
        pergunta: "Em quais cidades mencionadas no texto os E-Prix acontecem, proporcionando uma experiência única tanto para pilotos quanto para fãs?",
        respostas: [
            { texto: "Marrakesh, Berlim, Paris e Grécia.", correto: false },
            { texto: "Nova York, Rio de Janeiro, Sydney e Tóquio.", correto: false },
            { texto: "Nova York, Marrakesh, Berlim e Roma.", correto: true },
            { texto: "Noruega, Paris, Berlim e Roma.", correto: false }
        ]
    }
];

const elementoPergunta = document.getElementById('pergunta');
const elementoBotoesResposta = document.getElementById('botoes-resposta');
const botaoProxima = document.getElementById('btn-proxima');
const caixaPontuacao = document.getElementById('caixa-pontuacao');
const elementoPontuacao = document.getElementById('pontuacao');
const elementoTemporizador = document.getElementById('temporizador');

let indicePerguntaAtual = 0;
let pontuacao = 0;
let tempoRestante = 60;
let intervaloTemporizador;

function iniciarQuiz() {
    indicePerguntaAtual = 0;
    pontuacao = 0;
    tempoRestante = 60;
    botaoProxima.classList.add('escondido');
    caixaPontuacao.classList.add('escondido');
    mostrarPergunta(questoes[indicePerguntaAtual]);
    iniciarTemporizador();
}

function mostrarPergunta(pergunta) {
    resetarEstado();
    elementoPergunta.innerText = pergunta.pergunta;
    pergunta.respostas.forEach(resposta => {
        const botao = document.createElement('button');
        botao.innerText = resposta.texto;
        botao.classList.add('btn');
        botao.addEventListener('click', () => selecionarResposta(botao, resposta.correto));
        elementoBotoesResposta.appendChild(botao);
    });
}

function resetarEstado() {
    limparClasseStatus();
    while (elementoBotoesResposta.firstChild) {
        elementoBotoesResposta.removeChild(elementoBotoesResposta.firstChild);
    }
}

function selecionarResposta(botao, correto) {
    if (correto) {
        botao.classList.add('correto');
        pontuacao++;
    } else {
        botao.classList.add('incorreto');
    }
    Array.from(elementoBotoesResposta.children).forEach(btn => {
        btn.disabled = true;
        if (questoes[indicePerguntaAtual].respostas.find(a => a.texto === btn.innerText).correto) {
            btn.classList.add('correto');
        }
    });
    botaoProxima.classList.remove('escondido');
    clearInterval(intervaloTemporizador);
    botaoProxima.addEventListener('click', proximaPergunta);
}

function proximaPergunta() {
    indicePerguntaAtual++;
    if (indicePerguntaAtual < questoes.length) {
        mostrarPergunta(questoes[indicePerguntaAtual]);
        iniciarTemporizador();
        botaoProxima.classList.add('escondido');
        botaoProxima.removeEventListener('click', proximaPergunta);
    } else {
        mostrarPontuacao();
    }
}

function limparClasseStatus() {
    botaoProxima.classList.add('escondido');
    elementoTemporizador.innerText = `Tempo: ${tempoRestante}`;
}

function mostrarPontuacao() {
    caixaPontuacao.classList.remove('escondido');
    elementoPontuacao.innerText = `Você acertou ${pontuacao} de ${questoes.length} perguntas!`;
}

function iniciarTemporizador() {
    tempoRestante = 60;
    elementoTemporizador.innerText = `Tempo: ${tempoRestante}`;
    intervaloTemporizador = setInterval(() => {
        tempoRestante--;
        elementoTemporizador.innerText = `Tempo: ${tempoRestante}`;
        if (tempoRestante <= 0) {
            clearInterval(intervaloTemporizador);
            botaoProxima.classList.remove('escondido');
            Array.from(elementoBotoesResposta.children).forEach(btn => {
                btn.disabled = true;
                if (questoes[indicePerguntaAtual].respostas.find(a => a.texto === btn.innerText).correto) {
                    btn.classList.add('correto');
                }
            });
        }
    }, 1000);
}

document.addEventListener('DOMContentLoaded', iniciarQuiz);