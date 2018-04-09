import React from 'react';
import ToDos from './todos';
import withAuthorization from './withAuthorization';
import { Container, Row, Col } from 'reactstrap';

const HomePage = () =>
 
   <div className="auth-page">
    <Container>
      <Row>
        <Col xs="5" sm="12">
            <h1 className="text-xs-center">Home Page</h1>
		    <p>The Home Page is accessible by every signed in user.</p>
		    <ToDos userId={1} />
  		</Col>
       </Row>
    </Container>
  </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);