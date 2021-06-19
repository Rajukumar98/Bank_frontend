import { createMuiTheme } from "@material-ui/core";
import { blue, orange } from "@material-ui/core/colors";

const theme = createMuiTheme({
    status: {
        danger: orange[500],
    },
    palette: {
        primary: blue,
        secondary: {
            light: '#0066ff',
            main: '#861f41',
        },
        info:{
            main: "#444444"
        },
        success:{
            main:"#ec2478"
        }
    },
});

export default theme