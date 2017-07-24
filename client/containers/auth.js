import React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { logOut, LOG_OUT_SUCCESS } from '../actions/auth';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Image, Button } from 'react-bootstrap';

class Auth extends React.Component {
  handleLogout() {
    this.props.logOut()
    .then(actionResponse => {
      switch (actionResponse.type) {
        case LOG_OUT_SUCCESS:
          toastr.success("Successfully logged out.");
          break;
      }
    });
  }

  render() {
    if (this.props.hasAuthToken) {
      return (
        <Navbar inverse>
          <Nav pullRight>
            <NavItem disabled><Image src={this.props.user.avatar} circle style={{width: '30px', marginTop: '-14px', marginBottom: '-10px', marginRight: '15px'}}/><span style={{color: '#fff'}}>{this.props.user.username}</span><span style={{color: 'hsla(0,0%,100%,.6)', fontSize: '11px', lineHeight: '0'}}>#{this.props.user.discriminator}</span></NavItem>
            <NavItem onClick={() => this.handleLogout()} style={{fontSize: '12px'}}>Logout</NavItem>
          </Nav>
        </Navbar>
      );
    }
    else {
      return(
        <Navbar inverse>
          <Nav pullRight>
            <NavItem href="/auth/authorize" style={{fontSize: '12px'}}>Login with Discord</NavItem>
          </Nav>
        </Navbar>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    hasAuthToken: state.auth.hasAuthToken,
    user: state.auth.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(logOut()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);