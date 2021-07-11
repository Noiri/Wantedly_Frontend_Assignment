import { FC, useEffect, useState, useRef, useCallback } from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import { grey } from "@material-ui/core/colors";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Project } from "../DataType/ProjectType";

import useStyles from "../CSS/ProjectListPageCSS";

type Response = {
  data: {
    projects: Project[];
  };
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

const ProjectListPage: FC = () => {
  const classes = useStyles();

  const [projects, setProjects] = useState<Project[]>();
  const [projectList, setProjectList] = useState<Project[]>();

  // 募集が1件も引っかからなかったときにtrue
  const [notFound, setNotFound] = useState(false);

  const refSearchTitle = useRef<HTMLInputElement>(null);

  const query = new URLSearchParams({
    query: `query {
    projects {
      id
      title
      whyDescription
      whatDescription
      howDescription
      imageUrlSmall
      imageUrlLarge
      staffs {
        id
        name
        avatarUrl
      }
    }
  }`,
  }).toString();

  const onClickHandler = useCallback(() => {
    const keyWord = refSearchTitle.current?.value ?? "";
    if (projects != null && keyWord !== "") {
      const Results: Project[] = projects?.filter(
        (x) => x.title.toLowerCase().indexOf(keyWord) !== -1
      );
      if (Results.length === 0) {
        setNotFound(true);
      } else {
        setNotFound(false);
      }
      setProjectList(Results);
    } else {
      setNotFound(false);
      setProjectList(projects);
    }
  }, [projects]);

  useEffect(() => {
    let resp: Response | void;
    const f = async () => {
      resp = await fetch(`http://localhost:4000/graphql?${query}`)
        .then((response) => response.json())
        .then((data) => data as Response)
        .catch((err) => console.log(err));
      if (resp != null) {
        setProjects(resp.data.projects);
        setProjectList(resp.data.projects);
      }
    };
    f().catch((err) => console.log(err));
  }, [query]);

  return (
    <>
      <AppBar position="static" className={classes.headerStyle}>
        <Toolbar>
          <Typography className={classes.appbarTitle} variant="h5">
            Wantedly Visit
          </Typography>
          <input
            onKeyPress={(e) => (e.key === "Enter" ? onClickHandler() : null)}
            ref={refSearchTitle}
            placeholder="募集を検索する"
            className={classes.searchBox}
          />
          <ColorButton onClick={onClickHandler}>
            <SearchIcon />
          </ColorButton>
        </Toolbar>
      </AppBar>
      <div className={classes.projectListOuterLayout}>
        <p>{notFound ? "お探しの募集は見つかりませんでした." : ""}</p>

        {projectList !== undefined
          ? projectList.map((x) => (
              <Link style={{ textDecoration: "none" }} to={`/projects/${x.id}`}>
                <Card key={x.id} className={classes.projectCardStyle}>
                  <CardMedia
                    className={classes.projectImage}
                    image={x.imageUrlSmall}
                    title={x.title}
                  />
                  <div>
                    <CardContent className={classes.projectTitleLayout}>
                      <Typography component="h5" variant="h5">
                        {x.title}
                      </Typography>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            ))
          : "undefined."}
      </div>
    </>
  );
};

export default ProjectListPage;
