document.getElementById('toggle-form').addEventListener('click', toggleForm);
document.getElementById('auth-form').addEventListener('submit', handleFormSubmit);

let isLoginForm = true;

function toggleForm() {
    isLoginForm = !isLoginForm;
    const formTitle = document.getElementById('form-title');
    const toggleButton = document.getElementById('toggle-form');
    const form = document.getElementById('auth-form');

    if (isLoginForm) {
        formTitle.textContent = 'Login';
        toggleButton.textContent = "Don't have an account? Sign Up";
    } else {
        formTitle.textContent = 'Sign Up';
        toggleButton.textContent = 'Already have an account? Login';
    }

    form.reset();
}

function handleFormSubmit(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (isLoginForm) {
        // Handle login logic
        console.log('Logging in with', username, password);
        // Simulate successful login
        setTimeout(() => {
            alert('Login successful!');
            window.location.href = 'home.html'; // Redirect to home page
        }, 1000);
    } else {
        // Handle sign-up logic
        console.log('Signing up with', username, password);
        // Simulate successful sign-up
        setTimeout(() => {
            alert('Sign-up successful!');
            window.location.href = 'home.html'; // Redirect to home page
        }, 1000);
    }
}
