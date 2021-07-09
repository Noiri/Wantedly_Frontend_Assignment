import { FC } from "react";
import { useParams } from "react-router";

/*
type Params = {
  prams: {
    id: string;
  };
};
*/

const ProjectPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);

  return <h1>ID = {id}</h1>;
};

export default ProjectPage;
