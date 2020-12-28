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
    paper: {
      position: "absolute",
      width: 300,
      paddingBottom: "50px",
      borderRadius: "6px",
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
}));

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

export const getModalStyle = function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}