import puppeteer from 'puppeteer-extra';
import { DEFAULT_INTERCEPT_RESOLUTION_PRIORITY } from 'puppeteer';
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

export const getDayLinks = async () => {
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
    await page.goto('https://www.twidouga.net/jp/ranking_t.php');

    let preLinks = await page.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll('.gazou a'));
      return anchors.map((anchor) => (anchor as HTMLAnchorElement).href);
    });
    preLinks = Array.from(new Set(preLinks));

    const links = preLinks.filter((link) => {
      if (link.includes('twimg')) {
        return link;
      }
    });

    await browser.close();
    return links;
  } catch (error) {
    console.error(error);
  }
};
