import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Chip
} from '@mui/material';
import { Add, ContentCopy, Launch } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MerchatSidebar from './MerchatSidebar';

const MotionTableRow = motion(TableRow);

function PaymentLinkGenerator() {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [note, setNote] = useState("");
  const [paymentLinks, setPaymentLinks] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const authToken = localStorage.getItem('token');

  const createPaymentLink = async (e) => {
    e.preventDefault();
    if (!amount || !currency || !note) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `https://fyp-back-end-bay.vercel.app/api/generate-donation-link/${authToken}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount, currency, note }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create payment link");
      }

      const data = await response.json();
      setIsFormOpen(false);
      toast.success("Payment link created successfully!");
      fetchPaymentLinks();
    } catch (error) {
      toast.error("Failed to create payment link");
    } finally {
      setLoading(false);
    }
  };

  const fetchPaymentLinks = async () => {
    try {
      const response = await fetch(
        `https://fyp-back-end-bay.vercel.app/api/v1/getdonationid/${authToken}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch payment links");
      }
      const data = await response.json();
      setPaymentLinks(data);
    } catch (error) {
      toast.error("Failed to fetch payment links");
    }
  };

  useEffect(() => {
    fetchPaymentLinks();
  }, [authToken]);

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard!");
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'done':
        return '#4CAF50';
      case 'pending':
        return '#FFC107';
      default:
        return '#757575';
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#1A202C' }}>
      <Box sx={{ width: 240, flexShrink: 0 }}>
        <MerchatSidebar />
      </Box>
      
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <ToastContainer />
        <Container maxWidth="xl">
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
              Payment Links
            </Typography>
            <Button
              variant="contained"
              onClick={() => setIsFormOpen(true)}
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
              Create Payment Link
            </Button>
          </Box>

          <TableContainer 
            component={Paper} 
            sx={{ 
              backgroundColor: '#1A202C !important',
              borderRadius: '16px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              '& .MuiTable-root': {
                backgroundColor: '#1A202C !important'
              },
              '& .MuiTableRow-root': {
                backgroundColor: '#2D3748 !important'
              },
              '& .MuiTableCell-root': {
                backgroundColor: '#2D3748 !important'
              },
              '& .MuiTableBody-root .MuiTableRow-root:hover': {
                backgroundColor: '#364154 !important'
              }
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ 
                  backgroundColor: '#151A23 !important',
                }}>
                  <TableCell sx={{ color: 'white', fontWeight: 600, borderBottom: '1px solid rgba(255, 255, 255, 0.1)', padding: '16px' }}>Payment Link ID</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600, borderBottom: '1px solid rgba(255, 255, 255, 0.1)', padding: '16px' }}>Price</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600, borderBottom: '1px solid rgba(255, 255, 255, 0.1)', padding: '16px' }}>Currency</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600, borderBottom: '1px solid rgba(255, 255, 255, 0.1)', padding: '16px' }}>Status</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600, borderBottom: '1px solid rgba(255, 255, 255, 0.1)', padding: '16px' }}>Invoice URL</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600, borderBottom: '1px solid rgba(255, 255, 255, 0.1)', padding: '16px' }}>Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paymentLinks.map((link, index) => (
                  <MotionTableRow
                    key={link._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    sx={{
                      backgroundColor: '#2D3748 !important',
                      '&:hover': {
                        backgroundColor: '#364154 !important',
                        transition: 'all 0.2s ease'
                      }
                    }}
                  >
                    <TableCell 
                      sx={{ 
                        color: '#ffffff', 
                        fontFamily: 'monospace',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        padding: '16px',
                        fontSize: '0.9rem',
                        letterSpacing: '0.5px'
                      }}
                    >
                      {link._id}
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        color: '#ffffff',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        padding: '16px',
                        fontSize: '0.9rem'
                      }}
                    >
                      {link.amount}
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        color: '#ffffff',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        padding: '16px',
                        fontSize: '0.9rem',
                        textTransform: 'uppercase'
                      }}
                    >
                      {link.currency}
                    </TableCell>
                    <TableCell sx={{ 
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)', 
                      padding: '16px'
                    }}>
                      <Chip 
                        label={link.status}
                        sx={{
                          backgroundColor: `${getStatusColor(link.status)}20`,
                          color: getStatusColor(link.status),
                          fontWeight: 500,
                          fontSize: '0.85rem',
                          height: '24px'
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', padding: '16px' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Link 
                          to={`/donationLinkGenerator/gett/${authToken}/${link.uniqueid}`}
                          style={{ 
                            color: '#00B4DB',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.9rem'
                          }}
                        >
                          View <Launch sx={{ fontSize: 16 }} />
                        </Link>
                        <IconButton
                          onClick={() => handleCopyLink(`https://alpha-payment-frontend.vercel.app/${authToken}/${link.uniqueid}`)}
                          size="small"
                          sx={{ 
                            color: '#00B4DB',
                            '&:hover': {
                              background: 'rgba(0, 180, 219, 0.2)',
                            }
                          }}
                        >
                          <ContentCopy sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        color: '#ffffff',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        padding: '16px',
                        fontSize: '0.85rem'
                      }}
                    >
                      {link.createdat}
                    </TableCell>
                  </MotionTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>

      <Dialog 
        open={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
        PaperProps={{
          sx: {
            background: '#2D3748',
            color: 'white',
            borderRadius: '16px',
            minWidth: '400px'
          }
        }}
      >
        <DialogTitle sx={{ 
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          pb: 2
        }}>
          Create Payment Link
        </DialogTitle>
        <form onSubmit={createPaymentLink}>
          <DialogContent sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.23)',
                  },
                  '&:hover fieldset': {
                    borderColor: '#00B4DB',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              }}
            />
            <TextField
              fullWidth
              label="Currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              required
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.23)',
                  },
                  '&:hover fieldset': {
                    borderColor: '#00B4DB',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              }}
            />
            <TextField
              fullWidth
              label="Note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              required
              multiline
              rows={3}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.23)',
                  },
                  '&:hover fieldset': {
                    borderColor: '#00B4DB',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              }}
            />
          </DialogContent>
          <DialogActions sx={{ 
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            p: 2
          }}>
            <Button 
              onClick={() => setIsFormOpen(false)}
              sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                background: 'linear-gradient(45deg, #00B4DB 30%, #0083B0 90%)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(45deg, #0083B0 30%, #00B4DB 90%)',
                }
              }}
            >
              {loading ? 'Creating...' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}

export default PaymentLinkGenerator;