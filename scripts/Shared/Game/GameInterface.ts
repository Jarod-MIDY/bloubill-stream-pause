import { CommandList } from "../../Power4/CommandList";

export interface GameInterface {
  readMessage(message: string, userId: string): void;

  toggleCheat(cheatCode: boolean): void;

  getAllowedMessages(): string;

  getCheatCommand(): string[];

  getSpeed(): number;

  setUI(): void;

  loop(): void;

  reset(): void;
}
