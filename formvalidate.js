/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the event object
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e)
{
	hideAllErrors();

	if(formHasErrors())
	{
		e.preventDefault();

		return false;
	}
	else
	{
		return true;
	}
}

/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors()
{
	var errorFlag = false;

	var requiredTextFields = ["fullname", "address", "phone", "email"];

	for(var i = 0; i < requiredTextFields.length; i++)
	{
		var textField = document.getElementById(requiredTextFields[i]);

		if(!fieldHasInput(textField))
		{
			document.getElementById(requiredTextFields[i] + "_error").style.display = "block";

			if(!errorFlag)
			{
				textField.focus();
			}

			errorFlag = true;
		}
	}

	var phone = document.getElementById("phone");

	if(phone.value.length != 10)
	{
		document.getElementById("phonelength_error").style.display = "block";

		errorFlag = true;
	}

	var regexEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

	var emailValue = document.getElementById("email").value;

	if(!regexEmail.test(emailValue))
	{
		document.getElementById("emailformat_error").style.display = "block";

		if(!errorFlag)
		{
			textField.focus();
			textField.select();
		}

		errorFlag = true;
	}

	var estimate = document.getElementById("estimatebox").value;

	if(estimate == "- Choice -")
	{
		document.getElementById("estimate_error").style.display = "block";

		errorFlag = true;
	}

	return errorFlag;
}

/*
 * Determines if a text field has input
 *
 * Param   field A text field input
 * Return  True if the field has an input, false if nothing was entered
 */
function fieldHasInput(field)
{
	if(field.value == null || field.value.trim() == "")
	{
		return false;
	}

	return true;
}

/*
 *	Hides all errors on the form
 */
function hideAllErrors()
{
	var errorFields = document.getElementsByClassName("error");

	for(var i = 0; i < errorFields.length; i++)
	{
		errorFields[i].style.display = "none";
	}
}

/*
 * Handles the reset event for the form.
 *
 * param e  A reference to the event object
 * return   True allows the reset to happen; False prevents
 *          the browser from resetting the form.
 */
function resetForm(e)
{
	if(confirm('Clear contact information?'))
	{
		hideAllErrors();
		
		document.getElementById("fullname").focus();
		
		return true;
	}

	e.preventDefault();
	
	return false;	
}

/*
 *	Handles the load event for the form
 */
function onLoad()
{
	hideAllErrors();

	document.getElementById("resetButton").addEventListener("click", resetForm);

	document.getElementById("submit").addEventListener("click", validate);

	document.getElementById("contactform").reset();
}

// Add document load event listener
document.addEventListener("DOMContentLoaded", onLoad, false);