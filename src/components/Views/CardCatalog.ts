import { IProduct } from "../../types";
import { categoryMap } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Card } from "./Card";
import { ICardActions, CategoryKey } from "../../types";

export type TCardCatalog = Omit<IProduct, "image"> & {
    image: { url: string; alt: string };
};

export class CardCatalog extends Card<TCardCatalog> {
    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLElement;

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container);
        this.categoryElement = ensureElement<HTMLElement>(
            ".card__category",
            this.container,
        );
        this.imageElement = ensureElement<HTMLImageElement>(
            ".card__image",
            this.container,
        );

        if (actions?.onClick) {
            this.container.addEventListener("click", actions.onClick);
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
}
