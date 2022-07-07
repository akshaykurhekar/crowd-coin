import React, { useState } from "react";
import Layout from "../../../components/layout";
import { Button, Form, Input, Message } from "semantic-ui-react";
import { Link } from "../../../routes";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";


const createRequest = ({address}) => {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [recipient, setRecipient] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault;
    setLoading(true);
    setErrorMessage(false);

    const campaign = Campaign(address);

    try {
      const address = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({
          from: address[0],
        });
    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoading(false);
  };

  return (
    <Layout>
        <Link route={`/campaign/${address}/requests`}>
                <a>
                     Back
                </a>
            </Link>
      <h2>Create New Request</h2>
      <Form onSubmit={onSubmitHandler} error={!!errorMessage}>
        <Form.Field>
          <label>Description</label>
          <Input
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setErrorMessage(false);
            }}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Value in Ether</label>
          <Input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setErrorMessage(false);
            }}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Recipient address</label>
          <Input
            value={recipient}
            onChange={(e) => {
              setRecipient(e.target.value);
              setErrorMessage(false);
            }}
            required
          />
        </Form.Field>
        <Message error header="Oops!" content={errorMessage} />
        <Button primary loading={loading} type="submit">
          Create
        </Button>
      </Form>
    </Layout>
  );
};

createRequest.getInitialProps = async (props) => {
  const { address } = await props.query;
  return { address };
};

export default createRequest;
