import React, { Component } from "react";
import Nav from "../src/components/Nav";
import Main from "../src/components/Main";
import Web3 from "../src/node_modules/web3/dist/web3.min.js";
import Tether from "./truffle_abis/Tether.json";
import RWD from "./truffle_abis/RWD.json";
import DecentralBank from "./truffle_abis/DecentralBank.json";
import "./App.css";

class App extends Component {
  async UNSAFE_componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
        await ethereum.enable();
      } catch (error) {
        console.error(error);
      }
    } else if (window.web3) {
      try {
        window.web3 = new Web3(window.web3.currentProvider);
      } catch (error) {
        console.error(error);
      }
    } else {
      window.alert("No ETH wallet detected");
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const account = await web3.eth.getAccounts();
    this.setState({ account: account[0] });
    console.log(account);
    const networkId = await web3.eth.net.getId();
    console.log(networkId, " Network ID");

    // Load Tether Contract
    const tetherData = Tether.networks[networkId];
    if (tetherData) {
      const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
      this.setState({ tether });
      let tetherBalance = await tether.methods
        .balanceOf(this.state.account)
        .call();
      this.setState({ tetherBalance: tetherBalance.toString() });
      console.log({ balance: tetherBalance });
    } else {
      window.alert("Error loading Tether contract");
    }

    // Load RWD contract
    const rwdData = RWD.networks[networkId];
    if (rwdData) {
      const rwd = new web3.eth.Contract(RWD.abi, rwdData.address);
      this.setState({ rwd });
      let rwdBalance = await rwd.methods.balanceOf(this.state.account).call();
      this.setState({ rwdBalance: rwdBalance.toString() });
      console.log({ rwdbalance: rwdBalance });
    } else {
      window.alert("Reward token contract not detected");
    }

    // Load DecentralBank contract
    const decentralBankData = DecentralBank.networks[networkId];
    if (decentralBankData) {
      const decentralBank = new web3.eth.Contract(
        DecentralBank.abi,
        decentralBankData.address
      );
      this.setState({ decentralBank });
      let stakingBalance = await decentralBank.methods
        .stakingBalance(this.state.account)
        .call();
      this.setState({ stakingBalance: stakingBalance.toString() });
      console.log({ stakingBalance: stakingBalance });
    }

    this.setState({ loading: false });
  }

  // Function to stake tokens
  stakeTokens = (amount) => {
    this.setState({ loading: true });
    this.state.tether.methods
      .approve(this.state.decentralBank._address, amount)
      .on("transactionHash", (hash) => {});
    this.state.decentralBank.methods
      .depositTokens(amount)
      .send({ from: this.state.account })
      .on("transactionHash", (hash) => {
        this.setState({ loading: false });
      });
  };

  unstakeTokens = (amount) => {
    this.setState({ loading: true });
    this.state.decentralBank.methods
      .unstakeTokens()
      .send({ from: this.state.account })
      .on("transactionHash", (hash) => {
        this.setState({ loading: false });
      });
  };

  constructor(props) {
    super(props);
    this.state = {
      account: "connect wallet...",
      tether: {},
      rwd: {},
      decentralBank: {},
      tetherBalance: "0",
      rwdBalance: "0",
      stakingBalance: "0",
      loading: true,
    };
  }

  render() {
    let content;
    {
      this.state.loading
        ? (content = (
            <p id="loader" className="text-center" style={{ margin: "30px" }}>
              {" "}
              LOADING, PLEASE WAIT....
            </p>
          ))
        : (content = (
            <Main
              tetherBalance={this.state.tetherBalance}
              rwdBalance={this.state.rwdBalance}
              stakingBalance={this.state.stakingBalance}
              stakeTokens={this.stakeTokens}
              unstakeTokens={this.unstakeTokens}
            />
          ));
    }
    return (
      <div>
        <Nav account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main
              role="main"
              className="col-lg-12"
              style={{ maxWidth: "600px", minHeight: "100vm" }}
            >
              <div>{content}</div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
