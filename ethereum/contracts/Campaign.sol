pragma solidity ^0.4.17;

contract CampaignFactory {

    address[] public deployedCampaign;

    function createCampaign(uint minium) public {
       address newCampaign = new Campaign(minium, msg.sender);
        deployedCampaign.push(newCampaign);
    }

    function getDeployedCampaign() public view returns ( address[]){
        return deployedCampaign;
    }
}

contract Campaign {
  
  struct Request {
      string description;
      uint value;
      address recipient;
      bool complete;
      uint approverCount;
      mapping(address => bool) approvals;
  }

  Request[] public requests;
  address public manager;
  uint public minimumconterubation;
  //mapping ( keys DataType => values DataType)
  mapping(address => bool) public approvers;
  uint public approversCount;
  
  modifier restricted() {
      require(msg.sender == manager);
      _;
  }

 constructor(uint minium,address creater) public {
     manager = creater;
     minimumconterubation = minium;
 }

    function contribute() public payable {
        require(msg.value > minimumconterubation);
        approvers[msg.sender] = true;
        approversCount++;
    }

    // recipient address minse address of vender to which we have pay this value
    function createRequest(string description, uint value, address recipient) public restricted {
           Request memory newRequest = Request({
               description: description,
               value: value,
               recipient: recipient,
               complete:false,
               approverCount:0
           });

           requests.push(newRequest); 
    }

    function approveRequest(uint index) public {

        Request storage request = requests[index];

        require(approvers[msg.sender]); // it will check the user is contributer or not { it must be true}
        require(!requests[index].approvals[msg.sender]);  // in requests struct array if approvals is present,
                                                           // it minse approver has allready action taken, it has sender address present it will kick off.
        request.approvals[msg.sender] = true;
        request.approverCount++;   
    }   

    function finalizeRequest(uint index) public restricted{
        
        Request storage request = requests[index];
        
        require(request.approverCount > (approversCount/2));
        require(!request.complete);

        // sending requested money {value} to vendor
        request.recipient.transfer(request.value); // recipient is a address type thats why we can call transfer method on it.
        request.complete = true;
    }

    function getSummary() public view returns (
        uint, uint, uint, uint, address
    ) {
        return (
            minimumconterubation,
            this.balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestCount() public view returns (uint){
        return requests.length;
    }

}