let usernameRef = document.getElementById("username");
let passwordRef = document.getElementById("password");
let eyeL = document.querySelector(".eyeball-l");
let eyeR = document.querySelector(".eyeball-r");
let handL = document.querySelector(".hand-l");
let handR = document.querySelector(".hand-r");

let normalEyeStyle = () => {
  eyeL.style.cssText = `
    left:0.6em;
    top: 0.6em;
  `;
  eyeR.style.cssText = `
  right:0.6em;
  top:0.6em;
  `;
};

let normalHandStyle = () => {
  handL.style.cssText = `
        height: 2.81em;
        top:8.4em;
        left:7.5em;
        transform: rotate(0deg);
    `;
  handR.style.cssText = `
        height: 2.81em;
        top: 8.4em;
        right: 7.5em;
        transform: rotate(0deg)
    `;
};
//When clicked on username input
usernameRef.addEventListener("focus", () => {
  eyeL.style.cssText = `
    left: 0.75em;
    top: 1.12em;  
  `;
  eyeR.style.cssText = `
    right: 0.75em;
    top: 1.12em;
  `;
  normalHandStyle();
});
//When clicked on password input
passwordRef.addEventListener("focus", () => {
  handL.style.cssText = `
        height: 6.56em;
        top: 3.87em;
        left: 11.75em;
        transform: rotate(-155deg);    
    `;
  handR.style.cssText = `
    height: 6.56em;
    top: 3.87em;
    right: 11.75em;
    transform: rotate(155deg);
  `;
  normalEyeStyle();
});
//When clicked outside username and password input
document.addEventListener("click", (e) => {
  let clickedElem = e.target;
  if (clickedElem != usernameRef && clickedElem != passwordRef) {
    normalEyeStyle();
    normalHandStyle();
  }
});
// Function to handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  // Simulate login logic (replace with actual authentication logic)
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;

  // Example: Check if username and password are valid (simple check)
  if (username === 'user' && password === 'password') {
    alert('Login successful!'); // Replace with actual action (redirect, etc.)
    // Here you can save login information, implement session handling, etc.
  } else {
    alert('Invalid username or password. Please try again.');
  }
});

// Function to toggle between login and registration forms
document.getElementById('toggleOtherSignin').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent default link behavior

  // Toggle display of other sign-in options
  document.getElementById('socialLoginButtons').style.display = 'none';
  document.getElementById('otherSigninOptions').style.display = 'block';
});

// Function for Google Sign-in callback
function onGoogleSignIn(googleUser) {
  // Handle Google sign-in callback (you can implement specific actions here)
  console.log('Google user information:', googleUser);
}

// Example: Additional social sign-in buttons functionality (Twitter and GitHub)
document.getElementById('twitterSignIn').addEventListener('click', function() {
  alert('Sign in with Twitter functionality goes here.');
});

document.getElementById('githubSignIn').addEventListener('click', function() {
  alert('Sign in with GitHub functionality goes here.');
});
function payNow(projectName, amount) {
  var options = {
      "key": "YOUR_RAZORPAY_KEY_ID", // Enter the Key ID generated from the Razorpay Dashboard
      "amount": amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 means 50000 paise or INR 500.
      "currency": "INR",
      "name": "Project Hub",
      "description": projectName,
      "image": "https://example.com/your_logo.jpg", // Add your logo URL
      "handler": function (response){
          alert("Payment successful for " + projectName + "! Payment ID: " + response.razorpay_payment_id);
          // You can write code to store payment details in the database
      },
      "prefill": {
          "name": "Your Name",
          "email": "your.email@example.com",
          "contact": "9999999999"
      },
      "notes": {
          "address": "Your Address"
      },
      "theme": {
          "color": "#F37254"
      }
  };
  var rzp1 = new Razorpay(options);
  rzp1.on('payment.failed', function (response){
      alert("Payment failed. Error: " + response.error.description);
  });
  rzp1.open();
}
