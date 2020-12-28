import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
      width: "60%",
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
    btn: {
        background: "rgb(8, 232, 222)",
        color: "black",
    },
    btn2: {
      background: "rgb(216, 216, 216)",
      color: "black",
      marginLeft: "20px",
    },
    btn3: {
        background: "rgb(8, 232, 222)",
        color: "black",
        marginLeft: "20px",
    },
}));