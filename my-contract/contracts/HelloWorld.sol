// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract HelloWorld {
    string public name;
    string public text;
    

    constructor() {
        name = "Default-Name";
        text = "Hello world my name is: ";
       
    }

    function getText() public view returns (string memory) {
        return text;
    }
    function getName() public view returns (string memory) {
        return name;
    }

    function setText(string calldata newText) public{
        text = newText;
    }
     function setName(string calldata newName) public {
        name = newName;
    }

}