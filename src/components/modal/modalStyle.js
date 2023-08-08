import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    // padding: theme.spacing(2),
    // boxShadow: theme.shadows[5],
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    // border: '2px solid #000',
    // boxShadow: 24,
    p: 5,
    elevation: 2,
  },
  spacer: {
    margin: 1,
  },
}));
