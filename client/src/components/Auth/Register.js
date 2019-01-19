import React, { Component } from "react";
import { Link , withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { ThemeProvider } from 'styled-components';
import { BodyWrapper, HeaderWrapper, HeaderText, CatchPhrase, Button, Footer, RegisterLogin } from "../Home/HomeStyle";

const theme = {
  font: "Abel, sans-serif",
};

class Register extends Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password: "",
            password2: "",
            errors: {}
        };
    }
    componentDidMount() {
      // If logged in and user navigates to Register page, should redirect them to dashboard
      if (this.props.auth.isAuthenticated) {
        this.props.history.push("/mydashboard");
      }
      
    }
  
    componentWillReceiveProps(nextProps) {
      if (nextProps.errors) {
        this.setState({
          errors: nextProps.errors
        });
      }
    }
    
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phone: this.state.phone,
            password: this.state.password
        };

        if (!(this.showFormErrors())) {
          console.log('form is invalid: do not submit');
        } else {
          console.log('form is valid: submit');
          console.log(newUser);
          this.props.registerUser(newUser, this.props.history);
        };
    };

  showFormErrors() {
      const inputs = document.querySelectorAll('input');
      let isFormValid = true;
      
      inputs.forEach(input => {
        input.classList.add('active');
        
        const isInputValid = this.showInputError(input.id);
        
        if (!isInputValid) {
          isFormValid = false;
        }
      });
  
      return isFormValid;
  }

  showInputError(refName) {
      // const validity = this.refName.validity;
      const field = document.getElementById(refName);
      const label = document.getElementById(`${refName}Label`).textContent;
      const error = document.getElementById(`${refName}Error`);
      const password = document.getElementById('password');
      const confirmPassword = document.getElementById('password2');
      const passErr = document.getElementById('passwordError');
      const confPassErr = document.getElementById('password2Error');
      
      console.log("error: "+error);
      
      if ((field.value == "")) {
        error.textContent = `${label} is a required field`; 
        return false;
      } else {
        error.textContent = '';
      };

      if (!(password.value.length > 4)) {
          passErr.textContent = `Password must contain 4 characters`;
          confPassErr.textContent= `Password must contain 4 characters`;
          password.classList.remove('active');
          password.classList.add('invalid');
          confirmPassword.classList.remove('active');
          confirmPassword.classList.add('invalid');
          return false;
      } else if (!(password.value === confirmPassword.value)) {
          passErr.textContent = `Please confirm password's match`;
          confPassErr.textContent=`Please confirm password's match`;
          password.classList.remove('active');
          password.classList.add('invalid');
          confirmPassword.classList.remove('active');
          confirmPassword.classList.add('invalid');
          return false;
      } else {
        passErr.textContent = '';
        confPassErr.textContent = '';
      };
  
      error.textContent = '';
      return true;
    }

    render() {
        const { errors } = this.state;

        return (
          <ThemeProvider theme={theme}>
      <div>
      <BodyWrapper>
      <HeaderWrapper>
          <HeaderText>TASK MASTER <i className="fas fa-cog fa-sm"></i>
          <CatchPhrase>Be Effective. Be On Time. Be Awesome.</CatchPhrase>
          </HeaderText>
          <Button>
              <Link
              to="/"
              style={{
                width: "140px",
                borderRadius: "3px",
                letterSpacing: "1.5px"
              }}
              className="btn mx-2 btn-primary"
            >
              Home
            </Link>
          </Button>
        </HeaderWrapper>
          <RegisterLogin>
            <div className="container">
              <div className="row my-5">
                <div className="col-md-8 offset-s2">
                  
                  <div className="col-md-12" style={{ paddingLeft: "11.250px" }}>
                    <h4>
                      <b>Register</b> below
                    </h4>
                    <p className="grey-text text-darken-1">
                      Already have an account? <Link to="/login">Log in</Link>
                    </p>
                  </div>
                  <form noValidate onSubmit={this.onSubmit}>
                    <div className="form-group col-md-12">
                      <label id="firstNameLabel" htmlFor="firstName">First Name</label>
                      <input
                        onChange={this.onChange}
                        value={this.state.firstName}
                        error={errors.firstName}
                        className="form-control validate"
                        placeholder="First"
                        id="firstName"
                        type="text"
                        required
                      />
                    </div>
                    <div id="firstNameError" className="firstNameError error"></div>
                    <div className="form-group col-md-12">
                      <label id="lastNameLabel" htmlFor="lastName">Last Name</label>
                      <input
                        onChange={this.onChange}
                        value={this.state.lastName}
                        error={errors.lastName}
                        className="form-control validate"
                        placeholder="Last"
                        id="lastName"
                        type="text"
                        required
                      />
                    </div>
                    <div id="lastNameError" className="lastNameError error"></div>
                    <div className="form-group col-md-12">
                      <label id="emailLabel" htmlFor="email">Email</label>
                      <input
                        onChange={this.onChange}
                        value={this.state.email}
                        error={errors.email}
                        className="form-control validate"
                        placeholder="test@test.com"
                        id="email"
                        type="email"
                        required
                      />
                    </div>
                    <div id="emailError" className="emailError error"></div>
                    <div className="form-group col-md-12">
                      <label id="phoneLabel" htmlFor="phone">Phone #</label>
                      <input
                        onChange={this.onChange}
                        value={this.state.phone}
                        error={errors.phone}
                        className="form-control validate"
                        placeholder="XXXXXXXXXX"
                        id="phone"
                        type="text"
                        required
                      />
                    </div>
                    <div id="phoneError" className="phoneError error"></div>
                    <div className="form-group col-md-12">
                      <label id="passwordLabel" htmlFor="password">Password</label>
                      <input
                        onChange={this.onChange}
                        value={this.state.password}
                        error={errors.password}
                        className="form-control validate"
                        placeholder="*********"
                        id="password"
                        type="password"
                        required
                      />
                    </div>
                    <div id="passwordError" className="passwordError error"></div>
                    <div className="form-group col-md-12">
                      <label id="password2Label" htmlFor="password2">Confirm Password</label>
                      <input
                        onChange={this.onChange}
                        value={this.state.password2}
                        error={errors.password2}
                        className="form-control validate"
                        placeholder="*********"
                        id="password2"
                        type="password"
                        required
                      />
                    </div>
                    <div id="password2Error" className="password2Error error"></div>
                    <div className="col-md-12" style={{ paddingLeft: "11.250px" }}>
                      <button
                        style={{
                          width: "150px",
                          borderRadius: "3px",
                          letterSpacing: "1.5px",
                          marginTop: "1rem",
                          marginBottom: "1.5rem"
                        }}
                        type="submit"
                        className="btn btn-primary waves-effect waves-light"
                      >
                        Sign up
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              
            </div>
            </RegisterLogin>
            <Footer>GWBootcamp <br/> ABEER ISHTIAQ ✨ SEAN STUBBS ✨ ATHENA OLSON <br/> Copyright© 2019 </Footer> 
            </BodyWrapper>
          </div>
          </ThemeProvider>
        );
    };
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps,{ registerUser })(withRouter(Register));

    



