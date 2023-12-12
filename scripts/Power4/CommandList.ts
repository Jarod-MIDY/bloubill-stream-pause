export class CommandList {
  moveCmd: string[] = ['1', '2', '3', '4', '5', '6', '7'];

  cmdToExecute: string[] = [];
  cheatCommand: string[] = ["nope"];

  aliasToCmd(cmd: string): string {
    return cmd;
  }

  addCmdToExecute(cmd: string) {
    this.cmdToExecute.push(this.aliasToCmd(cmd));
  }

  getCmds(): string[] {
    return this.cmdToExecute;
  }

  getAllowedCmds(): string {
    return [
      ...this.moveCmd,
    ].join("|");
  }
}
