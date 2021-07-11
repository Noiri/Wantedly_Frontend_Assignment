import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
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
  searchBox: {
    width: "30%",
    height: "30px",
    lineHeight: "30px",
  },
}));

export default useStyles;
