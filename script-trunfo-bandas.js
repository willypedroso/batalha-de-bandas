// Declaração de bandas

class banda {
	constructor(nome, imagem, peso, tecnica, velocidade) {
		this.nome = nome;
		this.imagem = imagem;
		this.carta = `<div class="carta"><p class="nome">${nome}</p><img src="${imagem}"><div class="atributos"><input type="radio" name="atributo" value="peso" checked=""> peso: ${peso}<br><input type="radio" name="atributo" value="tecnica" checked=""> tecnica: ${tecnica}<br><input type="radio" name="atributo" value="velocidade" checked=""> velocidade: ${velocidade}<br></div></div>`;
		this.atributos = {
			peso: peso,
			tecnica: tecnica,
			velocidade: velocidade
		};
	}
}

var banda1 = new banda(
	"Sepultura",
	"imagens/sepultura.jpg",
	8,
	6,
	6
);

var banda2 = new banda(
	"Ratos de Porão",
	"imagens/ratos-de-porao.jpg",
	7,
	5,
	8
);

var banda3 = new banda(
	"Korzus",
	"imagens/korzus.jpg",
	8,
	7,
	7
);

var banda4 = new banda(
	"Krisiun",
	"imagens/krisiun.jpg",
	10,
	8,
	9
);

var banda5 = new banda(
	"Angra",
	"imagens/angra.jpg",
	6,
	10,
	7
);

// Para adicionar nova banda:
// Crie nova variável com nome bandaN logo acima
// Neste variável defina nome, imagem e atributos
// Certifique-se de ter na pasta imagens a imagem referente à banda adicionada
// Adicione à variável no array bandas logo abaixo

var bandas = [banda1, banda2, banda3, banda4, banda5];

// Fim da declaração de bandas

var bandaMaquina;
var bandaJogador;

var somRoleta = document.getElementById("somRoleta");
var somVitoria = document.getElementById("somVitoria");
var somErro = document.getElementById("somErro");

function sortearBanda() {
	somRoleta.play();
	document.getElementById("opcoes").innerHTML = "";
	document.getElementById("resultado").innerHTML = "";
	var numeroBandaMaquina = parseInt(Math.random() * bandas.length);
	var numeroBandaJogador = parseInt(Math.random() * bandas.length);
	
	while (numeroBandaJogador == numeroBandaMaquina) {
		numeroBandaJogador = parseInt(Math.random() * bandas.length);
	}
	
	bandaMaquina = bandas[numeroBandaMaquina];
	bandaJogador = bandas[numeroBandaJogador];
	
	document.getElementById("btnSortear").disabled = true;
	
	somRoleta.onplay = iniciar(numeroBandaJogador, numeroBandaMaquina);
}
function iniciar(numeroBandaJogador, numeroBandaMaquina) {
	var loop;
	var indice = 0;
	loop = setInterval(function () {
		if (indice >= bandas.length) {
			indice = 0;
		}
		document.getElementById("opcoes").innerHTML = bandas[indice].carta;
		indice++;
	}, 50);
	somRoleta.onended = function () {
		clearInterval(loop);
		document.getElementById("opcoes").innerHTML = "";
		document.getElementById("btnJogar").disabled = false;
		exibirOpcoes(bandas[numeroBandaJogador].nome);
	};
	setTimeout(function () {
		clearInterval(loop);
		document.getElementById("opcoes").innerHTML = "";
		document.getElementById("btnJogar").disabled = false;
		document.getElementById("orientacao").style.display = "block";
		document.getElementById("orientacao").style.marginTop = "20px";
		document.getElementById("orientacao").style.fontSize = "1.5rem";
		document.getElementById("orientacao").style.textShadow = "2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000";
		exibirOpcoes(bandas[numeroBandaJogador].nome);
	}, 5000);
}
function exibirOpcoes(banda) {
	var opcoes = document.getElementById("opcoes");
	var divAtributos = "<div class='atributos'>";
	let i = 0;
	
	for (var atributo in bandaJogador.atributos) {
		i++;
		divAtributos += `<label for="name${i}"><input type="radio" name="atributo" id="name${i}" value=${atributo} checked> ${atributo}: ${bandaJogador.atributos[atributo]}</label><br>`;
	}
	divAtributos.innerHTML += "</div>";

	var cartaBanda = `<div class="carta"><p class="nome">${banda}</p>`;

	switch (banda) {
		case "Sepultura":
			cartaBanda += `<img src="${banda1.imagem}">${divAtributos}</div>`;
			opcoes.innerHTML += cartaBanda;
			break;

		case "Ratos de Porão":
			cartaBanda += `<img src="${banda2.imagem}">${divAtributos}</div>`;
			opcoes.innerHTML += cartaBanda;
			break;

		case "Korzus":
			cartaBanda += `<img src="${banda3.imagem}">${divAtributos}</div>`;
			opcoes.innerHTML += cartaBanda;
			break;
		case "Krisiun":
			cartaBanda += `<img src="${banda4.imagem}">${divAtributos}</div>`;
			opcoes.innerHTML += cartaBanda;
			break;
		case "Angra":
			cartaBanda += `<img src="${banda5.imagem}">${divAtributos}</div>`;
			opcoes.innerHTML += cartaBanda;
			break;
	}
}

function obtemAtributoSelecionado() {
	var radioAtributos = document.getElementsByName("atributo");

	for (var i = 0; i < radioAtributos.length; i++) {
		if (radioAtributos[i].checked) {
			return radioAtributos[i].value;
		}
	}
}

function jogar() {
	document.getElementById("btnSortear").disabled = false;
	document.getElementById("btnJogar").disabled = true;
	var atributoSelecionado = obtemAtributoSelecionado();
	var elementoResultado = document.getElementById("resultado");

	var valorBandaJogador = bandaJogador.atributos[atributoSelecionado];
	var valorBandaMaquina = bandaMaquina.atributos[atributoSelecionado];

	var textoElemento = `<span><p>${bandaJogador.nome}</p><img src="${bandaJogador.imagem}"><p>${atributoSelecionado}: ${valorBandaJogador}</p></span><span class="vs">VS</span><span><p>${bandaMaquina.nome}</p><img src="${bandaMaquina.imagem}"><p>${atributoSelecionado}: ${valorBandaMaquina}</p></span>`;

	if (valorBandaJogador > valorBandaMaquina) {
		somVitoria.play();
		elementoResultado.innerHTML = "<p>Você venceu!!</p>" + textoElemento;
	} else if (valorBandaJogador < valorBandaMaquina) {
		somErro.play();
		elementoResultado.innerHTML = "<p>Você perdeu :(</p>" + textoElemento;
	} else {
		somErro.play();
		elementoResultado.innerHTML = "<p>Empatou!!</p>" + textoElemento;
	}
}
