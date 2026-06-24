
const isLoggedIn = localStorage.getItem('isLoggedIn');

if (isLoggedIn) {
  window.location.replace('amazon.html');

}


document.querySelector('.login-btn')
  .addEventListener('click', () => {

    const phoneNumber =
      document.querySelector('.phone-input').value;

    const errorText =
      document.querySelector('.error-text');

    if (phoneNumber.length !== 10) {

      errorText.innerHTML =
        'Please enter a valid 10 digit number';

      return;
    }

    errorText.innerHTML = '';

    localStorage.setItem('isLoggedIn', 'true');

    window.location.href = 'amazon.html';
  });