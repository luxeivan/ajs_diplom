/**
 * Entry point of app: don't change this
 */
import GameState from './GameState';

import GamePlay from './GamePlay';
import GameController from './GameController';
import GameStateService from './GameStateService';

const gamePlay = new GamePlay();
gamePlay.bindToDOM(document.querySelector('#game-container'));

const stateService = new GameStateService(localStorage);

const gameCtrl = new GameController(gamePlay, stateService);
gameCtrl.init();

// don't write your code here
window.gameCtrl = gameCtrl;
window.gamePlay = gamePlay;