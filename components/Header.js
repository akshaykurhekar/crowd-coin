import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes";

export default () => {
  return (
    <Menu style={{ marginTop: "10px" }}>
      <Link route="/">
        <a className="item"> Crowd coin</a>
      </Link>

      <Menu.Menu position="right">
        <Link route="/">
          <a className="item"> Campaign</a>
        </Link>
        <Link route="/campaign/createCampaign">
          <a className="item"> +</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};
