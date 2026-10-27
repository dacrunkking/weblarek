import { CategoryKey, TCardPreview } from "../../types";
import { Card } from "./Card.ts";
import { ensureElement } from "../../utils/utils.ts";
import { categoryMap } from "../../utils/constants.ts";
import { IEvents } from "../base/Events.ts";

export class CardPreview extends Card<TCardPreview> {
    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLElement;
    protected descriptionElement: HTMLElement;
    protected buttonElement: HTMLButtonElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);

        this.imageElement = ensureElement<HTMLImageElement>(".card__image", this.container);
        this.categoryElement = ensureElement<HTMLElement>(".card__category", this.container);
        this.descriptionElement = ensureElement<HTMLElement>('.card__text', this.container);
        this.buttonElement = ensureElement<HTMLButtonElement>(".card__button", this.container);

        if (this.buttonElement) {
            this.buttonElement.addEventListener("click", () => {
                events.emit("preview:toggle");
            });
        }
    }

    set category(value: string) {
        this.categoryElement.textContent = value;

        for (const key in categoryMap) {
            this.categoryElement.classList.toggle(
                categoryMap[key as CategoryKey],
                key === value,
            );
        }
    }

    set image(value: { url: string; alt: string }) {
        this.setImage(this.imageElement, value.url, value.alt);
    }

    set buttonText(value: string) {
        this.buttonElement.textContent = value;
    }

    set buttonDisabled(value: boolean) {
        this.buttonElement.disabled = value;
    }
}
