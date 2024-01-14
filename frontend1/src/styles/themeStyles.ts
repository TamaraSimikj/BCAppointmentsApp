import { tableCellClasses } from '@mui/material';
import { createTheme } from '@mui/material/styles';


export const theme = createTheme({
    palette: {
        primary: {
            main: "#274C77",
            contrastText: "#E7ECEF",
        },
        secondary: {
            main: "#F8F8FB",
            contrastText: "#274C77",
        },
        text: {
            primary: "#274C77",
            secondary: "#9da6b1"
        },
        divider: "#92a4ba50"
    },
    components: {

        MuiButton: {
            styleOverrides: {
                outlined: {
                    textTransform: "none",
                },
                contained: {
                    textTransform: "none",
                }
            }
        },
        MuiAccordion: {
            defaultProps: {
                sx: {
                    "&::before": {
                        content: "none",
                        height: 0
                    },
                    "& .MuiAccordionSummary-root": {
                        pl: 0
                    }
                }
            }
        },
        MuiChip: {
            defaultProps: {
                sx: {
                    fontWeight: "bold"
                }
            }
        },
        MuiTableCell: {
            defaultProps: {
                sx: {
                    borderBottomColor: "#92a4ba50",
                    [`&.${tableCellClasses.stickyHeader}`]: {
                        bgcolor: "var(--nav-color) !important"
                    }
                }
            },
        },
        MuiDivider: {
            defaultProps: {
                sx: {
                    my: 2
                }
            }
        },
        MuiCssBaseline: {
            styleOverrides: `
                @font-face {
                font-family: 'Roboto';
                font-style: normal;
                font-display: swap;
                font-weight: 400;          
                }
            `,
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 980,
            md: 1200,
            lg: 1700,
            xl: 2400,
        },
    },
    typography: {
        fontFamily: "Roboto, Helvetica, Arial, sans-serif"
    },
    shape: {
        borderRadius: 10
    },
});


theme.typography.h1 = {
    [theme.breakpoints.up('md')]: {
        fontSize: '2.2rem',
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '3rem',
    },
}

theme.typography.h2 = {
    [theme.breakpoints.up('md')]: {
        fontSize: '2rem',
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '2.5rem',
    },
}

theme.typography.h3 = {
    [theme.breakpoints.up('md')]: {
        fontSize: '1.7rem',
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '2rem',
    },
}

theme.typography.h4 = {
    [theme.breakpoints.up('md')]: {
        fontSize: '1.15rem',
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '1.25rem',
    },
}

theme.typography.h5 = {
    [theme.breakpoints.up('xs')]: {
        fontSize: '1.1rem',
        fontWeight: "bold"
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '1.05rem',
        fontWeight: "bold"
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '1.15rem',
        fontWeight: "bold"
    },
}

theme.typography.h6 = {
    [theme.breakpoints.up('xs')]: {
        fontSize: '.875rem',
        fontWeight: "bold",
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '1rem',
        fontWeight: "bold",
    },
}

theme.typography.body1 = {
    [theme.breakpoints.up('xs')]: {
        fontSize: '.9rem',
    },
    // [theme.breakpoints.up('md')]: {
    //     fontSize: '.8rem',
    // },
    // [theme.breakpoints.up('lg')]: {
    //     fontSize: '.9rem',
    // },
}


theme.typography.body2 = {
    [theme.breakpoints.up('xs')]: {
        fontSize: '.8rem',
    },
    // [theme.breakpoints.up('md')]: {
    //     fontSize: '.875rem',
    // },
}


theme.typography.subtitle1 = {
    [theme.breakpoints.up('xs')]: {
        fontSize: '.9rem',
    },
    // [theme.breakpoints.up('md')]: {
    //     fontSize: '.9rem',
    // },
    // [theme.breakpoints.up('lg')]: {
    //     fontSize: '1rem',
    // },
}

theme.typography.subtitle2 = {
    [theme.breakpoints.up('xs')]: {
        fontSize: '.8rem',
    },

    // [theme.breakpoints.up('md')]: {
    //     fontSize: '.875rem',
    //     fontWeight: "bold",
    //     display: "inline"
    // },
}
