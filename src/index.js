import {player,enemy,enemyGameBoard,playerGameBoard} from './factory';
import {render,renderScoreBoard,renderColor,placeBoatRender} from './render';
// boards
let boatArr = [2,3,3,4,5];
let hor = false;
const dialog = document.querySelector('dialog');
const playerBoard = document.querySelector('#player-board');
const enemyBoard = document.querySelector('#enemy-board');
const placeBoard = document.querySelector('#place-board');
//  buttons
const submitButton = document.querySelector('#submit');
const changePosButton = document.querySelector('#change-pos');
//input
function attack(e) {
    if(!playerGameBoard.gameWon() && !enemyGameBoard.gameWon()){
    player.attack(e.target.getAttribute('pos'));
    enemy.attack();
    }
}
function isGameWon(){
    console.log(playerGameBoard);
    if(enemyGameBoard.gameWon()){
       alert(player.name + ' won');
    }
    else if(playerGameBoard.gameWon()){
      alert('computer won') ;
    }
}
changePosButton.addEventListener('change', () => {
    if(hor){
        hor = false;
    }
    else {
        hor = true;
    }
})
enemyBoard.addEventListener('click', (e) => {attack(e); renderScoreBoard(e); renderColor(e,enemy.coordinates); isGameWon(); 
});
submitButton.addEventListener('click',() => {
    const nameInput = document.querySelector('#name-input');
    const playerName = document.querySelector('#player-name');
    playerName.innerHTML += ' ' + nameInput.value ;
    player.name = nameInput.value;
})
placeBoard.addEventListener('click',(e) => {
    if(boatArr.length > 0){
    player.place(hor,e.target.getAttribute('pos').split(','),boatArr[boatArr.length - 1]);
    placeBoatRender(hor,e.target.getAttribute('pos'),boatArr[boatArr.length - 1]);
    boatArr.pop();
    }
})

render();
// Carrier
enemy.place(false,[1,2],5);
// Battleship
enemy.place(false,[1,5],4);
//Cruiser
enemy.place(false,[1,4],3);
// Submarine
enemy.place(false,[1,3],3);
//Patrol Boat
enemy.place(false,[1,6],2);
