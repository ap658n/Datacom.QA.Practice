import { uniqueNamesGenerator, Config, names, animals, colors, countries, NumberDictionary } from 'unique-names-generator';
import { generatePhoneNumber } from "phone-number-generator-js";
const firstNameconfig: Config = {
    dictionaries: [names]
}
const lastNameconfig: Config = {
    dictionaries: [animals, colors],
    separator: ''
}
const countryconfig: Config = {
    dictionaries: [countries],
    style: 'capital'
}

const numberDictionary = NumberDictionary.generate({ min: 10000000000, max: 9999999999 });
const emailDictionary = NumberDictionary.generate({ min: 100, max: 999 });

export class DataGenerator {
    

    static generateFirstName() {
        const firstname: string = uniqueNamesGenerator(firstNameconfig);
        return firstname;
    }

    static generateLastName() {
        const lastname: string = uniqueNamesGenerator(lastNameconfig);
        return lastname;
    }
    static generatePhoneNumber(value) {
        const phoneNumber = generatePhoneNumber({countryName: value });
        return phoneNumber;
    }
    static generateEmail(){
        const email: string = uniqueNamesGenerator({
            dictionaries: [colors,animals,emailDictionary],
            length: 3,
            separator: ''
        });
        return email+'@test.com';
    }
    static generatePassword(){
        const password: string = uniqueNamesGenerator({
            dictionaries: [colors,animals,emailDictionary],
            length: 3,
            separator: '',
            style: 'capital'
        });
        return password+'@';
    }
    static generateCountry() {
        const country: string = uniqueNamesGenerator(countryconfig);
        return country;
    }
}