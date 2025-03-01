export const getMuiStyleOverrides = () => {
    return {
        modal: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        sheet: {
            maxWidth: '80%',
            maxHeight: '80%',
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
            backgroundColor: '#DBDBDB',
        },
        modalClose: {
            m: 1,
            '&:hover': {
                backgroundColor: '#DBDBDB',
                color: '#F51B1B',
            }
        }
    }
}