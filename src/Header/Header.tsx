import { FC } from "react";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useStyles from "../CSS/HeadderCSS";
import SearchBox from "./SearchBox";
import SearchButton from "./SearchButton";

type Props = {
  refSearchTitle: React.RefObject<HTMLInputElement>;
  searchProject: (keyWord: string) => void;
  isSearchBox: boolean;
};

const Header: FC<Props> = ({ refSearchTitle, searchProject, isSearchBox }) => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.headerStyle}>
      <Toolbar>
        <Typography className={classes.appbarTitle} variant="h5">
          Wantedly Visit
        </Typography>
        {isSearchBox ? (
          <>
            <SearchBox
              refSearchTitle={refSearchTitle}
              searchProject={searchProject}
            />
            <SearchButton
              refSearchTitle={refSearchTitle}
              searchProject={searchProject}
            />
          </>
        ) : (
          ""
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
