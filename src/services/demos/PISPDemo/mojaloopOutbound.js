import axios from 'axios';
import { getConfig, getServerConfig } from '../../../utils/getConfig';
import { TraceHeaderUtils } from '@mojaloop/ml-testing-toolkit-shared-lib';
import _ from 'lodash';

class OutboundService {
    apiBaseUrl = '';

    inputValues = {};

    sessionId = '123';

    userConfig = {};

    customParams = {
        payerFspTransferExpirationOffset: 60 * 1000,
    };

    constructor(sessionId = '123') {
        const { apiBaseUrl } = getConfig();
        this.apiBaseUrl = apiBaseUrl;
        this.sessionId = sessionId;
        this.initEnvironment();
    }

    initEnvironment = async () => {
        await this.fetchUserConfig();
        await this.reloadEnvironment();
    };

    getSessionId() {
        return this.sessionId;
    }

    getTraceId() {
        const traceIdPrefix = TraceHeaderUtils.getTraceIdPrefix();
        const currentEndToEndId = TraceHeaderUtils.generateEndToEndId();
        return traceIdPrefix + this.sessionId + currentEndToEndId;
    }

    async fetchUserConfig() {
        const { userConfigRuntime } = await getServerConfig();
        this.userConfig = userConfigRuntime;
    }

    async reloadEnvironment() {
        const DEFAULT_ENVIRONMENT_FILE_NAME = this.userConfig ? this.userConfig.DEFAULT_ENVIRONMENT_FILE_NAME : 'hub-local-environment.json';
        const environmentURL = '/api/samples/loadFolderWise?environment=examples/environments/' + DEFAULT_ENVIRONMENT_FILE_NAME;
        const resp = await axios.get(this.apiBaseUrl + environmentURL);
        if(resp.data && resp.data.body && resp.data.body.environment) {
            this.inputValues = resp.data.body.environment;
        }
    }

    setCustomParams = newConfig => {
        _.merge(this.customParams, newConfig);
    };

    getCustomParams = () => {
        return this.customParams;
    };

    async getParties(idNumber) {
        const traceId = this.getTraceId();
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const template = require('./template_getParties.json');
        template.inputValues = this.inputValues;
        // Replace corresponding values in inputValues
        template.inputValues.toIdValue = idNumber + '';
        const resp = await axios.post(this.apiBaseUrl + '/api/outbound/template/' + traceId, template, { headers: { 'Content-Type': 'application/json' } });
        return resp;
    }

    async postQuotes(amount, currency) {
        const traceId = this.getTraceId();
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const template = require('./template_postQuotes.json');
        template.inputValues = this.inputValues;
        // Replace corresponding values in inputValues
        template.inputValues.amount = amount + '';
        template.inputValues.currency = currency + '';
        template.inputValues.fromFirstName = this.inputValues.fromFirstName;
        template.inputValues.fromLastName = this.inputValues.fromLastName;
        const resp = await axios.post(this.apiBaseUrl + '/api/outbound/template/' + traceId, template, { headers: { 'Content-Type': 'application/json' } });
        return resp;
    }

    async postTransfers(amount, transactionId, expiration, ilpPacket, condition) {
        const traceId = this.getTraceId();
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const template = require('./template_postTransfers.json');
        template.inputValues = this.inputValues;
        // Replace corresponding values in inputValues
        template.inputValues.amount = amount + '';
        template.inputValues.quotesCallbackTransactionId = transactionId + '';
        template.inputValues.quotesCallbackExpiration = expiration + '';
        template.inputValues.quotesCallbackIlpPacket = ilpPacket + '';
        template.inputValues.quotesCallbackCondition = condition + '';
        template.inputValues.expirationOffset = this.customParams.payerFspTransferExpirationOffset;
        const resp = await axios.post(this.apiBaseUrl + '/api/outbound/template/' + traceId, template, { headers: { 'Content-Type': 'application/json' } });
        return resp;
    }

    async startProvisioning() {
        const traceId = this.getTraceId();
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const template = require('./template_provisioning.json');
        template.inputValues = this.inputValues;
        const resp = await axios.post(this.apiBaseUrl + '/api/outbound/template/' + traceId, template, { headers: { 'Content-Type': 'application/json' } });
        return resp;
    }

    async getHubConsoleInitValues() {
        const traceId = this.getTraceId();
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const template = require('./template_getHubConsoleInitValues.json');
        template.inputValues = this.inputValues;
        const resp = await axios.post(this.apiBaseUrl + '/api/outbound/template/' + traceId, template, { headers: { 'Content-Type': 'application/json' } });
        return resp;
    }

    async getDFSPValues() {
        const traceId = this.getTraceId();
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const template = require('./template_getDFSPValues');
        template.inputValues = this.inputValues;
        const resp = await axios.post(this.apiBaseUrl + '/api/outbound/template/' + traceId, template, { headers: { 'Content-Type': 'application/json' } });
        return resp;
    }

    async getSettlements() {
        const traceId = this.getTraceId();
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const template = require('./template_getSettlements');
        template.inputValues = this.inputValues;
        const resp = await axios.post(this.apiBaseUrl + '/api/outbound/template/' + traceId, template, { headers: { 'Content-Type': 'application/json' } });
        return resp;
    }

    async executeSettlement(settlementModel) {
        const traceId = this.getTraceId();
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const template = require('./template_executeSettlement');
        template.inputValues = this.inputValues;
        // Replace corresponding values in inputValues
        template.inputValues.settlementModel = settlementModel + '';
        const resp = await axios.post(this.apiBaseUrl + '/api/outbound/template/' + traceId, template, { headers: { 'Content-Type': 'application/json' } });
        return resp;
    }

    // New Methods

    // async getLinkingProviders() {
    //     const traceId = this.getTraceId();
    //     // eslint-disable-next-line @typescript-eslint/no-var-requires
    //     const template = require('./template_getLinkingProviders.json');
    //     template.inputValues = this.inputValues;
    //     const resp = await axios.post(this.apiBaseUrl + '/api/outbound/template/' + traceId, template, { headers: { 'Content-Type': 'application/json' } });
    //     return resp;
    // }


    async getLinkingProviders() {
        const traceId = this.getTraceId();
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const template = require('./template_getLinkingProviders.json');
        template.inputValues = this.inputValues;
    
        // POST request directly to localhost:4040/linking/providers
        const resp = await axios.post('http://localhost:4040/linking/providers', template, {
            headers: { 'Content-Type': 'application/json' }
        });
        
        return resp;
    }
    

    async getLinkingAccounts() {
        const traceId = this.getTraceId();
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const template = require('./template_getLinkingAccounts.json');
        template.inputValues = this.inputValues;
        const resp = await axios.post(this.apiBaseUrl + '/api/outbound/template/' + traceId, template, { headers: { 'Content-Type': 'application/json' } });
        return resp;
    }

    async postThirdpartyTransactionApprove(transactionId, amount, currency) {
        const traceId = this.getTraceId();
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const template = require('./template_postThirdpartyTransactionApprove.json');
        template.inputValues = this.inputValues;
        // Replace corresponding values in inputValues
        template.inputValues.transactionId = transactionId + '';
        template.inputValues.amount = amount + '';
        template.inputValues.currency = currency + '';
        const resp = await axios.post(this.apiBaseUrl + '/api/outbound/template/' + traceId, template, { headers: { 'Content-Type': 'application/json' } });
        return resp;
    }

    async postThirdpartyTransactionInitiate(amount, currency, transactionId) {
        const traceId = this.getTraceId();
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const template = require('./template_postThirdpartyTransactionInitiate.json');
        template.inputValues = this.inputValues;
        // Replace corresponding values in inputValues
        template.inputValues.amount = amount + '';
        template.inputValues.currency = currency + '';
        template.inputValues.transactionId = transactionId + '';
        const resp = await axios.post(this.apiBaseUrl + '/api/outbound/template/' + traceId, template, { headers: { 'Content-Type': 'application/json' } });
        return resp;
    }

    // async postThirdpartyTransactionPartyLookup(partyId) {
    //     const traceId = this.getTraceId();
    //     // eslint-disable-next-line @typescript-eslint/no-var-requires
    //     const template = require('./template_postThirdpartyTransactionPartyLookup.json');
    //     template.inputValues = this.inputValues;
    //     // Replace corresponding values in inputValues
    //     template.inputValues.partyId = partyId + '';
    //     const resp = await axios.post(this.apiBaseUrl + '/api/outbound/template/' + traceId, template, { headers: { 'Content-Type': 'application/json' } });
    //     return resp;
    // }

    async postThirdpartyTransactionPartyLookup(partyId) {
        try {
            const transactionRequestId = this.getTransactionRequestId(); // Use a method to get transactionRequestId
    
            // Construct the request payload
            const payload = {
                transactionRequestId: transactionRequestId, // Ensure this method or value is properly defined
                payee: {
                    partyIdType: 'MSISDN', // Assuming 'MSISDN' is the required type
                    partyIdentifier: partyId + '' // Convert partyId to a string if necessary
                }
            };
    
            // Post the request
            const resp = await axios.post(
                'http://localhost:4040/thirdpartyTransaction/partyLookup',
                payload,
                { headers: { 'Content-Type': 'application/json' } }
            );
            return resp;
        } catch (error) {
            console.error('Error posting to thirdpartyTransactionPartyLookup:', error);
            throw error;
        }
    }
    
    async requestConsent(consentId, consentBody) {
        const traceId = this.getTraceId();
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const template = require('./template_requestConsent.json');
        template.inputValues = this.inputValues;
        // Replace corresponding values in inputValues
        template.inputValues.consentId = consentId + '';
        template.inputValues.consentBody = consentBody;
        const resp = await axios.post(this.apiBaseUrl + '/linking/request-consent/' + traceId, template, { headers: { 'Content-Type': 'application/json' } });
        return resp;
    }
    
}

    

export default OutboundService;
