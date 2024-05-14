const express = require('express');
const cors = require('cors');
require('dotenv/config');

const routes = require('./routes');

class App {
    constructor() {
        this.app = express();
        this.init();
    }

    init() {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use('/api', routes);
    }

    start() {
        this.app.listen(process.env.PORT, process.env.HOST, () => {
            console.log(`Server listening on HOST ${process.env.HOST} and PORT ${process.env.PORT}`);
        });
    }
}

module.exports = new App();