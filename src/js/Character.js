export default class Character {
  constructor(level, type = 'generic') {
    this.level = level;
    this.attack = 0;
    this.defence = 0;
    this.health = 50;
    this.type = type;
     // TODO: throw error if user use "new Character()"
    if (new.target.name === 'Character'){
      throw new Error('Нельзя создавать объект класса Character');
    }    
  }
}

export class Bowman extends Character{
  constructor(level){
      super(level);
      this.attack = 25;
      this.defence = 25;
      this.type = 'bowman';
  }
}
export class Swordsman  extends Character{
  constructor(level){
      super(level);
      this.attack = 40;
      this.defence = 10;
      this.type = 'swordsman';
  }
}
export class Magician  extends Character{
  constructor(level){
      super(level);
      this.attack = 10;
      this.defence = 40;
      this.type = 'magician';
  }
}
export class Vampire  extends Character{
  constructor(level){
      super(level);
      this.attack = 25;
      this.defence = 25;
      this.type = 'vampire';
  }
}
export class Undead  extends Character{
  constructor(level){
      super(level);
      this.attack = 40;
      this.defence = 10;
      this.type = 'undead';
  }
}
export class Daemon extends Character{
  constructor(level){
      super(level);
      this.attack = 10;
      this.defence = 40;
      this.type = 'daemon';
  }
}