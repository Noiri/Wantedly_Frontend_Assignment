import { FC } from "react";
import Avatar from "@material-ui/core/Avatar";
import useStyles from "../CSS/ProjectDetailPageCSS";
import { Staff } from "../DataType/ProjectType";

type Props = {
  staff: Staff;
};

const Avator: FC<Props> = ({ staff }) => {
  const classes = useStyles();

  return (
    <div key={staff.id} className={classes.avatorStyle}>
      <Avatar
        alt={staff.name}
        src={staff.avatarUrl}
        className={classes.avatorSize}
      />
      <p>{staff.name}</p>
    </div>
  );
};

export default Avator;
