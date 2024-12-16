const contactForm = document.getElementById('contact-details');
const failedMessage = document.getElementById('failed-message');

contactForm.addEventListener('submit', () => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value.trim() || null;
    const subject = document.getElementById('subject').value;

    contactUs(name, email, phone, subject);
});


function contactUs(name, email, phone, subject) {
    console.log ('Name:', name, 'Email:', email, 'Phone:', phone, 'Subject:', subject);
    fetch('/contactUs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name, 
            email: email, 
            phone: phone, 
            subject: subject
            })
    }).then(response => response.text())
    .then(data => {
        window.location.href = '/home';
    }).catch(error => {
        console.error('Error contact:', error);
        failedMessage.classList.remove('hidden');
    });
}

