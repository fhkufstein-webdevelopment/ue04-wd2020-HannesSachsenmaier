function PasswordChecker(wrapperId, passwordField, passwordSubmitButtonId) {

    //following are attributes which could be seen as "constants"
    this.successClass = "success";
    this.warningClass = "warning";
    this.errorClass = "error";

    this.minLength = 8; //this is what we defined and what we need to consider in our length check

    //this attributes are set with our constructor
    this.wrapperField = document.getElementById(wrapperId);
    this.passwordField = document.getElementById(passwordField);
    this.passwordSubmitButton = document.getElementById(passwordSubmitButtonId);


    var that = this; //a trick because this is a keyword and means different things in a new context! Especially when you work with events or if you call functions outside your class "this" won't mean you!

    //TODO start
    //now for the events which should fire:
    //if we leave the password field (focus is lost) - JavaScript Method "onblur" for an input field in our case the field this.passwordField
    this.passwordField.onblur = function() {
        /*the keyword "this" is always referring to its context.
        onblur is an event which happens in "passwordField" -> so the keyword "this" would refer to the passwordField NOT to our class
        therefore we previously saved "this" in a variable called "that"*/
        that.check();
    };

    //if we enter the password field (focus is set) - JavaScript Method "onfocus" for an input field - again in our case the field this.passwordField
    this.passwordField.onfocus = function(){
        that.check();
    };

    //if we are in the password field an enter text - JavaScript Method "onkeyup" or "onkeup" - again in our case the field this.passwordField
    this.passwordField.onkeyup = function(){
        that.check();
    };

    //if we try to click the submit button - JavaScript Method "onclick" - in our case this.passwordSubmitButton
    this.passwordSubmitButton.onclick = function(){
        that.check();
    }

    this.check = function() {
        //we can only check if every field which with given Id exists
        //one of them would be null if one Id wouldn't exist therefore following statement would fail
        if(this.wrapperField && this.passwordField && this.passwordSubmitButton) {

            var longEnough = this.checkForLength();
            var hasSpecialChars = this.checkForSpecialCharacters();

            //if it is long enough and has a special character - everything is fine
            if(longEnough && hasSpecialChars) {
                this.wrapperField.className = this.successClass;
                this.passwordSubmitButton.disabled = false;
            } else if(!hasSpecialChars && longEnough) { //if it is long enough but it has no special character set class warning
                this.wrapperField.className = this.warningClass;
                this.passwordSubmitButton.disabled = true;
            } else { //if it is not long enough set class error
                this.wrapperField.className = this.errorClass;
                this.passwordSubmitButton.disabled = true;
            }


        } else {
            //obviously a field is null (we weren't able to find it)
            if (this.wrapperField == null){
                console.error("The Id wrapperField doesn't exist!");
            }else if (this.passwordField == null){
                console.error("The Id passwordField doesn't exist!");
            }else if (this.passwordSubmitButton == null){
                console.error("The Id passwordSubmitButton doesn't exist!");
            }else{
                console.error("Any Id is missing!!!");
            }
            // The console log shows now which ID is missing.
        }
    };

    /*
    This method should return true if the length of passwordField value is greater or equal to this.minLength
     */
    this.checkForLength = function() {
        var password = this.passwordField.value;
        console.log(password)
        if (password.length >= this.minLength){
            return true;
        }else {
            return false;
        }
    };


    this.checkForSpecialCharacters = function() {
        var password = this.passwordField.value;
        var specCar ="!\"\\§$%&/()=´`+*~#'-_.:;,<>|@€{[]}";
        // first loop gets the character of the password on the actual index
        for (var i = 0; i < password.length; i++){
            var passwordIndex = password.substr(i,1);
            // second loop compares the character of the password with all characters of the specCar String
            for (var j = 0; j < specCar.length; j++){
                var specCarIndex = specCar.substr(j,1);
                if (specCarIndex === passwordIndex){
                    var returnValue = true;
                    console.log(returnValue);
                    return true;
                }
            }
        }
        returnValue = false;
        console.log(returnValue);
        return false;
    };
}


