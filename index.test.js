import  {shipFactory,playerFactory,gameBoardFactory} from './src/factory';

const computerShot = () => [Math.ceil(Math.random() * 9),Math.ceil(Math.random() * 9)];

test('place ship works',() => {
    let gameBoard = gameBoardFactory();
    let player = playerFactory('Manasseh',gameBoard);
    let computer = playerFactory('comp',gameBoard);
    player.place(true,[1,2],5);
    player.place(false,[3,2],5);
    player.attack([1,2]);
})

