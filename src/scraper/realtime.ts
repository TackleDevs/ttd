import puppeteer from 'puppeteer-extra';
import { DEFAULT_INTERCEPT_RESOLUTION_PRIORITY } from 'puppeteer';
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { scrollPageToBottom } from 'puppeteer-autoscroll-down';

export const getRealtimeLinks = async () => {
  try {
    puppeteer.use(
      AdblockerPlugin({
        interceptResolutionPriority: DEFAULT_INTERCEPT_RESOLUTION_PRIORITY,
      }),
    );
    puppeteer.use(StealthPlugin());

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    await page.setViewport({ width: 1280, height: 800 });
    await page.goto('https://www.twidouga.net/jp/realtime_t.php');

    await scrollPageToBottom(page, {
      size: 800,
      delay: 3000,
      stepsLimit: 10,
    });

    const links = await page.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll('#container a'));
      return anchors.map((anchor) => (anchor as HTMLAnchorElement).href);
    });

    await browser.close();
    const twitterLinks = links.filter((link, index) => {
      if (index % 2 === 1 && !link.includes('twimg')) {
        return link;
      }
    });
    const twiLinks = links.filter((link, index) => {
      if (index % 2 === 0 && !link.includes('twitter')) {
        return link;
      }
    });
    if (twitterLinks.length !== twiLinks.length) {
      new Error('scraping error');
    }
    return { twitterLinks, twiLinks };
  } catch (error) {
    console.error(error);
  }
};
