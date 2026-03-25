import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  Alert,
  Typography,
  Grid,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DashboardLayout from '../layouts/DashboardLayout';
import launchService from '../api/launchService';
import { useNotification } from '../hooks/useNotification';
import { formatDate } from '../utils/formatters';

const LaunchDayPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const [launch, setLaunch] = useState(null);
  const [checklistItems, setChecklistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [itemLoading, setItemLoading] = useState(false);

  useEffect(() => {
    fetchLaunchDetails();
  }, [id]);

  const fetchLaunchDetails = async () => {
    try {
      setLoading(true);
      const data = await launchService.getLaunchById(id);
      setLaunch(data.launch);
      // Filter only launch day items
      const launchDayItems = (data.launch.checklist || []).filter(
        (item) => item.category === 'Launch Day'
      );
      setChecklistItems(launchDayItems);
      setError('');
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to load launch';
      setError(errorMsg);
      showNotification(errorMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleItem = async (itemId) => {
    try {
      setItemLoading(true);
      await launchService.toggleChecklistItem(id, itemId);
      setChecklistItems((prev) =>
        prev.map((item) =>
          item._id === itemId ? { ...item, completed: !item.completed } : item
        )
      );
    } catch (err) {
      showNotification('Failed to update item', 'error');
    } finally {
      setItemLoading(false);
    }
  };

  const handleMarkAllDone = async () => {
    try {
      setItemLoading(true);
      const uncompleted = checklistItems.filter((item) => !item.completed);
      for (const item of uncompleted) {
        await launchService.toggleChecklistItem(id, item._id);
      }
      setChecklistItems((prev) =>
        prev.map((item) => ({ ...item, completed: true }))
      );
      showNotification('All items marked as done!', 'success');
    } catch (err) {
      showNotification('Failed to mark items', 'error');
    } finally {
      setItemLoading(false);
    }
  };

  const completedCount = checklistItems.filter((item) => item.completed).length;
  const allDone = completedCount === checklistItems.length && checklistItems.length > 0;

  if (loading) {
    return (
      <DashboardLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
          <CircularProgress />
        </Box>
      </DashboardLayout>
    );
  }

  if (!launch) {
    return (
      <DashboardLayout>
        <Alert severity="error">Launch not found</Alert>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Box sx={{ marginBottom: '32px' }}>
        {error && (
          <Alert severity="error" sx={{ marginBottom: '24px' }}>
            {error}
          </Alert>
        )}

        {/* Launch Day Header */}
        <Card
          sx={{
            marginBottom: '32px',
            background: 'linear-gradient(135deg, #1976D2 0%, #42A5F5 100%)',
            color: '#FFFFFF',
            overflow: 'hidden',
          }}
        >
          <CardContent>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                marginBottom: '16px',
                fontSize: { xs: '2rem', md: '3rem' },
              }}
            >
              🚀 Launch Day!
            </Typography>
            <Typography
              variant="h5"
              sx={{
                marginBottom: '16px',
                fontSize: { xs: '1.25rem', md: '1.75rem' },
                opacity: 0.95,
              }}
            >
              {launch.productName}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '8px', opacity: 0.9 }}>
              {formatDate(launch.launchDate)}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85 }}>
              You're almost there! Complete these final tasks to ensure a smooth launch.
            </Typography>
          </CardContent>
        </Card>

        {/* Progress Card */}
        {checklistItems.length > 0 && (
          <Card sx={{ marginBottom: '32px' }}>
            <CardContent>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: '8px' }}>
                      Progress
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#1976D2', fontWeight: 700 }}>
                      {completedCount} of {checklistItems.length}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                  {allDone ? (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#4CAF50',
                        fontSize: '1.25rem',
                      }}
                    >
                      <CheckCircleIcon sx={{ fontSize: '2rem' }} />
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        All Done!
                      </Typography>
                    </Box>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={handleMarkAllDone}
                      disabled={itemLoading || checklistItems.length === 0}
                      size="large"
                    >
                      Mark All Done
                    </Button>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}

        {/* Checklist Items */}
        {checklistItems.length === 0 ? (
          <Card
            sx={{
              textAlign: 'center',
              padding: '60px 32px',
              backgroundColor: '#FAFAFA',
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: '16px', color: '#757575' }}>
              No Launch Day items
            </Typography>
            <Button variant="outlined" onClick={() => navigate(`/launch/${id}`)}>
              Back to Launch
            </Button>
          </Card>
        ) : (
          <Card>
            <CardContent sx={{ padding: 0 }}>
              {checklistItems.map((item, index) => (
                <Box
                  key={item._id}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                    padding: '24px',
                    borderBottom: index < checklistItems.length - 1 ? '1px solid #E0E0E0' : 'none',
                    backgroundColor: item.completed ? 'rgba(76, 175, 80, 0.05)' : 'transparent',
                    transition: 'background-color 0.2s ease',
                  }}
                >
                  <Checkbox
                    checked={item.completed || false}
                    onChange={() => handleToggleItem(item._id)}
                    disabled={itemLoading}
                    sx={{ marginTop: '2px', fontSize: '1.5rem' }}
                  />

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        textDecoration: item.completed ? 'line-through' : 'none',
                        color: item.completed ? '#BDBDBD' : '#212121',
                        wordBreak: 'break-word',
                        fontSize: { xs: '1rem', md: '1.25rem' },
                      }}
                    >
                      {item.title}
                    </Typography>

                    {item.description && (
                      <Typography
                        variant="body1"
                        sx={{
                          marginTop: '8px',
                          color: '#757575',
                          wordBreak: 'break-word',
                        }}
                      >
                        {item.description}
                      </Typography>
                    )}
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <Box
          sx={{
            marginTop: '32px',
            display: 'flex',
            gap: '16px',
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate(`/launch/${id}`)}
          >
            Back to Launch Details
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate(`/report/${id}`)}
          >
            View Launch Report
          </Button>
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default LaunchDayPage;
