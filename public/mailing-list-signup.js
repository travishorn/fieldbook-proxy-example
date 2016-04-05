$(function() {
  'use strict';

  var signupForm = $('#signupForm');
  var errorDiv = $('#errorDiv');
  var errorList = $('#errorList');
  var successDiv = $('#successDiv');

  function showErrors(errors) {
    errors.map(function(error) {
      errorList.append('<li>' + error + '</li>');
    });

    errorDiv.show();
  }

  function hideErrors() {
    errorDiv.hide();
    errorList.html('');
  }

  function clearForm(form) {
    form.find('input[type=text]').val('');
  }

  function showSuccess() {
    successDiv.show();
  }

  function hideSuccess() {
    successDiv.hide();
  }

  signupForm.on('submit', function(e) {
    var emailAddress = $('#emailAddress').val();
    var errors = [];

    e.preventDefault();
    hideErrors();
    hideSuccess();

    if (!emailAddress) { errors.push('Please enter your email address.'); }

    if (!errors.length) {
      $.ajax({
        type: signupForm.attr('method'),
        url: signupForm.attr('action'),
        data: signupForm.serialize(),
      })
      .done(function(res) {
        if (res.code === 201) {
          clearForm(signupForm);
          showSuccess();
        } else {
          errors.push(res.body);
          showErrors(errors);
        }
      })
      .fail(function(jqXHR, textStatus, errThrown) {
        errors.push(errThrown);
        showErrors(errors);
      });
    } else {
      showErrors(errors);
    }
  });
});
