const questoes = [
    {
        pergunta: "Qual é uma característica única dos carros da Fórmula E em relação à poluição sonora?",
        respostas: [
            { texto: "Eles emitem um rugido alto.", correto: false },
            { texto: "Eles emitem um som parecido com o de um carro convencional.", correto: false },
            { texto: "Eles emitem um som suave, mas ainda audível.", correto: false },
            { texto: "Eles deslizam suavemente sem emitir poluição sonora.", correto: true }
        ]
    },
    {
        pergunta: "Como os pilotos da Fórmula E lidam com a troca de carros durante a corrida?",
        respostas: [
            { texto: "Eles não trocam de carro.", correto: false },
            { texto: "Eles trocam de carro no meio da prova.", correto: true },
            { texto: "Eles trocam de carro apenas no final da corrida.", correto: false },
            { texto: "Eles trocam de carro a cada volta.", correto: false }
        ]
    },
    {
        pergunta: "Onde as pistas da Fórmula E geralmente são localizadas?",
        respostas: [
            { texto: "No meio de desertos.", correto: false },
            { texto: "Em locais urbanos icônicos ao redor do mundo.", correto: true },
            { texto: "Em circuitos fechados apenas para corridas de Fórmula E.", correto: false },
            { texto: "Em áreas rurais distantes das cidades.", correto: false }
        ]
    },
    {
        pergunta: "O que a Fórmula E representa além das corridas?",
        respostas: [
            { texto: "Apenas entretenimento esportivo.", correto: false },
            { texto: "Um exemplo de como os carros elétricos são lentos e pouco eficientes.", correto: false },
            { texto: "Uma forma de entretenimento para entusiastas de carros.", correto: false },
            { texto: "Um campo de testes para a inovação e desenvolvimento de tecnologias automotivas sustentáveis.", correto: true },
        ]
    },
    {
        pergunta: "Como a Fórmula E envolve os fãs usando tecnologias de realidade virtual e aumentada?",
        respostas: [
            { texto: "Permitindo que eles se coloquem virtualmente no cockpit dos carros.", correto: true },
            { texto: "Permitindo que eles assistam às corridas em uma tela grande.", correto: false },
            { texto: "Não há envolvimento dos fãs através dessas tecnologias.", correto: false },
            { texto: "Transmitindo as corridas em 3D para TVs.", correto: false }
        ]
    },
    {
        pergunta: "O que é o 'FanBoost' na Fórmula E?",
        respostas: [
            { texto: "Um sistema de climatização para os fãs durante as corridas.", correto: false },
            { texto: "Um fenômeno que dá aos fãs o poder de influenciar diretamente o resultado das corridas.", correto: true },
            { texto: "Um dispositivo de segurança para os pilotos durante as corridas.", correto: false },
            { texto: "Um sistema para aumentar a potência dos motores automaticamente.", correto: false }
        ]
    },
    {
        pergunta: "Qual é a função dos sistemas de recuperação de energia cinética nos carros da Fórmula E?",
        respostas: [
            { texto: "Converter energia elétrica em energia cinética.", correto: false },
            { texto: "Aumentar a potência dos motores durante as corridas.", correto: false },
            { texto: "Converter energia cinética em energia elétrica.", correto: true },
            { texto: "Armazenar energia para uso posterior.", correto: false }
        ]
    },
    {
        pergunta: "Como a Fórmula E demonstra seu compromisso com a sustentabilidade além das corridas?",
        respostas: [
            { texto: "Minimizando as emissões de carbono durante os eventos.", correto: true },
            { texto: "Aumentando o uso de plástico de uso único.", correto: false },
            { texto: "Ignorando práticas ecológicas em suas operações.", correto: false },
            { texto: "Usando apenas carros elétricos de segunda mão.", correto: false }
        ]
    },
    {
        pergunta: "O que os carros da Fórmula E são em termos de tecnologia?",
        respostas: [
            { texto: "Apenas veículos de corrida.", correto: false },
            { texto: "Laboratórios ambulantes de tecnologia.", correto: true },
            { texto: "Veículos convencionais sem avanços tecnológicos.", correto: false },
            { texto: "Carros com tecnologia obsoleta.", correto: false }
        ]
    },
    {
        pergunta: "Qual é o principal objetivo do texto sobre a Fórmula E?",
        respostas: [
            { texto: "Informar sobre os eventos da Fórmula E.", correto: false },
            { texto: "Criticar as práticas da Fórmula E em relação ao meio ambiente.", correto: false },
            { texto: "Promover outras categorias de corrida.", correto: false },
            { texto: "Destacar os aspectos únicos e inovadores da Fórmula E.", correto: true },
        ]
    },
    {
        pergunta: "Como as paradas nos boxes na Fórmula E diferem de outras categorias de corrida?",
        respostas: [
            { texto: "Elas não existem na Fórmula E.", correto: false },
            { texto: "Os pilotos trocam de carro durante as paradas nos boxes.", correto: true },
            { texto: "Os pilotos apenas ajustam a pressão dos pneus durante as paradas nos boxes.", correto: false },
            { texto: "Os pilotos mudam de pneus durante as paradas nos boxes.", correto: false }
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