import { FC } from "react";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import useStyles from "../CSS/ProjectListPageCSS";
import { Project } from "../DataType/ProjectType";

type Props = {
  project: Project;
};

const ProjectCard: FC<Props> = ({ project }) => {
  const { id, imageUrlSmall, title } = project;
  const classes = useStyles();

  return (
    <Link style={{ textDecoration: "none" }} to={`/projects/${id}`}>
      <Card key={id} className={classes.projectCardStyle}>
        <CardMedia
          className={classes.projectImage}
          image={imageUrlSmall}
          title={title}
        />
        <div>
          <CardContent className={classes.projectTitleLayout}>
            <Typography component="h5" variant="h5">
              {title}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
};

export default ProjectCard;
