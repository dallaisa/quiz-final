const questoes = [
    {
        pergunta: "Onde acontecem as corridas da Fórmula E?",
        respostas: [
            { texto: "Em circuitos de corrida tradicionais", correto: false },
            { texto: "Em estradas rurais", correto: false },
            { texto: "Em circuitos urbanos", correto: true },
            { texto: "Em desertos remotos", correto: false }
        ]
    },
    {
        pergunta: "Como são os motores da Fórmula E em comparação com os motores de carros a combustão?",
        respostas: [
            { texto: "Produzem um rugido alto", correto: false },
            { texto: "Emitir fumaça", correto: false },
            { texto: "Silenciosos, com um zumbido suave", correto: true },
            { texto: "Ineficientes", correto: false }
        ]
    },
    {
        pergunta: "O que os pilotos da Fórmula E precisam monitorar de perto durante as corridas?",
        respostas: [
            { texto: "Pressão dos pneus", correto: false },
            { texto: "Temperatura do motor", correto: false },
            { texto: "Uso de energia de suas baterias", correto: true },
            { texto: "Consumo de combustível", correto: false }
        ]
    },
    {
        pergunta: "Como é determinado o término das corridas da Fórmula E?",
        respostas: [
            { texto: "Por um número fixo de voltas", correto: false },
            { texto: "Quando o último piloto cruza a linha de chegada", correto: false },
            { texto: "Por uma duração fixa de tempo", correto: true },
            { texto: "Quando o primeiro piloto completa 100 km", correto: false }
        ]
    },
    {
        pergunta: "O que os pilotos podem ativar para obter um impulso extra de potência durante a corrida?",
        respostas: [
            { texto: "Turbo", correto: false },
            { texto: "Nitro", correto: false },
            { texto: "Modo de Ataque", correto: true },
            { texto: "Modo de Defesa", correto: false }
        ]
    },
    {
        pergunta: "Como os fãs podem influenciar diretamente o resultado das corridas na Fórmula E?",
        respostas: [
            { texto: "Comprando bilhetes para o evento", correto: false },
            { texto: "Através de votação no FanBoost", correto: true },
            { texto: "Compartilhando postagens nas redes sociais", correto: false },
            { texto: "Comprando mercadorias da equipe", correto: false }
        ]
    },
    {
        pergunta: "Onde geralmente ocorrem as corridas da Fórmula E?",
        respostas: [
            { texto: "Em circuitos permanentes", correto: false },
            { texto: "Em pistas de terra batida", correto: false },
            { texto: "Em circuitos temporários montados em ruas urbanas", correto: true },
            { texto: "Em pistas de gelo", correto: false }
        ]
    },
    {
        pergunta: "Que tecnologia é introduzida para proteger os pilotos na Fórmula E?",
        respostas: [
            { texto: "Airbags", correto: false },
            { texto: "Sistemas de tração nas quatro rodas", correto: false },
            { texto: "Halo", correto: true },
            { texto: "Pneus reforçados", correto: false }
        ]
    },
    {
        pergunta: "Como são os pneus usados na Fórmula E em comparação com outras categorias de automobilismo?",
        respostas: [
            { texto: "Mais largos", correto: false },
            { texto: "Mais estreitos", correto: true },
            { texto: "Semelhantes em tamanho", correto: false },
            { texto: "Feitos de materiais diferentes", correto: false }
        ]
    },
    {
        pergunta: "Além de gerenciar o uso de energia, como os pilotos da Fórmula E podem recuperar energia durante a corrida?",
        respostas: [
            { texto: "Através de postos de recarga", correto: false },
            { texto: "Por meio de reboque por outro veículo", correto: false },
            { texto: "Usando painéis solares no carro", correto: false },
            { texto: "Através de zonas de regeneração de energia", correto: true }
        ]
    },
    {
        pergunta: "Por que os carros da Fórmula E são conhecidos?",
        respostas: [
            { texto: "Pela velocidade máxima", correto: false },
            { texto: "Pela autonomia da bateria", correto: false },
            { texto: "Pela rápida aceleração", correto: true },
            { texto: "Pela capacidade de carga rápida", correto: false }
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