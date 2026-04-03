import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import launchService from '../api/launchService';
import { useNotification } from '../hooks/useNotification';
import { formatDate } from '../utils/formatters';

const DashboardPage = () => {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    productName: '',
    productUrl: '',
    launchDate: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  useEffect(() => {
    fetchLaunches();
  }, []);

  const fetchLaunches = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await launchService.getAllLaunches();
      setLaunches(data.launches || []);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to load launches';
      setError(errorMsg);
      showNotification(errorMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'info';
      case 'live':
        return 'success';
      case 'completed':
        return 'default';
      default:
        return 'default';
    }
  };

  const handleCreateClick = () => {
    setCreateDialogOpen(true);
  };

  const handleCreateClose = () => {
    setCreateDialogOpen(false);
    setFormData({
      productName: '',
      productUrl: '',
      launchDate: '',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleCreateSubmit = async () => {
  //   if (!formData.productName || !formData.productUrl || !formData.launchDate) {
  //     showNotification('Please fill in all fields', 'warning');
  //     return;
  //   }

  //   try {
  //     setSubmitting(true);
  //     const response = await launchService.createLaunch(formData);
  //     showNotification('Launch created successfully!', 'success');
  //     handleCreateClose();
  //     navigate(`/launch/${response.launch._id}`);
  //   } catch (err) {
  //     const errorMsg = err.response?.data?.message || 'Failed to create launch';
  //     showNotification(errorMsg, 'error');
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const handleCreateSubmit = async () => {
  if (!formData.productName || !formData.productUrl || !formData.launchDate) {
    showNotification('Please fill in all fields', 'warning');
    return;
  }

  try {
    setSubmitting(true);

    const response = await launchService.createLaunch(formData);

    showNotification('Launch created successfully!', 'success');
    handleCreateClose();
    navigate(`/launch/${response.launch._id}`);

  } catch (err) {
    const status = err.response?.status;
    const errorMsg = err.response?.data?.message || 'Failed to create launch';

    // // 🚀 MAIN LOGIC
    // if (status === 403) {
    //   showNotification('Upgrade your plan to create more launches 🚀', 'warning');

    //   // 🔥 redirect to pricing page
    //   navigate('/pricing');  // 👈 your PricingSection route
    //   return;
    // }
      if (status === 403) {
        showNotification('Upgrade your plan to create more launches 🚀', 'warning');
      navigate('/pricing', {
        state: { from: 'create-launch' }
      });
      return;
    }

    showNotification(errorMsg, 'error');
  } finally {
    setSubmitting(false);
  }
};

  const handleLaunchClick = (launchId) => {
    navigate(`/launch/${launchId}`);
  };

  return (
    <DashboardLayout>
      <Box sx={{ marginBottom: '32px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, marginBottom: '8px' }}>
              Launches
            </Typography>
            <Typography variant="body2" sx={{ color: '#757575' }}>
              Manage and track your product launches
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateClick}
            size="large"
          >
            Create New Launch
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ marginBottom: '24px' }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
            <CircularProgress />
          </Box>
        ) : launches.length === 0 ? (
          <Card
            sx={{
              textAlign: 'center',
              padding: '60px 32px',
              backgroundColor: '#FAFAFA',
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: '16px', color: '#757575' }}>
              No launches yet
            </Typography>
            <Typography variant="body2" sx={{ color: '#BDBDBD', marginBottom: '24px' }}>
              Create your first launch to get started
            </Typography>
            <Button variant="contained" onClick={handleCreateClick}>
              Create First Launch
            </Button>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {launches.map((launch) => (
              <Grid item xs={12} sm={6} md={4} key={launch._id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                    },
                  }}
                  onClick={() => handleLaunchClick(launch._id)}
                >
                  <CardContent sx={{ flex: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        marginBottom: '8px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {launch.productName}
                    </Typography>

                    <Box sx={{ marginBottom: '16px' }}>
                      <Chip
                        label={launch.status || 'upcoming'}
                        color={getStatusColor(launch.status)}
                        size="small"
                        variant="outlined"
                      />
                    </Box>

                    <Box sx={{ marginBottom: '12px' }}>
                      <Typography variant="caption" sx={{ color: '#757575' }}>
                        Launch Date
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {formatDate(launch.launchDate)}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="caption" sx={{ color: '#757575' }}>
                        Product URL
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#1976D2',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {launch.productUrl}
                      </Typography>
                    </Box>
                  </CardContent>

                  <Box
                    sx={{
                      padding: '16px',
                      borderTop: '1px solid #E0E0E0',
                      backgroundColor: '#FAFAFA',
                    }}
                  >
                    <Button
                      fullWidth
                      variant="outlined"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLaunchClick(launch._id);
                      }}
                    >
                      View Details
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Create Launch Dialog */}
      <Dialog
        open={createDialogOpen}
        onClose={handleCreateClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: '1.25rem' }}>
          Create New Launch
        </DialogTitle>
        <DialogContent sx={{ paddingTop: '24px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <TextField
              fullWidth
              label="Product Name"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              placeholder="e.g., Amazing App v2.0"
            />
            <TextField
              fullWidth
              label="Product URL"
              name="productUrl"
              value={formData.productUrl}
              onChange={handleInputChange}
              placeholder="e.g., https://yourproduct.com"
            />
            <TextField
              fullWidth
              label="Launch Date"
              name="launchDate"
              type="date"
              value={formData.launchDate}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Timezone"
              name="timezone"
              value={formData.timezone}
              onChange={handleInputChange}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: '16px 24px' }}>
          <Button onClick={handleCreateClose} disabled={submitting}>
            Cancel
          </Button>
          <Button
            onClick={handleCreateSubmit}
            variant="contained"
            disabled={submitting}
          >
            {submitting ? <CircularProgress size={24} /> : 'Create Launch'}
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default DashboardPage;
