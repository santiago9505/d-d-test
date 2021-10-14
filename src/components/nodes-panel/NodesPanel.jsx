import React from "react";
import Node from "./Node";

class NodesPanel extends React.Component {
  render() {
    return (
      <div className="panel-wrapper">
        <div className="nodes-panel">
          <div className="node-wrapper">
            <Node type="textnode" color="rgb(255, 255, 255)" name="Text" />
          </div>
          <hr />
          <div className="node-wrapper">
            <Node
              type="imagenode"
              color="rgb(238, 238, 238)"
              name="RDS"
              image="rds_logo.svg"
            />
          </div>
          <div className="node-wrapper">
            <Node
              type="imagenode"
              color="rgb(238, 238, 238)"
              name="EC2"
              image="ec2_logo.svg"
            />
          </div>
          <div className="node-wrapper">
            <Node
              type="imagenode"
              color="rgb(238, 238, 238)"
              name="Elastic Load Balancing"
              image="elb_logo.svg"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default NodesPanel;
