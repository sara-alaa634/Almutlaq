import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "../Components/SharedComponents/Buttons/Button";
import { useLogin } from "../Hooks/useAuth";
  import LogoLoader from "../helpers/loader";

const Login = () => {
  const { t } = useTranslation();
  const { login, loading } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false || email === "" || password === "") {
      setValidated(true);
    } else {
      setValidated(false);
      await login(email, password);
    }
  };

  return (
    <div className="login-wrapper">
      {loading && <LogoLoader loading={loading} />}
      <div className="container">
        <div className="login-content py-3">
          <div className="row justify-content-center">
            <div className="col-sm-9 col-md-8 col-lg-7 col-xl-5">
              <div className="card">
                <div className="card-body d-flex flex-column align-items-center p-md-5 p-4 ">
                  <img src="login-logo.svg" className="login-logo" alt="" />
                  <h2 className="login-header text-capitalize mt-3 fw-bold position-relative">
                    {t("welcomeBack")}
                  </h2>
                  <Form
                    className="w-100"
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <Row className="my-4">
                      <Form.Group
                        as={Col}
                        md="12"
                        className="mb-3 text-capitalize fw-medium"
                        controlId="validationCustom03"
                      >
                        <Form.Label>email</Form.Label>
                        <Form.Control
                          required
                          type="email"
                          value={email}
                          autoComplete="username"
                          className="h-48"
                          placeholder={t("exampleEmail")}
                          onChange={(e) => setEmail(e.target.value)}
                          isInvalid={validated && !/\S+@\S+\.\S+/.test(email)}
                        />
                        <Form.Control.Feedback type="invalid">
                          invalid Email
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="12"
                        className="mb-3 text-capitalize fw-medium"
                        controlId="validationCustom05"
                      >
                        <Form.Label>password</Form.Label>
                        <Form.Control
                          required
                          type="password"
                          value={password}
                          autoComplete="current-password"                           className="h-48"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                          invalid Password
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>

                    <div className="w-100 d-flex align-items-center justify-content-center">
                      <Button
                        customClass="btn-h48-s15 btn-lg px-sm-5 px-4 text-capitalize"
                        value="submit"
                        buttonType="submit"
                        type="button"
                        typeAttribute="submit"
                      />
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

