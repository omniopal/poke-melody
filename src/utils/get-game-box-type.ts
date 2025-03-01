export function getGameBoxType(consoleName: string): string {
    const boxUsers = [
        'Nintendo Entertainment System',
        'Game Boy',
        'Super Nintendo Entertainment System',
        'Virtual Boy',
        'Nintendo 64',
        'Game Boy Color',
        'Game Boy Advance'
    ];

    return boxUsers.includes(consoleName) ? 'Box' : 'Case';
}