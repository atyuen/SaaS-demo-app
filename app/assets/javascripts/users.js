/* global $, Stripe */
// above line tells file that jQuery is defined somewhere else

// Document ready
$(document).on('turbolinks:load', function() {
    
    var pro = $('#pro_form');
    var sbtn = $('#form-signup-btn');
    
    // Set Stripe key
    Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
    
    // When user clicks sign-up button
    sbtn.click(function(event) {
        // Prevent default behavior
        event.preventDefault();
        
        // Collect credit card fields
        var ccNum = $('#card_number').val(),
            cvvNum = $('#card_code').val(),
            expMonth = $('#card_month').val(),
            expYear = $('card_year').val();
        
        // Send card info to Stripe
        Stripe.createToken({
            number: ccNum,
            cvc: cvvNum,
            exp_month: expMonth,
            exp_year: expYear
        }, stripeResponseHandler);
        
        
    });
    
});