pragma solidity >=0.4.21 <0.7.0;

contract SimpleStorage {
    struct UserAmount {
        address userAddress;
        uint256 userAmount;
    }

    struct BetRequest {
        string name;
        bool isEnded;
        uint256 startTime;
        uint256 finishTime;
        uint256 winAmount;
        uint256 drawAmount;
        uint256 loseAmount;
        mapping(uint256 => UserAmount) userBets;
        uint256 userBetsSize;
    }

    BetRequest[] public betRequests;

    mapping(address => uint256) storedData;

    constructor() public {
        uint256 startTime = 1592046520310;
        uint256 finishTime = 1592077197013;
        createBetRequest("Zenit vs. Spartak", startTime, finishTime);
    }

    function set(uint256 x) public {
        storedData[msg.sender] = storedData[msg.sender] + x;
    }

    function get() public view returns (uint256) {
        return storedData[msg.sender];
    }

    function betAmount(
        uint256 index,
        string memory outcome,
        uint256 x
    ) public returns (string memory) {
        if (x <= storedData[msg.sender]) {
            UserAmount memory userAmount = UserAmount(msg.sender, x);
            uint256 betsCount = betRequests[index].userBetsSize;
            storedData[msg.sender] = storedData[msg.sender] - x;
            if (compareStrings(outcome, "Win")) {
                betRequests[index].winAmount = betRequests[index].winAmount + x;
            } else if (compareStrings(outcome, "Lose")) {
                betRequests[index].loseAmount = betRequests[index].loseAmount + x;
            } else if (compareStrings(outcome, "Draw")) {
                betRequests[index].drawAmount = betRequests[index].drawAmount + x;
            }
            betRequests[index].userBets[betsCount] = userAmount;
            betRequests[index].userBetsSize = betsCount + 1;
            return "Bet made successful!";
        }
        return "Not enougth amount to bet!";
    }

    function createBetRequest(
        string memory name,
        uint256 startTime,
        uint256 finishTime
    ) public {
        betRequests.push(
            BetRequest({
                name: name,
                isEnded: false,
                startTime: startTime,
                finishTime: finishTime,
                winAmount: 0,
                drawAmount: 0,
                loseAmount: 0,
                userBetsSize: 0
            })
        );
        //betRequests.push(BetRequest(name, false, startTime, finishTime, 0, 0, 0, 0));
    }

    function getBetRequests() external view returns (uint256[] memory) {
        uint256[] memory result = new uint256[](betRequests.length);
        for (uint256 i = 0; i < betRequests.length; i++) {
            result[i] = betRequests[i].startTime;
        }
        return result;
    }

    function getBetRequestCount() public view returns (uint256) {
        return betRequests.length;
    }

    function getBetRequest(uint256 index)
        public
        view
        returns (
            uint256,
            string memory,
            //bool,
            uint256,
            uint256,
            uint256,
            uint256,
            uint256
        )
    {
        return (
            index,
            betRequests[index].name,
            //betRequests[index].isEnded,
            betRequests[index].startTime,
            betRequests[index].finishTime,
            betRequests[index].winAmount,
            betRequests[index].drawAmount,
            betRequests[index].loseAmount
        );
    }

    function finishBet(uint256 index, string memory outcome) public {
      betRequests[index].isEnded = true;
      uint256 sumAmount = betRequests[index].winAmount + betRequests[index].drawAmount + betRequests[index].loseAmount;
        if (compareStrings(outcome, "Win")) {
            storedData[betRequests[index].userBets[0].userAddress] = storedData[betRequests[index].userBets[0].userAddress] + sumAmount;
        } else if (compareStrings(outcome, "Lose")) {
            storedData[betRequests[index].userBets[1].userAddress] = storedData[betRequests[index].userBets[1].userAddress] + sumAmount;
        } else if (compareStrings(outcome, "Draw")) {
            storedData[betRequests[index].userBets[2].userAddress] = storedData[betRequests[index].userBets[2].userAddress] + sumAmount;
        }
        betRequests[index].winAmount = 0;
        betRequests[index].drawAmount = 0;
        betRequests[index].loseAmount = 0;
    }

    function compareStrings(string memory a, string memory b)
        public
        pure
        returns (bool)
    {
        return (keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b))));
    }
}
