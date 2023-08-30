/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/factory.js":
/*!************************!*\
  !*** ./src/factory.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   enemy: () => (/* binding */ enemy),\n/* harmony export */   enemyGameBoard: () => (/* binding */ enemyGameBoard),\n/* harmony export */   gameBoardFactory: () => (/* binding */ gameBoardFactory),\n/* harmony export */   player: () => (/* binding */ player),\n/* harmony export */   playerFactory: () => (/* binding */ playerFactory),\n/* harmony export */   playerGameBoard: () => (/* binding */ playerGameBoard)\n/* harmony export */ });\n\nconst shipFactory = (length) => {\n    let hits = 0;\n    let sunk = false;\n    return {sunk,hits,length,\n        isSunk(){\n            return this.sunk = this.length === this.hits ? true : false;;\n        },\n        hit() {\n            this.hits += 1;\n            return this.isSunk();\n        },\n    } ;\n}\n\nconst gameBoardFactory = () => {\n    \n    // 0 = empty , 1 = part of ship, 2 = sunken part ship, 3 = a missed shot\n    \n    function placeShip(hor = true,beginPos,length = 5){\n        let xpos = parseInt(beginPos[0]);\n        let ypos = parseInt(beginPos[1]);\n        let ship = shipFactory(length);\n        this.ships.set(ship,[]);\n        if(hor){\n            for(let i = 0; i < ship.length; i++){\n                if(this.board.has(`${[xpos,ypos + ship.length - 1]}`) && this.board.get(`${[xpos,ypos + i]}`) !== 1){\n                }\n                else {return;}\n            }\n            for(let i = 0; i < ship.length; i++){\n                this.board.set(`${[xpos,ypos + i]}`,1);\n                this.ships.get(ship).push(`${[xpos + i,ypos]}`);\n            }\n        }\n        else{\n            for(let i = 0; i < ship.length; i++){\n                if(this.board.has(`${[xpos + ship.length - 1,ypos]}`) && this.board.get(`${[xpos + i,ypos]}`) !== 1){}\n                else{ return;}\n            }\n            for(let i = 0; i < ship.length; i++){\n                this.board.set(`${[xpos + i,ypos]}`,1);\n                this.ships.get(ship).push(`${[xpos,ypos + i]}`);\n            }\n        }\n    }\n    \n    function gameWon() {\n       for(let [,value] of this.board){\n            if(value === 1){\n                return false;\n            }\n       }\n       return true;\n    }\n    return {board: gameBoard(),\n        receiveAttack(coordinates) {\n            let cor = coordinates.toString();\n            this.sunkShips = '';\n            if(this.board.has(cor) && this.board.get(cor) === 1){\n                this.board.set(cor,2);\n                for(let [corVar,ship] of this.ships){\n                    if(ship.includes(cor)){\n                        if(corVar.hit())this.sunkShips = ship.join(' ');\n                    }\n                }\n            }\n            else if(this.board.has(cor) && this.board.get(cor) === 0) {\n                this.board.set(cor,3);\n            }\n        }\n        ,gameWon,placeShip,ships: new Map(),sunkShip: '',\n    }\n}\n\n\nconst gameBoard = () => {\n    let board = new Map();\n    for(let i = 0; i < 10; i++){\n        for(let j = 0; j < 10; j++){\n            board.set(`${[i,j]}`,0);\n        }\n    }\n    return board;\n}\n\nconst placer = (gameBoard) => {\n    return {\n        place(hor,pos,length){\n        gameBoard.placeShip(hor,pos,length);\n        }\n    }\n} \n\nconst playerFactory = (name,playerGameBoard,enemyGameBoard) => {\n    return {name,attack(coordinates){\n            enemyGameBoard.receiveAttack(coordinates);\n        },\n        ...placer(playerGameBoard),\n    }\n}\n\nconst enemyFactory = (name,enemyGameBoard,playerGameBoard) => {\n    const visitedCor = new Set();\n    const computerShot = () => { \n      let ranCor = [Math.round(Math.random() * 9),Math.round(Math.random() * 9)]\n        while(visitedCor.has(ranCor.toString())){\n            ranCor = [Math.round(Math.random() * 9),Math.round(Math.random() * 9)];\n        }\n        visitedCor.add(ranCor.toString());\n        return ranCor;\n    };\n\n    return {name,\n        ...placer(enemyGameBoard),\n        attack(){\n            playerGameBoard.receiveAttack(this.coordinates = computerShot());\n        },\n        coordinates: [],\n    }\n}\n\nconst playerGameBoard = gameBoardFactory();\nconst enemyGameBoard = gameBoardFactory();\nconst player = playerFactory('',playerGameBoard,enemyGameBoard);\nconst enemy = enemyFactory('Computer',enemyGameBoard,playerGameBoard);\n\n\n//# sourceURL=webpack://project-battleships/./src/factory.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factory */ \"./src/factory.js\");\n/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ \"./src/render.js\");\n\n\n// boards\nlet boatArr = [2,3,3,4,5];\nlet hor = false;\nconst dialog = document.querySelector('dialog');\nconst playerBoard = document.querySelector('#player-board');\nconst enemyBoard = document.querySelector('#enemy-board');\nconst placeBoard = document.querySelector('#place-board');\n//  buttons\nconst submitButton = document.querySelector('#submit');\nconst changePosButton = document.querySelector('#change-pos');\n//input\nfunction attack(e) {\n    if(!_factory__WEBPACK_IMPORTED_MODULE_0__.playerGameBoard.gameWon() && !_factory__WEBPACK_IMPORTED_MODULE_0__.enemyGameBoard.gameWon()){\n    _factory__WEBPACK_IMPORTED_MODULE_0__.player.attack(e.target.getAttribute('pos'));\n    _factory__WEBPACK_IMPORTED_MODULE_0__.enemy.attack();\n    }\n}\nfunction isGameWon(){\n    console.log(_factory__WEBPACK_IMPORTED_MODULE_0__.playerGameBoard);\n    if(_factory__WEBPACK_IMPORTED_MODULE_0__.enemyGameBoard.gameWon()){\n       alert(_factory__WEBPACK_IMPORTED_MODULE_0__.player.name + ' won');\n    }\n    else if(_factory__WEBPACK_IMPORTED_MODULE_0__.playerGameBoard.gameWon()){\n      alert('computer won') ;\n    }\n}\nchangePosButton.addEventListener('change', () => {\n    if(hor){\n        hor = false;\n    }\n    else {\n        hor = true;\n    }\n})\nenemyBoard.addEventListener('click', (e) => {attack(e); (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderScoreBoard)(e); (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderColor)(e,_factory__WEBPACK_IMPORTED_MODULE_0__.enemy.coordinates); isGameWon(); \n});\nsubmitButton.addEventListener('click',() => {\n    const nameInput = document.querySelector('#name-input');\n    const playerName = document.querySelector('#player-name');\n    playerName.innerHTML += ' ' + nameInput.value ;\n    _factory__WEBPACK_IMPORTED_MODULE_0__.player.name = nameInput.value;\n})\nplaceBoard.addEventListener('click',(e) => {\n    if(boatArr.length > 0){\n    _factory__WEBPACK_IMPORTED_MODULE_0__.player.place(hor,e.target.getAttribute('pos').split(','),boatArr[boatArr.length - 1]);\n    (0,_render__WEBPACK_IMPORTED_MODULE_1__.placeBoatRender)(hor,e.target.getAttribute('pos'),boatArr[boatArr.length - 1]);\n    boatArr.pop();\n    }\n})\n\n;(0,_render__WEBPACK_IMPORTED_MODULE_1__.render)();\n// Carrier\n_factory__WEBPACK_IMPORTED_MODULE_0__.enemy.place(false,[1,2],5);\n// Battleship\n_factory__WEBPACK_IMPORTED_MODULE_0__.enemy.place(false,[1,5],4);\n//Cruiser\n_factory__WEBPACK_IMPORTED_MODULE_0__.enemy.place(false,[1,4],3);\n// Submarine\n_factory__WEBPACK_IMPORTED_MODULE_0__.enemy.place(false,[1,3],3);\n//Patrol Boat\n_factory__WEBPACK_IMPORTED_MODULE_0__.enemy.place(false,[1,6],2);\n\n\n//# sourceURL=webpack://project-battleships/./src/index.js?");

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   placeBoatRender: () => (/* binding */ placeBoatRender),\n/* harmony export */   render: () => (/* binding */ render),\n/* harmony export */   renderColor: () => (/* binding */ renderColor),\n/* harmony export */   renderScoreBoard: () => (/* binding */ renderScoreBoard)\n/* harmony export */ });\n/* harmony import */ var _factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factory */ \"./src/factory.js\");\n\n\nconst startGame = () => {\n\n\n}\nconst renderScoreBoard = (e) => {\n        const scoreBoard = document.querySelector('#score-board');\n        scoreBoard.textContent = _factory__WEBPACK_IMPORTED_MODULE_0__.enemyGameBoard.sunkShip ? 'you have sunk ' + _factory__WEBPACK_IMPORTED_MODULE_0__.enemyGameBoard.sunkShip : 'you have attacked position: ' + e.target.getAttribute('pos');  \n       \n}\n\nconst renderColor = (e,coordinates) => {\n    //get value\n    const cor = coordinates.toString();\n    const playerBoard = document.querySelector('#player-board')\n    let val = _factory__WEBPACK_IMPORTED_MODULE_0__.enemyGameBoard.board.get(e.target.getAttribute('pos'));\n    let numEnemy = _factory__WEBPACK_IMPORTED_MODULE_0__.playerGameBoard.board.get(cor);\n    // set color\n    if(val === 2){\n        e.target.style.backgroundColor = 'orange';\n    }\n    else if(val === 3){\n        e.target.style.backgroundColor = 'red'; \n    }\n\n    playerBoard.childNodes.forEach((value) => {\n        if(numEnemy === 2 && value.getAttribute('pos') == cor){\n            value.style.backgroundColor = 'orange';\n        }\n        else if(numEnemy === 3 && value.getAttribute('pos') == cor){\n            value.style.backgroundColor = 'red'; \n        }\n    })\n}\n\nconst render = () => {\n    const playerBoard = document.querySelector('#player-board');\n    const enemyBoard = document.querySelector('#enemy-board');\n    const placeBoard = document.querySelector('#place-board');\n\n    for(let [pos,val] of _factory__WEBPACK_IMPORTED_MODULE_0__.enemyGameBoard.board ){\n            const node = document.createElement('div');\n            node.setAttribute('pos',pos);\n            enemyBoard.appendChild(node);\n    } \n\n    for(let [pos,val] of _factory__WEBPACK_IMPORTED_MODULE_0__.playerGameBoard.board ){\n            const node = document.createElement('div');\n            node.setAttribute('pos',pos);\n            playerBoard.appendChild(node);\n    }\n\n    for(let [pos,val] of _factory__WEBPACK_IMPORTED_MODULE_0__.playerGameBoard.board ){\n            const node = document.createElement('div');\n            node.setAttribute('pos',pos);\n            placeBoard.appendChild(node);\n        }   \n    \n}\n\nconst placeBoatRender = (hor,coordinates,length) => {\n    const placeBoard = document.querySelector('#place-board');\n    const playerBoard = document.querySelector('#player-board');\n    const x = parseInt(coordinates.split(',')[0]);\n    const y = parseInt(coordinates.split(',')[1]);\n    const corArr = [];\n    if(hor){\n        for(let i = 0; i < length; i++){\n            corArr.push(([x,y + i]).toString());\n        }\n    }\n    else{\n        for(let i = 0; i < length; i++){\n            corArr.push(([x + i,y]).toString());\n        }\n    }\n    placeBoard.childNodes.forEach((value) => {\n        if(corArr.includes(value.getAttribute('pos'))){\n            value.style.backgroundColor = 'blue';\n        }\n    })\n    playerBoard.childNodes.forEach((value) => {\n        if(corArr.includes(value.getAttribute('pos'))){\n            value.style.backgroundColor = 'blue';\n        }\n    })\n}\n\n\n\n//# sourceURL=webpack://project-battleships/./src/render.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;