import {FetchMessage, FetchResponse, Result} from "../model/Models";

const BASE_URL = "";

export class Scraper {
    private maxRetries: number;

    constructor(maxRetries: number = 3) {
        this.maxRetries = maxRetries;
    }

    async scrape(companyName: string): Promise<Result> {
        return this.attempt(companyName, 0);
    }

    private async attempt(companyName: string, retryCount: number): Promise<Result> {
        const url = `${(BASE_URL)}/${companyName}/salaries`;
        try {
            const message: FetchMessage = {type: "FETCH_LEVELS", url};
            const response: FetchResponse = await chrome.runtime.sendMessage(message);

            if (!response.success || !response.html) {
                return {pay: 0, url:url};
            }
            return {pay: this.parseResponse(response.html, companyName), url:url};
        } catch (e) {
            console.error(e);
            if (retryCount < this.maxRetries) {
                return this.attempt(companyName, retryCount + 1);
            }
            return {pay: 0, url:url};
        }
    }

    private parseResponse(html: string, companyName: string): number {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const body = doc.body?.textContent || "";
        const salary = body.match(/\$[\d,]+k?/gi)

        const parsedSalary = salary
            .map((s) => {
                let num = s.replace(/[$,]/g, "");
                return parseFloat(num);
            })
            .filter((s) => !isNaN(s) && s > 0)
            .sort((a,b) => a-b);

        return parsedSalary[-1];
    }
}