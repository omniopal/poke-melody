import { LatLngBounds } from "leaflet";

type SinnohTown = {
    name: string,
    polyCoords?: [number, number][],
    coords?: LatLngBounds,
    alreadyGuessed: boolean,
    isPolygon: boolean,
}

export const sinnohTowns: SinnohTown[] = [
    {
        name: "Twinleaf Town",
        coords: new LatLngBounds([320, 2665], [405, 2750]),
        alreadyGuessed: false,
        isPolygon: false,
    },
    {
        name: "Sandgem Town",
        coords: new LatLngBounds([385, 2795], [470, 2885]),
        alreadyGuessed: false,
        isPolygon: false,
    },
    {
        name: "Jubilife City",
        coords: new LatLngBounds([520, 2730], [670, 2885]),
        alreadyGuessed: false,
        isPolygon: false,
    },
    {
        name: "Oreburgh City",
        polyCoords: [[670, 3000], [670, 3150], [520, 3150], [520, 3065], [585, 3065], [585, 3000]],
        alreadyGuessed: false,
        isPolygon: true,
    },
    {
        name: "Floaroma Town",
        coords: new LatLngBounds([785, 2795], [935, 2885]),
        alreadyGuessed: false,
        isPolygon: false,
    },
    {
        name: "Eterna City",
        polyCoords: [[1140, 3060], [1140, 3215], [1050, 3215], [1050, 3150], [980, 3150], [980, 3060]],
        alreadyGuessed: false,
        isPolygon: true,
    },
    {
        name: "Hearthome City",
        coords: new LatLngBounds([650, 3395], [805, 3550]),
        alreadyGuessed: false,
        isPolygon: false,
    },
    {
        name: "Canalave City",
        coords: new LatLngBounds([580, 2530], [735, 2620]),
        alreadyGuessed: false,
        isPolygon: false,
    },
    {
        name: "Solaceon Town",
        coords: new LatLngBounds([785, 3595], [870, 3750]),
        alreadyGuessed: false,
        isPolygon: false,
    },
    {
        name: "Celestic Town",
        coords: new LatLngBounds([1045, 3405], [1140, 3495]),
        alreadyGuessed: false,
        isPolygon: false,
    },
    {
        name: "Snowpoint City",
        coords: new LatLngBounds([1800, 3200], [1650, 3280]),
        alreadyGuessed: false,
        isPolygon: false,
    },
    {
        name: "Pastoria City",
        coords: new LatLngBounds([385, 3660], [540, 3815]),
        alreadyGuessed: false,
        isPolygon: false,
    },
    {
        name: "Veilstone City",
        coords: new LatLngBounds([850, 3860], [1005, 4015]),
        alreadyGuessed: false,
        isPolygon: false,
    },
    {
        name: "Sunyshore City",
        coords: new LatLngBounds([520, 4195], [670, 4345]),
        alreadyGuessed: false,
        isPolygon: false,
    },
    {
        name: "Pokémon League",
        coords: new LatLngBounds([985, 4195], [1070, 4280]),
        alreadyGuessed: false,
        isPolygon: false,
    },
    {
        name: "Resort Area",
        coords: new LatLngBounds([1185, 4130], [1270, 4210]),
        alreadyGuessed: false,
        isPolygon: false,
    },
    {
        name: "Fight Area",
        coords: new LatLngBounds([1250, 3725], [1335, 3880]),
        alreadyGuessed: false,
        isPolygon: false,
    },
    {
        name: "Survival Area",
        coords: new LatLngBounds([1450, 3795], [1535, 3880]),
        alreadyGuessed: false,
        isPolygon: false,
    },
];