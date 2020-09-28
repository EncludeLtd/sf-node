//================================================================================
// Modules
//================================================================================
const jsforce = require('jsforce'); // https://jsforce.github.io/ <-- Very good documentation for this library
const { getJWTToken } = require('salesforce-jwt-promise'); // https://www.npmjs.com/package/salesforce-jwt-promise
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

//================================================================================
// Environment Variables, etc. (See Readme.md)
//================================================================================
const clientId = process.env.SF_CLIENT_ID // SF Connected App Consumer Key
const privateKey = fs.readFileSync(__dirname + '/certificates/server.key').toString('utf8') // Read SSL Certificate from file
const audience = process.env.ENVIRONMENT === 'production' ? 'https://login.salesforce.com' : 'https://test.salesforce.com'; // Production / Sandbox login URL
const userName = process.env.SF_USER // Salesforce User username

//================================================================================
// Authentication
//================================================================================
async function getAccessToken() {
   const claim = {
      clientId: clientId,
      privateKey: privateKey,
      userName: userName,
      audience: audience
   }
   
   const auth = await getJWTToken(claim);
   console.log('*** Your Auth Response ***');
   console.log(auth);
   console.log('');
   await makeQuery(auth);
   // Uncomment below to try second query
   // await getRecordById(auth);
}

//================================================================================
// Querying Data
//================================================================================
async function makeQuery(auth) {

   // Create new connection, with acquired access token
   const conn = new jsforce.Connection();
   await conn.initialize({
      instanceUrl: auth.instance_url, // ex: https://foodclosb1--foodclosb1.my.salesforce.com
      accessToken: auth.access_token // Access token returned from the JWT claim
   });

   // Write raw SOQL queries https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql.htm
   const q = "SELECT Id, Name, Order_Day__c, Order_Time__c FROM Service_Engagement__c WHERE Status__c = 'Offered'";
   try {
      const results = await conn.query(q);
      console.log('*** Your Query Results ***');
      console.log(results)
   } catch(e) {
      console.error(e)
   }
}

// An example using jsforce helper functions
async function getRecordById(auth) {

    // Create new connection, with acquired access token
   const conn = new jsforce.Connection();
   await conn.initialize({
      instanceUrl: auth.instance_url,
      accessToken: auth.access_token
   });

   try {
      // Get SObject "Service_Engagement__c" record with the ID of "a0y3O00000043RXQAY"
      const results = await conn.sobject('Service_Engagement__c').retrieve('a0y3O00000043RXQAY');
      console.log('*** Your Query Results ***');
      console.log(results)
   } catch(e) {
      console.error(e)
   }
}

// No top-level async :( Just disregard this.
(async () => {
   try {
       await getAccessToken();
   } catch (e) {
      console.error(e)
   }
})();