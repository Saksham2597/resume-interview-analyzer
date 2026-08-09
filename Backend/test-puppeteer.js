const chromium = require("@sparticuz/chromium");
const puppeteer = require("puppeteer-core");

async function run() {
    try {
        const browser = await puppeteer.launch({
            args: chromium.args,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
        });
        console.log("Puppeteer launched successfully!");
        await browser.close();
    } catch (err) {
        console.error("Puppeteer launch failed:", err);
    }
}
run();
