export function getPhysicalGameType(consoleName: string): string {
    const cartridgeUsers = [
        "Nintendo Entertainment System",
        "Game Boy",
        "Super Nintendo Entertainment System",
        "Virtual Boy",
        "Nintendo 64",
        "Game Boy Color",
        "Game Boy Advance",
        "Nintendo DS",
        "Nintendo 3DS"
    ]

    return cartridgeUsers.includes(consoleName) ? 'Cartridge' : 'Disc';
}