// Options avancées pour les cookies
const COOKIE_OPTIONS = {
    secure: true,
    sameSite: 'Lax',
    path: '/',
    domain: window.location.hostname
};

// Constantes pour le stockage des données
const USER_DATA_COOKIE_NAME = 'user_data';
const USER_DATA_VERSION = '1.0';

// Fonction pour collecter toutes les données utilisateur
function collectAllUserData() {
    const userData = {
        // Données de navigation
        pageViews: JSON.parse(localStorage.getItem('page_views') || '[]'),
        userActions: JSON.parse(localStorage.getItem('user_actions') || '[]'),

        // Données techniques
        userAgent: navigator.userAgent,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,

        // Données de localisation (approximative)
        geolocation: localStorage.getItem('geolocation') || null,

        // Données de formulaire (si disponibles)
        formData: JSON.parse(localStorage.getItem('form_data') || '[]'),

        // Cookies existants
        cookies: getAllCookies(),

        // Timestamp
        timestamp: new Date().toISOString(),
        version: USER_DATA_VERSION
    };

    return userData;
}

// Fonction pour enregistrer les données utilisateur dans un cookie
function saveUserData() {
    const userData = collectAllUserData();
    setCookie(USER_DATA_COOKIE_NAME, JSON.stringify(userData), 365); // Stocke pendant 1 an
    localStorage.setItem('user_data_backup', JSON.stringify(userData)); // Backup dans localStorage
}

// Fonction pour suivre les actions de l'utilisateur
function trackUserAction(action) {
    const actions = JSON.parse(localStorage.getItem('user_actions') || '[]');
    actions.push({
        action: action,
        timestamp: new Date().toISOString(),
        page: window.location.pathname
    });
    localStorage.setItem('user_actions', JSON.stringify(actions));
}

// Fonction pour suivre les pages visitées
function trackPageView() {
    const pageViews = JSON.parse(localStorage.getItem('page_views') || '[]');
    pageViews.push({
        page: window.location.pathname,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('page_views', JSON.stringify(pageViews));
}

// Fonction pour collecter les données de formulaire
function trackFormData(form) {
    const formData = JSON.parse(localStorage.getItem('form_data') || '[]');
    const formEntries = new FormData(form);
    const formObject = {};
    for (let [key, value] of formEntries.entries()) {
        formObject[key] = value;
    }
    formData.push({
        form: formObject,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('form_data', JSON.stringify(formData));
}

// Fonction pour collecter la géolocalisation (si l'utilisateur l'a déjà partagée)
function trackGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const geolocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    timestamp: new Date().toISOString()
                };
                localStorage.setItem('geolocation', JSON.stringify(geolocation));
            },
            (error) => {
                console.error('Erreur de géolocalisation :', error);
            }
        );
    }
}

// Fonction pour définir un cookie de manière forcée
function setCookie(name, value, days) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + (days || 365));
    const cookieString = `${name}=${encodeURIComponent(value)};expires=${expirationDate.toUTCString()};path=${COOKIE_OPTIONS.path};domain=${COOKIE_OPTIONS.domain};secure;sameSite=${COOKIE_OPTIONS.sameSite}`;
    document.cookie = cookieString;
}

// Fonction pour obtenir tous les cookies
function getAllCookies() {
    const cookies = {};
    const cookiesList = document.cookie.split(';');
    for (let cookie of cookiesList) {
        const [name, value] = cookie.trim().split('=');
        cookies[decodeURIComponent(name)] = decodeURIComponent(value);
    }
    return cookies;
}

// Fonction pour initialiser la collecte de données
function initializeDataCollection() {
    // Collecte des données de navigation
    trackPageView();
    trackUserAction('page_load');

    // Collecte des données de formulaire
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (event) => {
            trackFormData(form);
        });
    });

    // Collecte de la géolocalisation
    trackGeolocation();

    // Enregistrement des données utilisateur
    saveUserData();
}

// Démarrer la collecte de données au chargement de la page
document.addEventListener('DOMContentLoaded', initializeDataCollection);

// Fonction pour afficher la page de gestion des cookies
function showCookiesPage() {
    const cookiesData = getAllCookies();
    const userData = JSON.parse(getCookie(USER_DATA_COOKIE_NAME) || '{}');
     
    // Créer ou obtenir le conteneur de la modal
    let modal = document.getElementById('cookiesModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'cookiesModal';
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        document.body.appendChild(modal);
    }

    // Contenu de la modal
    modal.innerHTML = `
        <div class="bg-gray-800 p-6 rounded-lg max-w-2xl w-full mx-4 cyber-card">
            <h2 class="text-2xl font-bold mb-4 neon-text">Gestion des Cookies</h2>
            <div class="mb-4">
                <h3 class="text-xl mb-2">Cookies actuels :</h3>
                <div class="bg-gray-900 p-4 rounded overflow-auto max-h-60">
                    <pre class="text-sm">${JSON.stringify(cookiesData, null, 2)}</pre>
                </div>
            </div>
            <div class="flex justify-end gap-2">
                <button onclick="deleteAllCookies()" class="cyber-button-small bg-red-600 hover:bg-red-700 px-4 py-2 rounded">
                    Supprimer tous les cookies
                </button>
                <button onclick="document.getElementById('cookiesModal').remove()" class="cyber-button-small px-4 py-2 rounded">
                    Fermer
                </button>
            </div>
        </div>
    `;
}

// Fonction pour obtenir un cookie spécifique
function getCookie(name) {
    const cookies = getAllCookies();
    return cookies[name];
}

// Fonction pour supprimer tous les cookies
function deleteAllCookies() {
    const cookies = getAllCookies();
    for (let name in cookies) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${COOKIE_OPTIONS.path};domain=${COOKIE_OPTIONS.domain}`;
    }
    localStorage.clear();
    showCookiesPage(); // Rafraîchir l'affichage
}