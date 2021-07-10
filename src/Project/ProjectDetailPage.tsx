import { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

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

const useStyles = makeStyles((theme) => ({
  avator: {
    display: "flex",
    marginTop: "2%",
    marginLeft: "10%",
  },
  large: {
    width: theme.spacing(21),
    height: theme.spacing(21),
  },
  header: {
    backgroundColor: "#313F5C",
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const ProjectPage: FC = () => {
  const classes = useStyles();

  // for test
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
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <Typography className={classes.title} variant="h5">
            Wantedly Visit
          </Typography>
        </Toolbar>
      </AppBar>

      <h1 style={{ marginLeft: "10%" }}>{project?.title}</h1>
      <img
        src={project?.imageUrlLarge}
        alt={project?.title}
        style={{ marginLeft: "10%", marginRight: "10%" }}
        height="40%"
        width="80%"
      />
      <div className={classes.avator}>
        {project?.staffs.map((x) => (
          <div key={x.id} style={{ textAlign: "center", marginLeft: "3%" }}>
            <Avatar alt={x.name} src={x.avatarUrl} className={classes.large} />
            <p>{x.name}</p>
          </div>
        ))}
      </div>
      <div
        style={{ marginLeft: "10%", marginRight: "10%", marginBottom: "8%" }}
      >
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
