import React from 'react';
import { BrowserRouter, Route, Switch,Redirect,RouteComponentProps,RouteProps, } from 'react-router-dom'
import {Login} from './pages/Login'
import {Painel} from './pages/Painel'
import { isAuthenticated } from './services/auth';

interface PrivateRouteProps extends RouteProps {
  isAuthenticated: boolean;
}

export class PrivateRoute extends Route<PrivateRouteProps> {
  render() {
      return (
          <Route render={(props: RouteComponentProps) => {
              //const res=this.props.isAuthenticated
              const res=localStorage.getItem('token')
              console.log(res)
              if(!res) {
                  return <Redirect to='/' />
              } 
              console.log("AQUI")
              if(this.props.component) {
                  return React.createElement(this.props.component);
              } 

              if(this.props.render) {
                  return this.props.render(props);
              }
          }} />
      );
  }
}
function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <PrivateRoute path="/painel/" component={Painel} isAuthenticated={isAuthenticated()}/>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
