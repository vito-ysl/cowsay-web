function createSpeechBubble(text) {
    const lines = text.split('\n');
    const maxLength = Math.max(...lines.map(line => line.length));
    
    const top = ` ${'_'.repeat(maxLength + 2)}\n`;
    const bottom = ` ${'-'.repeat(maxLength + 2)}\n`;
    
    const formattedLines = lines.map(line => {
        return `| ${line.padEnd(maxLength)} |`;
    }).join('\n');

    return `${top}${formattedLines}\n${bottom}`;
}

function displayMessage() {
    const input = document.getElementById('message-input').value;
    
    if (!input.trim()) return; // Don't display empty messages
    
    import('../characters/cow.js')
        .then(module => {
            const character = module.default;
            const speechBubble = createSpeechBubble(input);
            const display = document.getElementById('ascii-display');
            display.textContent = speechBubble + character;
        })
        .catch(error => {
            console.error('Erro ao carregar personagem:', error);
        });
}

// Add event listener for Enter key
document.getElementById('message-input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault(); // Prevent new line
        displayMessage();
    }
});