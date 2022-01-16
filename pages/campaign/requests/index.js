import React from "react";
import Layout from "../../../components/layout";
import { Link } from "../../../routes";
import { Button, Table, Grid } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";

const RequestIndex = ({ address, request, requestCount, approversCount }) => {
  const { Header, Row, HeaderCell, Body } = Table;

  const renderRow = () => {
    return request.map((request, index) => {
      return <RequestRow key={index} id={index} request={request} approversCount={approversCount} address={address} />;
    });
  };

  return (
    <Layout>
      <Grid>
        <Grid.Row>
          <Grid.Column width={13}>
            <h1> Requests </h1>
          </Grid.Column>
          <Grid.Column width={3}>
            <Link route={`/campaign/${address}/requests/new`}>
              <a>
                <Button primary> Add Request</Button>
              </a>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>{renderRow()}</Body>
      </Table>
    </Layout>
  );
};

RequestIndex.getInitialProps = async (props) => {
  const { address } = await props.query;

  const campaign = await Campaign(address);

  const requestCount = await campaign.methods.getRequestCount().call();
  const approversCount = await campaign.methods.approversCount().call();

  const request = await Promise.all(
    Array(requestCount)
      .fill()
      .map((element, index) => {
        return campaign.methods.requests(index).call();
      })
  );

  return { address, request, requestCount,approversCount };
};

export default RequestIndex;
