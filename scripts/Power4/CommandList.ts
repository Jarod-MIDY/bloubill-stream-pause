export class CommandList {
  placeCmd: string[] = ["place"];
  leftCmd: string[] = ["gauche", "left"];
  rightCmd: string[] = ["droite", "right"];

  cmdToExecute: string[] = [];

  cheatCommand: string[] = ["nope"];

  aliasToCmd(cmd: string): string {
    if (this.placeCmd.includes(cmd)) {
      return "place";
    } else if (this.leftCmd.includes(cmd)) {
      return "left";
    } else if (this.rightCmd.includes(cmd)) {
      return "right";
    }
  }

  addCmdToExecute(cmd: string) {
    this.cmdToExecute.push(this.aliasToCmd(cmd));
  }

  getCmds(): string[] {
    return this.cmdToExecute;
  }

  getAllowedCmds(): string {
    return [
      ...this.placeCmd,
      ...this.leftCmd,
      ...this.rightCmd,
    ].join("|");
  }
}
