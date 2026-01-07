import puppeteer from "puppeteer";
import os from "node:os";
import { PuppeteerAgent } from "@midscene/web/puppeteer";
import "dotenv/config"; // read environment variables from .env file

const sleep = (ms: number | undefined) => new Promise((r) => setTimeout(r, ms));
Promise.resolve(
  (async () => {
    const browser = await puppeteer.launch({
      headless: false, // 使用非 headless 模式，减少被检测的概率
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-blink-features=AutomationControlled", // 禁用自动化检测
        "--disable-infobars",
      ],
    });

    const page = await browser.newPage();

    // 设置 User-Agent 避免被检测为机器人
    await page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    // 隐藏 webdriver 特征
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, "webdriver", {
        get: () => undefined,
      });
    });
    await page.setViewport({
      width: 1280,
      height: 768,
      deviceScaleFactor: os.platform() === "darwin" ? 2 : 1, // this is used to avoid flashing on UI Mode when doing screenshot on Mac
    });

    await page.goto("https://id.bytello.com");
    await sleep(3000);

    // 👀 init Midscene agent
    const agent = new PuppeteerAgent(page);

    // 👀 type keywords, perform a search
    await agent.aiAct('账号输入 "chenshuofeng@cvte.com" ');

    await agent.aiAct('密码输入 "a1234567" ');

    await agent.aiAct("点击登录");

    // // 👀 wait for the loading
    // await agent.aiWaitFor("there is at least one headphone item on page");
    // // or you may use a plain sleep:
    await sleep(5000);

    // // 👀 understand the page content, find the items
    // const items = await agent.aiQuery<
    //   Array<{ itemTitle: string; price: number }>
    // >(
    //   "{itemTitle: string, price: Number}[], find item in list and corresponding price"
    // );
    // console.log("headphones in stock", items);

    // const isMoreThan1000 = await agent.aiBoolean(
    //   "Is the price of the first headphones more than 1000?"
    // );
    // console.log("isMoreThan1000", isMoreThan1000);

    // const price = await agent.aiNumber(
    //   "What is the price of the first headphone?"
    // );
    // console.log("price", price);

    // const name = await agent.aiString(
    //   "What is the name of the first headphone?"
    // );
    // console.log("name", name);

    // const location = await agent.aiLocate(
    //   "What is the location of the first headphone?"
    // );
    // console.log("location", location);

    // // 👀 assert by AI
    // await agent.aiAssert("There is a category filter on the top");

    // // 👀 click on the first item
    // await agent.aiTap("the first item in the list");

    await browser.close();
  })()
);
