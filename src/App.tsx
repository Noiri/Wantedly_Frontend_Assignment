import { FC } from "react";
import { Route, Switch, Redirect } from "react-router";

import ProjectListPage from "./ProjectList/ProjectListPage";
import ProjectPage from "./Project/ProjectDetailPage";
import NotFoundPage from "./NotFound/NotFoundPage";

const App: FC = () => (
  <Switch>
    <Route exact path="/projects">
      <ProjectListPage />
    </Route>
    <Route path="/projects/:id">
      <ProjectPage />
    </Route>
    <Redirect exact from="/" to="/projects" />
    <Route>
      <NotFoundPage />
    </Route>
  </Switch>
);

export default App;
