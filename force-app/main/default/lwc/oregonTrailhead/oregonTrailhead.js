import { wire, api, LightningElement } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

export default class OregonTrailhead extends LightningElement {

    @api recordId;
    @api fields;
    @api sobject;
    @api message;

    errorMsg;
    record;

    @wire(getObjectInfo, { objectApiName: '$sobject' })
    objInfo;

    @wire(getRecord, {recordId: "$recordId", fields: '$combinedFields' })
    wiredRecord({ error, data }) {
        if (error) {
            this.errorMsg = 'Unknown error';
            if (Array.isArray(error.body)) {
                this.errorMsg = error.body.map(e => e.message).join(', ');
            } else if (typeof error.body.message === 'string') {
                this.errorMsg = error.body.message;
            }
        } else if (data) {
            this.record = data;
        }
    }

    get combinedFields() {
        return this.fields.split(',').map(f => `${this.sobject}.${f}`);
    }

    get fieldsToDisplay() {
        try {
            const record = this.record.fields;
            const info = this.objInfo.data.fields
            let result = [];
            Object.keys(record).forEach(rk => {
                Object.keys(info).forEach(fn => {
                    if(fn == rk) {
                        console.log(record[rk]);
                        result.push({
                            fieldLabel: info[fn].label,
                            value: record[rk].displayValue != null ? record[rk].displayValue : record[rk].value
                        })
                    }
                })
            });
            return result;
        }
        catch {
            this.errorMsg = 'Failed to load, is the comonent configuted correctly?'
        }
    }
}
