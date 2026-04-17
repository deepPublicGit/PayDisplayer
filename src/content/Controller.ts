import {PayService} from "../service/PayService";
import {PayBadge} from "./PayBadge";

const COMPANY_NAME_SELECTORS = [
    ".job-details-jobs-unified-top-card__company-name",
    ".job-details-jobs-unified-top-card__company-name a",
]

export class Controller {
    private badge: PayBadge;
    private payService: PayService;

    constructor() {
        this.payService = new PayService();
        this.badge = new PayBadge();
    }

    activate(): void {
        this.process();
    }

    private process(): void {
        const {companyName, element} = this.extractCompanyName();
        if (!companyName || !element) {
            console.log("PayDisplayer: No company name found");
            return;
        }
        console.log(`PayDisplayer: Found company name: ${companyName}`);
        this.onJobView(companyName, element);
    }

    private extractCompanyName(): {
        companyName: string | null;
        element: Element | null;
    } {
        for (const sel of COMPANY_NAME_SELECTORS) {
            const ele = document.querySelector(sel);
            if (ele && ele.textContent?.trim()) {
                return {companyName: ele.textContent.trim(), element: ele};
            }
        }
        return {companyName: null, element: null};
    }

    private async onJobView(companyName: string, element: Element) {
        console.log(`PayDisplayer: Injecting badge for ${companyName}`);
        this.badge.inject(element);
        const result = await this.payService.getPay(companyName);
        console.log(`PayDisplayer: Received pay data for ${companyName}:`, result);
        this.badge.update(result.pay, result.url);
    }
}

new Controller().activate();