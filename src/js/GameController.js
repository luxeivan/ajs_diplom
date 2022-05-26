import themes from "./themes";
import GameState from "./GameState";
import { generateTeam, getRandomIntInclusive } from "./generators";
import { Swordsman, Bowman, Magician, Daemon, Undead, Vampire } from './Character';
import GamePlay from "./GamePlay";

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

    //Добавление сетки координат
    let grid = [];
    let valueGrid = 0;
    let gridY = [];
    for (let y = 0; y < 8; y += 1) {
      for (let x = 0; x < 8; x += 1) {
        gridY.push(valueGrid);
        valueGrid += 1;
      }
      grid.push(gridY);
      gridY = [];
    }
    this.grid = grid;

    //Добавление действия на кнопку NewGame
    if (!this.gamePlay.newGameListeners.length) {
      this.gamePlay.addNewGameListener(() => {
        gameCtrl.init();
      });
    }

    //Добавление действия Вход указателя мыши в ячейку поля
    if (!this.gamePlay.cellEnterListeners.length) {
      this.gamePlay.addCellEnterListener(itemCell => this.onCellEnter(itemCell));
    }

    //Добавление действия Выход указателя мыши из ячейки поля
    if (!this.gamePlay.cellLeaveListeners.length) {
      this.gamePlay.addCellLeaveListener(itemCell => this.onCellLeave(itemCell));
    }

    //Добавление действия Клик мышью по ячейке поля
    if (!this.gamePlay.cellClickListeners.length) {
      this.gamePlay.addCellClickListener(itemCell => this.onCellClick(itemCell));
    }
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }

  cordinate(cellNumber) {
    let valueGrid = 0;
    for (let y = 0; y < 8; y += 1) {
      for (let x = 0; x < 8; x += 1) {
        if (valueGrid === cellNumber) return { x, y };
        valueGrid += 1;
      }
    }
  }

  onCellClick(itemCell) {
      //Совершение хода проверка если выделен персонаж пользователя
      if (this.gameState.playerCharacters.findIndex(item => item.selected === true) != -1) {
        const oldPositionIndex = this.gameState.playerCharacters.findIndex(item => item.selected === true);

        //Снятие выделения с ячейки с персонажем
        this.gamePlay.deselectCell(this.gameState.playerCharacters[oldPositionIndex].position);
        this.gameState.playerCharacters[oldPositionIndex].selected = false;

        //Проверка Если попытка пойти в ту же ячейку где стоит персонаж
        if (this.gameState.playerCharacters[oldPositionIndex].position != itemCell) {
          this.gameState.playerCharacters[oldPositionIndex].position = itemCell;
        } else {
          this.gamePlay.deselectCell(this.gameState.playerCharacters[oldPositionIndex].position);
          this.gameState.playerCharacters[oldPositionIndex].selected = false;
        }

        // Перересовка игрового поля
        this.gamePlay.redrawPositions(this.gameState.playerCharacters.concat(this.gameState.compCharacters));

        // Если не выделен персонаж то проверка если ячейка с персонажем то выделять
      } else {
        const select = (itemCharacter) => {
          if (itemCharacter.selected) {
            this.gamePlay.deselectCell(itemCharacter.position);
          }
          if (itemCharacter.position === itemCell) {
            this.gamePlay.selectCell(itemCharacter.position);
            itemCharacter.selected = true;
          }
        }
        this.gameState.playerCharacters.forEach(itemCharacter => select(itemCharacter));
      }

    
    // TODO: react to click
  }

  onCellEnter(itemCell) {
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
    // TODO: react to mouse enter
  }

  onCellLeave(itemCell) {
    //console.log("Выход: " + itemCell);
    // TODO: react to mouse leave
  }
}
