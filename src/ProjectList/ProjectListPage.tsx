import { FC, useEffect, useState, useRef } from "react";
import { Project } from "../DataType/ProjectType";

import useStyles from "../CSS/ProjectListPageCSS";
import Header from "../Header/Header";
import ProjectCard from "./ProjectCard";
import useSearchProject from "../CustomHooks/useSearchProject";

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
  const searchProject = useSearchProject(projects, setProjectList, setNotFound);

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
      <Header
        refSearchTitle={refSearchTitle}
        searchProject={searchProject}
        isSearchBox
      />
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
