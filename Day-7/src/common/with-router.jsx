import React from "react";
import { useNavigate } from "react-router-dom";

export function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let navigate = useNavigate();
    return <Component {...props} router={{ navigate }} />;
  }
  return ComponentWithRouterProp;
}
