"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("../config"));
const api_1 = __importDefault(require("../api"));
const auth_1 = __importDefault(require("../services/auth"));
exports.default = (app) => {
    app.get('/status', (req, res) => {
        res.status(200).end();
    });
    app.head('/status', (req, res) => {
        res.status(200).end();
    });
    // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    // It shows the real origin IP in the heroku or Cloudwatch logs
    app.enable('trust proxy');
    // The magic package that prevents frontend developers going nuts
    // Alternate description:
    // Enable Cross Origin Resource Sharing to all origins by default
    app.use((0, cors_1.default)());
    (0, auth_1.default)(app);
    // Transforms the raw string of req.body into json
    app.use((0, express_1.json)());
    app.use(config_1.default.api.prefix, (0, api_1.default)());
};
