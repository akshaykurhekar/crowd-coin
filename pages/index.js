import React, { useEffect } from "react";
import factory from "../ethereum/factory";
import { Card, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Layout from "../components/layout";
import { Router, Link } from "../routes.js";

const CampaignIndex = ({ list }) => {
  const renderCampaignList = () => {
    const items = list.map((address) => {
      return {
        header: address,
        description: <Link route={`/campaign/${address}`} ><a>View Campaign</a></Link> ,
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <div>
        <h1>Campaign Index</h1>
        <Button
          floated="right"
          content="Create Campaign"
          primary
          icon="add circle"
          onClick={() => Router.pushRoute("/campaign/createCampaign")}
        />
        {renderCampaignList()}
      </div>
    </Layout>
  );
};

CampaignIndex.getInitialProps = async () => {
  const list = await factory.methods.getDeployedCampaign().call();
  return { list };
};

export default CampaignIndex;
