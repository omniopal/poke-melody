import { Circle, ImageOverlay, LayerGroup, MapContainer, Polygon, Rectangle } from "react-leaflet";
import { MapProps } from "../pokemon-map";
import { sinnohTowns } from "./towns";
import L, { LatLng, LatLngBounds } from "leaflet";
import { useMediaQuery, useTheme } from "@mui/material";

export const SinnohMap: React.FC<MapProps> = (props) => {
    const { handleTownClick, height, bounds, guesses } = props;

    const theme = useTheme();
    const isSmallBreakpoint = useMediaQuery(theme.breakpoints.down(700));
    const center = new LatLng(1056, 3450);
    const zoom = isSmallBreakpoint ? -2.5 : -1.8;

    const bounds2: LatLngBounds = new LatLngBounds(
        [0, 0], // Southwest
        [2112, 6729]  // Northeast
    );

    return (
        <MapContainer
            style={{ height: height, width: "100vw" }}
            crs={L.CRS.Simple}
            center={center}
            minZoom={-3}
            zoom={zoom}
            maxBounds={bounds2}
            zoomSnap={0.1}
        >
            <ImageOverlay url="/images/sinnoh map.webp" bounds={bounds2} />
            <LayerGroup>
                {sinnohTowns.map((town) => (
                    (town.isPolygon ? (
                        <Polygon 
                            key={town.name}
                            positions={town.polyCoords || []}
                            pathOptions={guesses.includes(town.name) ? { fillColor: "red", color: "red" } : { fillColor: "blue", color: "blue" }}
                            eventHandlers={{
                                click: () => handleTownClick(town.name),
                                mouseover: (e) => e.target.setStyle({ fillColor: "red", color: "red" }),
                                mouseout: (e) => {
                                    if (!guesses.includes(town.name)) {
                                        e.target.setStyle({ fillColor: "blue", color: "blue" });
                                    }
                                },
                            }}
                        />
                    ) : (
                        <Rectangle 
                            key={town.name}
                            bounds={town.coords || []}
                            pathOptions={guesses.includes(town.name) ? { fillColor: "red", color: "red" } : { fillColor: "blue", color: "blue" }}
                            eventHandlers={{
                                click: () => handleTownClick(town.name),
                                mouseover: (e) => e.target.setStyle({ fillColor: "red", color: "red" }),
                                mouseout: (e) => {
                                    if (!guesses.includes(town.name)) {
                                        e.target.setStyle({ fillColor: "blue", color: "blue" });
                                    }
                                },
                            }}
                        />
                    ))
                ))}
            </LayerGroup>
        </MapContainer>
    )
}