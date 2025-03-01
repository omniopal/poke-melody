import React from 'react';
import { MenuItem, Select, SelectChangeEvent } from "@mui/material"
import './region-selector.css';

export const REGIONS = ['Kanto', 'Johto', 'Hoenn', 'Sinnoh'];
export type Region = (typeof REGIONS)[number];

export type RegionSelectorProps = {
  region: Region;
  onSelectorChange: (filter: Region) => void;
};

export const RegionSelector: React.FC<RegionSelectorProps> = (props) => {
    const { region, onSelectorChange } = props;

    const onChange = (event: SelectChangeEvent) => {
      onSelectorChange(event.target.value as Region);
    }

    return (
      <Select
        value={region}
        onChange={onChange}
        className="select"
        sx={{ fontWeight: 700 }}
      >
        {REGIONS.map((region) => (
          <MenuItem key={region} value={region}>{region}</MenuItem>
        ))}
      </Select>
    )
}