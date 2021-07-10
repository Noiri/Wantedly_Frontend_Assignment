import { FC, useEffect, useState } from "react";
import axios from "axios";

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
/*
type Response = {
  data: Project[];
};
*/

const ProjectListPage: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const id = 623751;

  useEffect(() => {
    axios
      .get<Project[]>("http://localhost:4000/graphql", {
        params: {
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
        },
      })
      .then((response) => {
        setIsLoading(false);
        console.log(response);
        // const tmp: Project[] = response;
        // console.log(tmp);
        // console.log(tmp.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <h1>{isLoading ? "Loading Now..." : "Finished!!!"}</h1>;
};

export default ProjectListPage;
