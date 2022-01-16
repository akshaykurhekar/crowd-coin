import React from "react";
import { Table } from "semantic-ui-react";
import web3 from "../ethereum/web3";

const RequestRow = (props) =>{

    const { Row, Cell } = Table
    
    return(
        <Row>
            <Cell>{props.id +1}</Cell>
            <Cell>{props.request.description}</Cell>
            <Cell>{ web3.utils.fromWei(props.request.value, 'ether')}</Cell>
            <Cell>{props.request.recipient}</Cell>
            <Cell>{props.request.approverCount}</Cell>
            <Cell>{props.approversCount}</Cell>
            <Cell>{""}</Cell>            
        </Row>
    );
}

export default RequestRow;
