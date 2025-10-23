document.addEventListener('DOMContentLoaded', function() {
    // Элементы
    const authElements = {
        loginBtn: document.getElementById('login-btn'),
        registerBtn: document.getElementById('register-btn'),
        logoutBtn: document.getElementById('logout-btn'),
        userProfile: document.getElementById('user-profile'),
        usernameDisplay: document.getElementById('username-display'),
        loginModal: document.getElementById('login-modal'),
        registerModal: document.getElementById('register-modal'),
        loginForm: document.getElementById('login-form'),
        registerForm: document.getElementById('register-form'),
        navLinks: document.querySelectorAll('.nav-link')
    };

    // Инициализация
    initAuthSystem();

    function initAuthSystem() {
        if (!checkElements(authElements)) return;
        setupEventListeners();
        checkAuthStatus();
    }

    function checkElements(elements) {
        for (const [key, element] of Object.entries(elements)) {
            if (!element && key !== 'logoutBtn') {
                console.error(`Элемент ${key} не найден`);
                return false;
            }
        }
        return true;
    }

    function setupEventListeners() {
        authElements.loginBtn?.addEventListener('click', () => showModal(authElements.loginModal));
        authElements.registerBtn?.addEventListener('click', () => showModal(authElements.registerModal));
        authElements.logoutBtn?.addEventListener('click', logoutUser);

        document.querySelectorAll('.close').forEach(btn => {
            btn.addEventListener('click', closeAllModals);
        });

        window.addEventListener('click', (event) => {
            if (event.target === authElements.loginModal || event.target === authElements.registerModal) {
                closeAllModals();
            }
        });

        authElements.loginForm.addEventListener('submit', handleLogin);
        authElements.registerForm.addEventListener('submit', handleRegister);

        authElements.navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (link.classList.contains('locked')) {
                    e.preventDefault();
                    alert('Для доступа необходимо авторизоваться');
                    showModal(authElements.loginModal);
                }
            });
        });
    }

    async function handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        if (!email || !password) {
            showError('login-error', 'Заполните все поля');
            return;
        }

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Ошибка входа');
            }

            localStorage.setItem('vetClinicToken', data.token);
            localStorage.setItem('vetClinicUser', JSON.stringify(data.user));

            updateUIAfterLogin(data.user.name);
            closeAllModals();
            updateNavigation(true);
            showSuccess('Вход выполнен успешно!');
        } catch (error) {
            showError('login-error', error.message);
        }
    }

    async function handleRegister(e) {
        e.preventDefault();
        const formData = {
            name: document.getElementById('reg-name').value,
            email: document.getElementById('reg-email').value,
            phone: document.getElementById('reg-phone').value,
            password: document.getElementById('reg-password').value,
            confirm: document.getElementById('reg-confirm').value
        };

        if (formData.password !== formData.confirm) {
            showError('register-error', 'Пароли не совпадают');
            return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Ошибка регистрации');
            }

            // Автовход после регистрации
            await handleLogin(e);
        } catch (error) {
            showError('register-error', error.message);
        }
    }

    function updateUIAfterLogin(username) {
        authElements.usernameDisplay.textContent = username;
        authElements.userProfile.style.display = 'block';
        if (authElements.loginBtn) authElements.loginBtn.style.display = 'none';
        if (authElements.registerBtn) authElements.registerBtn.style.display = 'none';
    }

    function logoutUser() {
        localStorage.removeItem('vetClinicToken');
        localStorage.removeItem('vetClinicUser');
        authElements.userProfile.style.display = 'none';
        if (authElements.loginBtn) authElements.loginBtn.style.display = 'block';
        if (authElements.registerBtn) authElements.registerBtn.style.display = 'block';
        updateNavigation(false);
        window.location.href = 'index.html';
    }

    function updateNavigation(isAuthorized) {
        authElements.navLinks.forEach(link => {
            link.classList.toggle('locked', !isAuthorized);
            link.classList.toggle('unlocked', isAuthorized);
        });
    }

    function checkAuthStatus() {
        const user = JSON.parse(localStorage.getItem('vetClinicUser'));
        if (user) {
            updateUIAfterLogin(user.name);
            updateNavigation(true);
        } else {
            updateNavigation(false);
        }
    }

    // Вспомогательные функции
    function showModal(modal) {
        modal.style.display = 'block';
        clearErrors();
    }

    function closeAllModals() {
        authElements.loginModal.style.display = 'none';
        authElements.registerModal.style.display = 'none';
        clearErrors();
    }

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });
    }

    function showError(elementId, message) {
        const element = document.getElementById(elementId);
        if (element) element.textContent = message;
    }

    function showSuccess(message) {
        alert(message);
    }
});

// Защита страниц
if (!localStorage.getItem('vetClinicToken') && !window.location.pathname.endsWith('index.html')) {
    alert('Доступ запрещен. Пожалуйста, авторизуйтесь.');
    window.location.href = 'index.html';
}