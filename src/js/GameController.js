import themes from "./themes";
import GameState from "./GameState";
import { generateTeam, getRandomIntInclusive } from "./generators";
import { Swordsman, Bowman, Magician, Daemon, Undead, Vampire } from './Character';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  init() {
    const gameState = new GameState();
    let theme = themes.prairie;
    if (gameState.state.level === 1) theme = themes.prairie;
    if (gameState.state.level === 2) theme = themes.desert;
    if (gameState.state.level === 3) theme = themes.arctic;
    if (gameState.state.level === 4) theme = themes.mountain;
    this.gamePlay.drawUi(theme);

    gameState.playerCharacters = generateTeam([Swordsman, Bowman, Magician], 1, 2);
    gameState.compCharacters = generateTeam([Daemon, Undead, Vampire], 1, 2);
    this.gamePlay.redrawPositions(gameState.playerCharacters.concat(gameState.compCharacters.map(item => {
      item.position +=6;
      return item;
    })));

    //Добавление действия на кнопку NewGame
    if(!this.gamePlay.newGameListeners.length){
      this.gamePlay.addNewGameListener(()=>{
        gameCtrl.init();
      });
    }
    
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }

  onCellClick(index) {
    // TODO: react to click
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
  }
}
