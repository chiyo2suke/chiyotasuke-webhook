// Require express and body-parser
const express = require("express")
const bodyParser = require("body-parser")
const axios = require("axios")
const fs = require('fs');

// Initialize express and define a port
const app = express()
const PORT = 3000
const apiUrl = 'https://www.sumo-api.com/api/webhook/test?type=matchResults';
const body = {
  "name": "webhookTest",
  "destination": "https://chiyotasuke-webhook.vercel.app/hook",
  "secret": "chiyotasukeWantsWebhook",
  "subscriptions": {
    "endBasho": true
  }
};
var webhookData;

app.use(express.json());

app.get('/hook', (req, res) => {
  axios.post(apiUrl, body)
  .then(response => {
    // Handle successful response
    console.log('Success:', response.data);
    res.send("Webhook requested")
  })
  .catch(error => {
    // Handle errors
    console.error('Error:', error);
  });
})
app.use(express.json());
app.post('/hook', (req, res) => {
  const receivedData = req.body;

  console.log("Headers:")
  console.dir(req.headers);
  console.log("\nBody:")
  console.dir(receivedData);
  res.status(204).send("I received payload");
  webhookData = receivedData;
});

// Start express on the defined port
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
})