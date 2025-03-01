import { alpha, styled, Switch } from "@mui/material";

export const StyledSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: 'hsl(138, 80%, 80%)',
      '&:hover': {
        backgroundColor: alpha('hsl(138, 80%, 80%)', theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: 'hsl(138, 80%, 80%)',
      filter: 'brightness(100%)',
    },
    '& .MuiSwitch-track': {
      backgroundColor: 'hsl(138, 80%, 80%)',
      filter: 'brightness(50%)',
    },
    '& .MuiSwitch-switchBase': {
      color: 'hsl(138, 80%, 80%)',
      '&:hover': {
        backgroundColor: alpha('hsl(138, 80%, 80%)', theme.palette.action.hoverOpacity),
      },
      
    },
    
  }));