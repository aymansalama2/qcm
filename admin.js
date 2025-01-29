class AdminPanel {
    constructor() {
        this.visitors = JSON.parse(localStorage.getItem('visitors') || '{}');
        this.blockedIPs = JSON.parse(localStorage.getItem('blockedIPs') || '[]');
        this.selectedIP = null;
        this.initUI();
        
        // Rafraîchir automatiquement toutes les 5 secondes
        setInterval(() => this.refreshVisitors(), 5000);
    }

    initUI() {
        this.refreshVisitors();
        this.initEventListeners();
        this.showStats();
    }

    initEventListeners() {
        document.getElementById('backToList')?.addEventListener('click', () => {
            this.selectedIP = null;
            this.refreshVisitors();
        });
    }

    showStats() {
        const statsContainer = document.getElementById('statsContainer');
        const totalVisitors = Object.keys(this.visitors).length;
        const totalVisits = Object.values(this.visitors).reduce((sum, visitor) => sum + visitor.visits, 0);
        const blockedCount = this.blockedIPs.length;

        statsContainer.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div class="cyber-container p-4 rounded-lg text-center">
                    <h3 class="text-xl mb-2 neon-text">Total Visiteurs</h3>
                    <p class="text-2xl font-bold">${totalVisitors}</p>
                </div>
                <div class="cyber-container p-4 rounded-lg text-center">
                    <h3 class="text-xl mb-2 neon-text">Total Visites</h3>
                    <p class="text-2xl font-bold">${totalVisits}</p>
                </div>
                <div class="cyber-container p-4 rounded-lg text-center">
                    <h3 class="text-xl mb-2 neon-text">IPs Bloquées</h3>
                    <p class="text-2xl font-bold">${blockedCount}</p>
                </div>
            </div>
        `;
    }

    showVisitorsList(container) {
        // Trier les visiteurs par date de dernière visite (plus récent en premier)
        const sortedVisitors = Object.entries(this.visitors).sort((a, b) => 
            new Date(b[1].lastVisit) - new Date(a[1].lastVisit)
        );

        container.innerHTML = `
            <div id="statsContainer"></div>
            <div class="mb-4 flex justify-between items-center">
                <h2 class="text-2xl neon-text">Liste des Visiteurs (${sortedVisitors.length})</h2>
                <div class="space-x-2">
                    <input type="text" id="searchInput" 
                           placeholder="Rechercher..." 
                           class="bg-gray-800 text-white px-3 py-1 rounded-lg border border-gray-600">
                </div>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead>
                        <tr class="border-b border-gray-600">
                            <th class="px-4 py-2 text-left">IP</th>
                            <th class="px-4 py-2 text-left">Dernière visite</th>
                            <th class="px-4 py-2 text-left">Visites</th>
                            <th class="px-4 py-2 text-left">Pages vues</th>
                            <th class="px-4 py-2 text-left">Statut</th>
                            <th class="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${sortedVisitors.map(([ip, data]) => {
                            const isBlocked = this.blockedIPs.includes(ip);
                            const totalPages = Object.keys(data.pages || {}).length;
                            const lastVisit = new Date(data.lastVisit);
                            const timeAgo = this.getTimeAgo(lastVisit);
                            
                            return `
                                <tr class="border-b border-gray-700 hover:bg-gray-800">
                                    <td class="px-4 py-3">${ip}</td>
                                    <td class="px-4 py-3" title="${lastVisit.toLocaleString()}">${timeAgo}</td>
                                    <td class="px-4 py-3">${data.visits}</td>
                                    <td class="px-4 py-3">${totalPages}</td>
                                    <td class="px-4 py-3">
                                        <span class="px-2 py-1 rounded ${isBlocked ? 'bg-red-600' : 'bg-green-600'}">
                                            ${isBlocked ? 'Bloqué' : 'Autorisé'}
                                        </span>
                                    </td>
                                    <td class="px-4 py-3 space-x-2">
                                        <button onclick="adminPanel.toggleBlock('${ip}')" 
                                                class="cyber-button px-3 py-1 rounded-lg text-sm">
                                            ${isBlocked ? 'Débloquer' : 'Bloquer'}
                                        </button>
                                        <button onclick="adminPanel.selectVisitor('${ip}')"
                                                class="cyber-button px-3 py-1 rounded-lg text-sm">
                                            Détails
                                        </button>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        `;

        this.showStats();
        this.initSearch();
    }

    initSearch() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const rows = document.querySelectorAll('tbody tr');
                
                rows.forEach(row => {
                    const text = row.textContent.toLowerCase();
                    row.style.display = text.includes(searchTerm) ? '' : 'none';
                });
            });
        }
    }

    getTimeAgo(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
        
        const intervals = {
            année: 31536000,
            mois: 2592000,
            semaine: 604800,
            jour: 86400,
            heure: 3600,
            minute: 60
        };
        
        for (let [unit, secondsInUnit] of Object.entries(intervals)) {
            const interval = Math.floor(seconds / secondsInUnit);
            if (interval >= 1) {
                return `Il y a ${interval} ${unit}${interval > 1 ? 's' : ''}`;
            }
        }
        
        return "À l'instant";
    }

    showVisitorDetails(container, ip) {
        const visitor = this.visitors[ip];
        if (!visitor) return;

        const sessions = visitor.sessions || [];
        const pages = visitor.pages || {};

        container.innerHTML = `
            <button id="backToList" class="cyber-button px-4 py-2 rounded-lg mb-6">
                ← Retour à la liste
            </button>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="cyber-container p-4 rounded-lg">
                    <h3 class="text-xl mb-4 neon-text">Informations générales</h3>
                    <div class="space-y-2">
                        <p><strong>IP:</strong> ${ip}</p>
                        <p><strong>Première visite:</strong> ${new Date(visitor.firstVisit).toLocaleString()}</p>
                        <p><strong>Dernière visite:</strong> ${new Date(visitor.lastVisit).toLocaleString()}</p>
                        <p><strong>Nombre de visites:</strong> ${visitor.visits}</p>
                        <p><strong>Navigateur:</strong> ${visitor.userAgent}</p>
                        <p><strong>Écran:</strong> ${visitor.screenSize}</p>
                        <p><strong>Langue:</strong> ${visitor.language}</p>
                    </div>
                </div>

                <div class="cyber-container p-4 rounded-lg">
                    <h3 class="text-xl mb-4 neon-text">Pages visitées</h3>
                    <div class="space-y-2">
                        ${Object.entries(pages).map(([path, data]) => `
                            <div class="border-b border-gray-700 pb-2">
                                <p><strong>Page:</strong> ${path}</p>
                                <p><strong>Visites:</strong> ${data.visits}</p>
                                <p><strong>Dernière visite:</strong> ${new Date(data.lastVisit).toLocaleString()}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="cyber-container p-4 rounded-lg md:col-span-2">
                    <h3 class="text-xl mb-4 neon-text">Sessions (${sessions.length})</h3>
                    <div class="space-y-4">
                        ${sessions.map(session => `
                            <div class="border-b border-gray-700 pb-4">
                                <p><strong>Début:</strong> ${new Date(session.startTime).toLocaleString()}</p>
                                <div class="mt-2">
                                    <strong>Parcours:</strong>
                                    <ul class="list-disc ml-4">
                                        ${session.pages.map(page => `
                                            <li>${page.path} - ${new Date(page.timestamp).toLocaleString()}</li>
                                        `).join('')}
                                    </ul>
                                </div>
                                <div class="mt-2">
                                    <strong>Actions:</strong>
                                    <ul class="list-disc ml-4">
                                        ${(session.actions || []).map(action => `
                                            <li>${action.type} - ${JSON.stringify(action.data)} - ${new Date(action.timestamp).toLocaleString()}</li>
                                        `).join('')}
                                    </ul>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        this.initEventListeners();
    }

    selectVisitor(ip) {
        this.selectedIP = ip;
        this.refreshVisitors();
    }

    toggleBlock(ip) {
        const index = this.blockedIPs.indexOf(ip);
        if (index === -1) {
            this.blockedIPs.push(ip);
        } else {
            this.blockedIPs.splice(index, 1);
        }
        
        localStorage.setItem('blockedIPs', JSON.stringify(this.blockedIPs));
        this.refreshVisitors();
    }

    clearAllData() {
        if (confirm('Êtes-vous sûr de vouloir effacer toutes les données des visiteurs ?')) {
            localStorage.removeItem('visitors');
            localStorage.removeItem('blockedIPs');
            this.visitors = {};
            this.blockedIPs = [];
            this.selectedIP = null;
            this.refreshVisitors();
        }
    }

    refreshVisitors() {
        // Recharger les données depuis le localStorage
        this.visitors = JSON.parse(localStorage.getItem('visitors') || '{}');
        this.blockedIPs = JSON.parse(localStorage.getItem('blockedIPs') || '[]');

        const container = document.getElementById('mainContent');
        if (!container) return;
        
        if (this.selectedIP) {
            this.showVisitorDetails(container, this.selectedIP);
        } else {
            this.showVisitorsList(container);
        }
    }
}

// Fonctions globales pour les boutons
function refreshVisitors() {
    if (adminPanel) {
        adminPanel.refreshVisitors();
    }
}

function clearAllData() {
    if (adminPanel) {
        adminPanel.clearAllData();
    }
}

// Initialisation
let adminPanel;
document.addEventListener('DOMContentLoaded', () => {
    adminPanel = new AdminPanel();
}); 