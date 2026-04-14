import {PayService} from "../service/PayService";

const DOM = [
    ".job-details-jobs-unified-top-card__company-name",
    ".job-details-jobs-unified-top-card__company-name a",
]

class Controller {
    private payService: PayService;

    constructor() {
        this.payService = new PayService();
    }

    private observeJobChanges(): void {

    }
}