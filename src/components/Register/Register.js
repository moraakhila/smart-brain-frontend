import React from "react";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      emailError: "",
      passwordError: "",
      errorMessage: "",
    };
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value, emailError: "" });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value, passwordError: "" });
  };

  validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  validatePassword = (password) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return re.test(String(password));
  };

  onSubmitSignIn = () => {
    const { email, password, name } = this.state;

    let emailError = "";
    let passwordError = "";

    if (!this.validateEmail(email)) {
      emailError = "Enter a valid email.";
    }

    if (!this.validatePassword(password)) {
      passwordError =
        "must be at least 6 characters long with numbers and letters.";
    }

    if (emailError || passwordError) {
      this.setState({ emailError, passwordError });
      return;
    }

    fetch("http://localhost:3000/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        } else {
          this.setState({
            errorMessage: "Failed to register, please try again.",
          });
        }
      })
      .catch(() => {
        this.setState({
          errorMessage:
            "Failed to connect to the server, please try again later.",
        });
      });
  };

  render() {
    const { emailError, passwordError, errorMessage } = this.state;

    return (
      <article
        className="br3 ba b--black-10 mt5 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center"
        style={{ marginTop: "110px" }}
      >
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              {errorMessage && <div className="gold">{errorMessage}</div>}
              <div className="mt3">
                <label className="db fw6 lh-copy f4" htmlFor="name">
                  Name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f4" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
                {emailError && <div className="gold">{emailError}</div>}
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f4" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
                {passwordError && <div className="gold">{passwordError}</div>}
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib"
                type="submit"
                value="Register"
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;
