import { FC, useEffect, useState, useRef } from "react";
import { Project } from "../DataType/ProjectType";

import useStyles from "../CSS/ProjectListPageCSS";
import Header from "../Header/Header";
import ProjectCard from "./ProjectCard";
import useSearchProject from "../CustomHooks/useSearchProject";
import useProjectListAPI from "../CustomHooks/useProjectListAPI";

const ProjectListPage: FC = () => {
  const classes = useStyles();
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectList, setProjectList] = useState<Project[]>([]);
  // 募集が1件も引っかからなかったときにtrue
  const [notFound, setNotFound] = useState(false);

  const refSearchTitle = useRef<HTMLInputElement>(null);
  const searchProject = useSearchProject(projects, setProjectList, setNotFound);

  const projectListAPI = useProjectListAPI(setProjects, setProjectList);
  useEffect(() => {
    projectListAPI();
  }, [projectListAPI]);

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
          ? projectList.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          : "undefined."}
      </div>
    </>
  );
};

export default ProjectListPage;
