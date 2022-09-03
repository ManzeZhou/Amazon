const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_51LcFEFGdUtBcZh373oSbewz6Rl938x7MUYudbcn3S61YuQTn2z1KNLRMxbP7GPuwobAb0Zc5DiR6VTSoR9laEmFy00J5fPlKrz');

// API config
const app = express();

// Middlewares
app.use(cors({ origin: true}));
app.use(express.json());


// API route
app.get('/', (request, response) => response.status(200).send('Hello World'))

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;

    console.log('Payment Request Received for this amount --->', total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, //subunits
        currency: "usd",
    });
    // OK CREATED
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

// Listen command
exports.api = functions.https.onRequest(app)

//example
//http://localhost:5001/app-88a2a/us-central1/api
