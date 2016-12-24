/* global $, Stripe */
// above line tells file that jQuery is defined somewhere else

// Document ready
$(document).on('turbolinks:load', function() {
    var proForm = $('#pro_form');
    var sbtn = $('#form-signup-btn');
    
    // Set Stripe key
    Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
    
    // When user clicks sign-up button
    sbtn.click(function(event) {
        // Prevent default behavior and disable sign-up button
        event.preventDefault();
        sbtn.val("Processing").prop('disabled', true);
        
        // Collect credit card fields
        var ccNum = $('#card_number').val(),
            cvvNum = $('#card_code').val(),
            expMonth = $('#card_month').val(),
            expYear = $('card_year').val();
            
        // Use Stripe JS Library to check for card errors
        // error = true when there are errors
        var error = false;
        
        // Validate card number
        if ( !Stripe.card.validateCardNumber(ccNum) ) {
            error = true;
            alert('The credit card number appears to be invalid.');
        }
        // Validate CVC
        if ( !Stripe.card.validateCVC(cvvNum) ) {
            error = true;
            alert('The CVC appears to be invalid.');
        }
        // Validate expiration date
        if ( !Stripe.card.validateExpiry(expMonth, expYear) ) {
            error = true;
            alert('The expiration date appears to be invalid.');
        }
        
        if (error) {
            // If there are card errors, don't send to Stripe
            // and re-enable sign-up button
            sbtn.val("Sign Up").prop('disabled', false);
        } else {
            // Send card info to Stripe
            Stripe.createToken({
            number: ccNum,
            cvc: cvvNum,
            exp_month: expMonth,
            exp_year: expYear
            }, stripeResponseHandler);
        }
        
        return false;
    });
    
    // Stripe will return card token
    function stripeResponseHandler(status, response) {
        // Get token from response
        var token = response.id;
        
        // Inject card token in hidden field
        proForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );
        
        // Submit form to Rails App
        proForm.get(0).sumbit();
    }
});