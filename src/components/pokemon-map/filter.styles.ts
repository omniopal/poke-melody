export const getMuiStyleOverrides = () => {
    return {
        filterButton: {
            color: 'black',
            backgroundColor: 'whitesmoke',
            marginBottom: '0.5rem',
            textTransform: 'none',
            border: '1px solid gray',
            borderRadius: '0.5rem',
            '&:hover': {
                backgroundColor: '#e2e2e2',
            }
        },
        popper: {
            zIndex: '10000',
        }
    }
};