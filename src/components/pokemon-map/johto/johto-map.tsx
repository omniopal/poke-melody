import { Circle, ImageOverlay, LayerGroup, MapContainer, Rectangle } from "react-leaflet";
import { MapProps } from "../pokemon-map";
import { johtoTowns } from './towns'
import L, { LatLng } from "leaflet";
import { useMediaQuery, useTheme } from "@mui/material";

export const JohtoMap: React.FC<MapProps> = (props) => {
    const { handleTownClick, height, bounds, guesses } = props;

    const theme = useTheme();
    const isSmallBreakpoint = useMediaQuery(theme.breakpoints.down(700));
    const zoom = isSmallBreakpoint ? -2 : -1.5;
    const center = isSmallBreakpoint ? new LatLng(800, 2080) : new LatLng(725, 2100);

    return (
        <MapContainer
            style={{ height: height, width: "100vw" }}
            crs={L.CRS.Simple}
            center={center}
            minZoom={-3}
            zoom={zoom}
            maxBounds={bounds}
        >
            <ImageOverlay url="/images/johto map.webp" bounds={bounds} />
            <LayerGroup>
                {johtoTowns.map((town) => (
                    <Rectangle 
                        key={town.name}
                        bounds={town.coords}
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
                ))}
            </LayerGroup>
        </MapContainer>
    )
}