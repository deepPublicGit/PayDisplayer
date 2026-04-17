const BADGE_ID = "lvl-pay-badge";

export class PayBadge {
    private element: HTMLSpanElement | null = null;

    inject(anchorElement: Element) {
        this.remove();
        this.element = document.createElement("span");
        this.element.id = BADGE_ID;
        this.element.setAttribute(
            "style",
            `display:inline-flex;align-items:center;margin-left:5px;padding:1px 5px;border-radius:2px;
            font-size:14px;background:#e8f5e9;color:#2e7d32;`);
        this.element.textContent="0$";
        anchorElement.parentElement?.insertBefore(this.element, anchorElement.nextSibling);
    }

    update(pay: number, url: string) {
        if (!this.element)
            return;
        this.element.textContent = `${pay}$`
        this.element.onclick = () => window.open(url, "_blank")
    }

    private remove() {
        document.getElementById(BADGE_ID)?.remove();
        this.element = null;
    }
}