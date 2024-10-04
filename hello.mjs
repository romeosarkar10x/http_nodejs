import express from "express";

const app = express();

app.listen(80, () => {
    console.log("Listening on Port 80");
});

const router = express.Router();
router.use((req, res, next) => {
    res.send(`<h1>Hello World!</h1><p>Your IP is ${req.ip}</p><p>${req.info}</p>`);
    next();
});

app.use(
    express.Router()
        .use((req, res, next) => {
            req.info = `[${req.method}] ${req.protocol}://${req.hostname}${req.url}`;
            console.log(new Date().toLocaleString(), req.ip, req.info);
            next();
        })
        .use(router)
);

