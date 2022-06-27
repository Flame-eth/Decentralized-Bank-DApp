import React, { Component } from "react";
import bank from "../images/bank.png";
import "./Nav.css";

class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark fixed-top shadow p-0">
        <a className="navbar-brand col-sm-3 col-md-auto">
          <img src={bank} width="50" height="30" className="d-inline-block" />
          &nbsp; Decentralized Bank DApp
        </a>
        <ul className="navbar-nav px-3">
          <li
            className="text-nowrap d-none nav-item d-sm-none d-sm-block"
            alt="bank"
          >
            <small style={{ color: "white" }}>
              ACCOUNT NUMBER: {this.props.account}
            </small>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
