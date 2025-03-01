// export const fetchDraftPokeData = async () => {
//     const draftData = new Map();

//     const fetchPromises = firstEvolutions.map(async (stuff) => {
//         const pokePromises = stuff.firstEvolutionPokemon.map(async (pokemon) => {
//             const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
//             const result = await res.json();
//             const pokemonName = result.name;
//             const spriteUrl = result.sprites?.other?.showdown?.front_default;
//             const pokedexNumber = result.id;

//             const data = { spriteUrl, isDisabled: false, generation: stuff.generation, pokedexNumber, draftedBy: '' };
//             addPokemon(pokemonName, data);
//             draftData.set(pokemonName, data);
//         });

//         await Promise.all(pokePromises);
//     });

//     await Promise.all(fetchPromises);
//     setDraftPokemonData(draftData);
// }