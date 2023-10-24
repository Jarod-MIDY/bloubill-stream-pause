import * as tmi from "tmi.js";
import { GameUI } from "./Game/GameUI";
import { Game as SnakeGame } from "../Snake/Game";
import { Game } from "../Power4/Game";
import { MessageUI } from "./Message/MessageUI";

const urlParams = new URLSearchParams(window.location.search);
const messageUI = new MessageUI("#chat", "#chat-msg", ".msg-text", ".msg-username"); 
const Client = new tmi.Client({
  channels: ["bloubill"],
});

Client.connect();

let canvas: HTMLCanvasElement = document.getElementById(
  "game"
) as HTMLCanvasElement;
const gameUI = new GameUI(
  document.getElementById("score"),
  document.getElementById("high"),
  document.getElementById("gameLog")
);
const game = new Game(canvas, gameUI, urlParams.get("reset") === "true");

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
