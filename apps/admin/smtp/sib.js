import SibApiV3Sdk from 'sib-api-v3-sdk';

const sibClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
const apiKey = sibClient.authentications['api-key'];
apiKey.apiKey = process.env.SIB_API_KEY;

export default SibApiV3Sdk;
