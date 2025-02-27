import { chromium, test as baseTest, Page, firefox, Browser, BrowserContext, webkit, } from "@playwright/test";
import ActionsWrapper from "../wrapper/actions";


import RegisterUserPage from "../pages/registerUserPage";
import HomePage from "../pages/homePage";


let browser: Browser;
let context: BrowserContext;


baseTest.afterEach(async ({ page }) => {
    console.log('Closing sessions.');
})

type pages = {
    browserInstance: any;
    browserContext : any;
    actions: ActionsWrapper;
    home: HomePage;
    registerUser: RegisterUserPage;
    
}

const testPages = baseTest.extend<pages>({
    browserInstance: async ({ browserName, launchOptions }, use) => {
        if (browserName === 'chromium') {
          browser = await chromium.launch(launchOptions);
        } else if (browserName === 'firefox') {
          browser = await firefox.launch(launchOptions);
        } else if (browserName === 'webkit') {
          browser = await webkit.launch(launchOptions);
        } else {
          throw new Error(`Unknown browser: ${browserName}`);
        }
    
        console.log(`Using browser: ${browserName}`);
        await use(browser);
        await browser.close();
      },
    
    browserContext: async ({ browserInstance }, use) => {
        context = await browserInstance.newContext();
        await use(context);
        await context.close();
      },
    
    page: async ({ browserContext }, use) => {
        const page = await browserContext.newPage();
        await use(page);
        await page.close();
    },
    actions: async ({ page }, use) => {
        await use(new ActionsWrapper(page, context));
    },
    home: async ({ page }, use) => {
        await use(new HomePage(page, context));
    },
    registerUser: async ({ page }, use) => {
        await use(new RegisterUserPage(page, context));
    },
   
});

export const test = testPages;
export const expect = testPages.expect;