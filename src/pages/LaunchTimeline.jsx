import {
  Grid, Card, CardContent, Typography, Box, Chip, LinearProgress,
  Checkbox, FormControlLabel, Button,
} from '@mui/material'
import { CalendarMonth, CheckCircle, RadioButtonUnchecked, Rocket } from '@mui/icons-material'
import { useState } from 'react'
import { timelineTasks } from '../data/dummyData'
import PageHeader from '../components/PageHeader'

export default function LaunchTimeline() {
  const [tasks, setTasks] = useState(timelineTasks)

  const allTasks = tasks.flatMap(t => t.tasks)
  const completedCount = tasks.filter(t => t.completed).length
  const progress = Math.round((completedCount / tasks.length) * 100)

  const toggleDay = (dayIdx) => setTasks(prev => prev.map((t, i) => i === dayIdx ? { ...t, completed: !t.completed } : t))

  return (
    <Box>
      <PageHeader
        title="Launch Timeline Planner"
        subtitle="Day-by-day launch plan from D-7 to D+7"
        icon={<CalendarMonth />}
        breadcrumb
        action={
          <Button variant="contained" startIcon={<Rocket />} size="small">
            Set Launch Date
          </Button>
        }
      />

      {/* Progress Overview */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 1 }}>
            <Box>
              <Typography variant="h6" fontWeight={700}>Timeline Completion</Typography>
              <Typography variant="caption" color="text.secondary">{completedCount} of {tasks.length} phases completed</Typography>
            </Box>
            <Chip label={`${progress}% Done`} color={progress >= 75 ? 'success' : progress >= 40 ? 'warning' : 'default'} sx={{ fontWeight: 700 }} />
          </Box>
          <LinearProgress variant="determinate" value={progress} sx={{ height: 12, borderRadius: 6 }} color={progress >= 75 ? 'success' : 'primary'} />
        </CardContent>
      </Card>

      {/* Timeline */}
      <Box sx={{ position: 'relative' }}>
        {/* Center line */}
        <Box sx={{ position: 'absolute', left: { xs: 16, md: '50%' }, top: 0, bottom: 0, width: 2, background: 'linear-gradient(180deg, #6C5CE7, #A29BFE)', opacity: 0.2, display: { xs: 'none', md: 'block' } }} />

        {tasks.map((item, i) => {
          const isLaunchDay = item.day === 0
          const isLeft = i % 2 === 0
          return (
            <Box key={i} sx={{ display: 'flex', mb: 2, flexDirection: { xs: 'row', md: isLeft ? 'row-reverse' : 'row' } }}>
              {/* Spacer */}
              <Box sx={{ flex: 1, display: { xs: 'none', md: 'block' } }} />

              {/* Center dot */}
              <Box sx={{
                width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                background: isLaunchDay ? 'linear-gradient(135deg, #6C5CE7, #A29BFE)' : item.completed ? '#00B894' : 'background.paper',
                border: isLaunchDay ? 'none' : '2px solid',
                borderColor: item.completed ? '#00B894' : 'divider',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 1, mx: 1, my: 1,
                boxShadow: isLaunchDay ? '0 4px 16px rgba(108,92,231,0.4)' : 'none',
                cursor: 'pointer',
              }} onClick={() => toggleDay(i)}>
                {isLaunchDay ? '🚀' : item.completed ? <CheckCircle sx={{ fontSize: 20, color: '#fff' }} /> : <RadioButtonUnchecked sx={{ fontSize: 20, color: 'text.disabled' }} />}
              </Box>

              {/* Card */}
              <Box sx={{ flex: 1 }}>
                <Card sx={{
                  border: isLaunchDay ? '2px solid' : '1px solid',
                  borderColor: isLaunchDay ? 'primary.main' : item.completed ? 'success.main' : 'divider',
                  background: isLaunchDay ? 'linear-gradient(135deg, rgba(108,92,231,0.08), rgba(162,155,254,0.05))' : item.completed ? 'rgba(0,184,148,0.04)' : 'background.paper',
                }}>
                  <CardContent sx={{ py: '12px !important', px: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip
                          label={item.label}
                          size="small"
                          color={isLaunchDay ? 'primary' : item.day < 0 ? 'default' : 'secondary'}
                          sx={{ fontWeight: 700, fontSize: 11 }}
                        />
                        <Typography variant="body2" fontWeight={700}>{item.title}</Typography>
                      </Box>
                      {item.completed && <Chip label="Done" size="small" color="success" sx={{ fontWeight: 700 }} />}
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                      {item.tasks.map((t, j) => (
                        <Chip key={j} label={t} size="small" variant="outlined" sx={{ fontSize: 11, height: 22 }} />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}
