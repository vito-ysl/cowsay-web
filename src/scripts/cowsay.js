function getCowsayArt(message, character) {
    const characters = {
        cow: require('../characters/cow').default,
        tux: require('../characters/tux').default,
        dragon: require('../characters/dragon').default,
    };

    const selectedCharacter = characters[character] || characters.cow;

    return `
${selectedCharacter}
${message}
    `;
}

export default getCowsayArt;