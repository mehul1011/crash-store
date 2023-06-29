const replace = require("replace-in-file");
const fs = require("fs");

// Read the environment variables from Netlify
const apiKey = process.env.FIREBASE_API_KEY; // Replace with your own variable names
const production = true;
const authDomain = process.env.FIREBASE_AUTH_DOMAIN;
const projectId = process.env.FIREBASE_PROJECT_ID;
const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;
const messagingSenderId = process.env.FIREBASE_MESSAGING_SENDER_ID;
const appId = process.env.FIREBASE_APP_ID;
const measurementId = process.env.FIREBASE_MEASUREMENT_ID;

// Path to the template file
const filePath = "./src/environments/environment.prod.template.ts";

// Path to the output file
const outputFile = "./src/environments/environment.prod.ts";

// Define the replacement options
const options = {
  files: filePath,
  from: [
    /REPLACE_WITH_ENVIRONMENT_PRODUCTION/,
    /REPLACE_WITH_ENVIRONMENT_API_KEY/,
    /REPLACE_WITH_AUTH_DOMAIN/,
    /REPLACE_WITH_PROJECT_ID/,
    /REPLACE_WITH_STORAGE_BUCKET/,
    /REPLACE_WITH_MESSAGING_SENDER_ID/,
    /REPLACE_WITH_APP_ID/,
    /REPLACE_WITH_MEASUREMENT_ID/,
  ],
  to: [
    production,
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
  ],
};

// Perform the replacement
replace.sync(options);

// Copy the modified file to the output location
fs.copyFileSync(filePath, outputFile);
