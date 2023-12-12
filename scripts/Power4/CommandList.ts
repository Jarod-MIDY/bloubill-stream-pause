export class CommandList {
  placeCmd: string[] = ["place"];
  moveCmd: string[] = ["move [1-6]", "deplacer [1-6]"];

  cmdToExecute: string[] = [];
  cheatCommand: string[] = ["nope"];

  aliasToCmd(cmd: string): string {
    console.log(cmd);
    if (this.placeCmd.includes(cmd)) {
      return "place";
    } else {
      return cmd.substring(cmd.length - 1);
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
      ...this.moveCmd,
    ].join("|");
  }
}
