import { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import Avatar from "@material-ui/core/Avatar";
import { Project } from "../DataType/ProjectType";
import useStyles from "../CSS/ProjectDetailPageCSS";
import useProjectDetailAPI from "../CustomHooks/usePorjectDetailAPI";
import NotFoundPage from "../NotFound/NotFoundPage";

const ProjectPage: FC = () => {
  const classes = useStyles();
  const [project, setProject] = useState<Project>();
  const { id } = useParams<{ id: string }>();
  const projectDetailAPI = useProjectDetailAPI(setProject);
  useEffect(() => {
    projectDetailAPI(id);
  }, [projectDetailAPI, id]);

  return (
    <>
      {project !== null ? (
        <>
          <h1 className={classes.projectTtile}>{project?.title}</h1>
          <img
            src={project?.imageUrlLarge}
            alt={project?.title}
            style={{ marginLeft: "10%", marginRight: "10%" }}
            height="40%"
            width="80%"
          />
          <div className={classes.avatorLayout}>
            {project?.staffs.map((x) => (
              <div key={x.id} className={classes.avatorStyle}>
                <Avatar
                  alt={x.name}
                  src={x.avatarUrl}
                  className={classes.avatorSize}
                />
                <p>{x.name}</p>
              </div>
            ))}
          </div>
          <div className={classes.descriptionLayout}>
            <h2>なにをやっているのか</h2>
            <p>{project?.whatDescription}</p>
            <h2>なぜやっているのか</h2>
            <p>{project?.whyDescription}</p>
            <h2>こんなことをやります</h2>
            <p>{project?.howDescription}</p>
          </div>
        </>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
};

export default ProjectPage;
