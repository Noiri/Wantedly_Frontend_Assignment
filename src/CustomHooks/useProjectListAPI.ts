import { useCallback } from "react";
import { Project } from "../DataType/ProjectType";

type Response = {
  data: {
    projects: Project[];
  };
};

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

const useProjectListAPI = (
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>,
  setProjectList: React.Dispatch<React.SetStateAction<Project[]>>
): (() => void) => {
  const projectAPI = useCallback(() => {
    fetch(`http://localhost:4000/graphql?${query}`)
      .then((response) => response.json())
      .then((data: Response) => {
        if (data !== null) {
          setProjects(data.data.projects);
          setProjectList(data.data.projects);
        }
      })
      .catch((err) => console.log(err));
  }, [setProjects, setProjectList]);

  return projectAPI;
};

export default useProjectListAPI;
