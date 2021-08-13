pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract BettingContract{

    using SafeMath for uint256;
    
    uint256 numberOfBets;

    enum State{ await_approval, await_funds, await_decision, completed }

    struct Bet {
        string betReason;
        uint256 amountToBet;
        address payable firstBetter;
        address payable secondBetter;
        address payable thirdParty;
        uint256 betId;
        State state;
        uint256 addressWhichApproved;
        uint256 addressWhichFunded;
    }
    

    mapping (uint => Bet) betList;

    mapping (uint256 => address[]) betIdToApprove;
    mapping (uint256 => address[]) adressFundedBet;

    constructor() public {
        numberOfBets = 0;
    }

    modifier checkPartOfBet(uint256 betId){ 
        require(betList[betId].firstBetter == msg.sender || betList[betId].secondBetter == msg.sender || betList[betId].thirdParty == msg.sender, "You are  not part of this bet");
        _;
    }

    modifier checkIntergerOnly (uint256 integerToCheck) {
        require(integerToCheck.mod(1) == 0,"The number is not an integer");
        _;
    }


    function createBet(string memory _betReason,uint256 _amount, address payable _firstAddress, address payable _secondAddress, address payable _thirdParty ) public  checkIntergerOnly (_amount) returns(uint256){

        require(_firstAddress != _secondAddress && _secondAddress!= _thirdParty && _firstAddress!= _thirdParty, "All three address participating in the bet must be different addresses.");

        uint256 betId = numberOfBets;
        address[3] memory adressesToApprove;
        address[2] memory addressesToFund;
        
        betList[betId] = Bet(_betReason,_amount, _firstAddress, _secondAddress, _thirdParty, betId, State.await_approval, 0, 0);
        betIdToApprove[betId] = adressesToApprove;
        adressFundedBet[betId] = addressesToFund;
        numberOfBets++;
        return betId;
    }

    
    function approveBet(uint256 betId) external checkPartOfBet(betId) {
        require(betList[betId].firstBetter == msg.sender || betList[betId].secondBetter == msg.sender || betList[betId].thirdParty == msg.sender, "You are  not part of this bet");

        for(uint256 i = 0; i < betIdToApprove[betId].length; i++){

            if(betIdToApprove[betId][i] == msg.sender){
                revert("You have already approved the bet");
            }
        }

        betIdToApprove[betId].push(msg.sender);
        betList[betId].addressWhichApproved = betList[betId].addressWhichApproved.add(1);

        //Hard coded because for some reason when I put betIdToApprove[IdBet].length, it does not work, the length of the array is  supposed to be 3 because there are only  3 different participants in a bet
        if(betList[betId].addressWhichApproved == 3 ){
            betList[betId].state = State.await_funds;
        } 
    }


    function transferFundsForBet(uint256 betId) external payable checkPartOfBet(betId) {
        require(msg.sender != betList[betId].thirdParty, "You are the third party. You are not allowed to bet");
        require(betList[betId].state == State.await_funds, "The bet is still in process of being approved");

        for(uint256 i = 0; i< adressFundedBet[betId].length; i++){

            if(adressFundedBet[betId][i] == msg.sender){

                revert("You have already funded the bet");

            }
        }
        
        require(msg.value == betList[betId].amountToBet, "The amount inputted is not equal to the amount you are supposed to bet with");

        (bool success, ) = betList[betId].thirdParty.call{value: msg.value}("");
        require(success, "Transaction failed");

        adressFundedBet[betId].push(msg.sender);
        betList[betId].addressWhichFunded = betList[betId].addressWhichFunded.add(1);
        
        //Hard coded because for some reason when I put adressFundedBet[betId].length, it does not work, the number of participants that will transfer funds in a bet is 2, that is why I put == to 2
        if(betList[betId].addressWhichFunded == 2){
            betList[betId].state = State.await_decision;
        }
    }

    function performBetDecision(uint betId, address payable winner) external payable {
        require(msg.sender == betList[betId].thirdParty,"You are not the third party, you are not allowed to perform a decision on the bet");
        require(betList[betId].state == State.await_decision, "The bet has either already been completed, or is not approved by all participants yet, or not all participants have transferred funds yet.");
        require(winner == betList[betId].firstBetter || winner == betList[betId].secondBetter, "The provided address is not a better of this bet");

        require(msg.value == betList[betId].amountToBet.mul(2), "The value inputted is not the ammount to give to the winner");

        (bool success, ) = winner.call{value: msg.value}("");
        require(success, "Transaction failed");

        betList[betId].state = State.completed;
        
    }

    //--------------------- view functions ---------------------


    function getBetReason(uint256 betId) external view returns(string memory){

        return betList[betId].betReason;

    }

    function getBetAmount(uint256 betId) external view returns(uint256){

        return betList[betId].amountToBet;

    }

    function getBetFirstBetter(uint256 betId) external view returns(address){

        return betList[betId].firstBetter;

    }
    
    function getBetSecondtBetter(uint256 betId) external view returns(address){

        return betList[betId].secondBetter;

    }

    function getBetThirdParty(uint256 betId) external view returns(address){

        return betList[betId].thirdParty;

    }

    function getLastBetId()external view returns(uint256){
        return numberOfBets;
    }

} 