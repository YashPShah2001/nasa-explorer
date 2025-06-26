import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: 'white',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ccc',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
        },
        input:{
            color:'white',
        }
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'white',
        },
      },
    },
    // MuiSelect: {
    //     styleOverrides: {
    //       icon: {
    //         color: 'white', // Dropdown arrow
    //       },
    //       select: {
    //         '&.MuiSelect-select': {
    //           color: 'white', // Selected item
    //         },
    //       },
    //     },
    //   },
    MuiSvgIcon:{
        styleOverrides:{
            root:{
                color: 'white'
            }
        }
    },
    MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: '#1976d2', 
            color: 'white',             
          },
          deleteIcon: {
            color: 'white',
            '&:hover': {
              color: '#ccc',
            },
          },
        },
      },
  },
});

export default theme;
