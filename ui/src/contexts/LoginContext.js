import React from "react";

const LoginContext = React.createContext();

class LoginProvider extends React.Component {
  state = {
    email: null,
    uid: null,
    isAdmin: false,
  };

  render() {
    return (
      <LoginContext.Provider
        value={{
          email: this.state.email,
          uid: this.state.idToken,
          isAdmin: this.state.isAdmin,
          login: (email, uid, isAdmin) =>
            this.setState({ email, uid, isAdmin }),
          logout: () =>
            this.setState({ email: null, uid: null, isAdmin: false }),
        }}
      >
        {this.props.children}
      </LoginContext.Provider>
    );
  }
}

export { LoginContext, LoginProvider };
