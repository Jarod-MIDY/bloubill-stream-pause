import * as tmi from "tmi.js";
import { MessageUI } from "./Message/MessageUI";
import { RandomGameSelector } from "./RandomGameSelector";
import { TeamManager } from "./TeamManager";

const urlParams = new URLSearchParams(window.location.search);
const messageUI = new MessageUI(); 
const Client = new tmi.Client({
  channels: ["bloubill"],
});
Client.connect();

const gameSelector = new RandomGameSelector(urlParams, urlParams.get('new_game') ? true : false);

const game = gameSelector.getCurrentGame();
const teamManager = new TeamManager(game);
function frame() {
  game.loop();
  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);

Client.on("message", (channel, tags, message, self) => {
  if (self) return true;
  if (tags["display-name"] === "Moobot") return true;
  if (tags['custom-reward-id'] === teamManager.getRewardId() && teamManager.gameIsTeams()) {
    teamManager.joinTeam(message, tags['user-id']);
  }
  // lectures des cmds du jeu
  const messageCmds: string[] = Array.from(
    message.toLowerCase().matchAll(game.getAllowedMessages())
  ).flat() as string[];
  if (
    game.getCheatCommand().every((value, index) => value === messageCmds[index])
    ) {
      game.toggleCheat(true);
    }
    if (messageCmds.length === 0) return true;
    // envoie de la cmd au jeu
    messageCmds.forEach((message) => {
    game.readMessage(message, tags['user-id']);
  });
  // affichage du message
  messageUI.addMessage(message, tags);
});