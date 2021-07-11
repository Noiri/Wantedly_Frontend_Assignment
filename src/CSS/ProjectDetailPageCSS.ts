import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appbarTitle: {
    flexGrow: 1,
  },
  headerStyle: {
    backgroundColor: "#313F5C",
    flexGrow: 1,
  },
  projectTtile: {
    marginLeft: "10%",
  },
  avatorLayout: {
    display: "flex",
    marginTop: "2%",
    marginLeft: "10%",
  },
  avatorSize: {
    width: theme.spacing(21),
    height: theme.spacing(21),
  },
  descriptionLayout: {
    marginLeft: "10%",
    marginRight: "10%",
    marginBottom: "8%",
  },
}));

export default useStyles;
