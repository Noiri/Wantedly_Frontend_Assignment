import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  projectListOuterLayout: {
    margin: "2% 15%",
  },
  projectCardStyle: {
    display: "flex",
    marginTop: "15px",
    height: 100,
    width: "100%",
    cursor: "pointer",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 7px 14px rgba(50,50,93,.1), 0 3px 6px rgba(0,0,0,.08)",
      opacity: 0.8,
    },
  },
  projectImage: {
    width: 120,
  },
  projectTitleLayout: {
    paddingTop: "4%",
    paddingBottom: "4%",
  },
}));

export default useStyles;
