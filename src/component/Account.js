import React from 'react';

import { Container, Row, Col } from 'reactstrap';
import AuthUserContext from './AuthUserContext';
// import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';

const AccountPage = () =>
<div className="auth-page">
    <Container>
      <Row>
        <Col xs="6" sm="3"></Col>
         <Col xs="5" sm="6">
         <h1 className="text-xs-center">Change password</h1>
            <AuthUserContext.Consumer>
			    {authUser =>
			      <div>			        
			        <PasswordChangeForm />
			      </div>
			    }
			  </AuthUserContext.Consumer>
         </Col>
       </Row>
    </Container>
  </div>
               

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);