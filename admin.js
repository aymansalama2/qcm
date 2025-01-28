class AdminPanel {
    constructor() {
        this.visitors = JSON.parse(localStorage.getItem('visitors') || '{}');
        this.blockedIPs = JSON.parse(localStorage.getItem('blockedIPs') || '[]');
        this.selectedIP = null;
        this.initUI();
    }

    initUI() {
        this.refreshVisitors();
        this.initEventListeners();
    }

    initEventListeners() {
        document.getElementById('backToList')?.addEventListener('click', () => {
            this.selectedIP = null;
            this.refreshVisitors();
        });
    }

    refreshVisitors() {
        const container = document.getElementById('mainContent');
        
        if (this.selectedIP) {
            this.showVisitorDetails(container, this.selectedIP);
        } else {
            this.showVisitorsList(container);
        }
    }

    showVisitorsList(container) {
        container.innerHTML = `
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
                        ${Object.entries(this.visitors).map(([ip, data]) => {
                            const isBlocked = this.blockedIPs.includes(ip);
                            const totalPages = Object.keys(data.pages || {}).length;
                            return `
                                <tr class="border-b border-gray-700">
                                    <td class="px-4 py-3">${ip}</td>
                                    <td class="px-4 py-3">${new Date(data.lastVisit).toLocaleString()}</td>
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
}

// Fonctions globales pour les boutons
function refreshVisitors() {
    adminPanel.refreshVisitors();
}

function clearAllData() {
    adminPanel.clearAllData();
}

// Initialisation
const adminPanel = new AdminPanel(); 