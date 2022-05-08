/**
 * Entry point of app: don't change this
 */
import { Swordsman, Bowman, Magician, Daemon, Undead, Vampire } from './Characters';
import {characterGenerator,generateTeam} from './generators'

import GamePlay from './GamePlay';
import GameController from './GameController';
import GameStateService from './GameStateService';

const gamePlay = new GamePlay();
gamePlay.bindToDOM(document.querySelector('#game-container'));

const stateService = new GameStateService(localStorage);

const gameCtrl = new GameController(gamePlay, stateService);
gameCtrl.init();

// don't write your code here
console.log(generateTeam([Swordsman, Bowman, Magician, Daemon, Undead, Vampire],1,3));