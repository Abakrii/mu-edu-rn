const validate = (val, rules, connectedValue) => {
    let isValid = true;
    for (let rule in rules) {
        switch (rule) {
            case "isName":
                isValid = isValid && nameValidator(val);
                break;
            case "isNationalId":
                isValid = isValid && nationalIdValidator(val);
                break
            case "isEmail":
                isValid = isValid && emailValidator(val);
                break;
            case "minLength":
                isValid = isValid && minLengthValidator(val, rules[rule]);
                break;
            case "equalTo":
                isValid = isValid && equalToValidator(val, connectedValue[rule]);
                break;
            default:
                isValid = true;
        }
    }

    return isValid;
};

const nameValidator = val => {
    return /^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_\s]*$/.test(val);

};
const nationalIdValidator = val =>{
    return    /^[0-9]*$/.test(val);


};

const emailValidator = val => {
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
        val
    );
};

const minLengthValidator = (val, minLength) => {
    return val.length >= minLength;
};

const equalToValidator = (val, checkValue) => {
    return val === checkValue;
};

export default validate;
