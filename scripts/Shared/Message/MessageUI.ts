import { HTMLSelectors } from "../Enum/HTMLSelectors";
import { TwitchMessage } from "./TwitchMessage";

export class MessageUI {

    chatElement: Element;
    templateChatMSG: HTMLTemplateElement;

    constructor() {
        this.chatElement = document.querySelector(HTMLSelectors.chat) as Element;
        this.templateChatMSG = document.querySelector(HTMLSelectors.templateChatMSG) as HTMLTemplateElement;
    }

    addMessage(message: string, tags) {
        const msgClone = this.templateChatMSG.content.cloneNode(true) as Element;
        let msgText: HTMLElement = msgClone.querySelector(HTMLSelectors.msgText) as HTMLElement;
        let msgUserName: HTMLElement = msgClone.querySelector(HTMLSelectors.chatUsername) as HTMLElement;
        if (tags["emotes"]) {
            msgText.insertAdjacentHTML(
            "beforeend",
            this.formatEmotes(message, tags["emotes"])
            );
        } else {
            msgText.textContent = message;
        }
        msgUserName.textContent = tags["display-name"] as string;
        msgUserName.style.color = tags["color"] ? tags["color"] : "#fff";
        this.chatElement.prepend(msgClone);
    }

    formatEmotes(text: string, emotes?: { [emoteid: string]: string[] } | undefined) {
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
}