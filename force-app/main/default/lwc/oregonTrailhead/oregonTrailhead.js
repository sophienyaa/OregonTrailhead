import { wire, api, LightningElement } from 'lwc';
import OREGON_TRAILHEAD from '@salesforce/resourceUrl/OregonTrailhead';
import { getRecord } from 'lightning/uiRecordApi';

const FIELDS = [
    'Opportunity.CloseDate',
    'Opportunity.StageName',
    'Opportunity.ForecastCategoryName',
    'Opportunity.NextStep',
    'Opportunity.Probability',
    'Opportunity.Amount'
];

export default class OregonTrailhead extends LightningElement {
   
    headerImg = `${OREGON_TRAILHEAD}/oregonTrailheadHeader.png`;

    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    opp;

    get closeDate() {
        return this.opp.data.fields.CloseDate.value;
    }
    get stage() {
        return this.opp.data.fields.StageName.value;
    }
    get forecastCategory() {
        return this.opp.data.fields.ForecastCategoryName.value;
    }
    get nextStep() {
        return this.opp.data.fields.NextStep.value;
    }
    get probability() {
        return this.opp.data.fields.Probability.value;
    }
    get amount() {
        return this.opp.data.fields.Amount.value;
    }
    //TODO: handle if multi curr is enabled
    get currencyCode() {
        return 'GBP';//this.opp.data.fields.CurrencyISOCode.value;
    }
}