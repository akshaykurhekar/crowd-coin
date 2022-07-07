import React, { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../components/layout";
import factory from "../../ethereum/factory.js";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

const createCampaign = () => {
  const [minContribution, setMinContribution] = useState(100);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(false);
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(minContribution).send({
        from: accounts[0],
      });
      Router.pushRoute("/");
    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoading(false);
    setMinContribution(0);
  };
  return (
    <Layout>
      <h3>Create Campaign</h3>
      <Form onSubmit={onSubmitHandler} error={!!errorMessage}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            type="number"
            value={minContribution}
            label="Wei"
            labelPosition="right"
            onChange={(e) => {
              setMinContribution(e.target.value);
              setErrorMessage(false);
            }}
          />
        </Form.Field>
        <Message error header="Oops!" content={errorMessage} />
        <Button loading={loading} type="submit" primary>
          Submit
        </Button>
      </Form>
    </Layout>
  );
};

export default createCampaign;
