export class CommandList {
  upCmd: string[] = ["haut", "up", "good", "bon"];
  downCmd: string[] = ["bas", "down", "evil", "mauvais"];
  leftCmd: string[] = ["gauche", "left", "communiste", "jlm"];
  rightCmd: string[] = ["droite", "right", "fn", "mlp"];
  reverseCmd: string[] = ["arriere", "reverse", "rem", "macron"];

  cmdToExecute: string[] = [];

  aliasToCmd(cmd: string): string {
    if (this.upCmd.includes(cmd)) {
      return "up";
    } else if (this.downCmd.includes(cmd)) {
      return "down";
    } else if (this.leftCmd.includes(cmd)) {
      return "left";
    } else if (this.rightCmd.includes(cmd)) {
      return "right";
    } else if (this.reverseCmd.includes(cmd)) {
      return "reverse";
    }
  }

  saveCmd(cmd: string) {
    this.cmdToExecute.push(this.aliasToCmd(cmd));
  }

  getCmds(): string[] {
    return this.cmdToExecute;
  }

  getAllowedCmds(): string {
    return [
      ...this.upCmd,
      ...this.downCmd,
      ...this.leftCmd,
      ...this.rightCmd,
      ...this.reverseCmd,
    ].join("|");
  }
}
