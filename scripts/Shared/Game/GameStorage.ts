import { GameSave } from "./GameSave";

export class GameStorage {
  localName: string;

  constructor(localName: string) {
    this.localName = localName;
  }

  load(): null | GameSave {
    let storage = localStorage.getItem(this.localName);
    if (storage) {
      return JSON.parse(storage);
    }
    return null;
  }

  save(save: GameSave) {
    localStorage.setItem(this.localName, JSON.stringify(save));
  }

  clear() {
    localStorage.removeItem(this.localName);
  }
}
