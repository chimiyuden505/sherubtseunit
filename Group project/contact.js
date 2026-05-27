
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('navbar').classList.toggle('menu-open');
});


document.getElementById('sendBtn').addEventListener('click', function () {
  const consent = document.getElementById('consent');
  if (!consent.checked) {
    alert('Please agree to the collection of your information first.');
    return;
  }
  this.textContent = '✓ Message Sent!';
  this.classList.add('success');
  setTimeout(() => {
    this.textContent = 'Send Message';
    this.classList.remove('success');
  }, 2500);
});