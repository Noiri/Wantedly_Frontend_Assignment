import { useCallback } from "react";
import { Project } from "../DataType/ProjectType";

const useSearchProject = (
  projects: Project[],
  setProjectList: React.Dispatch<React.SetStateAction<Project[]>>,
  setNotFound: React.Dispatch<React.SetStateAction<boolean>>
): ((keyWord: string) => void) => {
  const searchProject = useCallback(
    (keyWord: string) => {
      if (projects != null && keyWord !== "") {
        const Results: Project[] = projects?.filter(
          (x) => x.title.toLowerCase().indexOf(keyWord) !== -1
        );
        if (Results.length === 0) {
          setNotFound(true);
        } else {
          setNotFound(false);
        }
        setProjectList(Results);
      } else {
        setNotFound(false);
        setProjectList(projects);
      }
    },
    [projects, setProjectList, setNotFound]
  );

  return searchProject;
};

export default useSearchProject;
