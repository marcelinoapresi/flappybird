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
    }

}

//teste