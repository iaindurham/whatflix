# whatflix

Movie title suggestions based on predefined user preferences

## Postman collection

A runnable Postman collection can be accessed here [here](https://web.postman.co/collections/2565815-7688c056-8c8d-4f9c-ad72-bcb8ce38380f?version=latest&workspace=a04eb6ae-95a9-4d05-8ce4-fb92cee1487b)

To run queries against the deployed version select `AWS` from the dropdown at the top of the collection

## Setup

Install Serverless CLI

For more info on serverless see [docs](https://serverless.com/framework/docs/)

```bash
npm install serverless -g
```

Install project dependencies
```bash
npm install
```

Install required version of node:

```bash
nvm use
```

## Run locally

Start app in offline mode

```bash
sls offline
```

## Deploying

Set up AWS credentials in preferred way. For options see [docs](https://serverless.com/framework/docs/providers/aws/guide/credentials/#create-an-iam-user-and-access-key)

```bash
sls deploy
```

## Decisions

### Pre processing .csv files

I/O of reading then the processing taken to parse and CSV files is quite intensive so decided to do this as an offline "build" step. The intention of this
is to be run then the outputted .json file be committed to the repo so it can be used in the code.

This had the added advantage of being able to combine and transform the data from the two CSV files into a data structure that was easier to use in the code.

To regenerate the data run:

```bash
npm run build
```

### Serverless framework and AWS

Serverless framework provides an easy way to deploy to cloud infrastructure. Serverless only charges per invocation so it is a cost effective service, it also
has builtin auto-scaling.

*Considerations*

Serverless does have it's issues one is "cold starts" where the first time a Lambda runs it takes longer than subsequent invocations. There is strategies to
mitigate this including pre-warming or keeping Lambda continually warm.

### Not using a Database

Was decided not to use a database to store the data to reduce the complexity of the solution. Doing the filtering in JS is not as efficient as some database
solutions would offer with their query interfaces but adding a database would have significantly increased the complexity of the solution which isn't
really needed
