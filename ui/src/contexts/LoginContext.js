import React from "react";

const LoginContext = React.createContext();

class LoginProvider extends React.Component {
  state = {
    email: null,
    uid: null,
    isAdmin: false,
    idToken: null
  };

  render() {
    return (
      <LoginContext.Provider
        value={{
          email: this.state.email,
          uid: this.state.uid,
          isAdmin: this.state.isAdmin,
          idToken: this.state.idToken,
          login: (email, uid, isAdmin, idToken) =>
            this.setState({ email, uid, isAdmin, idToken }),
          logout: () =>
            this.setState({ email: null, uid: null, isAdmin: false, idToken:null }),
        }}
      >
        {this.props.children}
      </LoginContext.Provider>
    );
  }
}

export { LoginContext, LoginProvider };
