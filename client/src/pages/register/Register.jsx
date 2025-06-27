import {
  Box,
  Button,
  TextField,
  styled,
  Typography,
  LinearProgress,
  Slide,
  Snackbar,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FlexContainer from "../../components/FlexContainer/FlexContainer";
import Axios from "axios";
import BG from "../../assets/BG.jpg";

const MainDiv = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  minWidth: "100vw",
  margin: 0,
  padding: 0,
  backgroundImage: `url(${BG})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
});

const RegisterationDiv = styled(Box)(({ theme }) => ({
  minHeight: "50vh",
  [theme.breakpoints.up("xs")]: {
    width: "300px",
  },
  [theme.breakpoints.up("sm")]: {
    width: "300px",
  },
  [theme.breakpoints.up("md")]: {
    width: "350px",
  },
  [theme.breakpoints.up("lg")]: {
    width: "350px",
  },
  borderRadius: "20px",
  backgroundColor: "white",
  padding: "20px",
}));

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setComfirmPassword] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emaiFormatlError, setEmaiFormatlError] = useState("");
  const [passworderror, setPasswordError] = useState("");
  const [confirmPassworderror, setConfirmPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [transition, setTransition] = useState(undefined);

  const [stepTwo, setStepTwo] = useState(false);

  const handleNext = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[A-Za-z]{2,50}$/;
    const phoneRegex = /^0\d{9}$/;

    if (fullName.trim() === "") {
      setFullNameError("Full name is required.");
      return;
    }

    if (!fullName.match(nameRegex)) {
      setFullNameError("Invalid Full name.");
      return;
    }
    setFullNameError("");

    if (email.trim() === "") {
      setEmailError("Email is required.");
      return;
    }
    if (!email.match(emailRegex)) {
      setEmaiFormatlError("Invalid email format.");
      return;
    }
    setEmaiFormatlError("");

    if (phone.trim() !== "") {
      if (!phone.match(phoneRegex)) {
        setPhoneError("Invalid phone number format.");
        return;
      }
    }
    setPhoneError("");

    //   try {
    //     const emailExists = await Axios.get(
    //       `${process.env.REACT_APP_API_BASE_URL}/user/email-check/${email}`
    //     );
    //     if (emailExists.data.exists) {
    //       setEmailError("Email already exists! Please use a different one.");
    //       return;
    //     }
    //     setEmailError("");
    //   } catch (error) {
    //     console.error("Error checking email:", error);
    //     setEmailError("Unable to validate email. Try again later.");
    //     return;
    //   }
    setStepTwo(true);
    console.log("Next");
  };
  const handleBack = async (e) => {
    e.preventDefault();
    setStepTwo(false);
    console.log("Back");
  };
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent page reload

    const passwordRegex =
      /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/;

    if (!password.match(passwordRegex)) {
      setPasswordError(
        "Password must be between 8 and 32 characters, with uppercase, lowercase, number, and special character."
      );
      return;
    }
    setPasswordError("");
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match!");
      return;
    }

    setConfirmPasswordError("");

    try {
    //   await Axios.post(`${process.env.REACT_APP_API_BASE_URL}/user`, {
    //     email: email,
    //     fullName: fullName,
    //     phone: phone,
    //     password: password,
    //     role: "user",
    //   });
      console.log("Registered Email:", email);
      console.log("Registered Name:", fullName);
      handleSnackbarOpen();

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      console.error("Error registering user:", err);
    }
  };
  const SlideTransition = (props) => {
    return <Slide {...props} direction="up" />;
  };

  const handleSnackbarOpen = () => {
    setTransition(() => SlideTransition);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const navigate = useNavigate();
  return (
    <MainDiv>
      <RegisterationDiv>
        <Typography
          textAlign={"center"}
          color={"black"}
          fontSize={"22px"}
          fontWeight={600}
        >
          Register
        </Typography>
        <Box sx={{ width: "100%", mt: 2 }}>
          <LinearProgress
            variant="determinate"
            value={stepTwo ? 50 : 10}
            sx={{
              height: 8,
              borderRadius: 5,
              backgroundColor: "#eee",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#2168BA",
              },
            }}
          />
        </Box>

        <Box
          sx={{
            minHeight: "25vh", // or any suitable value
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <>
            {!stepTwo ? (
              <Box display="grid" gap={2} mt={2}>
                <Box>
                  <TextField
                    label="Full Name"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={fullName}
                    error={!!fullNameError}
                    helperText={fullNameError}
                    onChange={(event) => {
                      setFullName(event.target.value);
                      setFullNameError("");
                    }}
                  />
                </Box>
                <Box>
                  <TextField
                    label="Username (Email)"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={email}
                    error={!!emaiFormatlError || !!emailError} // Show error style if error exists
                    helperText={emaiFormatlError || emailError} // Show error message
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setEmaiFormatlError("");
                      setEmailError("");
                    }}
                  />
                </Box>
                <Box>
                  <TextField
                    label="Phone Number (Optional)"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={phone}
                    error={!!phoneError}
                    helperText={phoneError}
                    onChange={(event) => {
                      setPhone(event.target.value);
                      setPhoneError("");
                    }}
                  />
                </Box>
              </Box>
            ) : (
              <Box display="grid" gap={2} mt={2}>
                <TextField
                  label="Password"
                  fullWidth
                  type="password"
                  variant="outlined"
                  size="small"
                  value={password}
                  error={!!passworderror}
                  helperText={passworderror}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setPasswordError("");
                  }}
                />

                <TextField
                  label="Confirm Password"
                  fullWidth
                  type="password"
                  variant="outlined"
                  size="small"
                  value={confirmPassword}
                  error={!!confirmPassworderror} // Show error style if error exists
                  helperText={confirmPassworderror} // Show error message
                  onChange={(event) => {
                    setComfirmPassword(event.target.value);
                  }}
                />
              </Box>
            )}
          </>
        </Box>

        {!stepTwo ? (
          <Box display="grid" gap={2}>
            <Button
              fullWidth
              sx={{ mt: 2, backgroundColor: "#ed5615", color: "white" }}
              variant="contained"
              onClick={handleNext}
            >
              Next
            </Button>
          </Box>
        ) : (
          <Box>
            <FlexContainer>
              <Button
                fullWidth
                sx={{
                  mt: 2,
                  mr: 3,
                  backgroundColor: "#FFC107",
                  color: "black",
                }}
                variant="contained"
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                fullWidth
                sx={{
                  ml: 3,
                  mt: 2,
                  backgroundColor: "#ed5615",
                  color: "white",
                }}
                variant="contained"
                onClick={handleRegister}
              >
                Register
              </Button>
            </FlexContainer>
          </Box>
        )}

        <FlexContainer
          sx={{
            my: 2,
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Button
            fullWidth
            variant="outlined"
            sx={{ backgroundColor: "white", color: "#2168BA" }}
            onClick={() => navigate("/")}
          >
            I Already Have an Account
          </Button>
        </FlexContainer>
      </RegisterationDiv>
      <Snackbar
  open={snackbarOpen}
  onClose={handleSnackbarClose}
  TransitionComponent={transition}
  message="User Registered successfully"
  key={transition ? transition.name : ""}
  autoHideDuration={2200}
  ContentProps={{
    sx: {
      backgroundColor: "white",
      color: "#38b000",
      border: "2px solidrgb(0, 119, 255)", 
      fontWeight: "bold",
      fontSize: "12px",
    },
  }}
/>

    </MainDiv>
  );
}

export default Register;
