import Character from "./Character";

export class Bowman extends Character{
    constructor(level){
        super(level);
        this.attack = 25;
        this.defence = 25;
        this.type = 'Bowman';
    }
}
export class Swordsman  extends Character{
    constructor(level){
        super(level);
        this.attack = 40;
        this.defence = 10;
        this.type = 'Swordsman';
    }
}
export class Magician  extends Character{
    constructor(level){
        super(level);
        this.attack = 10;
        this.defence = 40;
        this.type = 'Magician';
    }
}
export class Vampire  extends Character{
    constructor(level){
        super(level);
        this.attack = 25;
        this.defence = 25;
        this.type = 'Vampire';
    }
}
export class Undead  extends Character{
    constructor(level){
        super(level);
        this.attack = 40;
        this.defence = 10;
        this.type = 'Undead';
    }
}
export class Daemon extends Character{
    constructor(level){
        super(level);
        this.attack = 10;
        this.defence = 40;
        this.type = 'Daemon';
    }
}