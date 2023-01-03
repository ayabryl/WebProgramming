import React from "react";

const LoginContext = React.createContext();

class LoginProvider extends React.Component {
  state = {
    email: null,
    idToken: null,
    isAdmin: false,
  };

  render() {
    return (
      <LoginContext.Provider
        value={{
          email: this.state.email,
          idToken: this.state.idToken,
          isAdmin: this.state.isAdmin,
          login: (email, idToken, isAdmin) =>
            this.setState({ email, idToken, isAdmin }),
          logout: () =>
            this.setState({ email: null, idToken: null, isAdmin: false }),
        }}
      >
        {this.props.children}
      </LoginContext.Provider>
    );
  }
}

export { LoginContext, LoginProvider };
