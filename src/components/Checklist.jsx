import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatDate } from '../utils/formatters';

const ChecklistItem = ({
  item,
  onToggle,
  onDelete,
  loading,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '16px',
        borderBottom: '1px solid #E0E0E0',
        transition: 'background-color 0.2s ease',
        '&:hover': {
          backgroundColor: '#FAFAFA',
        },
      }}
    >
      <Checkbox
        checked={item.completed || false}
        onChange={() => onToggle(item._id)}
        disabled={loading}
        sx={{ marginTop: '2px' }}
      />

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            textDecoration: item.completed ? 'line-through' : 'none',
            color: item.completed ? '#BDBDBD' : '#212121',
            wordBreak: 'break-word',
          }}
        >
          {item.title}
        </Typography>

        {item.description && (
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              marginTop: '4px',
              color: '#757575',
              wordBreak: 'break-word',
            }}
          >
            {item.description}
          </Typography>
        )}

        {item.dueDate && (
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              marginTop: '4px',
              color: '#1976D2',
            }}
          >
            Due: {formatDate(item.dueDate)}
          </Typography>
        )}
      </Box>

      <Button
        size="small"
        onClick={() => onDelete(item._id)}
        disabled={loading}
        sx={{
          color: '#F44336',
          minWidth: 'auto',
          padding: '4px',
        }}
      >
        <DeleteIcon fontSize="small" />
      </Button>
    </Box>
  );
};

const ChecklistSection = ({
  category,
  items,
  onToggle,
  onDelete,
  onAddItem,
  loading,
}) => {
  const completedCount = items.filter((item) => item.completed).length;

  return (
    <Card sx={{ marginBottom: '24px', overflow: 'hidden' }}>
      <CardContent sx={{ padding: 0 }}>
        {/* Header */}
        <Box
          sx={{
            padding: '16px',
            backgroundColor: '#FAFAFA',
            borderBottom: '1px solid #E0E0E0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: '4px' }}>
              {category}
            </Typography>
            <Typography variant="caption" sx={{ color: '#757575' }}>
              {completedCount} of {items.length} completed
            </Typography>
          </Box>
          <Button
            size="small"
            startIcon={<AddIcon />}
            onClick={() => onAddItem(category)}
          >
            Add Item
          </Button>
        </Box>

        {/* Items */}
        {items.length === 0 ? (
          <Box sx={{ padding: '24px', textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#BDBDBD' }}>
              No items yet
            </Typography>
          </Box>
        ) : (
          items.map((item) => (
            <ChecklistItem
              key={item._id}
              item={item}
              onToggle={onToggle}
              onDelete={onDelete}
              loading={loading}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
};

const Checklist = ({
  checklistItems,
  onToggleItem,
  onDeleteItem,
  onAddItem,
  loading,
}) => {
  const groupedItems = {};

  checklistItems.forEach((item) => {
    const category = item.category || 'Other';
    if (!groupedItems[category]) {
      groupedItems[category] = [];
    }
    groupedItems[category].push(item);
  });

  const categoryOrder = ['Pre-launch', 'Launch Day', 'Post-launch'];
  const sortedCategories = categoryOrder.filter(
    (cat) => groupedItems[cat]
  ).concat(
    Object.keys(groupedItems).filter((cat) => !categoryOrder.includes(cat))
  );

  return (
    <Box>
      <Box sx={{ marginBottom: '32px' }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, marginBottom: '16px' }}
        >
          Launch Checklist
        </Typography>
      </Box>

      {sortedCategories.length === 0 ? (
        <Card
          sx={{
            textAlign: 'center',
            padding: '60px 32px',
            backgroundColor: '#FAFAFA',
          }}
        >
          <Typography variant="body2" sx={{ color: '#BDBDBD' }}>
            No checklist items yet
          </Typography>
        </Card>
      ) : (
        sortedCategories.map((category) => (
          <ChecklistSection
            key={category}
            category={category}
            items={groupedItems[category]}
            onToggle={onToggleItem}
            onDelete={onDeleteItem}
            onAddItem={onAddItem}
            loading={loading}
          />
        ))
      )}
    </Box>
  );
};

export default Checklist;
