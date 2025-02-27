import { BrowserContext, Page } from "@playwright/test";
import ActionsWrapper from "../wrapper/actions";

export default class RegisterUserPage {
    
    private actions: ActionsWrapper;

    constructor(public readonly page: Page, public readonly context: BrowserContext) { 
        this.actions = new ActionsWrapper(page, context);
    }
    private Elements = {
        userRegistrationHeader: "//h2[normalize-space()='CHALLENGE - Spot the BUGS!']",
        registerButton: "//button[@id='registerBtn']",
        firstNameTextField: "//input[@id='firstName']",
        lastNameTextField: "//input[@id='lastName']",
        phoneNumberTextField: "//input[@id='phone']",
        countryDropdownMenu: "//select[@id='countries_dropdown_menu']",
        emailAddressTextField: "//input[@id='emailAddress']",
        passwordTextField: "//input[@id='password']",
        termsAndConditionCheckBox: "//input[@id='exampleCheck1']",
        registrationMessage: "//div[@id='message']",
        resultFirstName: "//div[@id='resultFn']",
        resultLastName: "//div[@id='resultLn']",
        resultPhoneNumber: "//div[@id='resultPhone']",
        resultCountry: "//div[@id='country']",
        resultEmail: "//div[@id='resultEmail']",
        firstNameLabel: "//label[@for='firstName']",
        lastNameLabel: "//input[@id='lastName']//preceding-sibling::label",
        phoneNumberLabel: "//input[@id='phone']//preceding-sibling::label",
        countryLabel: "//select[@id='countries_dropdown_menu']//preceding-sibling::label",
        emailLabel: "//label[@for='exampleInputEmail1']",
        passwordLabel: "//label[@for='exampleInputPassword1']",
        termsAndConditionLabel: "//label[@for='exampleCheck1']",
        mandatoryNotes: "//small[@id='lnHelp']",
        phonesNumberNotes: "//small[@id='phoneHelp']",
        passwordNotes: "//small[@id='pwHelp']",
    }
   
    async validateUserRegistrationPage(){
        console.log(`Validate User Registration page is displayed`);
        await this.actions.validateVisibility(this.Elements.userRegistrationHeader);
        await this.actions.validateVisibility(this.Elements.registerButton);
    }
    async enterFirstName(value){
        console.log(`User enter first name ${value}`);
        await this.actions.validateVisibility(this.Elements.firstNameTextField);
        await this.actions.type(this.Elements.firstNameTextField,value);
    }
    
    async enterLastName(value){
        console.log(`User enter last name ${value}`);
        await this.actions.validateVisibility(this.Elements.lastNameTextField);
        await this.actions.type(this.Elements.lastNameTextField,value);
    }

    async enterPhoneNumber(value){
        console.log(`User enter phone number ${value}`);
        await this.actions.validateVisibility(this.Elements.phoneNumberTextField);
        await this.actions.type(this.Elements.phoneNumberTextField,value);
    }
    async selectCountry(value){
        console.log(`User select country ${value}`);
        await this.actions.validateVisibility(this.Elements.countryDropdownMenu);
        await this.actions.selectDropDownItemsPerValue(this.Elements.countryDropdownMenu,value);
    }
    async enterEmail(value){
        console.log(`User enter email address ${value}`);
        await this.actions.validateVisibility(this.Elements.emailAddressTextField);
        await this.actions.type(this.Elements.emailAddressTextField,value);
    }
    async enterPassword(value){
        console.log(`User enter password ${value}`);
        await this.actions.validateVisibility(this.Elements.passwordTextField);
        await this.actions.type(this.Elements.passwordTextField,value);
    } 
    async agreeInTheTermsAndCondition(){
        console.log(`Agree in Terms and condition`);
        await this.actions.validateVisibility(this.Elements.termsAndConditionCheckBox);
        await this.actions.click(this.Elements.termsAndConditionCheckBox);
        await this.actions.isCheckboxChecked(this.Elements.termsAndConditionCheckBox);
    }
    async submitRegistration(){
        console.log(`Submit user registration`);
        await this.actions.validateVisibility(this.Elements.registerButton);
        await this.actions.click(this.Elements.registerButton);
    }
    async validateRegistrationMessage(value){
        console.log(`Submit user registration`);
        await this.actions.validateVisibility(this.Elements.registrationMessage);
        const result = await this.actions.getElementText(this.Elements.registrationMessage);
        await this.actions.stringIsMatch(result, value);
    }
    async validateRegistrationResultFirstName(value){
        console.log(`Validate user registration result first name`);
        await this.actions.validateVisibility(this.Elements.resultFirstName);
        const result = await this.actions.getElementText(this.Elements.resultFirstName);
        await this.actions.stringContains(result, value);
    }
    async validateRegistrationResultLastName(value){
        console.log(`Validate user registration result last name`);
        await this.actions.validateVisibility(this.Elements.resultLastName);
        const result = await this.actions.getElementText(this.Elements.resultLastName);
        await this.actions.stringContains(result, value);
    }
    async validateRegistrationResultPhoneNumber(value){
        console.log(`Validate user registration result phone number`);
        await this.actions.validateVisibility(this.Elements.resultPhoneNumber);
        const result = await this.actions.getElementText(this.Elements.resultPhoneNumber);
        await this.actions.stringContains(result, value);
    }
    async validateRegistrationResultCountry(value){
        console.log(`Validate user registration result country`);
        await this.actions.validateVisibility(this.Elements.resultCountry);
        const result = await this.actions.getElementText(this.Elements.resultCountry);
        await this.actions.stringContains(result, value);
    }
    async validateRegistrationResultEmailAddress(value){
        console.log(`Validate user registration result email address`);
        await this.actions.validateVisibility(this.Elements.resultEmail);
        const result = await this.actions.getElementText(this.Elements.resultEmail);
        await this.actions.stringContains(result, value);
    }
    async validateFirstNameLabel(){
        console.log(`Validate user registration form first name label.`);
        await this.actions.validateVisibility(this.Elements.firstNameLabel);
        const result = await this.actions.getElementText(this.Elements.firstNameLabel);
        await this.actions.stringIsMatch(result, 'First Name');
    }

    async validateLastNameLabel(){
        console.log(`Validate user registration form last name label.`);
        await this.actions.validateVisibility(this.Elements.lastNameLabel);
        const result = await this.actions.getElementText(this.Elements.lastNameLabel);
        await this.actions.stringIsMatch(result, 'Last Name*');
    }
    async validatePhoneNumberLabel(){
        console.log(`Validate user registration form phone number label.`);
        await this.actions.validateVisibility(this.Elements.phoneNumberLabel);
        const result = await this.actions.getElementText(this.Elements.phoneNumberLabel);
        await this.actions.stringIsMatch(result, 'Phone Number*');
    }
    async validateCountryLabel(){
        console.log(`Validate user registration form country label.`);
        await this.actions.validateVisibility(this.Elements.countryLabel);
        const result = await this.actions.getElementText(this.Elements.countryLabel);
        await this.actions.stringIsMatch(result, 'Country');
    }
    async validateEmailAddressLabel(){
        console.log(`Validate user registration form email address label.`);
        await this.actions.validateVisibility(this.Elements.emailLabel);
        const result = await this.actions.getElementText(this.Elements.emailLabel);
        await this.actions.stringIsMatch(result, 'Email Address*');
    }
    async validatePasswordLabel(){
        console.log(`Validate user registration form password label.`);
        await this.actions.validateVisibility(this.Elements.passwordTextField);
        const result = await this.actions.getElementText(this.Elements.passwordLabel);
        await this.actions.stringIsMatch(result, 'Password*');
    }
    async validateMandatoryNotes(){
        console.log(`Validate user registration form mandatory notes.`);
        await this.actions.validateVisibility(this.Elements.mandatoryNotes);
        const result = await this.actions.getElementText(this.Elements.mandatoryNotes);
        await this.actions.stringIsMatch(result, 'Note: All the fields marked with * are mandatory');
    }
    async validatePhoneNumberNotes(){
        console.log(`Validate user registration form phone number notes.`);
        await this.actions.validateVisibility(this.Elements.phonesNumberNotes);
        const result = await this.actions.getElementText(this.Elements.phonesNumberNotes);
        await this.actions.stringIsMatch(result, 'Phone length validation: at least 10 digits');
    }
    async validatePasswordNotes(){
        console.log(`Validate user registration form password notes.`);
        await this.actions.validateVisibility(this.Elements.passwordNotes);
        const result = await this.actions.getElementText(this.Elements.passwordNotes);
        await this.actions.stringIsMatch(result, 'Psw length validation: [6,20] characters');
    }
    async validateTermsAndConditionLabel(){
        console.log(`Validate user registration form terms and condition label.`);
        await this.actions.validateVisibility(this.Elements.termsAndConditionLabel);
        const result = await this.actions.getElementText(this.Elements.termsAndConditionLabel);
        await this.actions.stringIsMatch(result, 'I agree with the terms and conditions');
    }
}