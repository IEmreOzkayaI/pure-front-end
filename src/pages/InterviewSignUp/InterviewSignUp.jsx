import React from "react";
import styles from "./InterviewSignUp.module.scss";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/shared/Button/Button";
import { UploadOutlined } from "@ant-design/icons";
import pureLogo from "/pure-logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { userRegisterInterviewInit } from "../../redux/toolkit/userRegisterInterviewSlice";
import { useEffect } from "react";
import { toast,Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const InterviewSignUp = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const registerError = useSelector((state) => state.userRegisterInterview?.userRegisterInterviewError);
  const registerSucces = useSelector((state) => state.userRegisterInterview?.userRegisterInterviewInfo);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPass, setRepeatPass] = useState("");

  const [terms, setTerms] = useState(false);

  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    coverLetter: "",
    email: "",
    password: "",
    repeatPass: "",
    terms: "",
  });

  const handleCvChange = (e) => {
    const file = e.target.files[0];
    if (file.type === "application/pdf") {
      setCoverLetter(file);
    } else {
      alert("Lütfen bir PDF dosyası yükleyin.");
    }
  };

  const handleRegister = (e) => {
    console.log("register");
    e.preventDefault();
    const interview_id = params.interview_id

    const formData = new FormData();
    formData.append("name", firstName);
    formData.append("surname", lastName);
    formData.append("phone_number", phoneNumber);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("cover_letter", coverLetter);
    formData.append("privacy_policy", terms);
    formData.append("terms_of_use", terms);
    formData.append("role", "Individual_User");
    formData.append("register_type", "Interview");


    dispatch(userRegisterInterviewInit({formData,interview_id}))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validate();
    if (error.firstName || error.lastName || error.phoneNumber || error.coverLetter || error.email || error.password || error.repeatPass || error.terms) {
      console.log(error);
      setError(error);
      return;
    }
    handleRegister(e);
  };

  const validate = () => {
    const error = {
      firstName: null,
      lastName: null,
      phoneNumber: null,
      coverLetter: null,
      email: null,
      password: null,
      repeatPass: null,
      terms: null,
    };
    if (!firstName) {
      error.firstName = "First Name is required";
    }
    if (!lastName) {
      error.lastName = "Last Name is required";
    }
    if (!phoneNumber) {
      error.phoneNumber = "Phone Number is required";
    }
    if (!coverLetter) {
      error.coverLetter = "Cover Letter is required";
    }
    if (!email) {
      error.email = "Email is required";
    }
    if (!password) {
      error.password = "Password is required";
    }
    if (!repeatPass) {
      error.repeatPass = "Repeat Password is required";
    }
    if (!terms) {
      error.terms = "You must accept the terms and conditions";
    }
    if (password !== repeatPass) {
      error.repeatPass = "Passwords do not match";
    }
    return error;
  };

  useEffect(() => {
    if (registerError) {
      toast.error(registerError, {
        style: {
          border: "1px solid #16161b",
          padding: "16px",
          color: "#16161b",
        },
        iconTheme: {
          primary: "#16161b",
          secondary: "#f5f3f3",
        },
      });
    }
  }, [registerError]);

  useEffect(() => {
    if (registerSucces) {
      console.log(registerSucces);
      toast.success(registerSucces, {
        style: {
          border: "1px solid #16161b",
          padding: "16px",
          color: "#16161b",
        },
        iconTheme: {
          primary: "#16161b",
          secondary: "#f5f3f3",
        },
      },1500);

      setTimeout(() => {
        navigate("/interview/success");
      },1500);
    }
    }, [registerSucces]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.container}>
        <div className={styles.interviewSignUpHeader}>
          <h1>Interview Sign Up</h1>
        </div>
        <div className={styles.grid}>
          <div className={styles.explanation}>
            <div className={styles.texts}>
              <div>PURE</div>
              <div>--</div>

              <div>Welcome to the Pure, the best platform for your career.</div>
              <p>
                Welcome to the Pure, the best platform for your career. We are
                here to help you to find the best job for you. You can find the
                best job for you with the help of Pure.
                <br /> <br />
                This page for the candidates who want to apply for the
                interview. You can fill the form and apply for the interview. We
                will contact you as soon as possible.
                <br /> <br />
              </p>
            </div>
            <div className={styles.image}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="800"
                height="513"
                viewBox="0 0 800 513"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M296.033 148.682C337.304 148.682 370.874 115.112 370.874 73.8545C370.874 32.5703 337.304 -1 296.033 -1C254.762 -1 221.192 32.5703 221.192 73.8411C221.192 115.112 254.762 148.682 296.033 148.682ZM296.034 25.8777C322.481 25.8777 343.997 47.4068 343.997 73.8411C343.997 100.275 322.481 121.804 296.034 121.804C269.586 121.804 248.07 100.289 248.07 73.8545C248.07 47.4203 269.586 25.8777 296.034 25.8777ZM22.2379 509.121C19.6934 511.357 16.5329 512.456 13.3992 512.456C9.68956 512.456 5.99335 510.929 3.34171 507.916C-1.5464 502.358 -1.01071 493.895 4.547 489.007L408.536 118.404C413.839 113.744 421.847 113.999 426.856 118.994L490.375 182.511L621.537 38.8577C623.934 36.2329 627.282 34.666 630.831 34.5053C634.353 34.425 637.848 35.6169 640.473 38.014L801.178 185.323C806.642 190.318 807.004 198.795 802.008 204.245C797.013 209.696 788.536 210.071 783.085 205.076L632.277 66.8329L509.324 201.473L573.7 265.847C578.936 271.083 578.936 279.547 573.7 284.783C568.464 290.019 560 290.019 554.764 284.783L416.798 146.835L22.2379 509.121Z"
                  fill="#F5F3F3"
                  fillOpacity="0.04"
                />
              </svg>
            </div>
          </div>
          <div className={styles.getStarted}>
            <form onSubmit={handleSubmit}>
              <>
                <div className={styles.col}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value.trim());
                        setError({ ...error, firstName: !e.target.value });
                      }}
                      onBlur={() => {
                        setError({ ...error, firstName: !firstName });
                      }}
                    />
                    {error.firstName ? (
                      <span className={styles.errorMessage}>
                        Field is required
                      </span>
                    ) : null}
                  </div>
                </div>
              </>
              <div className={styles.col}>
                <div className={styles.inputGroup}>
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value.trim());
                      setError({ ...error, lastName: !e.target.value });
                    }}
                    onBlur={() => {
                      setError({ ...error, lastName: !lastName });
                    }}
                  />
                  {error.lastName ? (
                    <span className={styles.errorMessage}>
                      Field is required
                    </span>
                  ) : null}
                </div>
              </div>

              <div className={styles.col}>
                <div className={styles.inputGroup}>
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="text"
                    id="phoneNumber"
                    inputMode="numeric"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value.trim());
                      setError({ ...error, phoneNumber: !e.target.value });
                    }}
                    onBlur={() => {
                      setError({ ...error, phoneNumber: !phoneNumber });
                    }}
                  />
                  {error.phoneNumber ? (
                    <span className={styles.errorMessage}>
                      Field is required
                    </span>
                  ) : null}
                </div>
              </div>
              <div className={styles.col}>
                <div className={styles.inputGroup}>
                  <label htmlFor="email">E mail</label>
                  <input
                    type="text"
                    id="email"
                    autoComplete="username"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value.trim());
                      setError({
                        ...error,
                        email: !e.target.value.match(
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        ),
                      });
                    }}
                    onBlur={() => {
                      setError({
                        ...error,
                        email:
                          !email ||
                          !email.match(
                            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                          ),
                      });
                    }}
                  />
                  {error.email ? (
                    <span className={styles.errorMessage}>
                      Please enter a valid email
                    </span>
                  ) : null}
                </div>
              </div>
              <div className={styles.col}>
                {/* Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character */}
                <div className={styles.inputGroup}>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value.trim());
                      setError({
                        ...error,
                        password:
                          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/.test(
                            e.target.value,
                          ),
                      });
                    }}
                    onBlur={() => {
                      setError({
                        ...error,
                        password: !password.match(
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/,
                        ),
                      });
                    }}
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$"
                    maxLength={10}
                    minLength={8}
                    title="Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character"
                  />
                  {error.password ? (
                    <span className={styles.errorMessage}>
                      Field is required or doesn&apos;t meet criteria
                    </span>
                  ) : null}
                </div>
              </div>
              <div className={styles.col}>
                <div className={styles.inputGroup}>
                  <label htmlFor="repeatPass">Repeat Password</label>
                  <input
                    type="password"
                    id="repeatPass"
                    autoComplete="new-password"
                    value={repeatPass}
                    onChange={(e) => {
                      setRepeatPass(e.target.value.trim());
                      setError({
                        ...error,
                        repeatPass:
                          !repeatPass ||
                          repeatPass.match(
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/,
                          ),
                      });
                    }}
                    onBlur={() => {
                      setError({
                        ...error,
                        repeatPass: !repeatPass.match(
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/,
                        ),
                      });
                    }}
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$"
                    maxLength={10}
                    minLength={8}
                    title="Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character"
                  />
                  {error.repeatPass ? (
                    <span className={styles.errorMessage}>
                      Field is required or doesn&apos;t match password
                    </span>
                  ) : null}
                </div>
              </div>

              <div className={styles.col}>
                <div className={styles.inputGroup}>
                  <label className={styles.fileUpload} htmlFor="coverLetter">
                    CV {coverLetter.name} <UploadOutlined />
                  </label>
                  <input
                    type="file"
                    id="coverLetter"
                    onChange={handleCvChange}
                    onBlur={() => {
                      setError({ ...error, coverLetter: !coverLetter });
                    }}
                    accept=".pdf"
                  />
                  {error.coverLetter ? (
                    <span className={styles.errorMessage}>
                      {error.coverLetter}
                    </span>
                  ) : null}
                </div>
              </div>
              <div className={styles.col}>
                <div className={`${styles.inputGroup} ${styles.privacy}`}>
                  {/* TODO checkbox tasarimdaki gibi style edilecek bir ara */}
                  <input
                    type="checkbox"
                    id="terms"
                    checked={terms}
                    onChange={(e) => {
                      setTerms(e.target.checked);
                      setError({ ...error, terms: !e.target.checked });
                    }}
                  />
                  <label htmlFor="terms">
                    I’ve read and agree to the{" "}
                    <Link to="privacy-policy">privacy policy</Link>
                  </label>
                  {error.terms ? (
                    <span className={styles.errorMessage}>
                      Field is required
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <Button className={["blue", "lg"]}>Sign Up</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </motion.div>
  );
};

export default InterviewSignUp;
