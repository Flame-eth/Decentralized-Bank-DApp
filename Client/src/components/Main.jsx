import React, { Component } from "react";
import "./Main.css";
import tether from "../images/tether.png";
import Airdrop from "./Airdrop";

class Main extends Component {
  render() {
    return (
      <div id="content" className="mt-3">
        <table className="table text-muted text-center">
          <thead>
            <tr style={{ color: "black" }}>
              <th className="table-bd" scope="col">
                Staking Balance
              </th>
              <th className="table-bd" scope="col">
                Reward Balance
              </th>
            </tr>
          </thead>
          <tbody className="table-body">
            <tr style={{ color: "black", marginBottom: "2rem" }}>
              <td>
                {window.web3.utils.fromWei(this.props.stakingBalance, "Ether")}{" "}
                USDT{" "}
              </td>
              <td>
                {" "}
                {window.web3.utils.fromWei(this.props.rwdBalance, "Ether")} RWD
              </td>
            </tr>
          </tbody>
        </table>
        <div className="card mb-2" style={{ opacity: "0.9" }}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              let amount;
              amount = this.input.value.toString();
              amount = window.web3.eth.utils.toWei(amount, "Ether");
              this.props.stakeTokens(amount);
            }}
            className="mb-3"
          >
            <div style={{ borderSpacing: "0 1em" }}>
              <label className="float-start" style={{ marginLeft: "15px" }}>
                <b>Stake Tokens</b>
              </label>
              <span className="float-end" style={{ marginRight: "8px" }}>
                Balance{" "}
                {window.web3.utils.fromWei(this.props.tetherBalance, "Ether")}
              </span>
              <div className="input-group mb-4">
                <input type="text" placeholder="0" required />
                <div>
                  <div className="input-group-text">
                    <img src={tether} alt="tether" height={32} />
                    &nbsp;&nbsp;&nbsp; USDT
                  </div>
                </div>
              </div>
              <button
                type="submit"
                onClick={(event) => {
                  event.preventDefault(this.props.unstakeTokens());
                }}
                className="btn btn-primary btn-lg d-block btn-style"
              >
                DEPOSIT
              </button>
            </div>
          </form>

          <button className="btn btn-primary btn-lg d-block"> WITHDRAW</button>
          <div className="card-body text-center" style={{ color: "blue" }}>
            {" "}
            AIRDROP
            <Airdrop stakingBalance={this.props.stakingBalance} />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
