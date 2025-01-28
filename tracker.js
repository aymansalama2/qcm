class VisitorTracker {
    constructor() {
        this.initVisitor();
        this.trackPageView();
        this.initActivityTracking();
    }

    initVisitor() {
        // Simuler une IP pour la démo
        if (!localStorage.getItem('visitorIP')) {
            const ip = '192.168.' + Math.floor(Math.random() * 255) + '.' + Math.floor(Math.random() * 255);
            localStorage.setItem('visitorIP', ip);
        }

        // Vérifier si l'IP est bloquée
        const blockedIPs = JSON.parse(localStorage.getItem('blockedIPs') || '[]');
        if (blockedIPs.includes(localStorage.getItem('visitorIP'))) {
            window.location.href = 'blocked.html';
            return;
        }

        // Créer ou mettre à jour la session
        if (!sessionStorage.getItem('sessionId')) {
            sessionStorage.setItem('sessionId', Date.now().toString());
        }
    }

    trackPageView() {
        const visitors = JSON.parse(localStorage.getItem('visitors') || '{}');
        const ip = localStorage.getItem('visitorIP');
        const currentPage = window.location.pathname;
        const timestamp = new Date().toISOString();

        if (!visitors[ip]) {
            visitors[ip] = {
                visits: 0,
                firstVisit: timestamp,
                lastVisit: timestamp,
                pages: {},
                sessions: [],
                userAgent: navigator.userAgent,
                screenSize: `${window.screen.width}x${window.screen.height}`,
                language: navigator.language
            };
        }

        // Mettre à jour les informations de visite
        visitors[ip].visits++;
        visitors[ip].lastVisit = timestamp;

        // Tracker la page visitée
        if (!visitors[ip].pages[currentPage]) {
            visitors[ip].pages[currentPage] = {
                visits: 0,
                firstVisit: timestamp,
                lastVisit: timestamp
            };
        }
        visitors[ip].pages[currentPage].visits++;
        visitors[ip].pages[currentPage].lastVisit = timestamp;

        // Tracker la session
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
        currentSession.pages.push({
            path: currentPage,
            timestamp: timestamp
        });

        localStorage.setItem('visitors', JSON.stringify(visitors));
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