import * as tmi from "tmi.js";
import { GameUI } from "./GameUI";
import { Game } from "../Snake/Game";

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
const game = new Game(canvas, gameUI);

function frame() {
  game.loop();
  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);

Client.on("message", (channel, tags, message, self) => {
  if (self) return true;
  if (tags["display-name"] === "Moobot") return true;

  const cheatMessages = game.getCheatCommand();
  const msgWrapper: Element = document.querySelector("#chat") as Element;

  const msgTemplate: HTMLTemplateElement = document.querySelector(
    "#chat-msg"
  ) as HTMLTemplateElement;
  const msgClone = msgTemplate.content.cloneNode(true) as Element;
  let msgText: HTMLElement = msgClone.querySelector(".msg-text") as HTMLElement;
  let msgUserName: HTMLElement = msgClone.querySelector(
    ".msg-username"
  ) as HTMLElement;

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
  if (tags["emotes"]) {
    msgText.insertAdjacentHTML(
      "beforeend",
      formatEmotes(message, tags["emotes"])
    );
  } else {
    msgText.textContent = message;
  }
  msgUserName.textContent = tags["display-name"] as string;
  msgUserName.style.color = tags["color"] ? tags["color"] : "#fff";

  msgWrapper.prepend(msgClone);
});

function formatEmotes(
  text: string,
  emotes?: { [emoteid: string]: string[] } | undefined
) {
  let splitText = text.split("");
  for (let i in emotes) {
    let emoteid = emotes[i];
    for (let j in emoteid) {
      let emoteName = emoteid[j];
      let splitedName = emoteName.split("-");
      let emotePosition = [parseInt(splitedName[0]), parseInt(splitedName[1])];
      let length = emotePosition[1] - emotePosition[0];
      let empty = Array.apply(null, new Array(length + 1)).map(function () {
        return "";
      });
      //
      splitText = splitText
        .slice(0, emotePosition[0])
        .concat(empty)
        .concat(splitText.slice(emotePosition[1] + 1, splitText.length));
      splitText.splice(
        emotePosition[0],
        1,
        '<img class="emoticon" src="http://static-cdn.jtvnw.net/emoticons/v1/' +
          i +
          '/3.0">'
      );
    }
  }
  return splitText.join("");
}
