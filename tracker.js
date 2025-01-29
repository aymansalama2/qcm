class VisitorTracker {
    constructor() {
        this.initVisitor();
        this.trackPageView();
        this.initActivityTracking();
        
        // Vérifier et mettre à jour les données toutes les 30 secondes
        setInterval(() => this.updateData(), 30000);
    }

    initVisitor() {
        // Simuler une IP pour la démo
        if (!localStorage.getItem('visitorIP')) {
            const randomIP = this.generateRandomIP();
            localStorage.setItem('visitorIP', randomIP);
        }

        // Vérifier si l'IP est bloquée
        const blockedIPs = JSON.parse(localStorage.getItem('blockedIPs') || '[]');
        const currentIP = localStorage.getItem('visitorIP');
        
        if (blockedIPs.includes(currentIP)) {
            console.log('IP bloquée:', currentIP);
            window.location.href = 'blocked.html';
            return;
        }

        // Créer ou mettre à jour la session
        if (!sessionStorage.getItem('sessionId')) {
            sessionStorage.setItem('sessionId', Date.now().toString());
        }
    }

    generateRandomIP() {
        const segments = [];
        for (let i = 0; i < 4; i++) {
            segments.push(Math.floor(Math.random() * 255));
        }
        return segments.join('.');
    }

    getCurrentPath() {
        try {
            // Essayer d'obtenir le chemin de plusieurs façons
            const path = window.location.pathname || 
                        window.location.href.split(window.location.host).pop() || 
                        '/';
            
            // Nettoyer le chemin
            return path.replace(/\/+$/, '') || '/';
        } catch (error) {
            console.warn('Erreur lors de la récupération du chemin:', error);
            return '/';
        }
    }

    updateData() {
        try {
            const visitors = JSON.parse(localStorage.getItem('visitors') || '{}');
            const ip = localStorage.getItem('visitorIP');
            
            if (visitors[ip]) {
                visitors[ip].screenSize = `${window.screen.width}x${window.screen.height}`;
                visitors[ip].userAgent = navigator.userAgent;
                visitors[ip].language = navigator.language;
                
                localStorage.setItem('visitors', JSON.stringify(visitors));
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour des données:', error);
        }
    }

    trackPageView() {
        try {
            const visitors = JSON.parse(localStorage.getItem('visitors') || '{}');
            const ip = localStorage.getItem('visitorIP');
            const currentPage = this.getCurrentPath();
            const timestamp = new Date().toISOString();

            // Créer un nouvel enregistrement visiteur si nécessaire
            if (!visitors[ip]) {
                visitors[ip] = {
                    visits: 0,
                    firstVisit: timestamp,
                    lastVisit: timestamp,
                    pages: {},
                    sessions: [],
                    userAgent: navigator.userAgent || 'Unknown',
                    screenSize: `${window.screen.width || 0}x${window.screen.height || 0}`,
                    language: navigator.language || 'Unknown',
                    referrer: document.referrer || 'Direct'
                };
            }

            // Mettre à jour les informations de visite
            visitors[ip].visits = (visitors[ip].visits || 0) + 1;
            visitors[ip].lastVisit = timestamp;

            // Initialiser ou mettre à jour les pages visitées
            if (!visitors[ip].pages) {
                visitors[ip].pages = {};
            }

            if (!visitors[ip].pages[currentPage]) {
                visitors[ip].pages[currentPage] = {
                    visits: 0,
                    firstVisit: timestamp,
                    lastVisit: timestamp
                };
            }

            visitors[ip].pages[currentPage].visits++;
            visitors[ip].pages[currentPage].lastVisit = timestamp;

            // Gérer la session
            if (!visitors[ip].sessions) {
                visitors[ip].sessions = [];
            }

            const sessionId = sessionStorage.getItem('sessionId');
            let currentSession = visitors[ip].sessions.find(s => s.id === sessionId);

            if (!currentSession) {
                currentSession = {
                    id: sessionId,
                    startTime: timestamp,
                    pages: [],
                    actions: []
                };
                visitors[ip].sessions.push(currentSession);
            }

            // Ajouter la page à la session
            currentSession.pages.push({
                path: currentPage,
                timestamp: timestamp,
                referrer: document.referrer || 'Direct'
            });

            localStorage.setItem('visitors', JSON.stringify(visitors));
            console.log('Visite enregistrée pour IP:', ip, 'Page:', currentPage);
        } catch (error) {
            console.error('Erreur lors du tracking:', error);
        }
    }

    initActivityTracking() {
        // Tracker les clics
        document.addEventListener('click', (e) => {
            this.trackAction('click', {
                element: e.target.tagName,
                text: e.target.textContent?.slice(0, 50),
                x: e.clientX,
                y: e.clientY
            });
        });

        // Tracker les soumissions de formulaire
        document.addEventListener('submit', (e) => {
            this.trackAction('form_submit', {
                formId: e.target.id || 'unknown'
            });
        });

        // Tracker le temps passé sur la page
        let startTime = Date.now();
        window.addEventListener('beforeunload', () => {
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            this.trackAction('page_exit', {
                timeSpent: timeSpent,
                page: window.location.pathname
            });
        });
    }

    trackAction(type, data) {
        const visitors = JSON.parse(localStorage.getItem('visitors') || '{}');
        const ip = localStorage.getItem('visitorIP');
        const sessionId = sessionStorage.getItem('sessionId');
        
        if (visitors[ip]) {
            const session = visitors[ip].sessions.find(s => s.id === sessionId);
            if (session) {
                session.actions.push({
                    type: type,
                    data: data,
                    timestamp: new Date().toISOString()
                });
                localStorage.setItem('visitors', JSON.stringify(visitors));
            }
        }
    }
}

// Initialiser le tracker sur toutes les pages
const tracker = new VisitorTracker(); 