document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('changePasswordForm');
    
    form.onsubmit = function(e) {
      e.preventDefault();
      // Get the values from the form
      var username = document.getElementById('username').value;
      var oldPassword = document.getElementById('oldpassword').value;
      var newPassword = document.getElementById('newpassword').value;
      var confirmPassword = document.getElementById('assertpassword').value;
      
      // Validate the input fields
      if (!username || !oldPassword || !newPassword || !confirmPassword) {
        alert('Please fill in all fields.');
        return false;
      }
      
      if (newPassword !== confirmPassword) {
        alert('The new passwords do not match.');
        return false;
      }
      
      // TODO: Implement your password change logic here
      // This could be an AJAX request to your server
      console.log('Password change requested for username: ' + username);
      
      // Example: Reset the form after submission
      form.reset();
      
      return false; // Remove this line if using AJAX
    };
  });
  