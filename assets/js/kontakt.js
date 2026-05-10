const EMAILJS_PUBLIC_KEY = 'z19NOm3-mX_8wzdSd';
const EMAILJS_SERVICE_ID = 'service_c2srcwl';
const EMAILJS_TEMPLATE_ID = '6cgwmtp';

if (window.emailjs) {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePhone(cislo) {
  return (
    /^[0][9][0|1|4|5]\d{7}$/.test(cislo) ||
    /^[+][4][2][1][9]\d{8}$/.test(cislo) ||
    /^[+][4][2][0]\d{9}$/.test(cislo) ||
    /^[+][4][9]\d{9}$/.test(cislo) ||
    /^[+][4][4]\d{10}$/.test(cislo) ||
    /^[+][4][3]\d{10}$/.test(cislo)
  );
}

// Highlight selected radio "card"
document.querySelectorAll('.rb-container label').forEach((label) => {
  label.addEventListener('click', function () {
    document.querySelectorAll('.rb-container').forEach((c) => c.classList.remove('active'));
    this.closest('.rb-container').classList.add('active');
  });
});

document.addEventListener('click', function (event) {
  const btn = event.target.closest('button.send');
  if (!btn) return;

  let errors = 0;
  document.querySelectorAll('.error').forEach((el) => (el.textContent = ''));

  const meno = document.getElementById('meno').value.trim();
  if (meno === '' || meno.length < 3) {
    errors++;
    document.querySelector('#meno + .error').textContent = 'Nezadali ste meno.';
  }

  const cislo = document.getElementById('cislo').value.trim();
  if (!validatePhone(cislo)) {
    errors++;
    document.querySelector('#cislo + .error').textContent = 'Nezadali ste číslo.';
  }

  const email = document.getElementById('email').value.trim();
  if (!validateEmail(email)) {
    errors++;
    document.querySelector('#email + .error').textContent = 'Nezadali ste email.';
  }

  let predmet;
  const checked = document.querySelector('input[name=predmet]:checked');
  if (!checked) {
    errors++;
    document.querySelector('.rb-container-whole > .error').textContent = 'Nevybrali ste predmet.';
  } else {
    predmet = checked.value;
  }

  const sprava = document.getElementById('sprava').value.trim();
  if (sprava === '' || sprava.length < 3) {
    errors++;
    document.querySelector('#sprava + .error').textContent = 'Nezadali ste správu.';
  }

  if (errors > 0) {
    Swal.fire({
      title: 'Odoslanie nebolo úspešné!',
      text: 'Skontrolujte si zadané údaje.',
      icon: 'error',
      customClass: { container: 'swal-custom' },
    });
    return;
  }

  if (!window.emailjs || EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
    Swal.fire({
      title: 'Formulár nie je nakonfigurovaný',
      text: 'Doplňte EmailJS klúče v súbore assets/js/kontakt.js',
      icon: 'warning',
      customClass: { container: 'swal-custom' },
    });
    return;
  }

  emailjs
    .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      meno: meno,
      cislo: cislo,
      email: email,
      predmet: predmet,
      sprava: sprava,
    })
    .then(
      function () {
        document.querySelectorAll('input[type=text]').forEach((i) => (i.value = ''));
        document.querySelectorAll('input[name=predmet]').forEach((i) => (i.checked = false));
        document.getElementById('sprava').value = '';
        document.querySelectorAll('.rb-container').forEach((c) => c.classList.remove('active'));

        Swal.fire({
          title: 'Ďakujeme, že ste nás kontaktovali!',
          text: 'Čoskoro sa Vám ozveme.',
          icon: 'success',
          customClass: { container: 'swal-custom' },
        });
      },
      function (err) {
        console.error('EmailJS error:', err);
        Swal.fire({
          title: 'Odoslanie nebolo úspešné!',
          text: 'Nastala neočakávaná chyba. Skúste to prosím neskôr.',
          icon: 'error',
          customClass: { container: 'swal-custom' },
        });
      }
    );
});
