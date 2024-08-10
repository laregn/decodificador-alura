
const stylesheet = document.getElementById('stylesheet');
const imagemBn = document.getElementById('trocarEstilo');
const imagemPesonagem = document.getElementById('personagem');
const principalTextarea = document.getElementById("principal__textarea");
const btnCriptografar = document.getElementById("btn__criptografar");
const btnDescriptografar = document.getElementById("btn__descriptografar");
const resultadoText = document.getElementById("resultado__textarea");
const mensagem = document.getElementById("mensagem");
const resultado = document.getElementById("resultado");

const erroMenssagem = document.getElementById("principal__buttons__erro");

function trocarEstilo() { 
    if (imagemBn.src.includes('img/lua.png')) {
        // Se for a imagem original, troca para a segunda imagem
        imagemBn.src = 'img/sol.png';
        stylesheet.href = 'styles/style_escuro.css';
        imagemPesonagem.src = 'img/resultado_escuro.png';
    } else {
        // Se for a segunda imagem, troca de volta para a original
        imagemBn.src = 'img/lua.png';
        stylesheet.href = 'styles/style.css';
        imagemPesonagem.src = 'img/resultado.png';
    }
}

function mostrarMensagemVazio() {
    resultado.style.display = "none";
    mensagem.style.display = "flex";    
}

function showMessage(message) {
    resultado.style.display = "none";
    mensagem.style.display = "flex";
    erroMenssagem.innerText = message;
    erroMenssagem.style.opacity = 1;
    setTimeout(() => { erroMenssagem.style.opacity = 0 }, 2000);
}

function processText(processingFunction, successMessage) {
    const texto = principalTextarea.value;
    if (/[A-Z-À-Ú-à-ù]/.test(texto)) {
        showMessage("Apenas letras minúsculas e sem acento.");
    } else if (/[0-9]/.test(texto)) {
        showMessage("Infelizmente números não são permitidos.");
    } else if (/[@#$%¨&*]/.test(texto)) {
        showMessage("Caracteres especiais não são permitidos.");
    } else if (texto === '') {
        showMessage("Digite uma mensagem para criptografar.");
    } else {
        const processedText = processingFunction(texto);
        resultado.style.display = "flex";
        mensagem.style.display = "none";
        resultadoText.value = processedText;
    }

    principalTextarea.value = "";
}

btnCriptografar.addEventListener("click", () => {
    processText(criptografarTexto, "Texto criptografado com sucesso!");
});

btnDescriptografar.addEventListener("click", () => {
    processText(descriptografar, "Texto descriptografado com sucesso!");
});


function criptografarTexto(texto) {
    const textoCriptografado = texto
        .replace(/e/g, "enter")
        .replace(/i/g, "imes")
        .replace(/a/g, "ai")
        .replace(/o/g, "ober")
        .replace(/u/g, "ufat");
    return textoCriptografado;
}

function descriptografar(texto) {
    const textoDescriptografado = texto
        .replace(/enter/g, "e")
        .replace(/imes/g, "i")
        .replace(/ai/g, "a")
        .replace(/ober/g, "o")
        .replace(/ufat/g, "u");
    return textoDescriptografado;
}


function copiarParaAreaDeTranferencia() {
    const texto = document.getElementById("resultado__textarea").value;
    const mensagemCopiar = document.getElementById("mensagem_area_de_tranferencia");
    navigator.clipboard.writeText(texto).then(function () {
        mensagemCopiar.innerText = "Copiado para a área de transferência.";
        mensagemCopiar.style.opacity = 1;
        setTimeout(() => { mensagemCopiar.style.opacity = 0 }, 1000);
    }).catch(function (erro) {
        mensagemCopiar.innerText = "Erro ao copiar para a área de transferência.";
        mensagemCopiar.style.opacity = 1;
        setTimeout(() => { mensagemCopiar.style.opacity = 0 }, 1000);
    });
}