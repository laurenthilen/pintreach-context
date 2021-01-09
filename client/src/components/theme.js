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
    paper: {
      position: "center",
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
    cardSize: {
      paddingBottom: "0px",
      width: "300px", 
      height: "300px", 
      marginBottom: "4%",
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