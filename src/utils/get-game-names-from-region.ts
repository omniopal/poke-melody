export const getRemasteredGameNamesFromRegion = (region: string): string => {
    switch (region) {
        case "Kanto":
            return "FR/LG";
        case "Johto":
            return "HG/SS";
        case "Hoenn":
            return "OR/AS";
        default:
            return "BD/SP";
    }
}