// Dashboard functionality

class Dashboard {
    constructor() {
        this.init();
    }
    
    init() {
        this.loadUserData();
        this.initCharts();
        this.initNotifications();
        this.updateMetrics();
    }
    
    loadUserData() {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        const welcomeElement = document.getElementById('user-welcome');
        
        if (welcomeElement && userData.fullname) {
            welcomeElement.textContent = `Bonjour, ${userData.fullname} !`;
        }
        
        // Update profile based on user data
        this.updateProfileSection(userData);
    }
    
    updateProfileSection(userData) {
        const profileElement = document.getElementById('user-profile');
        if (profileElement) {
            const profiles = {
                'etudiant': '🎓 Étudiant',
                'famille': '💑 Famille',
                'independant': '🔧 Indépendant',
                'salarie': '💼 Salarié',
                'retraite': '🌅 Retraité'
            };
            
            const profileText = profiles[userData.profile] || 'Utilisateur';
            profileElement.textContent = profileText;
        }
    }
    
    initCharts() {
        // Simple savings chart
        this.createSavingsChart();
        this.createBudgetChart();
    }
    
    createSavingsChart() {
        const ctx = document.getElementById('savings-chart');
        if (!ctx) return;
        
        // Simple canvas-based chart
        const canvas = ctx;
        const context = canvas.getContext('2d');
        
        // Chart data
        const data = [120, 190, 300, 250, 420, 350, 480];
        const maxValue = Math.max(...data);
        const width = canvas.width;
        const height = canvas.height;
        const barWidth = (width - 100) / data.length;
        
        // Clear canvas
        context.clearRect(0, 0, width, height);
        
        // Draw bars
        data.forEach((value, index) => {
            const barHeight = (value / maxValue) * (height - 50);
            const x = 50 + (index * barWidth);
            const y = height - barHeight - 30;
            
            context.fillStyle = '#2563eb';
            context.fillRect(x, y, barWidth - 10, barHeight);
            
            // Value labels
            context.fillStyle = '#1f2937';
            context.font = '12px Inter';
            context.textAlign = 'center';
            context.fillText(`€${value}`, x + (barWidth - 10) / 2, y - 5);
        });
        
        // Month labels
        const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul'];
        months.forEach((month, index) => {
            const x = 50 + (index * barWidth) + (barWidth - 10) / 2;
            context.fillText(month, x, height - 10);
        });
    }
    
    createBudgetChart() {
        const ctx = document.getElementById('budget-chart');
        if (!ctx) return;
        
        const canvas = ctx;
        const context = canvas.getContext('2d');
        
        const data = {
            'Logement': 800,
            'Alimentation': 300,
            'Transport': 150,
            'Loisirs': 100,
            'Épargne': 200,
            'Divers': 50
        };
        
        const total = Object.values(data).reduce((sum, value) => sum + value, 0);
        const colors = ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#6b7280'];
        
        let startAngle = 0;
        let colorIndex = 0;
        
        Object.entries(data).forEach(([category, value]) => {
            const sliceAngle = (value / total) * 2 * Math.PI;
            
            context.beginPath();
            context.moveTo(150, 150);
            context.arc(150, 150, 120, startAngle, startAngle + sliceAngle);
            context.closePath();
            
            context.fillStyle = colors[colorIndex % colors.length];
            context.fill();
            
            // Label
            const labelAngle = startAngle + sliceAngle / 2;
            const labelX = 150 + Math.cos(labelAngle) * 140;
            const labelY = 150 + Math.sin(labelAngle) * 140;
            
            context.fillStyle = '#1f2937';
            context.font = '12px Inter';
            context.textAlign = 'center';
            context.fillText(category, labelX, labelY);
            
            startAngle += sliceAngle;
            colorIndex++;
        });
    }
    
    initNotifications() {
        const notifications = [
            {
                type: 'info',
                message: 'Votre déclaration d\'impôts est due dans 45 jours',
                action: 'Préparer'
            },
            {
                type: 'success',
                message: 'Nouvelle aide disponible : Prime d\'activité',
                action: 'Découvrir'
            },
            {
                type: 'warning',
                message: 'Pensez à déclarer vos frais réels',
                action: 'Optimiser'
            }
        ];
        
        const container = document.getElementById('notifications-list');
        if (!container) return;
        
        notifications.forEach(notification => {
            const notificationElement = document.createElement('div');
            notificationElement.className = `notification-item ${notification.type}`;
            notificationElement.innerHTML = `
                <div class="notification-content">
                    <i class="fas fa-${this.getNotificationIcon(notification.type)}"></i>
                    <span>${notification.message}</span>
                </div>
                <button class="btn-notification-action">${notification.action}</button>
            `;
            container.appendChild(notificationElement);
        });
    }
    
    getNotificationIcon(type) {
        const icons = {
            'info': 'info-circle',
            'success': 'check-circle',
            'warning': 'exclamation-triangle',
            'error': 'exclamation-circle'
        };
        return icons[type] || 'info-circle';
    }
    
    updateMetrics() {
        // Update financial metrics
        const metrics = {
            'savings-potential': '450',
            'identified-aids': '3',
            'tax-optimization': '230',
            'financial-score': '78'
        };
        
        Object.entries(metrics).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                this.animateValue(element, 0, parseInt(value), 1000);
            }
        });
    }
    
    animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('dashboard')) {
        new Dashboard();
    }
});
