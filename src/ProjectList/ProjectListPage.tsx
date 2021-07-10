import { FC, useEffect, useState } from "react";

type Staffs = {
  staffs: {
    id: string;
    name: string;
    avatarUrl: string;
  };
};

type Project = {
  id: string;
  title: string;
  whyDescription: string;
  whatDescription: string;
  howDescription: string;
  imageUrlSmall: string;
  imageUrlLarge: string;
  staffs: Staffs[];
};

type Projects = {
  projects: Project[];
};

type Response = {
  data: Projects;
};

const ProjectListPage: FC = () => {
  const [projects, setProjects] = useState<Project[]>();

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
      } else {
        // setTitle("Not Found.");
      }
    };
    f().catch((err) => console.log(err));
  }, [query]);

  return (
    <ul style={{ listStyle: "none" }}>
      {projects !== undefined
        ? projects.map((x) => (
            <li key={x.id}>
              <p>{x.title}</p>
              <img src={x.imageUrlSmall} alt={x.title} />
            </li>
          ))
        : "undefined."}
    </ul>
  );
};

export default ProjectListPage;
