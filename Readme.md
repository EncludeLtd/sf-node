# Salesforce JWT Bearer Flow Example (using the jsforce library)
This repository is meant to demonstrate how to obtain an access token using Salesforce's OAuth 2.0 JWT Bearer (Server-to-Server) Flow.

Code examples are written in JavaScript, and use the [jsforce](https://www.npmjs.com/package/jsforce) and [salesforce-jwt-promise](https://www.npmjs.com/package/salesforce-jwt-promise) libraries. This documentation assumes the connected app will be implemented in [Nodejs](https://nodejs.org/)

## Setup

### .env
Create a file ".env" in the root directory for the environment variables with the following variables
```
ENVIRONMENT={development / production}
SF_CLIENT_ID={SF Connected App Consumer Key}
SF_USER={SF User username with permissions to use the connected app}
```

### Certificates
Generate the connected app SSL certs and put the .key file into the [./certificates](/certificates) directory
- [Setting up the Connected App](https://trailhead.salesforce.com/en/content/learn/modules/sfdx_travis_ci/sfdx_travis_ci_connected_app)

### Install Depdendencies and Run
```bash
npm install
```

```bash
npm start
```

## Sources and Additional Information
 - [Create Your Connected App Trailhead](https://trailhead.salesforce.com/en/content/learn/modules/sfdx_travis_ci/sfdx_travis_ci_connected_app)
 - [OAuth 2.0 JWT Bearer Flow for Server-to-Server Integration](https://help.salesforce.com/articleView?id=remoteaccess_oauth_jwt_flow.htm&type=5)
 - [REST API Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_what_is_rest_api.htm)
 - [Explore the Salesforce APIs with a Postman Collection](https://developer.salesforce.com/blogs/2020/03/explore-the-salesforce-apis-with-a-postman-collection.html)
