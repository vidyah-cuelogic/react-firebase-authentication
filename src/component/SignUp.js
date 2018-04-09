import React, { Component } from 'react';
import { Link , withRouter } from 'react-router-dom';
import { auth ,firebase} from '../firebase';
import * as routes from '../constants/routes';
import { Container, Row, Col } from 'reactstrap';
import * as firebase1 from 'firebase';
const SignUpPage = ({ history }) =>
  <div className="auth-page">
    <Container>
      <Row>
        <Col xs="6" sm="3"></Col>
        <Col xs="5" sm="5">
          <h1>SignUp</h1>
          <SignUpForm  history={history} />
        </Col>
       </Row>
    </Container>
  </div>

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(function(error) {
        if (error.code === 'auth/email-already-in-use') {
          const credential = firebase1.auth.EmailAuthProvider.credential(
                email, 
                passwordOne
            );
          firebase1.auth().fetchProvidersForEmail(email).then(function(providers) {
              firebase1.auth().signInWithPopup(firebase.facebookAuth)
                .then(function(result) {
                return result.user.linkWithCredential(credential)
              }).then(function() {
                  history.push(routes.HOME);
                }).catch(function(error){
                  console.log(error.code)
                });
              });
        }else{          
        this.setState(byPropKey('error', error));
        }
      });

    event.preventDefault();
  }

  render() {

    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';
      
    return (
      <form onSubmit={this.onSubmit}>
        <fieldset>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              value={username}
              onChange={event => this.setState(byPropKey('username', event.target.value))}
              type="text"
              placeholder="Full Name"
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              value={email}
              onChange={event => this.setState(byPropKey('email', event.target.value))}
              type="text"
              placeholder="Email Address"
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              value={passwordOne}
              onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
              type="password"
              placeholder="Password"
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              value={passwordTwo}
              onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
              type="password"
              placeholder="Confirm Password"
            />
          </fieldset>
          <button className="btn btn-lg btn-primary pull-xs-right" disabled={isInvalid} type="submit">
            Sign Up
          </button>
        </fieldset>
        { error && <p className="colorRed">{error.message}</p> }
      </form>
    );
  }
}

const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};