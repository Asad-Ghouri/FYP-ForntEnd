import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Container, Typography, Button, List, ListItem, IconButton, Grid } from '@mui/material';
import { ContentCopy, Add } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MerchatSidebar from './MerchatSidebar';

const MotionListItem = motion(ListItem);

function GetApikey() {
  const [apiKey, setApiKey] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const authToken = localStorage.getItem('token');
           
  const generateApiKey = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://fyp-back-end-bay.vercel.app/api/generateApiKey/${authToken}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to generate API key');
      }
      fetchData();
      toast.success('API key generated successfully!');
    } catch (error) {
      toast.error('Failed to generate API key');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyKey = (key) => {
    navigator.clipboard.writeText(key);
    toast.success('API key copied to clipboard!');
  };

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
    } catch (error) {
      toast.error("Error fetching API keys");
    }
  };

  useEffect(() => {
    fetchData();
  }, [authToken]);

  const containerStyle = {
    background: '#1A202C',
    minHeight: '100vh',
    padding: '20px'
  };

  return (
    <Box sx={containerStyle}>
      <ToastContainer />
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <MerchatSidebar />
        </Grid>
        <Grid item xs={10}>
          <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 4
            }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  color: '#00B4DB',
                  fontWeight: 600,
                  background: 'linear-gradient(45deg, #00B4DB 30%, #0083B0 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Get API Keys
              </Typography>
              <Button
                variant="contained"
                onClick={generateApiKey}
                disabled={loading}
                startIcon={<Add />}
                sx={{
                  background: 'linear-gradient(45deg, #00B4DB 30%, #0083B0 90%)',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    background: 'linear-gradient(45deg, #0083B0 30%, #00B4DB 90%)',
                  }
                }}
              >
                Generate API Key
              </Button>
            </Box>

            <Box sx={{ 
              background: '#2D3748',
              borderRadius: '16px',
              p: 3,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <Typography 
                variant="h5" 
                sx={{ 
                  color: 'white',
                  mb: 3,
                  fontWeight: 500
                }}
              >
                Your API Keys
              </Typography>

              {apiKey.length > 0 ? (
                <List sx={{ width: '100%' }}>
                  {apiKey.map((item, index) => (
                    <MotionListItem
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      sx={{
                        background: 'rgba(0, 180, 219, 0.1)',
                        mb: 2,
                        borderRadius: '8px',
                        border: '1px solid rgba(0, 180, 219, 0.2)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px 16px',
                        '&:hover': {
                          background: 'rgba(0, 180, 219, 0.15)',
                        }
                      }}
                    >
                      <Typography 
                        sx={{ 
                          color: 'white',
                          fontFamily: 'monospace',
                          fontSize: '0.9rem'
                        }}
                      >
                        {index + 1}. {item.apiKey}
                      </Typography>
                      <IconButton 
                        onClick={() => handleCopyKey(item.apiKey)}
                        sx={{ 
                          color: '#00B4DB',
                          '&:hover': {
                            background: 'rgba(0, 180, 219, 0.2)',
                          }
                        }}
                      >
                        <ContentCopy />
                      </IconButton>
                    </MotionListItem>
                  ))}
                </List>
              ) : (
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  No API keys available.
                </Typography>
              )}
            </Box>
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
}

export default GetApikey;
