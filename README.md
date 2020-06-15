This application was created for Cloud Computing Course. It's frontend for lobassa APP.

## Running the application

1. Modify `src/config/app-config.json` to match your user pool and application URLs. When running locally, the `signoutUri` will property need to be `http://localhost:3000/` and the `callbackUri` property will need to be `http://localhost:3000/callback`.
2. Run `npm install` to setup and install the dependencies.
3. Run `npm start` to start the application.
4. A browser session should automatically open, pointing at `http:localhost:3000`.

## JWT secured REST API service
This application will attempt to invoke a simple example REST API using the JWT access code returned in the callback from Cognito.

## Example
A running instance of this React application is hosted at ******