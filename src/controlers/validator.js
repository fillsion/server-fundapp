const { body, validationResult, check } = require('express-validator');


class validator {
    constructor(form){
        this.form = form;
    }

    validate(){
        return (this.validateMail()&&this.validateName()&&this.validateSurname()&& this.validateCity()&&this.validatePassword()&&this.validatePostal()&&this.validatePhone());
    }
    
    validateMail(){
    const emailToValidate = this.form.params.Mail;
   // const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
   const result = body(this.form.params.Mail).isEmail;
    if (result){
        return result;
    }alert("Name field wrong");
   return result;
   return body(emailToValidate).isEmail();//emailRegexp.test(emailToValidate); //this.form.param.Mails.isEmail();
}

    validateName(){
    const result = check(this.form.params.Name).isAlpha().optional;
    console.log("acaaaaaaaaaaaaaaaaa", this.form.params.Name," resultado:" ,result);
    if (result){
        return result;
    }alert("Name field wrong");
    return result;
    
}
    validateSurname(){
    const result = body(this.form.params.Surname).isAlpha;
    if (result){
        return result;
    }alert("Surname field wrong");
    return result;
}
    validatePassword(){
    const result= body(this.form.params.Password).isStrongPassword;
    if (result){
        return result;
    }alert("Password field wrong");
    return result;
}
    validatePhone(){
    const result = body(this.form.params.Name).isMobilePhone;
    if (result){
        return result;
    }alert("Phone field wrong");
    return result;
}
    validatePostal(){
    const result = body(this.form.params.PostalCode).isPostalCode;
    if (result){
        return result;
    }alert("Postal field wrong");
    return result;
}
    validateCity(){
    const result = body(this.form.params.PostalCity).isString;
    if (result){
        return result;
    }alert("City field wrong");
    return result;
}




}

module.exports=validator;