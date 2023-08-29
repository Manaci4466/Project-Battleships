export {gameBoardFactory,playerFactory,enemyGameBoard,player,enemy,playerGameBoard};
const shipFactory = (length) => {
    let hits = 0;
    let sunk = false;
    return {sunk,hits,length,
        isSunk(){
            return this.sunk = this.length === this.hits ? true : false;;
        },
        hit() {
            this.hits += 1;
            return this.isSunk();
        },
    } ;
}

const gameBoardFactory = () => {
    
    // 0 = empty , 1 = part of ship, 2 = sunken part ship, 3 = a missed shot
    
    function placeShip(hor = true,beginPos,length = 5){
        let xpos = parseInt(beginPos[0]);
        let ypos = parseInt(beginPos[1]);
        let ship = shipFactory(length);
        this.ships.set(ship,[]);
        if(hor){
            for(let i = 0; i < ship.length; i++){
                if(this.board.has(`${[xpos,ypos + ship.length - 1]}`) && this.board.get(`${[xpos,ypos + i]}`) !== 1){
                }
                else {return;}
            }
            for(let i = 0; i < ship.length; i++){
                this.board.set(`${[xpos,ypos + i]}`,1);
                this.ships.get(ship).push(`${[xpos + i,ypos]}`);
            }
        }
        else{
            for(let i = 0; i < ship.length; i++){
                if(this.board.has(`${[xpos + ship.length - 1,ypos]}`) && this.board.get(`${[xpos + i,ypos]}`) !== 1){}
                else{ return;}
            }
            for(let i = 0; i < ship.length; i++){
                this.board.set(`${[xpos + i,ypos]}`,1);
                this.ships.get(ship).push(`${[xpos,ypos + i]}`);
            }
        }
    }
    
    function gameWon() {
       for(let [,value] of this.board){
            if(value === 1){
                return false;
            }
       }
       return true;
    }
    return {board: gameBoard(),
        receiveAttack(coordinates) {
            let cor = coordinates.toString();
            this.sunkShips = '';
            if(this.board.has(cor) && this.board.get(cor) === 1){
                this.board.set(cor,2);
                for(let [corVar,ship] of this.ships){
                    if(ship.includes(cor)){
                        if(corVar.hit())this.sunkShips = ship.join(' ');
                    }
                }
            }
            else if(this.board.has(cor) && this.board.get(cor) === 0) {
                this.board.set(cor,3);
            }
        }
        ,gameWon,placeShip,ships: new Map(),sunkShip: '',
    }
}


const gameBoard = () => {
    let board = new Map();
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            board.set(`${[i,j]}`,0);
        }
    }
    return board;
}

const placer = (gameBoard) => {
    return {
        place(hor,pos,length){
        gameBoard.placeShip(hor,pos,length);
        }
    }
} 

const playerFactory = (name,playerGameBoard,enemyGameBoard) => {
    return {name,attack(coordinates){
            enemyGameBoard.receiveAttack(coordinates);
        },
        ...placer(playerGameBoard),
    }
}

const enemyFactory = (name,enemyGameBoard,playerGameBoard) => {
    const visitedCor = new Set();
    const computerShot = () => { 
      let ranCor = [Math.round(Math.random() * 9),Math.round(Math.random() * 9)]
        while(visitedCor.has(ranCor.toString())){
            ranCor = [Math.round(Math.random() * 9),Math.round(Math.random() * 9)];
        }
        visitedCor.add(ranCor.toString());
        return ranCor;
    };

    return {name,
        ...placer(enemyGameBoard),
        attack(){
            playerGameBoard.receiveAttack(this.coordinates = computerShot());
        },
        coordinates: [],
    }
}

const playerGameBoard = gameBoardFactory();
const enemyGameBoard = gameBoardFactory();
const player = playerFactory('',playerGameBoard,enemyGameBoard);
const enemy = enemyFactory('Computer',enemyGameBoard,playerGameBoard);
