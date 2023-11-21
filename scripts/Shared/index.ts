import * as tmi from "tmi.js";
import { MessageUI } from "./Message/MessageUI";
import { RandomGameSelector } from "./RandomGameSelector";

const urlParams = new URLSearchParams(window.location.search);
const messageUI = new MessageUI(); 
const Client = new tmi.Client({
  channels: ["bloubill"],
});

Client.connect();

let gameSelector = new RandomGameSelector(urlParams)
const game = gameSelector.getCurrentGame();

function frame() {
  game.loop();
  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);

Client.on("message", (channel, tags, message, self) => {
  if (self) return true;
  if (tags["display-name"] === "Moobot") return true;
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
  messageCmds.forEach((message) => {
    game.readMessage(message);
  });
  // affichage du message
  messageUI.addMessage(message, tags);
});
