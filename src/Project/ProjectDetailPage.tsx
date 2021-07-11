import { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import Avatar from "@material-ui/core/Avatar";
import { Project } from "../DataType/ProjectType";
import useStyles from "../CSS/ProjectDetailPageCSS";

type Response = {
  data: {
    project: Project;
  };
};

const ProjectPage: FC = () => {
  const classes = useStyles();

  const [project, setProject] = useState<Project>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    let resp: Response | void;

    const query = new URLSearchParams({
      query: `query {
    project(id: "${id}") {
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

    const f = async () => {
      resp = await fetch(`http://localhost:4000/graphql?${query}`)
        .then((response) => response.json())
        .then((data) => data as Response)
        .catch((err) => console.log(err));
      if (resp != null) {
        setProject(resp.data.project);
      }
    };
    f().catch(() => console.log("募集が見つかりませんでした."));
  }, [id]);

  return (
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
          <div key={x.id} style={{ textAlign: "center", marginLeft: "3%" }}>
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
  );
};

export default ProjectPage;
