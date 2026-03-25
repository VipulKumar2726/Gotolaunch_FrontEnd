import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  CircularProgress,
  Alert,
  Typography,
  Grid,
  Divider,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import launchService from '../api/launchService';
import { useNotification } from '../hooks/useNotification';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ReportPage = () => {
  const { launchId } = useParams();
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const [launch, setLaunch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    upvotes: 0,
    rank: 0,
    trafficNotes: '',
    learnings: '',
  });
  const [isNew, setIsNew] = useState(true);

  useEffect(() => {
    fetchData();
  }, [launchId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');

      // Fetch launch info
      const launchData = await launchService.getLaunchById(launchId);
      setLaunch(launchData.launch);

      // Try to fetch existing report
      const reportData = await launchService.getReport(launchId);
      if (reportData) {
        setFormData({
          upvotes: reportData.upvotes || 0,
          rank: reportData.rank || 0,
          trafficNotes: reportData.trafficNotes || '',
          learnings: reportData.learnings || '',
        });
        setIsNew(false);
      } else {
        setIsNew(true);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to load data';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'upvotes' || name === 'rank' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      if (isNew) {
        await launchService.submitReport(launchId, formData);
        showNotification('Report created successfully!', 'success');
      } else {
        await launchService.updateReport(launchId, formData);
        showNotification('Report updated successfully!', 'success');
      }

      setIsNew(false);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to save report';
      showNotification(errorMsg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

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
        <Box sx={{ marginBottom: '32px' }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(`/launch/${launchId}`)}
            sx={{ marginBottom: '16px' }}
          >
            Back to Launch
          </Button>

          <Typography variant="h4" sx={{ fontWeight: 700, marginBottom: '8px' }}>
            Launch Report
          </Typography>
          <Typography variant="body2" sx={{ color: '#757575' }}>
            Track the performance and learnings from your launch
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ marginBottom: '24px' }}>
            {error}
          </Alert>
        )}

        {/* Launch Info Card */}
        <Card sx={{ marginBottom: '32px' }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: '16px' }}>
              {launch.productName}
            </Typography>
            <Typography variant="body2" sx={{ color: '#1976D2' }}>
              {launch.productUrl}
            </Typography>
          </CardContent>
        </Card>

        {/* Report Form */}
        <Card>
          <CardContent>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Upvotes and Rank */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Upvotes"
                    name="upvotes"
                    type="number"
                    value={formData.upvotes}
                    onChange={handleInputChange}
                    helperText="Total number of upvotes received"
                    inputProps={{ min: 0 }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Product Hunt Rank"
                    name="rank"
                    type="number"
                    value={formData.rank}
                    onChange={handleInputChange}
                    helperText="Your ranking on Product Hunt"
                    inputProps={{ min: 0 }}
                  />
                </Grid>

                {/* Traffic Notes */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Traffic Notes"
                    name="trafficNotes"
                    multiline
                    rows={4}
                    value={formData.trafficNotes}
                    onChange={handleInputChange}
                    placeholder="Document traffic sources, peaks, and patterns..."
                    helperText="Key observations about traffic during and after launch"
                  />
                </Grid>

                {/* Learnings */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Key Learnings"
                    name="learnings"
                    multiline
                    rows={4}
                    value={formData.learnings}
                    onChange={handleInputChange}
                    placeholder="What did you learn? What would you do differently next time?"
                    helperText="Reflection and insights from this launch"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>

                {/* Action Buttons */}
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '12px',
                      justifyContent: 'flex-end',
                      flexDirection: { xs: 'column-reverse', sm: 'row' },
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={() => navigate(`/launch/${launchId}`)}
                      disabled={submitting}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<SaveIcon />}
                      disabled={submitting}
                    >
                      {submitting ? <CircularProgress size={24} /> : 'Save Report'}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </DashboardLayout>
  );
};

export default ReportPage;
