function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    const button = document.getElementById('theme-button');
    button.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    
    // Save preference
    localStorage.setItem('theme', newTheme);
}

// Initialize theme
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const button = document.getElementById('theme-button');
    button.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}

document.getElementById('theme-button').addEventListener('click', toggleTheme);
initializeTheme();

function wrapText(text, maxWidth) {
    const lines = [];
    let currentLine = '';
    let currentWidth = 0;

    // Primeiro, quebra o texto em palavras
    const words = text.split(/\s+/);

    for (const word of words) {
        // Se a palavra sozinha é maior que maxWidth, quebra ela
        if (word.length > maxWidth) {
            if (currentLine) {
                lines.push(currentLine);
                currentLine = '';
                currentWidth = 0;
            }
            
            for (let i = 0; i < word.length; i += maxWidth) {
                lines.push(word.slice(i, i + maxWidth));
            }
            continue;
        }

        // Verifica se adicionar a palavra excede o maxWidth
        if (currentWidth + word.length + 1 > maxWidth) {
            lines.push(currentLine);
            currentLine = word;
            currentWidth = word.length;
        } else {
            // Adiciona espaço se não for primeira palavra da linha
            if (currentLine) {
                currentLine += ' ';
                currentWidth += 1;
            }
            currentLine += word;
            currentWidth += word.length;
        }
    }

    // Adiciona última linha se houver conteúdo
    if (currentLine) {
        lines.push(currentLine);
    }

    return lines;
}

function createSpeechBubble(text) {
    const maxWidth = 40; // Reduzido para melhor visualização
    const wrappedLines = wrapText(text, maxWidth);
    const maxLength = Math.max(...wrappedLines.map(line => line.length));
    
    const top = ` ${'_'.repeat(maxLength + 2)}\n`;
    const bottom = ` ${'-'.repeat(maxLength + 2)}\n`;
    
    const formattedLines = wrappedLines.map(line => {
        return `| ${line.padEnd(maxLength)} |`;
    }).join('\n');

    return `${top}${formattedLines}\n${bottom}`;
}

async function displayMessage() {
    const input = document.getElementById('message-input').value;
    if (!input.trim()) return; // Don't display empty messages
    
    try {
        const module = await import('../characters/cow.js');
        const character = module.default;
        const speechBubble = createSpeechBubble(input);
        const display = document.getElementById('ascii-display');
        display.textContent = speechBubble + character;
    } catch (error) {
        console.error('Erro ao carregar personagem:', error);
    }
}

// Event Listeners
document.getElementById('message-input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault(); // Prevent new line
        displayMessage();
    }
});

document.getElementById('message-input').addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
});