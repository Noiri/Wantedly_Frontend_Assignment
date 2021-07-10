import { FC, useEffect, useState } from "react";
import { useParams } from "react-router";

type Staffs = {
  staffs: {
    id: string;
    name: string;
    avatarUrl: string;
  };
};

type Project = {
  project: {
    id: string;
    title: string;
    whyDescription: string;
    whatDescription: string;
    howDescription: string;
    imageUrlSmall: string;
    imageUrlLarge: string;
    staffs: Staffs[];
  };
};

type Response = {
  data: Project;
};

const ProjectPage: FC = () => {
  // for test
  const [title, setTitle] = useState("");
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
        console.log(resp.data.project.title);
        setTitle(resp.data.project.title);
      } else {
        setTitle("Not Found.");
      }
    };
    f().catch(() => setTitle("募集が見つかりませんでした."));
  }, [query, title, setTitle]);

  return <h1>{title}</h1>;
};

export default ProjectPage;
