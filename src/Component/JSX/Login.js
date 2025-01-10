import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TextField, Button, IconButton, Paper, Typography, Box, Container } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../CSS/Login.css';

const Login = ({getid}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authToken = localStorage.getItem('token');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    showPassword: false
  });

  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const Userlogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://fyp-back-end-bay.vercel.app/api/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });
      
      const data = await res.json();
      
      if (res.status === 400 || !data) {
        toast.error("Invalid Credentials", {
          position: "top-right",
          autoClose: 3000
        });
      } else {
        const idd = data.userId;
        localStorage.setItem('token', idd);
        
        toast.success("Sign in Successful!", {
          position: "top-right",
          autoClose: 2000,
          onClose: () => {
            dispatch({
              type: "LOGIN",
              UserId: idd
            });
            navigate("/GetApikey");
          }
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
        autoClose: 3000
      });
    }
  };

  useEffect(() => {
    if(authToken) {
      navigate("/MerchatDashboard");
    }
  }, [authToken, navigate]);

  const paperStyle = {
    background: '#2D3748',
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(0, 180, 219, 0.15)',
    border: '1px solid rgba(0, 180, 219, 0.2)',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.02)'
    }
  };

  const backgroundStyle = {
    minHeight: '100vh',
    background: '#1A202C',
    display: 'flex',
    alignItems: 'center',
    padding: '20px 0'
  };

  const inputStyle = {
    '& .MuiOutlinedInput-root': {
      color: 'white',
      '& fieldset': {
        borderColor: 'rgba(0, 180, 219, 0.3)',
      },
      '&:hover fieldset': {
        borderColor: '#00B4DB',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#00B4DB',
      },
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(255, 255, 255, 0.7)',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#00B4DB',
    }
  };

  return (
    <Box sx={backgroundStyle}>
      <ToastContainer />
      <Container maxWidth="xs">
        <Paper elevation={3} sx={paperStyle}>
          <Box p={4}>
            <Typography variant="h4" align="center" gutterBottom sx={{ color: '#00B4DB', fontWeight: 600, mb: 4 }}>
              Login
            </Typography>
            <form onSubmit={Userlogin}>
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                value={formData.email}
                onChange={handleChange('email')}
                sx={inputStyle}
              />
              <TextField
                label="Password"
                fullWidth
                margin="normal"
                type={formData.showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange('password')}
                sx={inputStyle}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                    >
                      {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  background: 'linear-gradient(45deg, #00B4DB 30%, #0083B0 90%)',
                  color: 'white',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #0083B0 30%, #00B4DB 90%)',
                  }
                }}
              >
                Sign In
              </Button>
              <Typography align="center" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Don't have an account?{' '}
                <NavLink to="/signup" style={{ color: '#00B4DB', textDecoration: 'none' }}>
                  Sign Up
                </NavLink>
              </Typography>
            </form>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;