import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Grid,
  Divider,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import Checklist from '../components/Checklist';
import launchService from '../api/launchService';
import { useNotification } from '../hooks/useNotification';
import { formatDate, isToday } from '../utils/formatters';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AssignmentIcon from '@mui/icons-material/Assignment';

const LaunchDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const [launch, setLaunch] = useState(null);
  const [checklistItems, setChecklistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [itemLoading, setItemLoading] = useState(false);
  const [addItemDialogOpen, setAddItemDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
  });

  useEffect(() => {
    fetchLaunchDetails();
  }, [id]);

  const fetchLaunchDetails = async () => {
    try {
      setLoading(true);
      const data = await launchService.getLaunchById(id);
      setLaunch(data.launch);
      setChecklistItems(data.launch.checklist || []);
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
      showNotification('Item updated successfully', 'success');
    } catch (err) {
      showNotification('Failed to update item', 'error');
    } finally {
      setItemLoading(false);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      setItemLoading(true);
      await launchService.deleteChecklistItem(id, itemId);
      setChecklistItems((prev) => prev.filter((item) => item._id !== itemId));
      showNotification('Item deleted successfully', 'success');
    } catch (err) {
      showNotification('Failed to delete item', 'error');
    } finally {
      setItemLoading(false);
    }
  };

  const handleAddItemClick = (category) => {
    setSelectedCategory(category);
    setFormData({ title: '', description: '', dueDate: '' });
    setAddItemDialogOpen(true);
  };

  const handleAddItemSubmit = async () => {
    if (!formData.title) {
      showNotification('Please enter item title', 'warning');
      return;
    }

    try {
      setItemLoading(true);
      const response = await launchService.addChecklistItem(id, {
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate,
        category: selectedCategory,
      });
      setChecklistItems((prev) => [...prev, response.item]);
      setAddItemDialogOpen(false);
      showNotification('Item added successfully', 'success');
    } catch (err) {
      showNotification('Failed to add item', 'error');
    } finally {
      setItemLoading(false);
    }
  };

  const handleDeleteLaunch = async () => {
    if (!window.confirm('Are you sure you want to delete this launch?')) {
      return;
    }

    try {
      setItemLoading(true);
      await launchService.deleteLaunch(id);
      showNotification('Launch deleted successfully', 'success');
      navigate('/dashboard');
    } catch (err) {
      showNotification('Failed to delete launch', 'error');
    } finally {
      setItemLoading(false);
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

  const launchIsToday = isToday(launch.launchDate);

  return (
    <DashboardLayout>
      <Box sx={{ marginBottom: '32px' }}>
        {error && (
          <Alert severity="error" sx={{ marginBottom: '24px' }}>
            {error}
          </Alert>
        )}

        {/* Launch Info Card */}
        <Card
          sx={{
            marginBottom: '32px',
            overflow: 'hidden',
          }}
        >
          <CardContent>
            <Grid container spacing={3} alignItems="flex-start">
              <Grid item xs={12} sm={6}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, marginBottom: '8px' }}>
                    {launch.productName}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#1976D2', marginBottom: '16px' }}>
                    {launch.productUrl}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Chip
                      label={launch.status || 'upcoming'}
                      color={getStatusColor(launch.status)}
                      variant="outlined"
                    />
                    {launchIsToday && (
                      <Chip
                        label="Today!"
                        color="success"
                        icon={<EventNoteIcon />}
                      />
                    )}
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                <Box sx={{ marginBottom: '16px' }}>
                  <Typography variant="caption" sx={{ color: '#757575', display: 'block' }}>
                    Launch Date
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {formatDate(launch.launchDate)}
                  </Typography>
                </Box>

                {launch.timezone && (
                  <Box>
                    <Typography variant="caption" sx={{ color: '#757575', display: 'block' }}>
                      Timezone
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {launch.timezone}
                    </Typography>
                  </Box>
                )}
              </Grid>
            </Grid>

            <Divider sx={{ margin: '24px 0' }} />

            <Grid container spacing={2}>
              {launchIsToday && (
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    startIcon={<EventNoteIcon />}
                    onClick={() => navigate(`/launch/${id}/day`)}
                  >
                    Launch Day Mode
                  </Button>
                </Grid>
              )}

              <Grid item xs={12} sm={launchIsToday ? 6 : 6}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<AssignmentIcon />}
                  onClick={() => navigate(`/report/${id}`)}
                >
                  View Report
                </Button>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={handleDeleteLaunch}
                  disabled={itemLoading}
                >
                  Delete Launch
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Checklist */}
        <Checklist
          checklistItems={checklistItems}
          onToggleItem={handleToggleItem}
          onDeleteItem={handleDeleteItem}
          onAddItem={handleAddItemClick}
          loading={itemLoading}
        />
      </Box>

      {/* Add Item Dialog */}
      <Dialog
        open={addItemDialogOpen}
        onClose={() => setAddItemDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700 }}>
          Add Checklist Item - {selectedCategory}
        </DialogTitle>
        <DialogContent sx={{ paddingTop: '24px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <TextField
              fullWidth
              label="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="e.g., Prepare marketing materials"
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="Details about this task..."
            />
            <TextField
              fullWidth
              label="Due Date"
              type="date"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, dueDate: e.target.value }))
              }
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: '16px 24px' }}>
          <Button
            onClick={() => setAddItemDialogOpen(false)}
            disabled={itemLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddItemSubmit}
            variant="contained"
            disabled={itemLoading}
          >
            {itemLoading ? <CircularProgress size={24} /> : 'Add Item'}
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default LaunchDetailPage;
