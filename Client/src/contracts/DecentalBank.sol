// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import './RWD.sol';
import './Tether.sol';

contract DecentralBank {
  address public owner;
  string public name = 'Decentral Bank';
  Tether public tether;
  RWD public rwd;

  mapping (address=>uint) public  stakingBalance;
  mapping (address=>bool) public  hasStaked;
  mapping (address=>bool) public  isStaking;

  address[] public stakers;

  constructor (RWD _rwd, Tether _tether) {
    rwd = _rwd;
    tether = _tether;
    owner = msg.sender;
  }

  function depositToken(uint _amount) public {
    // check balance before staking 
    require(_amount > 0, 'Amount must be greater than 1');
    // require(tether.balanceOf[msg.sender] >= _amount, 'Insufficient Token Balance');
    // transfer tether tokens to contract address
    tether.transferFrom(msg.sender, address(this), _amount);

    // update staking balance
    stakingBalance[msg.sender] += _amount;

    if(hasStaked[msg.sender]){
      stakers.push(msg.sender);
    }

    // update staking status
    isStaking[msg.sender] = true;
    hasStaked[msg.sender] = true;
  }

  function issueToken() public {
    // only owner restriction 
    require(msg.sender == owner, 'Only owner can call function');
    for (uint256 i = 0; i < stakers.length; i++) {
      address recipient = stakers[i];
      uint balance = stakingBalance[recipient];
      if(balance > 0) {
      rwd.transfer(recipient, balance);
      }
    }
  }

  function unstakeTokens() public {
    uint balance = stakingBalance[msg.sender];
    require(balance >0, 'staking balance must be more than 0');

    tether.transfer(msg.sender, balance);

    stakingBalance[msg.sender] = 0;

    isStaking[msg.sender] = false;
  }
  
}
