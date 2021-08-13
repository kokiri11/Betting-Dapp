const bettingContract = artifacts.require("bettingContract");

contract("bettingContract Tests", accounts => {
    
    describe("Normal usage", () => {

        let contractInstance;
        const amount =  30000000000000000000;
        const amount1 = amount.toString();
        const usableAmount = web3.utils.toBN(amount1);
        
        it("Should initialize and create a bet", async() => {
            contractInstance = await bettingContract.new();
            const result = await contractInstance.createBet("Want",usableAmount, accounts[0], accounts[1], accounts[2]);
            assert.equal(result.receipt.status, true);
        });

        it("Should approve bet for first account", async() => {
            const result = await contractInstance.approveBet(0,{from: accounts[0]});
            assert.equal(result.receipt.status, true);
        });

        it("Should approve bet for second account", async() => {
            const result = await contractInstance.approveBet(0,{from: accounts[1]});
            assert.equal(result.receipt.status, true);
        });

        it("Should approve bet for thirdparty account", async() => {
            const result = await contractInstance.approveBet(0,{from: accounts[2]});
            assert.equal(result.receipt.status, true);
        });

        // it("Should check bet approved", async() => {
        //     const result = await contractInstance.checkBetApproved(0,{from: accounts[0]});
        //     assert.equal(result.receipt.status, true);
        // });

        it("Should transfer funds", async() => {
            const result = await contractInstance.transferFundsForBet(0, {from: accounts[0], value: usableAmount});
            assert.equal(result.receipt.status, true);
        });

        it("Should transfer funds", async() => {
            const result = await contractInstance.transferFundsForBet(0, {from: accounts[1], value: usableAmount});
            assert.equal(result.receipt.status, true);
        });

        it("Should perform betdecisions", async() => {
            const result = await contractInstance.performBetDecision(0, accounts[0], {from: accounts[2], value: 2 * usableAmount});
            assert.equal(result.receipt.status, true);
        });
    });



    describe("Defectuous usage", () => {

        let contractInstance1;
        const amounts =  30000000000000000000;
        const amounts1 = amounts.toString();
        const usableAmount = web3.utils.toBN(amounts1);
    
        it("Should create bet ", async() => {
            contractInstance1  = await bettingContract.new();
            const result = await contractInstance1.createBet("Testbet", usableAmount, accounts[3], accounts[4], accounts[5]);
            assert.equal(result.receipt.status, true);
        });
    
        it("Should not approve bet for this account because it is not registered", async() => {
            const result = await contractInstance1.approveBet(0,{from: accounts[6]});
            assert.equal(result.receipt.status, true);
        });

        it("Should approve bet for this account", async() => {
            const result = await contractInstance1.approveBet(0,{from: accounts[3]});
            assert.equal(result.receipt.status, true);
        });

        it("Should approve bet for this account", async() => {
            const result = await contractInstance1.approveBet(0,{from: accounts[4]});
            assert.equal(result.receipt.status, true);
        });

        it("Should approve bet for this account", async() => {
            const result = await contractInstance1.approveBet(0,{from: accounts[5]});
            assert.equal(result.receipt.status, true);
        });

        it("Should not let approve bet for this account twice", async() => {
            const result = await contractInstance1.approveBet(0,{from: accounts[5]});
            assert.equal(result.receipt.status, true);
        });

        // it("Should not let checkbet with this account", async() => {
        //     const result = await contractInstance1.approveBet(0,{from: accounts[6]});
        //     assert.equal(result.receipt.status, true);
        // });

        it("Should not let registered account transfer funds  before bet checked", async() => {
            const result = await contractInstance.checkBetApproved(0,{from: accounts[3]});
            assert.equal(result.receipt.status, true);
        });

        it("Should not let not registered account transfer funds before bet checked", async() => {
            const result = await contractInstance.checkBetApproved(0,{from: accounts[6]});
            assert.equal(result.receipt.status, true);
        });
        

        // it("Should let account checkbet", async() => {
        //     const result = await contractInstance1.checkBetApproved(0,{from: accounts[4]});
        //     assert.equal(result.receipt.status, true);
        // });

        // it("Should not let bet be checked twice", async() => {
        //     const result = await contractInstance1.checkBetApproved(0,{from: accounts[5]});
        //     assert.equal(result.receipt.status, true);
        // });

        it("Should not let account not registered in bet transfer funds", async() => {
            const result = await contractInstance1.transferFundsForBet(0,{from: accounts[6], value: usableAmount});
            assert.equal(result.receipt.status, true);
        });

        it("Should not let thirdparty transfer funds", async() => {
            const result = await contractInstance1.transferFundsForBet(0,{from: accounts[5], value: usableAmount});
            assert.equal(result.receipt.status, true);
        });


    });

    describe("Trying to make multiple bets with same accounts", () => {

        let contractInstance2;
        const amount =  30000000000000000000;
        const amount1 = amount.toString();
        const usableAmount = web3.utils.toBN(amount1);
        
        it("Should initialize and create first bet", async() => {
            contractInstance2 = await bettingContract.new();
            const result = await contractInstance2.createBet("First test bet",usableAmount, accounts[0], accounts[1], accounts[2]);
            assert.equal(result.receipt.status, true);
        });

        it("Should approve bet for first account", async() => {
            const result = await contractInstance2.approveBet(0,{from: accounts[0]});
            assert.equal(result.receipt.status, true);
        });

        it("Should approve bet for second account", async() => {
            const result = await contractInstance2.approveBet(0,{from: accounts[1]});
            assert.equal(result.receipt.status, true);
        });

        it("Should approve bet for thirdparty account", async() => {
            const result = await contractInstance2.approveBet(0,{from: accounts[2]});
            assert.equal(result.receipt.status, true);
        });

        // it("Should check bet approved", async() => {
        //     const result = await contractInstance2.checkBetApproved(0,{from: accounts[0]});
        //     assert.equal(result.receipt.status, true);
        // });

        it("Should transfer funds", async() => {
            const result = await contractInstance2.transferFundsForBet(0, {from: accounts[0], value: usableAmount});
            assert.equal(result.receipt.status, true);
        });

        it("Should transfer funds", async() => {
            const result = await contractInstance2.transferFundsForBet(0, {from: accounts[1], value: usableAmount});
            assert.equal(result.receipt.status, true);
        });

        it("Should perform betdecisions", async() => {
            const result = await contractInstance2.performBetDecision(0, accounts[0], {from: accounts[2], value: 2 * usableAmount});
            assert.equal(result.receipt.status, true);
        });

        //----------------------------------------------------------

        it("Should initialize and create second bet", async() => {
            const result = await contractInstance2.createBet("Second test bet",usableAmount, accounts[0], accounts[1], accounts[2]);
            assert.equal(result.receipt.status, true);
        });

        it("Should approve bet for first account", async() => {
            const result = await contractInstance2.approveBet(1,{from: accounts[0]});
            assert.equal(result.receipt.status, true);
        });

        it("Should approve bet for second account", async() => {
            const result = await contractInstance2.approveBet(1,{from: accounts[1]});
            assert.equal(result.receipt.status, true);
        });

        it("Should approve bet for thirdparty account", async() => {
            const result = await contractInstance2.approveBet(1,{from: accounts[2]});
            assert.equal(result.receipt.status, true);
        });

        // it("Should check bet approved", async() => {
        //     const result = await contractInstance2.checkBetApproved(1,{from: accounts[0]});
        //     assert.equal(result.receipt.status, true);
        // });

        it("Should transfer funds", async() => {
            const result = await contractInstance2.transferFundsForBet(1, {from: accounts[0], value: usableAmount});
            assert.equal(result.receipt.status, true);
        });

        it("Should transfer funds", async() => {
            const result = await contractInstance2.transferFundsForBet(1, {from: accounts[1], value: usableAmount});
            assert.equal(result.receipt.status, true);
        });

        it("Should perform betdecisions", async() => {
            const result = await contractInstance2.performBetDecision(1, accounts[0], {from: accounts[2], value: 2 * usableAmount});
            assert.equal(result.receipt.status, true);
        });
        
    });

    describe("Trying to make multiple bets with different accounts", () => {

        let contractInstance3;
        const amount =  30000000000000000000;
        const amount1 = amount.toString();
        const usableAmount = web3.utils.toBN(amount1);
        
        it("Should initialize and create first bet", async() => {
            contractInstance3 = await bettingContract.new();
            const result = await contractInstance3.createBet("First test bet",usableAmount, accounts[6], accounts[7], accounts[8]);
            assert.equal(result.receipt.status, true);
        });

        it("Should approve bet for first account", async() => {
            const result = await contractInstance3.approveBet(0,{from: accounts[6]});
            assert.equal(result.receipt.status, true);
        });

        it("Should approve bet for second account", async() => {
            const result = await contractInstance3.approveBet(0,{from: accounts[7]});
            assert.equal(result.receipt.status, true);
        });

        it("Should approve bet for thirdparty account", async() => {
            const result = await contractInstance3.approveBet(0,{from: accounts[8]});
            assert.equal(result.receipt.status, true);
        });

        // it("Should check bet approved", async() => {
        //     const result = await contractInstance3.checkBetApproved(0,{from: accounts[6]});
        //     assert.equal(result.receipt.status, true);
        // });

        it("Should transfer funds", async() => {
            const result = await contractInstance3.transferFundsForBet(0, {from: accounts[6], value: usableAmount});
            assert.equal(result.receipt.status, true);
        });

        it("Should transfer funds", async() => {
            const result = await contractInstance3.transferFundsForBet(0, {from: accounts[7], value: usableAmount});
            assert.equal(result.receipt.status, true);
        });

        it("Should perform betdecisions", async() => {
            const result = await contractInstance3.performBetDecision(0, accounts[6], {from: accounts[8], value: 2 * usableAmount});
            assert.equal(result.receipt.status, true);
        });

        //----------------------------------------------------------

        it("Should initialize and create second bet", async() => {
            const result = await contractInstance3.createBet("Second test bet",usableAmount, accounts[3], accounts[4], accounts[5]);
            assert.equal(result.receipt.status, true);
        });

        it("Should approve bet for first account", async() => {
            const result = await contractInstance3.approveBet(1,{from: accounts[3]});
            assert.equal(result.receipt.status, true);
        });

        it("Should approve bet for second account", async() => {
            const result = await contractInstance3.approveBet(1,{from: accounts[4]});
            assert.equal(result.receipt.status, true);
        });

        it("Should approve bet for thirdparty account", async() => {
            const result = await contractInstance3.approveBet(1,{from: accounts[5]});
            assert.equal(result.receipt.status, true);
        });

        // it("Should check bet approved", async() => {
        //     const result = await contractInstance3.checkBetApproved(1,{from: accounts[3]});
        //     assert.equal(result.receipt.status, true);
        // });

        it("Should transfer funds", async() => {
            const result = await contractInstance3.transferFundsForBet(1, {from: accounts[3], value: usableAmount});
            assert.equal(result.receipt.status, true);
        });

        it("Should transfer funds", async() => {
            const result = await contractInstance3.transferFundsForBet(1, {from: accounts[4], value: usableAmount});
            assert.equal(result.receipt.status, true);
        });

        it("Should perform betdecisions", async() => {
            const result = await contractInstance3.performBetDecision(1, accounts[3], {from: accounts[5], value: 2 * usableAmount});
            assert.equal(result.receipt.status, true);
        });
        
    });
      
});