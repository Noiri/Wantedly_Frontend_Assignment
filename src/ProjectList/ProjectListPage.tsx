import { FC, useEffect, useState, useRef } from "react";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Project } from "../DataType/ProjectType";

import useStyles from "../CSS/ProjectListPageCSS";
import ProjectCard from "./ProjectCard";
import SearchBox from "./SearchBox";
import useSearchProject from "../CustomHooks/useSearchProject";
import SearchButton from "./SearchButton";

type Response = {
  data: {
    projects: Project[];
  };
};

const ProjectListPage: FC = () => {
  const classes = useStyles();
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectList, setProjectList] = useState<Project[]>([]);
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

  const searchProject = useSearchProject(projects, setProjectList, setNotFound);

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
          <SearchBox
            refSearchTitle={refSearchTitle}
            searchProject={searchProject}
          />
          <SearchButton
            refSearchTitle={refSearchTitle}
            searchProject={searchProject}
          />
        </Toolbar>
      </AppBar>
      <div className={classes.projectListOuterLayout}>
        <p>{notFound ? "お探しの募集は見つかりませんでした." : ""}</p>
        {projectList !== undefined
          ? projectList.map((project) => <ProjectCard project={project} />)
          : "undefined."}
      </div>
    </>
  );
};

export default ProjectListPage;
