import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem
} from "reactstrap";
import PropTypes from "prop-types";

import { AppNavbarBrand, AppSidebarToggler } from "@coreui/react";
import sygnet from "../../assets/img/brand/sygnet.svg";
import logo2 from "./../../assets/img/brand/logo_payslip.png";
import logo_survey from "./../../assets/img/brand/logo_kantin.png";

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    const { user, siteName } = this.props;

    const renderAvatar = () => {
      if (user.photo) {
        return <img src={user.photo} className="img-avatar" alt={user.name} />;
      } else {
        return (
          <img
            src={"../../assets/img/avatars/6.jpg"}
            className="img-avatar"
            alt=""
          />
        );
      }
    };

    const renderHomeNav = () => {
      if(siteName === "PAYSLIP") {
        return(
          <Nav className="d-md-down-none" navbar>
            <NavItem className="px-3">
              <NavLink to="/dashboard" className="nav-link">
                Dashboard
              </NavLink>
            </NavItem>
          </Nav>
        );
      } 
    }

    const renderLogo = () => {
      if(siteName === "PAYSLIP") {
        return ( <AppNavbarBrand
          full={{ src: logo2, width: 120, height: 35, alt: "payslip Logo" }}
          minimized={{
            src: sygnet,
            width: 30,
            height: 30,
            alt: "Shindengen Logo"
          }}
        />);
      } else {
        return (
          <AppNavbarBrand
          full={{ src: logo_survey, width: 120, height: 35, alt: "kantin Logo" }}
          minimized={{
            src: sygnet,
            width: 30,
            height: 30,
            alt: "Shindengen Logo"
          }}
        />
        );
      }
    }

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        {renderLogo()}
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        {renderHomeNav()}
        
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <i className="hello-text">Hello, {user.name} !</i>
          </NavItem>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>{renderAvatar()}</DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center">
                <strong>Account</strong>
              </DropdownItem>
              <DropdownItem>
                <Link to="/profile" style={{ textDecoration: "none" }}>
                  <i className="fa fa-user"></i> Profile
                </Link>
              </DropdownItem>
              {/* <DropdownItem>
                <Link to="/changepwd" style={{ textDecoration: "none" }}>
                  <i className="fa fa-lock"></i> Change Password
                </Link>
              </DropdownItem> */}
              <DropdownItem onClick={e => this.props.onLogout(e)}>
                <i className="fa fa-unlock-alt"></i> Logout
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
