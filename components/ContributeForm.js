import React, { useState } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

const ContributeForm = (props) =>{

    const [value, setValue] = useState();
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    
    const onSubmitHandler = async (event) =>{
        event.preventDefault();
        const campaign = await Campaign(props.address);
        setLoading(true);
        
        try{
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(value, 'ether')
            });
            Router.replaceRoute(`/campaign/${props.address}`);
        }catch(err){
            setErrorMessage(err.message);
        }        
        setLoading(false);
        setValue('');
    
    }

    const onChangeHandler = (value) =>{
        setErrorMessage(false);
        setValue(value);
    }

    return(
        <Form onSubmit={onSubmitHandler} error={!!errorMessage}>
            <Form.Field>
                <label>Amount to Contribute</label>
                <Input label="ether" labelPosition='right' onChange={(event)=>{ onChangeHandler(event.target.value) }} required/>
            </Form.Field>
            {/* {errorMessage} */}
            <Message header="Oops!" content={errorMessage} error/>
            <Button loading={loading} primary type="submit">Contribute !</Button>
        </Form>
    );
};

export default ContributeForm;