import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Container, Row, Col } from 'reactstrap';
import { PasswordForgetLink } from './PasswordForget';
import { SignUpLink } from './SignUp';
import { auth,firebase } from '../firebase';
import * as routes from '../constants/routes';

const SignInPage = ({ history }) =>
  <div className="auth-page">
    <Container>
      <Row>
        <Col xs="6" sm="3"></Col>
         <Col xs="5" sm="5">
         <h1 className="text-xs-center">Sign In</h1>
            <SignInForm history={history} />
            <PasswordForgetLink />
            <SignUpLink />
         </Col>
       </Row>
    </Container>
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  promptUserForPassword(){
    return 0
  }
  getProviderForProviderId(demo){
    return 0
  }

  signInWithFacebook(history){
    return function(event){
      firebase.auth.signInWithPopup(firebase.facebookAuth).then(function(result) {
      var user = result.user;
      var credential = result.credential;
       history.push(routes.HOME);
      }).catch(function(error) {
        if (error.code === 'auth/account-exists-with-different-credential') {
          var pendingCred = error.credential;
          var email = error.email;
          firebase.auth.fetchProvidersForEmail(email).then(function(providers) {
            if (providers[0] === 'password') {
              // var password = this.promptUserForPassword();
              firebase.auth.signInWithEmailAndPassword(email, "12345678").then(function(user) {
                return user.linkWithCredential(pendingCred);
              }).then(function() {
                history.push(routes.HOME);
              });
              return;
            }
            var provider = this.getProviderForProviderId(firebase.facebookAuth);
            firebase.auth.signInWithPopup(provider).then(function(result) {
              result.user.link(pendingCred).then(function() {
                history.push(routes.HOME);
              });
            });
    });
  }
});

    }
  }


  // signInWithFacebook(){
    
    

  //   // firebase.auth.getRedirectResult().then(function(result) {
  //   //   console.log("good=============="+result);
  //   //   if (result.credential) {
  //   //     // This gives you a Google Access Token.
  //   //     var token = result.credential.accessToken;
  //   //   }
  //   //   var user = result.user;
  //   // }, function(error) {
  //   //   alert(error);
  //   //     console.log("bad=============="+error)
  //   // })
  // }

  render() {

    const {
      email,
      password,
      error,
    } = this.state;
    let {history} = this.props
    const isInvalid =
      password === '' ||
      email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <fieldset>
          <fieldset className="form-group">
            <input
              value={email}
              onChange={event => this.setState(byPropKey('email', event.target.value))}
              type="text"
              placeholder="Email Address"              
              className="form-control form-control-lg"
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              value={password}
              onChange={event => this.setState(byPropKey('password', event.target.value))}
              type="password"
              placeholder="Password"
              className="form-control form-control-lg"
            />
          </fieldset>
          <button className="btn btn-lg btn-primary pull-xs-right"disabled={isInvalid} type="submit">
            Sign In
          </button><br/>
          <button onClick={this.signInWithFacebook(history).bind(this)} className="btn btn-lg btn-primary pull-xs-right" >
            Sign In with facebook
          </button>
      </fieldset>
      {error && <p className="colorRed">{error.message}</p> }
      </form>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};