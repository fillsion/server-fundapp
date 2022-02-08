const { body, validationResult } = require('express-validator');


class validator {

    const validate=()=>{
        return (validateMail()&&validateName()&&validateSurname()&& validateCity()&&validatePassword()&&validatePostal()&&validatePhone());
    }
    
const validateMail=()=>{
    const emailToValidate = form.params.Mail;
   // const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return body(emailToValidate).isEmail();//emailRegexp.test(emailToValidate); //form.param.Mails.isEmail();
}

const validateName=()=>{
    const result = body(form.params.Name).isAlpha;
    if (result){
        return result;
    }alert("Name field wrong");
    return result;
    
}
const validateSurname=()=>{
    const result = body(form.params.Surname).isAlpha;
    if (result){
        return result;
    }alert("Surname field wrong");
    return result;
}
const validatePassword=()=>{
    const result= body(form.params.Password).isStrongPassword;
    if (result){
        return result;
    }alert("Password field wrong");
    return result;
}
const validatePhone=()=>{
    const result = body(form.params.Name).isMobilePhone;
    if (result){
        return result;
    }alert("Phone field wrong");
    return result;
}
const validatePostal=()=>{
    const result = body(form.params.PostalCode).isPostalCode;
    if (result){
        return result;
    }alert("Postal field wrong");
    return result;
}
const validateCity=()=>{
    const result = body(form.params.PostalCity).isString;
    if (result){
        return result;
    }alert("City field wrong");
    return result;
}




}

export default validator;