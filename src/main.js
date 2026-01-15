// Registration Form Handler
const registrationForm = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');
const submitText = document.getElementById('submitText');
const submitLoading = document.getElementById('submitLoading');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');

// Configuration - Replace with your Mailchimp configuration
// Or use alternatives like Formspree, EmailJS, etc.
const CONFIG = {
    // Option 1: Mailchimp (requires API key and list ID)
    mailchimp: {
        enabled: false, // Set to true if using Mailchimp
        apiKey: 'YOUR_MAILCHIMP_API_KEY', // Replace with your API key
        listId: 'YOUR_MAILCHIMP_LIST_ID', // Replace with your List ID
        serverPrefix: 'us1', // Replace with your Mailchimp server prefix (usually us1, us2, etc.)
    },
    
    // Option 2: Formspree (free up to 50 submissions/month)
    formspree: {
        enabled: true, // Set to true if using Formspree
        formId: 'YOUR_FORMSPREE_FORM_ID', // Replace with Form ID from Formspree
    },
    
    // Option 3: EmailJS (free tier)
    emailjs: {
        enabled: false, // Set to true if using EmailJS
        serviceId: 'YOUR_EMAILJS_SERVICE_ID',
        templateId: 'YOUR_EMAILJS_TEMPLATE_ID',
        publicKey: 'YOUR_EMAILJS_PUBLIC_KEY',
    }
};

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show error message
function showError(message) {
    errorText.textContent = message;
    errorMessage.classList.remove('hidden');
    successMessage.classList.add('hidden');
    setTimeout(() => {
        errorMessage.classList.add('hidden');
    }, 5000);
}

// Show success message
function showSuccess() {
    successMessage.classList.remove('hidden');
    errorMessage.classList.add('hidden');
    registrationForm.reset();
}

// Set loading state
function setLoading(loading) {
    if (loading) {
        submitBtn.disabled = true;
        submitText.classList.add('hidden');
        submitLoading.classList.remove('hidden');
    } else {
        submitBtn.disabled = false;
        submitText.classList.remove('hidden');
        submitLoading.classList.add('hidden');
    }
}

// Submit to Mailchimp
async function submitToMailchimp(name, email) {
    const { apiKey, listId, serverPrefix } = CONFIG.mailchimp;
    const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members`;
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            email_address: email,
            status: 'subscribed',
            merge_fields: {
                FNAME: name
            }
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to subscribe');
    }

    return await response.json();
}

// Submit to Formspree
async function submitToFormspree(name, email) {
    const { formId } = CONFIG.formspree;
    const url = `https://formspree.io/f/${formId}`;
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            email: email,
            _subject: 'Flow AI Registration',
            _format: 'plain'
        })
    });

    if (!response.ok) {
        throw new Error('Failed to submit form');
    }

    return await response.json();
}

// Submit to EmailJS
async function submitToEmailJS(name, email) {
    const { serviceId, templateId, publicKey } = CONFIG.emailjs;
    
    // Load EmailJS library if not already loaded
    if (typeof emailjs === 'undefined') {
        await loadScript('https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js');
    }

    return await emailjs.send(serviceId, templateId, {
        from_name: name,
        from_email: email,
        to_name: 'Flow AI Team',
        message: `New registration: ${name} (${email})`
    }, publicKey);
}

// Load script dynamically
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// Handle form submission
registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    
    // Validation
    if (!name) {
        showError('Please enter your name');
        return;
    }
    
    if (!email) {
        showError('Please enter your email');
        return;
    }
    
    if (!validateEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }
    
    setLoading(true);
    
    try {
        // Try to submit based on enabled service
        if (CONFIG.mailchimp.enabled) {
            await submitToMailchimp(name, email);
        } else if (CONFIG.formspree.enabled) {
            await submitToFormspree(name, email);
        } else if (CONFIG.emailjs.enabled) {
            await submitToEmailJS(name, email);
        } else {
            throw new Error('No email service configured. Please configure Mailchimp, Formspree, or EmailJS in src/main.js');
        }
        
        showSuccess();
    } catch (error) {
        console.error('Registration error:', error);
        showError(error.message || 'An error occurred. Please try again later.');
    } finally {
        setLoading(false);
    }
});

console.log('Flow AI Registration Page loaded successfully!');
