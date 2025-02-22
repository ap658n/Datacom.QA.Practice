import { test } from '../core/base/baseTestCase';
import { DataGenerator } from '../core/helper/dataGenerator';
import * as Data from '../test-data/userRegistration.json'


test.describe("CHALLENGE - Spot the BUGS! @QA", async () => {
  test.describe.configure({ mode: 'default' });

  test.beforeEach('Given user has test data, valid url and already in the QA Practice page.', async ({ home, baseURL, registerUser }) => {
    await test.step('When user navigated to QA Practice site.', async () => {
      await home.navigateToQAPracticeSite(baseURL);
      await home.validateHomePage();
    });
    await test.step('And user navigated to User Registrtion page.', async () => {
      await home.navigateToRegistrationPage();
    })
    await test.step('Then user should be redirected to User Registration page.', async () => {
      await registerUser.validateUserRegistrationPage();
    })
  })
  test('TC001-As a user I should be able to register user by providing all required fields.', async ({ registerUser }) => {
    const firstName = DataGenerator.generateFirstName();
    const lastName = DataGenerator.generateLastName();
    const country = DataGenerator.generateCountry();
    const phoneNumber = DataGenerator.generatePhoneNumber(country);
    const emailAddress = firstName + '.' + lastName + '@test.com';
    await test.step('When user filled all required fields .', async () => {
      await registerUser.enterFirstName(firstName);
      await registerUser.enterLastName(lastName);
      await registerUser.enterPhoneNumber(phoneNumber);
      await registerUser.selectCountry(country);
      await registerUser.enterEmail(emailAddress);
      await registerUser.enterPassword(DataGenerator.generatePassword());
    })
    await test.step('And user submit user registration.', async () => {
      await registerUser.submitRegistration();
    })
    await test.step('Then system should display registration results.', async () => {
      await registerUser.validateRegistrationMessage(Data.TC001.msg);
      await registerUser.validateRegistrationResultFirstName(firstName);
      await registerUser.validateRegistrationResultLastName(lastName);
      await registerUser.validateRegistrationResultPhoneNumber(phoneNumber);
      await registerUser.validateRegistrationResultCountry(country);
      await registerUser.validateRegistrationResultEmailAddress(emailAddress);
    })
  })
  test('TC002-As user I should be able to register user by providing all required fields and agreed in the terms and condition', async ({ registerUser }) => {
    const firstName = DataGenerator.generateFirstName();
    const lastName = DataGenerator.generateLastName();
    const country = DataGenerator.generateCountry();
    const phoneNumber = DataGenerator.generatePhoneNumber(country);
    const emailAddress = firstName + '.' + lastName + '@test.com';
    await test.step('When user filled all the fields.', async () => {
      await registerUser.enterFirstName(firstName);
      await registerUser.enterLastName(lastName);
      await registerUser.enterPhoneNumber(phoneNumber);
      await registerUser.selectCountry(country);
      await registerUser.enterEmail(emailAddress);
      await registerUser.enterPassword(DataGenerator.generatePassword());
    })
    await test.step('And user agree in the terms and conditions.', async () => {
      await registerUser.agreeInTheTermsAndCondition();
    })
    await test.step('And user submit user registration.', async () => {
      await registerUser.submitRegistration();
    })
    await test.step('Then system should display successful registration results.', async () => {
      await registerUser.validateRegistrationMessage(Data.TC002.msg);
      await registerUser.validateRegistrationResultFirstName(firstName);
      await registerUser.validateRegistrationResultLastName(lastName);
      await registerUser.validateRegistrationResultPhoneNumber(phoneNumber);
      await registerUser.validateRegistrationResultCountry(country);
      await registerUser.validateRegistrationResultEmailAddress(emailAddress);
    })
  })

  test('TC003-As user I should not be able to register with missing last name.', async ({ registerUser }) => {
    const firstName = DataGenerator.generateFirstName();
    const country = Data.TC003.country;
    const phoneNumber = DataGenerator.generatePhoneNumber(country);
    const emailAddress = firstName + '@test.com';
    await test.step('When user filled all the fields except last name.', async () => {
      await registerUser.enterFirstName(firstName);
      await registerUser.enterPhoneNumber(phoneNumber);
      await registerUser.selectCountry(country);
      await registerUser.enterEmail(emailAddress);
      await registerUser.enterPassword(DataGenerator.generatePassword());
    })
    await test.step('And user submit user registration.', async () => {
      await registerUser.submitRegistration();
    })
    await test.step('Then system should display successful registration results.', async () => {
      await registerUser.validateRegistrationMessage(Data.TC003.msg);
    })
  })

  test('TC004-As user I should not be able to register with invalid phone number.', async ({ registerUser }) => {
    const firstName = DataGenerator.generateFirstName();
    const lastName = DataGenerator.generateLastName();
    const country = Data.TC004.country;
    const phoneNumber = Data.TC004.phoneNumber;
    const emailAddress = firstName + '.' + lastName + '@test.com';
    await test.step('When user filled all the fields and set invalid phone number.', async () => {
      await registerUser.enterFirstName(firstName);
      await registerUser.enterLastName(lastName);
      await registerUser.enterPhoneNumber(phoneNumber);
      await registerUser.selectCountry(country);
      await registerUser.enterEmail(emailAddress);
      await registerUser.enterPassword(DataGenerator.generatePassword());
    })
    await test.step('And user submit user registration.', async () => {
      await registerUser.submitRegistration();
    })
    await test.step('Then system should display successful registration results.', async () => {
      await registerUser.validateRegistrationMessage(Data.TC004.msg);
    })
  })

  test('TC005-As user I should not be able to register with missing email.', async ({ registerUser }) => {
    const firstName = DataGenerator.generateFirstName();
    const lastName = DataGenerator.generateLastName();
    const country = Data.TC004.country;
    const phoneNumber = DataGenerator.generatePhoneNumber(country);
    await test.step('When user filled all the fields except email.', async () => {
      await registerUser.enterFirstName(firstName);
      await registerUser.enterLastName(lastName);
      await registerUser.enterPhoneNumber(phoneNumber);
      await registerUser.selectCountry(country);
      await registerUser.enterPassword(DataGenerator.generatePassword());
    })
    await test.step('And user submit user registration.', async () => {
      await registerUser.submitRegistration();
    })
    await test.step('Then system should display successful registration results.', async () => {
      await registerUser.validateRegistrationMessage(Data.TC005.msg);
    })
  })

  test('TC006-As user I should not be able to register with invalid password.', async ({ registerUser }) => {
    const firstName = DataGenerator.generateFirstName();
    const lastName = DataGenerator.generateLastName();
    const country = Data.TC006.country;
    const phoneNumber = DataGenerator.generatePhoneNumber(Data.TC006.country);
    const emailAddress = firstName + '.' + lastName + '@test.com';
    await test.step('When user filled all the fields and set invalid password.', async () => {
      await registerUser.enterFirstName(firstName);
      await registerUser.enterLastName(lastName);
      await registerUser.enterPhoneNumber(phoneNumber);
      await registerUser.selectCountry(country);
      await registerUser.enterEmail(emailAddress);
      await registerUser.enterPassword(Data.TC006.password);
    })
    await test.step('And user submit user registration.', async () => {
      await registerUser.submitRegistration();
    })
    await test.step('Then system should display successful registration results.', async () => {
      await registerUser.validateRegistrationMessage(Data.TC006.msg);
    })
  })
  test('TC007-As user I should not be able to validate all label are correct.', async ({ registerUser }) => {
    await test.step('And all labels and notes should be displayed correctly', async () => {
      await registerUser.validateFirstNameLabel();
      await registerUser.validateLastNameLabel();
      await registerUser.validatePhoneNumberLabel();
      await registerUser.validatePhoneNumberNotes();
      await registerUser.validateCountryLabel();
      await registerUser.validateEmailAddressLabel();
      await registerUser.validatePasswordLabel();
      await registerUser.validateTermsAndConditionLabel();
    })
  })
});