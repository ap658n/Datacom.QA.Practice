import { BrowserContext, Page } from "@playwright/test";
import ActionsWrapper from "../wrapper/actions";

export default class HomePage {
    private actions: ActionsWrapper;

    constructor(public readonly page: Page, public readonly context: BrowserContext) {
        this.actions = new ActionsWrapper(page, context);
    }
    private Elements = {
        welcomeHeader: "//h1[normalize-space()='Welcome!']",
        registerUserTab: "//a[@id='bugs-form']",
    }
    async navigateToQAPracticeSite(baseURL) {
        console.log(`Navigate to QA Practice Site.`);
        await this.actions.goto(baseURL);
    }
    async validateHomePage() {
        console.log(`Validate Homepage is displayed`);
        await this.actions.validateVisibility(this.Elements.welcomeHeader);
    }

    async navigateToRegistrationPage() {
        console.log(`Navigate to user registration page.`);
        await this.actions.validateVisibility(this.Elements.registerUserTab);
        await this.actions.click(this.Elements.registerUserTab);
    }



}