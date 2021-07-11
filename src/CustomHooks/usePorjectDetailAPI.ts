import { useCallback } from "react";
import { Project } from "../DataType/ProjectType";

type Response = {
  data: {
    project: Project;
  };
};

const useProjectDetailAPI = (
  setProject: React.Dispatch<React.SetStateAction<Project | undefined>>
): ((id: string) => void) => {
  const projectDetailAPI = useCallback(
    (id: string) => {
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

      fetch(`http://localhost:4000/graphql?${query}`)
        .then((response) => response.json())
        .then((data: Response) => {
          if (data !== null) {
            setProject(data.data.project);
          }
        })
        .catch((err) => console.log(err));
    },
    [setProject]
  );

  return projectDetailAPI;
};

export default useProjectDetailAPI;
