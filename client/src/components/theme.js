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
}));