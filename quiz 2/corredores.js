const questoes = [
    {
        pergunta: "Para qual equipe Felix Rosenqvist pilotou na Fórmula E?",
        respostas: [
            { texto: "Audi Sport ABT", correto: false },
            { texto: "DS Techeetah", correto: false },
            { texto: "Mahindra Racing", correto: true },
            { texto: "Jaguar Racing", correto: false }
        ]
    },
    {
        pergunta: "Quando e onde ocorreu uma das vitórias mais memoráveis de Felix Rosenqvist?",
        respostas: [
            { texto: "15 de agosto de 2018, em Paris", correto: false },
            { texto: "10 de junho de 2017, em Berlim", correto: true },
            { texto: "23 de setembro de 2016, em Nova Iorque", correto: false },
            { texto: "5 de dezembro de 2019, em Londres", correto: false }
        ]
    },
    {
        pergunta: "Quem conquistou o título da Fórmula E duas vezes?",
        respostas: [
            { texto: "Lucas di Grassi", correto: false },
            { texto: "Sébastien Buemi", correto: false },
            { texto: "Jean-Éric Vergne", correto: true },
            { texto: "Felix Rosenqvist", correto: false }
        ]
    },
    {
        pergunta: "Qual ex-piloto de Fórmula 1 também é campeão mundial de endurance e competiu na Fórmula E?",
        respostas: [
            { texto: "Jean-Éric Vergne", correto: false },
            { texto: "Sébastien Buemi", correto: true },
            { texto: "Lucas di Grassi", correto: false },
            { texto: "Nelson Piquet Jr.", correto: false }
        ]
    },
    {
        pergunta: "Quem venceu a temporada 2015-16 da Fórmula E?",
        respostas: [
            { texto: "Jean-Éric Vergne", correto: false },
            { texto: "Lucas di Grassi", correto: false },
            { texto: "Sébastien Buemi", correto: true },
            { texto: "Sam Bird", correto: false }
        ]
    },
    {
        pergunta: "Que hobby Sébastien Buemi utiliza para relaxar antes das corridas?",
        respostas: [
            { texto: "Pintura", correto: false },
            { texto: "Tocar violão", correto: true },
            { texto: "Cozinhar", correto: false },
            { texto: "Ler livros", correto: false }
        ]
    },
    {
        pergunta: "A que idade Felipe Massa começou sua carreira no kart?",
        respostas: [
            { texto: "Seis anos", correto: false },
            { texto: "Oito anos", correto: true },
            { texto: "Dez anos", correto: false },
            { texto: "Doze anos", correto: false }
        ]
    },
    {
        pergunta: "Qual foi a conquista de Nelson Piquet Jr. na Fórmula E?",
        respostas: [
            { texto: "Campeão da temporada 2015-16", correto: false },
            { texto: "Vice-campeão da temporada 2016-17", correto: false },
            { texto: "Campeão da temporada inaugural", correto: true },
            { texto: "Terceiro colocado na temporada 2018-19", correto: false }
        ]
    },
    {
        pergunta: "Qual piloto representa Portugal na Fórmula E?",
        respostas: [
            { texto: "Nelson Piquet Jr.", correto: false },
            { texto: "Sam Bird", correto: false },
            { texto: "António Félix da Costa", correto: true },
            { texto: "Lucas di Grassi", correto: false }
        ]
    },
    {
        pergunta: "Em qual temporada António Félix da Costa conquistou o título da Fórmula E?",
        respostas: [
            { texto: "2014-15", correto: false },
            { texto: "2016-17", correto: false },
            { texto: "2019-20", correto: true },
            { texto: "2018-19", correto: false }
        ]
    },
    {
        pergunta: "Quem foi o primeiro campeão da Fórmula E?",
        respostas: [
            { texto: "Sam Bird", correto: false },
            { texto: "Sébastien Buemi", correto: false },
            { texto: "Lucas di Grassi", correto: false },
            { texto: "Nelson Piquet Jr.", correto: true }
        ]
    },
    {
        pergunta: "Qual é a nacionalidade de Nelson Piquet Jr.?",
        respostas: [
            { texto: "Brasileiro", correto: true },
            { texto: "Argentino", correto: false },
            { texto: "Espanhol", correto: false },
            { texto: "Italiano", correto: false }
        ]
    },
    {
        pergunta: "Qual piloto britânico é conhecido por sua consistência e velocidade na Fórmula E?",
        respostas: [
            { texto: "António Félix da Costa", correto: false },
            { texto: "Jean-Éric Vergne", correto: false },
            { texto: "Sam Bird", correto: true },
            { texto: "Alexander Sims", correto: false }
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