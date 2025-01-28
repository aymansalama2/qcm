class AdminPanel {
    constructor() {
        this.visitors = JSON.parse(localStorage.getItem('visitors') || '{}');
        this.blockedIPs = JSON.parse(localStorage.getItem('blockedIPs') || '[]');
        this.initUI();
    }

    initUI() {
        this.refreshVisitors();
    }

    refreshVisitors() {
        const table = document.getElementById('visitorsTable');
        table.innerHTML = '';

        Object.entries(this.visitors).forEach(([ip, data]) => {
            const row = document.createElement('tr');
            row.className = 'border-b border-gray-700';
            
            const isBlocked = this.blockedIPs.includes(ip);
            
            row.innerHTML = `
                <td class="px-4 py-3">${ip}</td>
                <td class="px-4 py-3">${new Date(data.lastVisit).toLocaleString()}</td>
                <td class="px-4 py-3">${data.visits}</td>
                <td class="px-4 py-3">
                    <span class="px-2 py-1 rounded ${isBlocked ? 'bg-red-600' : 'bg-green-600'}">
                        ${isBlocked ? 'Bloqué' : 'Autorisé'}
                    </span>
                </td>
                <td class="px-4 py-3">
                    <button onclick="adminPanel.toggleBlock('${ip}')" 
                            class="cyber-button px-3 py-1 rounded-lg text-sm">
                        ${isBlocked ? 'Débloquer' : 'Bloquer'}
                    </button>
                </td>
            `;
            
            table.appendChild(row);
        });
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