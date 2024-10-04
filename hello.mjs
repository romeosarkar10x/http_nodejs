import express from "express";

const port = 80;
const app = express();

app.listen(port, () => {
    console.log("listening on port", port);
});

const router = express.Router();
router.use((req, res, next) => {
    res.send(`<h1>hello world!</h1><p>your ip is ${req.ip}</p><p>${req.info}</p>`);
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

