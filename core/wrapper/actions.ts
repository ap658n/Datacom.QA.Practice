import { Page, BrowserContext, expect, Locator } from "@playwright/test";

export default class ActionsWrapper {
	public page: Page;
	constructor(page: Page, public context: BrowserContext) {
		this.page = page;
	}

	async goto(url: string) {
		await this.page.goto(url, {
			waitUntil: "domcontentloaded"
		});
	}
	async waitAndClick(locator: string) {
		const element = this.page.locator(locator);
		await element.waitFor({
			state: "visible"
		});
		await element.click();
	}
	async navigateTo(link: string) {
		await Promise.all([
			this.page.waitForNavigation(),
			this.page.click(link)
		])
	}
	async closeLatestTab() {
		const pages = this.context.pages();
		const oldTab = pages[pages.length - 1];
		await oldTab.close();
		const newPages = this.context.pages();
		const newTab = newPages[newPages.length - 1];
		await newTab.waitForLoadState('domcontentloaded');
		this.page = await newTab;
		return newTab;
	}
	async switchToLatestTab() {
		const pages = this.context.pages();
		if (pages.length > 0) {
			const newTab = pages[pages.length - 1];
			await newTab.waitForLoadState('domcontentloaded');
			this.page = await newTab;
			return newTab;
		} else {
			throw new Error("Main tab is not available!");
		}
	}
	async selectDropDownItemsPerValue(locator: string, text: string) {
		const element = this.page.locator(locator);
		await element.waitFor({ state: 'visible' });
		try {
			await element.selectOption({ label: text });
			console.log('   > The text: ' + text + ' has been selected successfully\n')
		} catch {
			throw new Error(`Test failed: The "${text}" cannot find in the dropdown list.`);
		}

	}

	async type(locator: string, text: string) {
		const element = this.page.locator(locator);
		await element.waitFor({ state: 'visible' });
		await element.type(text);
		console.log('   > The text: ' + text + ' has been typed successfully\n')
	}
	async tickCheckbox(locator: string) {
		const checkbox = this.page.locator(locator);
		await checkbox.waitFor({ state: 'visible' });
		await checkbox.check();

		const isChecked = await checkbox.isChecked();
		if (isChecked) {
			console.log('> The checkbox is ticked successfully!\n');
		} else throw new Error('The checkbox is not ticked!');
	}
	async untickCheckbox(locator: string) {
		const checkbox = this.page.locator(locator);
		await checkbox.waitFor({ state: 'visible' });
		const isCheckedInitially = await checkbox.isChecked();
		if (isCheckedInitially) {
			await checkbox.uncheck();
			const isChecked = await checkbox.isChecked();
			if (!isChecked) {
				console.log('> The checkbox is unticked successfully!\n');
			} else {
				throw new Error('The checkbox is not unticked!');
			}
		} else {
			console.log('> The checkbox is already unticked.\n');
		}
	}
	async doubleClick(selector: string) {
		await this.page.waitForSelector(selector);
		const element = await this.page.$(selector);
		if (element) {
			await element.click({ clickCount: 2 });
			console.log(`   > The element '${selector}' has been successfully double-clicked!\n`);
		} else {
			throw new Error(`Element '${selector}' not found!`);
		}
	}
	async click(selector: string) {
		await this.page.waitForSelector(selector);
		await this.page.click(selector);
		console.log('   > The element has been successfully clicked!\n');
	}
	async clear(locator) {
		const element = this.page.locator(locator);
		await element.clear(locator);
	}
	async clearAndType(locator, text: string) {
		const element = this.page.locator(locator);
		await element.clear(locator);
		await element.type(text);
		console.log('   > The text: ' + text + ' has been typed successfully\n');
	}
	async hoverElement(page: any, selector: string) {
		await page.waitForSelector(selector);
		const elementHandle = await page.$(selector);
		await elementHandle.hover();
	}
	async getInputText(selector: string): Promise<string> {
		const inputElement = await this.page.$(selector);
		const inputValue = await inputElement?.evaluate((el: HTMLInputElement) => (el as HTMLInputElement).value);
		return inputValue || '';
	}
	async isCheckboxChecked(selector: string): Promise<boolean> {
		const checkboxElement = await this.page.$(selector);
		const isChecked = await checkboxElement?.evaluate((el: HTMLInputElement) => (el as HTMLInputElement).checked);
		return isChecked || false;
	}
	async getElementText(selector: string): Promise<string> {
		const element = await this.page.$(selector);
		if (element) {
			const text = await element.evaluate((el: HTMLElement) => el.textContent ? el.textContent.trim() : '');
			return text;
		}
		throw new Error(`Element with selector '${selector}' not found`);
	}
	async getElementValueID(selector: string): Promise<string> {
		const element = await this.page.$(selector);
		const idValue = await element?.evaluate((el: { id: string }) => el.id || '');
		return idValue || '';
	}

	async countElements(selectorOrXPath: string): Promise<number> {
		if (selectorOrXPath.startsWith('//')) {
			const elements = await this.page.locator('xpath=' + selectorOrXPath).count();
			return elements;
		} else {
			const elements = await this.page.$$(selectorOrXPath);
			return elements.length;
		}
	}
	async scrollToElement(selector: string): Promise<void> {
		await this.page.evaluate((selector) => {
			const element = document.querySelector(selector);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
			}
		}, selector);
	}
	async scrollToElementInModal(selector: string): Promise<void> {
		await this.page.evaluate(async (selector) => {
			const element = document.querySelector(selector);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
			}
		}, selector);
	}
	async scrollToElementByXpath(xpathSelector: string): Promise<void> {
		const elementHandle = await this.page.evaluateHandle((xpathSelector) => {
			const elements = document.evaluate(xpathSelector, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			const element = elements.singleNodeValue as HTMLElement;
			return element;
		}, xpathSelector);

		if (elementHandle) {
			await elementHandle.evaluate((element: HTMLElement) => {
				element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
			});
		} else {
			throw new Error(`Element with XPath selector '${xpathSelector}' not found.`);
		}
	}
	async scrollToWindow(pixels: number): Promise<void> {
		await this.page.evaluate((scrollPixels) => {
			window.scrollTo({ top: scrollPixels, behavior: 'smooth' });
		}, pixels);
		await this.page.waitForTimeout(2000);
	}
	async uploadFile(fileInputSelector: string, filePath: string): Promise<void> {
		await this.page.setInputFiles(fileInputSelector, filePath);
		console.log('> File: ' + filePath + ' is uploaded.\n')
	}


	/** ASSERT **/
	async assertTitle(title: string) {
		await expect(this.page).toHaveTitle(title);
	}
	async assertTitleContains(title: string) {
		const pageTitle = await this.page.title();
		expect(pageTitle).toContain(title);
	}
	async assertURL(url: string) {
		await expect(this.page).toHaveURL(url);
	}
	async assertURLContains(title: string) {
		const pageURL = this.page.url();
		expect(pageURL).toContain(title);
	}
	async validateVisibility(locator: string): Promise<void> {
		await this.page.waitForSelector(locator);
		const element = this.page.locator(locator);
		const isVisible = await element.isVisible();
		if (!isVisible) {
			throw new Error(`The element identified by the locator '${locator}' is not visible.`);
		} else {
			console.log(`   > The element identified by the locator is visible.\n`);
		}
	}
	async validateInvisibility(locator: string): Promise<void> {
		const element = this.page.locator(locator);
		const isHidden = await element.isHidden();
		if (isHidden) {
			console.log(`   > The element identified by the locator '${locator}' is no longer visible or present.\n`);
		} else {
			throw new Error(`The element identified by the locator '${locator}' is still visible or present.`);
		}
	}
	async assertVisibility(locator: string) {
		expect(this.validateVisibility(locator));
	}
	async getCurrentURL(): Promise<string> {
		const currentURL: string = this.page.url();
		return currentURL;
	}
	async stringContains(string: string, substring: string): Promise<void> {
		if (string.includes(substring)) {
			console.log(`> The string "${string}" contains "${substring}".`);
		} else {
			throw new Error(`Test failed: The string "${string}" does not contain "${substring}".`);
		}
	}
	async stringIsMatch(string: string, substring: string): Promise<void> {
		if (string.match(substring)) {
			console.log(`> The string "${string}" match "${substring}".`);
		} else {
			throw new Error(`Test failed: The string "${string}" does not match "${substring}".`);
		}
	}
	async isCheckboxTicked(selector: string): Promise<boolean> {
		const checkbox = await this.page.$(selector);
		if (!checkbox) {
			throw new Error(`Checkbox element with selector '${selector}' not found.`);
		}
		const isChecked = await checkbox.isChecked();
		return isChecked;
	}
	async isElementDropdown(selector: string): Promise<boolean> {
		const isDropdown = await this.page.evaluate((selector) => {
			const element = document.querySelector(selector);
			return element?.tagName.toLowerCase() === 'select';
		}, selector);
		return !!isDropdown;
	}
	async isElementRadioButton(selector: string): Promise<boolean> {
		const isRadio = await this.page.evaluate((selector) => {
			const element = document.querySelector(selector) as HTMLInputElement | null;
			return element?.type.toLowerCase() === 'radio';
		}, selector);
		console.log(selector);
		return !!isRadio;
	}
	async isElementClickableByXPath(xpath: string): Promise<void> {
		const locator: Locator = this.page.locator('xpath=' + xpath);
		const elementHandle = await locator.elementHandle();
		if (!elementHandle) {
			throw new Error(`The element identified by the XPath '${xpath}' was not found.`);
		}

		const isClickable = await elementHandle.evaluate((el) => {
			const computedStyle = getComputedStyle(el);
			return computedStyle.getPropertyValue('cursor') === 'pointer';
		});

		if (!isClickable) {
			throw new Error(`The element identified by the XPath '${xpath}' is not clickable.`);
		} else {
			console.log('   > The element is clickable!\n')
		}
	}
	async isOptionIncludedInSelect(selectId: string, optionText: string): Promise<boolean> {
		const selectElement = await this.page.$(`select#${selectId}`);
		if (!selectElement) {
			return false;
		}
		const options = await selectElement.$$eval('option', (elements) => elements.map((el) => el.textContent));
		return options.includes(optionText);
	}
	async isOptionSelected(selectorID: string, optionValueOrText: string): Promise<void> {
		const optionsSelector = "#" + selectorID + " option";
		const isOptionSelected = await this.page.$$eval(optionsSelector, (options, valueOrText) => {
			for (const option of options) {
				const htmlOption = option as HTMLOptionElement;
				if (htmlOption.value === valueOrText || htmlOption.textContent === valueOrText) {
					return htmlOption.selected;
				}
			}
			return false;
		}, optionValueOrText);

		if (!isOptionSelected) {
			throw new Error("The option with value or text '" + optionValueOrText + "' is not selected in the element with ID " + selectorID);
		}
		console.log("> The option with value or text '" + optionValueOrText + "' is selected.\n");
	}
	async hasVerticalScrollbar(selector: string): Promise<void> {
		const element = await this.page.$(selector);
		if (!element) {
			throw new Error(`Element with selector '${selector}' not found.`);
		}

		const hasScrollbar = await element.evaluate((el) => {
			return el.scrollHeight > el.clientHeight;
		});

		if (hasScrollbar) {
			console.log(`Element with selector '${selector}' has a vertical scrollbar.`);
		} else {
			console.log(`Element with selector '${selector}' does not have a vertical scrollbar.`);
		}
	}
	async isInputEnabled(inputSelector: any) {
		const inputElement = await this.page.$(inputSelector);
		if (!inputElement) {
			throw new Error(`Input element with selector '${inputSelector}' not found.`);
		}

		const isDisabled = await inputElement.getAttribute('disabled');
		if (isDisabled === 'true') {
			throw new Error(`Input element with selector '${inputSelector}' is disabled.`);
		}
		console.log(`Dropdown element with selector '${inputSelector}' is enabled.\n`);
	}
	async isButtonDisabled(inputSelector: any) {
		const inputElement = await this.page.$(inputSelector);
		if (!inputElement) {
			throw new Error(`Input element with selector '${inputSelector}' not found.`);
		}
		const isDisabled = await inputElement.getAttribute('disabled');
		if (isDisabled === 'disabled') {
			console.log(`Button is disabled.\n`);
		} else {
			throw new Error(`Button element with selector '${inputSelector}' is enabled.`);
		}
	}
	async isDropdownEnabled(dropdownSelector: any) {
		const dropdownElement = await this.page.$(dropdownSelector);
		if (!dropdownElement) {
			throw new Error(`Dropdown element with selector '${dropdownSelector}' not found.`);
		}

		const isDisabled = await dropdownElement.getAttribute('disabled');
		if (isDisabled === null || isDisabled.toLowerCase() === 'false') {
			console.log(`Dropdown element with selector '${dropdownSelector}' is enabled.\n`);
		} else {
			throw new Error(`Dropdown element with selector '${dropdownSelector}' is disabled.`);
		}
	}
}
