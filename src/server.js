const { PORT } = require('./common/config');
const app = require('./app');

(async () => {
    try {
        await app.listen(PORT);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
})();
