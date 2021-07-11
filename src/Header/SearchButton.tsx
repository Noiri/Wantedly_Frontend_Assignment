import { FC } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import { grey } from "@material-ui/core/colors";

type Props = {
  refSearchTitle: React.RefObject<HTMLInputElement>;
  searchProject: (keyWord: string) => void;
};

const ColorButton = withStyles((theme) => ({
  root: {
    width: "4%",
    minWidth: "4%",
    color: theme.palette.getContrastText(grey[500]),
    backgroundColor: grey[500],
    "&:hover": {
      backgroundColor: grey[700],
    },
    "& > *": {
      color: "#fffafa",
    },
  },
}))(Button);

const SearchButton: FC<Props> = ({ refSearchTitle, searchProject }) => (
  <ColorButton
    onClick={() => searchProject(refSearchTitle.current?.value ?? "null")}
  >
    <SearchIcon />
  </ColorButton>
);

export default SearchButton;
