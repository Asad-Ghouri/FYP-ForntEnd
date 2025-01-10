import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Grid, Paper, Typography, IconButton, Container, CircularProgress } from '@mui/material';
import { KeyOutlined, PaymentOutlined, VolunteerActivismOutlined } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MerchatSidebar from './MerchatSidebar';

const MotionPaper = motion(Paper);

function MerchatDashboard() {
  const [apiKey, setApiKey] = useState([]);
  const [paymentCount, setPaymentCount] = useState(0);
  const [donationCount, setDonationCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const authToken = localStorage.getItem('token');

  useEffect(() => {
    if (!authToken) {
      navigate("/");
    }
  }, [authToken, navigate]);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://fyp-back-end-bay.vercel.app/api/getUserdata/${authToken}`);
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const data = await response.json();
      setApiKey(data.apiKeys);
      setPaymentCount(data.paymentLinks.length);
      setDonationCount(data.donationLinks.length);
    } catch (error) {
      toast.error("Error fetching dashboard data", {
        position: "top-right",
        autoClose: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [authToken]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const cards = [
    {
      title: "Total API Keys",
      count: apiKey.length,
      icon: <KeyOutlined />,
      gradient: "linear-gradient(120deg, #00B4DB, #0083B0)"
    },
    {
      title: "Payment Links",
      count: paymentCount,
      icon: <PaymentOutlined />,
      gradient: "linear-gradient(120deg, #FF8008, #FFC837)"
    },
    {
      title: "Donation Links",
      count: donationCount,
      icon: <VolunteerActivismOutlined />,
      gradient: "linear-gradient(120deg, #4B79A1, #283E51)"
    }
  ];

  const dashboardStyle = {
    background: '#1A202C',
    minHeight: '100vh',
    padding: '20px'
  };

  return (
    <Box sx={dashboardStyle}>
      <ToastContainer />
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <MerchatSidebar />
        </Grid>
        <Grid item xs={10}>
          <Container maxWidth="lg" sx={{ mt: 4 }}>
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress size={60} thickness={4} sx={{ color: '#00B4DB' }} />
              </Box>
            ) : (
              <Grid container spacing={4}>
                {cards.map((card, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <MotionPaper
                      initial="hidden"
                      animate="visible"
                      variants={cardVariants}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      component={motion.div}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: '0 8px 32px 0 rgba(0, 180, 219, 0.2)'
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        const routes = ['/GetApikey', '/PaymentLinkGenerator', '/DonationNavigation'];
                        navigate(routes[index]);
                      }}
                      sx={{
                        p: 3,
                        borderRadius: '16px',
                        cursor: 'pointer',
                        background: '#2D3748',
                        color: 'white',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '200px',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: card.gradient,
                          opacity: 0.9,
                          zIndex: 0
                        }
                      }}
                    >
                      <Box sx={{ 
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        width: '50px',
                        height: '50px',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(0, 0, 0, 0.2)',
                        zIndex: 1
                      }}>
                        {card.icon}
                      </Box>
                      <Box sx={{ position: 'relative', zIndex: 1 }}>
                        <Typography 
                          variant="h6" 
                          component="div" 
                          sx={{ 
                            fontWeight: 600,
                            mb: 2,
                            fontSize: '1.2rem',
                            color: 'rgba(255, 255, 255, 0.95)'
                          }}
                        >
                          {card.title}
                        </Typography>
                        <Typography 
                          variant="h3" 
                          component="div" 
                          sx={{ 
                            fontWeight: 700,
                            mb: 'auto',
                            fontSize: '3.5rem',
                            color: 'white'
                          }}
                        >
                          {card.count}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            opacity: 0.8,
                            fontWeight: 500,
                            fontSize: '0.9rem',
                            color: 'rgba(255, 255, 255, 0.7)',
                            mt: 2
                          }}
                        >
                          Click to manage
                        </Typography>
                      </Box>
                    </MotionPaper>
                  </Grid>
                ))}
              </Grid>
            )}
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MerchatDashboard;
