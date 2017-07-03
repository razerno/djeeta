import React from 'react';
import { connect } from 'react-redux';
import { fetchAvatar } from '../actions/bot';
import { Jumbotron, Grid, Row, Col, Image, Label } from 'react-bootstrap';

class Header extends React.Component {
  componentDidMount() {
    this.props.fetchAvatar();
  }

  render() {
    return (
      <Jumbotron>
        <Grid>
          <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Col xs={3} smHidden mdHidden lgHidden style={{display: 'flex', justifyContent: 'flex-end'}}>
              <Image src={this.props.avatar} circle style={{width: '85px', height: '85px'}} />
            </Col>
            <Col xsHidden sm={3} style={{display: 'flex', justifyContent: 'flex-end'}}>
              <Image src={this.props.avatar} circle style={{width: '165px', height: '165px'}} />
            </Col>
            <Col xs={9}>
              <Row>
                <Col xs={12}>
                  <h1>Djeeta <Label>BOT</Label></h1>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <p>A Discord bot written using Node.js and Discord.js, with a React + Redux front end.</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </Jumbotron>
    )
  }
}

const mapStateToProps = state => {
  return {
    avatar: state.avatar,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAvatar: () => dispatch(fetchAvatar()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);