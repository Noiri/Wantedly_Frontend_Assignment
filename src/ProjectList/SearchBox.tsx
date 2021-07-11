import { FC } from "react";
import useStyles from "../CSS/ProjectListPageCSS";

type Props = {
  refSearchTitle: React.RefObject<HTMLInputElement>;
  searchProject: (keyWord: string) => void;
};

const SearchBox: FC<Props> = ({ refSearchTitle, searchProject }) => {
  const classes = useStyles();

  return (
    <input
      onKeyPress={(e) =>
        e.key === "Enter"
          ? searchProject(refSearchTitle.current?.value ?? "null")
          : null
      }
      ref={refSearchTitle}
      placeholder="募集を検索する"
      className={classes.searchBox}
    />
  );
};

export default SearchBox;
