import { FC, useEffect, useState, useRef, useCallback } from "react";

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
  const [projectList, setProjectList] = useState<Project[]>();

  // 募集が1件も引っかからなかったときにtrue
  const [notFound, setNotFound] = useState(false);

  const refSearchTitle = useRef<HTMLInputElement>(null);

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

  const onClickHandler = useCallback(() => {
    const keyWord = refSearchTitle.current?.value ?? "";
    if (projects != null && keyWord !== "") {
      const Results: Project[] = projects?.filter(
        (x) => x.title.indexOf(keyWord) !== -1
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
  }, [projects]);

  useEffect(() => {
    let resp: Response | void;
    const f = async () => {
      resp = await fetch(`http://localhost:4000/graphql?${query}`)
        .then((response) => response.json())
        .then((data) => data as Response)
        .catch((err) => console.log(err));
      if (resp != null) {
        setProjects(resp.data.projects);
        setProjectList(resp.data.projects);
      }
    };
    f().catch((err) => console.log(err));
  }, [query]);

  return (
    <>
      <input ref={refSearchTitle} placeholder="募集を検索する" />
      <button type="button" onClick={onClickHandler}>
        serch
      </button>
      <p>{notFound ? "お探しの募集は見つかりませんでした." : ""}</p>
      <ul style={{ listStyle: "none" }}>
        {projectList !== undefined
          ? projectList.map((x) => (
              <li key={x.id}>
                <p>{x.title}</p>
                <img src={x.imageUrlSmall} alt={x.title} />
              </li>
            ))
          : "undefined."}
      </ul>
    </>
  );
};

export default ProjectListPage;
