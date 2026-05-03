import { Chip } from '@mui/material'

const statusConfig = {
  Live: { color: 'success', label: '🟢 Live' },
  Planned: { color: 'info', label: '📅 Planned' },
  Draft: { color: 'default', label: '📝 Draft' },
  Completed: { color: 'secondary', label: '✅ Completed' },
  Sent: { color: 'success', label: 'Sent' },
  Scheduled: { color: 'info', label: 'Scheduled' },
  High: { color: 'error', label: 'High' },
  Medium: { color: 'warning', label: 'Medium' },
  Low: { color: 'success', label: 'Low' },
}

export default function StatusChip({ status, size = 'small' }) {
  const cfg = statusConfig[status] || { color: 'default', label: status }
  return <Chip label={cfg.label} color={cfg.color} size={size} sx={{ fontWeight: 600 }} />
}
