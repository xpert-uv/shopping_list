const express = require('express');
const app = express();
const shoppingRoute = require('./route');
const expressError = require('./expressError');
var cors = require('cors')

app.use(cors());
app.use(express.json());
app.use("/list", shoppingRoute);


app.use(function (req, res, next) {
    return new expressError("Not Found", 404);
});

/** general error handler */

app.use((err, req, res, next) => {
    res.status(err.status || 500);

    return res.json({
        error: err.message,
    });
});

module.exports = app;