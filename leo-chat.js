// Léo AI Chat System

const leoResponses = {
    'salut': {
        response: "Bonjour ! Je suis Léo, votre assistant financier. Comment puis-je vous aider aujourd'hui ?",
        suggestions: ['Impôts', 'Aides sociales', 'Épargne', 'Budget']
    },
    'bonjour': {
        response: "Bonjour ! Ravie de vous rencontrer. Parlez-moi de votre situation financière.",
        suggestions: ['Je suis étudiant', 'Je suis salarié', 'Je suis indépendant', 'Je suis retraité']
    },
    'impôt': {
        response: "Je peux vous aider avec les impôts ! Quel est votre statut ?",
        suggestions: ['Salarié', 'Indépendant', 'Retraité', 'Étudiant']
    },
    'étudiant': {
        response: "Excellent ! En tant qu'étudiant, vous avez des avantages spécifiques. Voulez-vous que je vous parle des aides disponibles ou des déclarations ?",
        actions: [
            { text: '📚 Voir la fiche étudiante', url: 'fiches.html#etudiant' },
            { text: '🧮 Simuler mes aides', url: 'dashboard.html' }
        ]
    },
    'aide': {
        response: "Il existe de nombreuses aides selon votre situation. Êtes-vous étudiant, en recherche d'emploi, parent, ou dans une autre situation ?",
        suggestions: ['Étudiant', 'Chômeur', 'Parent', 'Handicapé']
    },
    'apl': {
        response: "Les APL (Aides Personnalisées au Logement) dépendent de vos revenus, de votre loyer et de votre situation familiale. Je peux vous aider à estimer vos droits !",
        actions: [
            { text: '🧮 Simuler mes APL', url: 'dashboard.html' },
            { text: '📖 En savoir plus', url: 'fiches.html#apl' }
        ]
    },
    'déclaration': {
        response: "La déclaration d'impôts peut sembler complexe, mais je suis là pour vous guider. Quel est votre statut ?",
        suggestions: ['Salarié', 'Auto-entrepreneur', 'Retraité', 'Première déclaration']
    },
    'budget': {
        response: "Gérer son budget est essentiel ! Je peux vous aider à créer un budget personnalisé et identifier des économies potentielles.",
        actions: [
            { text: '💼 Gérer mon budget', url: 'dashboard.html' },
            { text: '💡 Conseils économies', url: 'fiches.html#budget' }
        ]
    },
    'épargne': {
        response: "L'épargne est la première étape vers l'indépendance financière. Souhaitez-vous épargner pour un projet spécifique ou simplement constituer une réserve ?",
        suggestions: ['Livret A', 'PEA', 'Assurance-vie', 'Projet immobilier']
    },
    'default': {
        response: "Je comprends que vous cherchez des informations financières. Pouvez-vous me dire si vous êtes étudiant, salarié, indépendant ou retraité ? Cela m'aidera à vous donner des conseils plus précis.",
        suggestions: ['Étudiant', 'Salarié', 'Indépendant', 'Retraité']
    }
};

class LeoChat {
    constructor() {
        this.chatContainer = document.getElementById('leo-chat');
        this.messagesContainer = document.getElementById('chat-messages');
        this.input = document.getElementById('chat-input');
        this.sendButton = document.getElementById('send-message');
        this.suggestionsContainer = document.getElementById('chat-suggestions');
        
        this.init();
    }
    
    init() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        // Show welcome message
        this.addMessage('leo', "Bonjour ! Je suis Léo, votre assistant financier intelligent. Comment puis-je vous aider aujourd'hui ?");
        this.showSuggestions(['Impôts et déclarations', 'Aides sociales', 'Gestion de budget', 'Épargne et investissement']);
    }
    
    sendMessage() {
        const message = this.input.value.trim();
        if (!message) return;
        
        // Add user message
        this.addMessage('user', message);
        this.input.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Simulate AI processing
        setTimeout(() => {
            this.hideTypingIndicator();
            this.processMessage(message);
        }, 1000 + Math.random() * 1000);
    }
    
    processMessage(message) {
        const lowerMessage = message.toLowerCase();
        let response = leoResponses.default;
        
        // Find matching response
        for (const [keyword, data] of Object.entries(leoResponses)) {
            if (lowerMessage.includes(keyword)) {
                response = data;
                break;
            }
        }
        
        // Add Leo's response
        this.addMessage('leo', response.response);
        
        // Show suggestions or actions
        if (response.suggestions) {
            this.showSuggestions(response.suggestions);
        }
        
        if (response.actions) {
            this.showActions(response.actions);
        }
    }
    
    addMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'avatar';
        avatar.textContent = sender === 'user' ? '👤' : '🤖';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message';
        messageContent.innerHTML = text;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        this.messagesContainer.appendChild(messageDiv);
        
        // Scroll to bottom
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
    
    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message leo typing';
        typingDiv.id = 'typing-indicator';
        
        const avatar = document.createElement('div');
        avatar.className = 'avatar';
        avatar.textContent = '🤖';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message';
        messageContent.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
        
        typingDiv.appendChild(avatar);
        typingDiv.appendChild(messageContent);
        this.messagesContainer.appendChild(typingDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
    
    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    showSuggestions(suggestions) {
        this.suggestionsContainer.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const button = document.createElement('button');
            button.className = 'suggestion-btn';
            button.textContent = suggestion;
            button.addEventListener('click', () => {
                this.input.value = suggestion;
                this.sendMessage();
            });
            this.suggestionsContainer.appendChild(button);
        });
    }
    
    showActions(actions) {
        actions.forEach(action => {
            const button = document.createElement('button');
            button.className = 'action-btn';
            button.innerHTML = action.text;
            button.addEventListener('click', () => {
                window.location.href = action.url;
            });
            this.suggestionsContainer.appendChild(button);
        });
    }
}

// Quick questions for demo
const quickQuestions = [
    "Je suis étudiant, que dois-je déclarer ?",
    "Comment fonctionnent les APL ?",
    "Quelle épargne choisir ?",
    "Première déclaration d'impôts"
];

function initQuickQuestions() {
    const container = document.getElementById('quick-questions');
    if (!container) return;
    
    quickQuestions.forEach(question => {
        const button = document.createElement('button');
        button.className = 'quick-question';
        button.textContent = question;
        button.addEventListener('click', () => {
            // Auto-fill and send message if chat is available
            const chatInput = document.getElementById('chat-input');
            if (chatInput) {
                chatInput.value = question;
                document.getElementById('send-message').click();
            }
        });
        container.appendChild(button);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('leo-chat')) {
        new LeoChat();
    }
    initQuickQuestions();
});
