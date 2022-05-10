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
    this.gameState = new GameState();
    let theme = themes.prairie;
    if (this.gameState.level === 1) theme = themes.prairie;
    if (this.gameState.level === 2) theme = themes.desert;
    if (this.gameState.level === 3) theme = themes.arctic;
    if (this.gameState.level === 4) theme = themes.mountain;
    this.gamePlay.drawUi(theme);

    window.gameState = this.gameState;
    gameState.playerCharacters = generateTeam([Swordsman, Bowman, Magician], 1, 2);
    gameState.compCharacters = generateTeam([Daemon, Undead, Vampire], 1, 2);
    this.gamePlay.redrawPositions(gameState.playerCharacters.concat(gameState.compCharacters.map(item => {
      item.position += 6;
      return item;
    })));

    //Добавление действия на кнопку NewGame
    if (!this.gamePlay.newGameListeners.length) {
      this.gamePlay.addNewGameListener(() => {
        gameCtrl.init();
      });
    }

    //Добавление действия Вход указателя мыши в ячейку поля
    if (!this.gamePlay.cellEnterListeners.length) {
      this.gamePlay.addCellEnterListener(itemCell => {

        const show = (itemCharacter) => {
          if (itemCharacter.position === itemCell) {
            this.gamePlay.showCellTooltip(
              String.fromCodePoint(0x1F396) + ' ' + itemCharacter.character.level +
              ' ' + String.fromCodePoint(0x2694) + ' ' + itemCharacter.character.attack +
              ' ' + String.fromCodePoint(0x1F6E1) + ' ' + itemCharacter.character.defence +
              ' ' + String.fromCodePoint(0x2764) + ' ' + itemCharacter.character.health,
              itemCell);
          }
        }

        this.gameState.compCharacters.forEach(itemCharacter => show(itemCharacter));
        this.gameState.playerCharacters.forEach(itemCharacter => show(itemCharacter));

        //console.log("Вход: " + itemCell);
      });
    }

    //Добавление действия Выход указателя мыши из ячейки поля
    if (!this.gamePlay.cellLeaveListeners.length) {
      this.gamePlay.addCellLeaveListener(itemCell => {
        //console.log("Выход: " + itemCell);
      });
    }

    //Добавление действия Клик мышью по ячейке поля
    if (!this.gamePlay.cellClickListeners.length) {
      this.gamePlay.addCellClickListener(itemCell => {
        // console.log("Клик: " + itemCell);
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
