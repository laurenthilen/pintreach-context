import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
      width: "60%",
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        marginTop: "10%",
      }
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    cardSize: {
      paddingBottom: "0px",
      width: "300px", 
      height: "300px", 
      marginBottom: "4%",
    },
}));