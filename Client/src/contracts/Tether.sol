// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Tether {
   string public name = 'Tether Token';
   string symbol = 'USDT';
   uint totalSupply = 1000000000000000000000000; // 1 million 
   uint8 public decimals = 18;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint _value
    );

    event Approvak(
        address indexed _owner,
        address indexed _spender,
        uint _value
    );

    mapping (address=>uint) public balanceOf;

    mapping (address => mapping (address=>uint))public allowance;

    constructor ()  {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer (address _to, uint _value) public returns (bool success) {
            // verify that there is enough token to transfer
        require(balanceOf[msg.sender] >= _value);
            // deduct token from sender
        balanceOf[msg.sender] -= _value;
            // add token to reciever
        balanceOf[_to] += _value;
            // emit a record of the event
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approvak(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint _value) public returns (bool success) {
            // verify that there is enough token to transfer
        require(balanceOf[_from] >= _value);
        require(allowance[_from][msg.sender] >= _value);
            // deduct token from sender
        balanceOf[_from] -= _value;
            // add token to reciever
        balanceOf[_to] += _value;
        allowance[msg.sender][_from] -= _value;
            // emit a record of the event
        emit Transfer(_from, _to, _value);
        
        
        return true;
    }
}
