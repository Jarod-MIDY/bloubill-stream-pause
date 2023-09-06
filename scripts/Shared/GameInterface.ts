export interface GameInterface {
  readMessage(message: string): void;

  toggleCheat(cheatCode: boolean): void;

  getAllowedMessages(): string;

  getCheatCommand(): string[];

  getSpeed(): number;

  reset(): void;
}
