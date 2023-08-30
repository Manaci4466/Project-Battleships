import {player,enemy,enemyGameBoard,playerGameBoard} from "./factory"

const startGame = () => {


}
const renderScoreBoard = (e) => {
        const scoreBoard = document.querySelector('#score-board');
        scoreBoard.textContent = enemyGameBoard.sunkShip ? 'you have sunk ' + enemyGameBoard.sunkShip : 'you have attacked position: ' + e.target.getAttribute('pos');  
       
}

const renderColor = (e,coordinates) => {
    //get value
    const cor = coordinates.toString();
    const playerBoard = document.querySelector('#player-board')
    let val = enemyGameBoard.board.get(e.target.getAttribute('pos'));
    let numEnemy = playerGameBoard.board.get(cor);
    // set color
    if(val === 2){
        e.target.style.backgroundColor = 'orange';
    }
    else if(val === 3){
        e.target.style.backgroundColor = 'red'; 
    }

    playerBoard.childNodes.forEach((value) => {
        if(numEnemy === 2 && value.getAttribute('pos') == cor){
            value.style.backgroundColor = 'orange';
        }
        else if(numEnemy === 3 && value.getAttribute('pos') == cor){
            value.style.backgroundColor = 'red'; 
        }
    })
}

const render = () => {
    const playerBoard = document.querySelector('#player-board');
    const enemyBoard = document.querySelector('#enemy-board');
    const placeBoard = document.querySelector('#place-board');

    for(let [pos,val] of enemyGameBoard.board ){
            const node = document.createElement('div');
            node.setAttribute('pos',pos);
            enemyBoard.appendChild(node);
    } 

    for(let [pos,val] of playerGameBoard.board ){
            const node = document.createElement('div');
            node.setAttribute('pos',pos);
            playerBoard.appendChild(node);
    }

    for(let [pos,val] of playerGameBoard.board ){
            const node = document.createElement('div');
            node.setAttribute('pos',pos);
            placeBoard.appendChild(node);
        }   
    
}

const placeBoatRender = (hor,coordinates,length) => {
    const placeBoard = document.querySelector('#place-board');
    const playerBoard = document.querySelector('#player-board');
    const x = parseInt(coordinates.split(',')[0]);
    const y = parseInt(coordinates.split(',')[1]);
    const corArr = [];
    if(hor){
        for(let i = 0; i < length; i++){
            corArr.push(([x,y + i]).toString());
        }
    }
    else{
        for(let i = 0; i < length; i++){
            corArr.push(([x + i,y]).toString());
        }
    }
    placeBoard.childNodes.forEach((value) => {
        if(corArr.includes(value.getAttribute('pos'))){
            value.style.backgroundColor = 'blue';
        }
    })
    playerBoard.childNodes.forEach((value) => {
        if(corArr.includes(value.getAttribute('pos'))){
            value.style.backgroundColor = 'blue';
        }
    })
}

export{render,renderScoreBoard,renderColor,placeBoatRender}