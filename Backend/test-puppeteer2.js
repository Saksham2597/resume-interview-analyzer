const chromium = require("@sparticuz/chromium").default;

async function run() {
    try {
        console.log("args:", chromium.args);
        console.log("executablePath:", await chromium.executablePath());
    } catch (err) {
        console.error(err);
    }
}
run();
