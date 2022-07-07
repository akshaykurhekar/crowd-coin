import React from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import ContributeForm from "../../components/ContributeForm";
import Layout from "../../components/layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import { Link } from "../../routes";

const show = ({
  address,
  minimumContribution,
  balance,
  requestsCount,
  approversCount,
  manager,
}) => {
  const renderCard = () => {
    const item = [
      {
        header: manager,
        meta: "Address of Manager",
        description:
          "The Manager created this campaign and can create request for approval",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumContribution,
        meta: "Minimum Contribution (wei)",
        description: "You must have to contribute this much to become approver",
        style: { overflowWrap: "break-word" },
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign Balance (ether)",
        description: "Total amount left in this campaign",
        style: { overflowWrap: "break-word" },
      },
      {
        header: requestsCount,
        meta: "Number of Requests",
        description:
          "Requests tries to withdraw money from contract, request must be approved by approver.",
        style: { overflowWrap: "break-word" },
      },
      {
        header: approversCount,
        meta: "Number of Approvers",
        description: "This may are already contributed to this campaign",
        style: { overflowWrap: "break-word" },
      },
    ];

    return <Card.Group items={item} />;
  };

  return (
    <Layout>
      <h2>Campaign Details</h2>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>{renderCard()}</Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={address} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link route={`/campaign/${address}/requests`}>
              <Button primary> View Requests </Button>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

show.getInitialProps = async (props) => {
  const campaign = Campaign(props.query.address);

  const summary = await campaign.methods.getSummary().call();

  return {
    address: props.query.address,
    minimumContribution: summary[0],
    balance: summary[1],
    requestsCount: summary[2],
    approversCount: summary[3],
    manager: summary[4],
  };
};

export default show;
