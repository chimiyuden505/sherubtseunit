// =========================================
//   JOIN CLUB PAGE — join-club.js
// =========================================

// Fee per year
const FEES = { 1: 300, 2: 300, 3: 250, 4: 250 };

let otpSent      = false;
let generatedOtp = '';
let otpTimer     = null;
let countdown    = 0;

// ── Update fee badge when year changes ──────────────────────────
document.getElementById('year').addEventListener('change', function () {
  const fee = FEES[this.value] || 300;
  document.getElementById('feeLabel').textContent = 'Unit Fee: Nu. ' + fee;
});

// ── Allow only digits in account number ────────────────────────
document.getElementById('accountNum').addEventListener('input', function () {
  this.value = this.value.replace(/\D/g, '');
});

// ── Allow only digits in OTP field ────────────────────────────
document.getElementById('otpInput').addEventListener('input', function () {
  this.value = this.value.replace(/\D/g, '');
});

// ── Show terms & conditions popup ─────────────────────────────
function showTerms(e) {
  e.preventDefault();
  alert(
    'Terms & Conditions:\n\n' +
    '1. Membership fee is non-refundable.\n' +
    '2. Members must abide by all club rules and regulations.\n' +
    '3. The fee will be auto-deducted after OTP verification.\n' +
    '4. Membership is valid for the current academic year only.\n' +
    '5. The club reserves the right to revoke membership for misconduct.'
  );
}

// ── Send / Resend OTP ──────────────────────────────────────────
function handleOtp() {
  const acc    = document.getElementById('accountNum').value.trim();
  const accErr = document.getElementById('accErr');

  // Validate account number first
  if (!acc || acc.length < 8) {
    accErr.textContent = 'Enter a valid account number (min 8 digits).';
    const input = document.getElementById('accountNum');
    input.classList.add('shake');
    setTimeout(() => input.classList.remove('shake'), 400);
    return;
  }
  accErr.textContent = '';

  // Clear existing timer
  if (otpTimer) clearInterval(otpTimer);

  // Generate 6-digit OTP
  generatedOtp = String(Math.floor(100000 + Math.random() * 900000));
  otpSent      = true;
  countdown    = 60;

  const btn    = document.getElementById('otpBtn');
  const input  = document.getElementById('otpInput');
  const status = document.getElementById('otpStatus');

  // Enable OTP input
  input.disabled = false;
  input.value    = '';
  input.focus();

  // In production: call your SMS/email API here instead of alert()
  alert('OTP sent!\n(Demo mode — your OTP is: ' + generatedOtp + ')');

  status.className   = 'otp-status info';
  status.textContent = 'OTP sent. Valid for 60s.';

  // Start countdown
  btn.disabled = true;
  otpTimer = setInterval(() => {
    countdown--;
    if (countdown <= 0) {
      clearInterval(otpTimer);
      btn.disabled       = false;
      btn.textContent    = 'Resend OTP';
      status.className   = 'otp-status error';
      status.textContent = 'OTP expired. Click Resend.';
    } else {
      status.textContent = 'OTP valid for ' + countdown + 's';
    }
  }, 1000);
}

// ── Validate all fields ────────────────────────────────────────
function validate() {
  let isValid = true;

  const name    = document.getElementById('fullName').value.trim();
  const course  = document.getElementById('course').value.trim();
  const acc     = document.getElementById('accountNum').value.trim();
  const otp     = document.getElementById('otpInput').value.trim();
  const terms   = document.getElementById('termsCheck').checked;

  // Clear previous errors
  document.getElementById('nameErr').textContent   = '';
  document.getElementById('courseErr').textContent = '';
  document.getElementById('accErr').textContent    = '';
  document.getElementById('otpErr').textContent    = '';

  if (!name) {
    document.getElementById('nameErr').textContent = 'Full name is required.';
    isValid = false;
  }

  if (!course) {
    document.getElementById('courseErr').textContent = 'Course is required.';
    isValid = false;
  }

  if (!acc || acc.length < 8) {
    document.getElementById('accErr').textContent = 'Enter a valid account number (min 8 digits).';
    isValid = false;
  }

  if (!otpSent) {
    document.getElementById('otpErr').textContent = 'Please send and enter the OTP first.';
    isValid = false;
  } else if (otp !== generatedOtp) {
    document.getElementById('otpErr').textContent = 'Incorrect OTP. Please try again.';
    isValid = false;
  }

  if (!terms) {
    alert('Please agree to the terms and conditions to proceed.');
    isValid = false;
  }

  return isValid;
}

// ── Handle form submission ─────────────────────────────────────
function handleSubmit() {
  if (!validate()) return;

  const btn = document.getElementById('submitBtn');
  btn.disabled      = true;
  btn.textContent   = 'Processing…';

  // Simulate API call delay (replace with your actual fetch/POST here)
  setTimeout(() => {
    document.getElementById('formContent').style.display = 'none';
    document.getElementById('successOverlay').classList.add('show');
  }, 1200);
}