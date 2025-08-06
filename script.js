// Sistema de autenticação
function isLoggedIn() {
    return localStorage.getItem('userLoggedIn') === 'true';
}

function login(email, password) {
    // Simulação de login - em produção, validar com servidor
    if (email && password) {
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        if (!localStorage.getItem('userCreatedAt')) {
            localStorage.setItem('userCreatedAt', new Date().toISOString());
        }
        return true;
    }
    return false;
}

function toggleProfileMenu() {
    const menu = document.getElementById('profileMenu');
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
}

function toggleProfileMenuMobile() {
    const menu = document.getElementById('profileMenuMobile');
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
}

function openProfile() {
    document.getElementById('profileModal').style.display = 'block';
    loadProfileData();
    closeProfileMenus();
}

function confirmLogout() {
    if (confirm('Tem certeza que deseja sair da sua conta?')) {
        logout();
    }
    closeProfileMenus();
}

function closeProfileMenus() {
    const menu = document.getElementById('profileMenu');
    const menuMobile = document.getElementById('profileMenuMobile');
    if (menu) menu.style.display = 'none';
    if (menuMobile) menuMobile.style.display = 'none';
}

function logout() {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userCreatedAt');
    window.location.href = 'index.html';
}

function loadProfileData() {
    const email = localStorage.getItem('userEmail');
    const createdAt = localStorage.getItem('userCreatedAt') || new Date().toISOString();
    
    document.getElementById('profileEmail').textContent = email;
    document.getElementById('profileCreated').textContent = new Date(createdAt).toLocaleDateString('pt-BR');
}

function closeProfile() {
    document.getElementById('profileModal').style.display = 'none';
}

function saveProfile() {
    const newEmail = document.getElementById('editEmail').value;
    const newPassword = document.getElementById('editPassword').value;
    
    if (newEmail && newEmail !== localStorage.getItem('userEmail')) {
        localStorage.setItem('userEmail', newEmail);
        alert('Email atualizado com sucesso!');
    }
    
    if (newPassword && newPassword.length >= 6) {
        alert('Senha atualizada com sucesso!');
    }
    
    updateAuthButton();
    closeProfile();
}

// Fechar menus ao clicar fora
document.addEventListener('click', function(event) {
    const profileButton = event.target.closest('[onclick*="toggleProfile"]');
    if (!profileButton) {
        closeProfileMenus();
    }
});

// Garantir que o botão seja atualizado após carregamento completo
window.addEventListener('load', function() {
    updateAuthButton();
});

// Verificar se precisa redirecionar para cadastro
function checkAuthAndRedirect() {
    if (!isLoggedIn()) {
        // Salvar a página que o usuário queria acessar
        localStorage.setItem('redirectAfterLogin', window.location.href);
        window.location.href = 'cadastro.html';
        return false;
    }
    return true;
}

// Formulários de cadastro/login
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

if (registerBtn) {
    registerBtn.addEventListener('click', () => {
        container.classList.add("active");
    });
}

if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        container.classList.remove("active");
    });
}



function redirectAfterLogin() {
    const redirectUrl = localStorage.getItem('redirectAfterLogin');
    if (redirectUrl && redirectUrl !== window.location.href) {
        localStorage.removeItem('redirectAfterLogin');
        window.location.href = redirectUrl;
    } else {
        window.location.href = 'recursos.html';
    }
}

// Verificar autenticação antes de acessar links
function checkAuthBeforeAccess(event, targetUrl) {
    if (!isLoggedIn()) {
        event.preventDefault();
        localStorage.setItem('redirectAfterLogin', targetUrl);
        window.location.href = 'cadastro.html';
        return false;
    }
    return true;
}

// Atualizar botão de login/logout
function updateAuthButton() {
    const authButton = document.getElementById('authButton');
    const authButtonMobile = document.getElementById('authButtonMobile');
    
    if (isLoggedIn()) {
        if (authButton) {
            authButton.innerHTML = `
                <div style="position: relative;">
                    <button onclick="toggleProfileMenu()" style="display: flex; align-items: center; justify-content: center; width: 45px; height: 45px; border-radius: 50%; font-size: 1.5rem; padding: 0;">👤</button>
                    <div id="profileMenu" style="display: none; position: absolute; right: 0; top: 50px; background: white; border-radius: 10px; box-shadow: 0 5px 20px rgba(0,0,0,0.2); min-width: 180px; z-index: 1000;">
                        <div onclick="openProfile()" style="padding: 12px 16px; cursor: pointer; border-bottom: 1px solid #eee; display: flex; align-items: center; gap: 8px;"><span>👤</span> Acessar Perfil</div>
                        <div onclick="confirmLogout()" style="padding: 12px 16px; cursor: pointer; display: flex; align-items: center; gap: 8px; color: #ff4757;"><span>🚪</span> Sair da Conta</div>
                    </div>
                </div>`;
        }
        if (authButtonMobile) {
            authButtonMobile.innerHTML = `
                <div style="position: relative;">
                    <button onclick="toggleProfileMenuMobile()" style="display: flex; align-items: center; justify-content: center; width: 45px; height: 45px; border-radius: 50%; font-size: 1.5rem; padding: 0;">👤</button>
                    <div id="profileMenuMobile" style="display: none; position: absolute; right: 0; top: 50px; background: white; border-radius: 10px; box-shadow: 0 5px 20px rgba(0,0,0,0.2); min-width: 180px; z-index: 1000;">
                        <div onclick="openProfile()" style="padding: 12px 16px; cursor: pointer; border-bottom: 1px solid #eee; display: flex; align-items: center; gap: 8px;"><span>👤</span> Acessar Perfil</div>
                        <div onclick="confirmLogout()" style="padding: 12px 16px; cursor: pointer; display: flex; align-items: center; gap: 8px; color: #ff4757;"><span>🚪</span> Sair da Conta</div>
                    </div>
                </div>`;
        }
    } else {
        if (authButton) {
            authButton.innerHTML = '<button><a href="cadastro.html">Entrar</a></button>';
        }
        if (authButtonMobile) {
            authButtonMobile.innerHTML = '<button><a href="cadastro.html">Entrar</a></button>';
        }
    }
}



// Menu mobile
function menuShow() {
    let menuMobile = document.querySelector('.mobile-menu');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
        document.querySelector('.icon').src = "assets/img/menu_white_36dp.svg";
    } else {
        menuMobile.classList.add('open');
        document.querySelector('.icon').src = "assets/img/close_white_36dp.svg";
    }
}

// Inicialização quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Atualizar botão de autenticação em todas as páginas
    setTimeout(updateAuthButton, 100);
    
    // Verificar autenticação em páginas protegidas
    if (window.location.pathname.includes('recursos.html') || 
        window.location.pathname.includes('assuntos.html') ||
        window.location.pathname.includes('tarefas.html') ||
        window.location.pathname.includes('planner.html') ||
        window.location.pathname.includes('cards.html')) {
        if (!checkAuthAndRedirect()) {
            return;
        }
    }
    
    // Processar formulários de cadastro/login
    const signUpForm = document.querySelector('.sign-up form');
    if (signUpForm) {
        signUpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('input[placeholder="Name"]').value;
            const email = this.querySelector('input[placeholder="Email"]').value;
            const password = this.querySelector('input[placeholder="Password"]').value;
            
            if (name && email && password && password.length >= 6) {
                if (login(email, password)) {
                    alert('Cadastro realizado com sucesso!');
                    redirectAfterLogin();
                }
            } else {
                alert('Por favor, preencha todos os campos. A senha deve ter pelo menos 6 caracteres.');
            }
        });
    }
    
    const signInForm = document.querySelector('.sign-in form');
    if (signInForm) {
        signInForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[placeholder="Email"]').value;
            const password = this.querySelector('input[placeholder="Senha"]').value;
            
            if (email && password) {
                if (login(email, password)) {
                    alert('Login realizado com sucesso!');
                    redirectAfterLogin();
                }
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        });
    }
});