console.log('[MarcelinoFalcão] Flappy Bird');
let frame = 0;
const som_Hit = new Audio();
som_Hit.src = './efeitos/hit.wav'

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');
const globais = {};

const planoDeFundo = {

    spritesX: 390,
    spritesY: 0,
    largura: 276,
    altura: 204,
    x: 0,
    y: canvas.height - 204,

    desenha(){
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0, 0, canvas.width, canvas.height);
        contexto.drawImage(
            sprites,
            planoDeFundo.spritesX,planoDeFundo.spritesY, //sprites x e y
            planoDeFundo.largura,planoDeFundo.altura, //tamanho recorte
            planoDeFundo.x,planoDeFundo.y, //posicao dentro do canvas
            planoDeFundo.largura,planoDeFundo.altura, //tamanho dentro do canvas
        
        );
        contexto.drawImage(
            sprites,
            planoDeFundo.spritesX,planoDeFundo.spritesY, //sprites x e y
            planoDeFundo.largura,planoDeFundo.altura, //tamanho recorte
            (planoDeFundo.x + planoDeFundo.altura),planoDeFundo.y, //posicao dentro do canvas
            planoDeFundo.largura,planoDeFundo.altura, //tamanho dentro do canvas
        
        );
    }

}

function criaChao(){
    const chao = {

        spritesX: 0,
        spritesY: 610,
        largura: 224,
        altura: 112,
        x: 0,
        y: canvas.height - 112,
        atualiza(){
            const movimentoDoChao = 1;
            chao.x = chao.x - movimentoDoChao;
            if(((canvas.width - chao.largura) + chao.x) == 0){
                chao.x = 0; 
            }
        },
        desenha(){
            contexto.drawImage(
                sprites,
                chao.spritesX,chao.spritesY, //sprites x e y
                chao.largura,chao.altura, //tamanho recorte
                chao.x,chao.y, //posicao dentro do canvas
                chao.largura,chao.altura, //tamanho dentro do canvas
            
            );

            contexto.drawImage(
                sprites,
                chao.spritesX,chao.spritesY, //sprites x e y
                chao.largura,chao.altura, //tamanho recorte
                (chao.x + chao.largura),chao.y, //posicao dentro do canvas
                chao.largura,chao.altura, //tamanho dentro do canvas
            
            );
        }

    } 
    return chao;
}

function fazColisao(flappyBird, chao){
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y;

    if(flappyBirdY >= chaoY){
        return true;
    }

    return false;
}

function criaFlappyBird(){
    const flappyBird = {

        spritesX: 0,
        spritesY: 0,
        largura: 34,
        altura: 24,
        x: 10,
        y: 50,
        pulo: 4.6,
        pula(){
            flappyBird.velocidade = - flappyBird.pulo;
        },
        gravidade: 0.25,
        velocidade: 0,
        atualiza(){
    
            if(fazColisao(flappyBird, globais.chao)){
                som_Hit.play();
                setTimeout(() => {
                    mudaParaTela(Telas.INICIO);
                },450);
                
                return;
            }
    
            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
        },
        movimentos: [
            {spritesX:0, spritesY: 0,}, //cima
            {spritesX:0, spritesY: 26,}, //meio
            {spritesX:0, spritesY: 52,}, //baixo
        ],
        frameAtual: 0,
        atualizaOFrameAtual(){
            const intervaloDeFrames = 10;
            const passouOIntervalo = frame % intervaloDeFrames === 0;

            if(passouOIntervalo){
                const baseDoIncremento =1;
                const incremento = baseDoIncremento + flappyBird.frameAtual;
                const baseRepeticao = flappyBird.movimentos.length;
                flappyBird.frameAtual = incremento % baseRepeticao;
            }
            
        },
        desenha(){
            flappyBird.atualizaOFrameAtual();
            const { spritesX, spritesY} = flappyBird.movimentos[flappyBird.frameAtual];
            contexto.drawImage(
                sprites,
                spritesX, spritesY, //sprites x e y
                flappyBird.largura,flappyBird.altura, //tamanho recorte
                flappyBird.x,flappyBird.y, //posicao dentro do canvas
                flappyBird.largura,flappyBird.altura, //tamanho dentro do canvas
            
            );
        }
    
    }
    return flappyBird;
}

const mensagemGetReady = {

    spritesX: 134,
    spritesY: 0,
    largura: 174,
    altura: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    desenha(){
        contexto.drawImage(
            sprites,
            mensagemGetReady.spritesX,mensagemGetReady.spritesY, //sprites x e y
            mensagemGetReady.largura,mensagemGetReady.altura, //tamanho recorte
            mensagemGetReady.x,mensagemGetReady.y, //posicao dentro do canvas
            mensagemGetReady.largura,mensagemGetReady.altura, //tamanho dentro do canvas
        
        );
    }

}
//teste

//telas
let telaAtiva = {};
function mudaParaTela(novaTela){
    telaAtiva = novaTela;
    if(telaAtiva.inicializa){
        telaAtiva.inicializa();
    }
}


const Telas = {
    INICIO: {
        inicializa(){
            globais.flappyBird  = criaFlappyBird();
            globais.chao        = criaChao();
        },
        desenha(){
            planoDeFundo.desenha();
            globais.chao.desenha();
            globais.flappyBird.desenha();
            mensagemGetReady.desenha();
        },
        click(){
            mudaParaTela(Telas.JOGO);
        },
        atualiza(){
            globais.chao.atualiza();
        }
    },
    JOGO: {
        desenha(){
            planoDeFundo.desenha();
            globais.chao.desenha();
            globais.flappyBird.desenha();
        },
        click(){
            globais.flappyBird.pula();
        },
        atualiza(){
            globais.flappyBird.atualiza();
        }
    }
}

function loop(){

    telaAtiva.desenha();
    telaAtiva.atualiza();
    requestAnimationFrame(loop);
    frame = frame + 1;
}

window.addEventListener('click', function(){
    if(telaAtiva.click){
        telaAtiva.click();
    }
})
mudaParaTela(Telas.INICIO);
loop();
