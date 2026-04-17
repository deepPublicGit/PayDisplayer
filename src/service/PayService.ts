import {Scraper} from "./Scraper";
import {Result} from "../model/Models";

export class PayService {
    private scraper: Scraper;
    constructor() {
        this.scraper = new Scraper();
    }
    async getPay(companyName:string): Promise<Result> {
        console.log(`PayService: Requesting pay for ${companyName}`);
        return await this.scraper.scrape(companyName);
    }
}