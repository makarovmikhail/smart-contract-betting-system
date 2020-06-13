const SimpleStorage = artifacts.require("./SimpleStorage.sol");

contract("SimpleStorage", accounts => {
  it("...load test.", async () => {
    const simpleStorageInstance = await SimpleStorage.deployed();
    const numberOfUsers = 10;
    await simpleStorageInstance.set(0, { from: accounts[0] });

    //Increment values
    for (let i = 0; i < numberOfUsers; i++) {
      const dataToChange = Number(await simpleStorageInstance.get.call({ from: accounts[i] }));
      await simpleStorageInstance.set(dataToChange + 1, { from: accounts[i] });
      const dataToCheck = await simpleStorageInstance.get.call({ from: accounts[i] });
      assert.equal(dataToCheck, dataToChange + 1, `Incorrect checking for ${accounts[i]}, ${dataToCheck} != something went wrong...`);
    }

    await simpleStorageInstance.createBetRequest("Zenit vs. Rybin", 1234425524, 23423423423, { from: accounts[0] });
    const betsCount = await simpleStorageInstance.getBetRequestCount.call({ from: accounts[0] });
    console.log(`Bet request in smart-contract: ${betsCount}`);

    //const data = await simpleStorageInstance.get.call();

  });
});
