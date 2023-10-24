import { GameInterface } from "./GameInterface";

export class GameStorage {
  localName: string;
  constructor(game: GameInterface, localName: string) {
    this.localName = localName;
    if (!this.load()) {
      this.save(game);
    }
  }
  load() {
    let storage = localStorage.getItem(this.localName);
    if (storage) {
      return JSON.parse(storage);
    }
    return null;
  }

  save(game: GameInterface) {
    localStorage.setItem(this.localName, JSON.stringify(game));
  }

  clear() {
    localStorage.removeItem(this.localName);
  }
}
