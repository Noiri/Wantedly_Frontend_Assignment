import { FC, useEffect, useState } from "react";
import { useParams } from "react-router";

type Staff = {
  id: string;
  name: string;
  avatarUrl: string;
};

type Project = {
  id: string;
  title: string;
  whyDescription: string;
  whatDescription: string;
  howDescription: string;
  imageUrlSmall: string;
  imageUrlLarge: string;
  staffs: Staff[];
};

type Response = {
  data: {
    project: Project;
  };
};

const ProjectPage: FC = () => {
  // for test
  const [project, setProject] = useState<Project>();
  // 623751
  const { id } = useParams<{ id: string }>();
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

  useEffect(() => {
    let resp: Response | void;
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
  }, [query, project, setProject]);

  return (
    <>
      <h1>{project?.title}</h1>
      <img src={project?.imageUrlLarge} alt={project?.title} width="90%" />
      <ul style={{ listStyle: "none" }}>
        {project?.staffs.map((x) => (
          <li>
            <img src={x.avatarUrl} alt={x.name} width="250" height="250" />
            <p>{x.name}</p>
          </li>
        ))}
      </ul>
      <h2>なにをやっているのか</h2>
      <p>{project?.whatDescription}</p>
      <h2>なぜやっているのか</h2>
      <p>{project?.whyDescription}</p>
      <h2>こんなことをやります</h2>
      <p>{project?.howDescription}</p>
    </>
  );
};

export default ProjectPage;
