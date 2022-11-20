# Serverless Api in NodeJS to search documents from OpenSearch® 
================================================================

Prerequisites
-------------

To run examples from this repository you'll need:

1. An OpenSearch cluster. You can `set it up manually <https://opensearch.org/downloads.html>`.
2. NodeJS and npm. If you don’t have NodeJS or npm installed, follow `these instructions <https://docs.npmjs.com/downloading-and-installing-node-js-and-npm>`_.


Deploying serverless functions using Serverless framework 
---------------------------------------------------------

1. npm install.

2. You should have AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY

3. serverless config credentials --provider aws --key <key> --secret <secret-key>

4. Set SERVICE_URI and REGION environment variable value.

5. sls deploy -s dev, where 's' is stage and 'dev' is the environment. 'sls' is shortform of serverless

6. You need to give user proper access to opensearch cluster.

7. Once deployment is successfully done, there will be a role created for lamda. Map that role in AWS OpenSearch Dashboard's Security > Roles.

To Run locally
----------------
1. npm run dev

To Debug locally
-----------------

1. It uses serverless-offline pluging which is already included in serverless.yml

2. Generate launch.json (if not already) and copy the content which is available in the repository.

3. Keep breakpoint where ever you want and then go to Run and Debug menu and start.

4. Go to Debug Console and see the urls which can be launch using postman.


Note : IndexName is hardcoded config.ts. Change it as per you have in your open search cluster.

You're all set! Retrieve the list of available indices by  

    GET | http://localhost:4000/dev/opensearch-api/indices


Structure of this repository
----------------------------

`serverless.yml` - contains the configurations of function

`src/functions` - contains serverless functions (handlers)

`src/functions/search.ts` - examples of different types of search queries

`src/functions/indices.ts` - get list of indices

`config.ts` and `helpers.ts` contain operations required to connect to the cluster and log responses.


License
-------

This work is licensed under the Apache License, Version 2.0. Full license text is available in the LICENSE file and at http://www.apache.org/licenses/LICENSE-2.0.txt





