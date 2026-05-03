import {
  Grid, Card, CardContent, Typography, Box, Chip, Avatar, Button,
  LinearProgress, Skeleton, Tab, Tabs,
} from '@mui/material'
import { Visibility, Mouse, Comment, OpenInNew, Add } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts'
import { products, weeklyPerformance } from '../data/dummyData'
import StatCard from '../components/StatCard'
import PageHeader from '../components/PageHeader'
import StatusChip from '../components/StatusChip'
import UpgradeBanner from '../components/UpgradeBanner'
import { Dashboard } from '@mui/icons-material'

const COLORS = ['#6C5CE7', '#00CEC9', '#FDCB6E', '#E17055']

export default function ProductDashboard() {
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState(0)

  useEffect(() => { setTimeout(() => setLoading(false), 1200) }, [])

  const active = products[tab] || products[0]
  const totalViews = products.reduce((s, p) => s + p.views, 0)
  const totalClicks = products.reduce((s, p) => s + p.clicks, 0)
  const totalComments = products.reduce((s, p) => s + p.comments, 0)
  const totalUpvotes = products.reduce((s, p) => s + p.upvotes, 0)

  const pieData = [
    { name: 'Direct', value: active.trafficSources.direct },
    { name: 'Social', value: active.trafficSources.social },
    { name: 'Search', value: active.trafficSources.search },
    { name: 'Referral', value: active.trafficSources.referral },
  ]

  return (
    <Box>
      <PageHeader
        title="Product Dashboard"
        subtitle="Track all your Product Hunt launches in one place"
        icon={<Dashboard />}
        breadcrumb
        // action={<Button variant="contained" startIcon={<Add />} size="small">Add Product</Button>}
      />
      <UpgradeBanner />

      {/* KPI Cards */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {[
          { title: 'Total Views', value: totalViews.toLocaleString(), icon: <Visibility />, color: '#6C5CE7', trend: 'up', trendValue: '+18%', subtitle: 'vs last month' },
          { title: 'Total Clicks', value: totalClicks.toLocaleString(), icon: <Mouse />, color: '#00CEC9', trend: 'up', trendValue: '+24%', subtitle: 'vs last month' },
          { title: 'Total Comments', value: totalComments.toLocaleString(), icon: <Comment />, color: '#FDCB6E', trend: 'up', trendValue: '+9%', subtitle: 'vs last month' },
          { title: 'Total Upvotes', value: totalUpvotes.toLocaleString(), icon: <OpenInNew />, color: '#E17055', trend: 'up', trendValue: '+31%', subtitle: 'vs last month' },
        ].map((s, i) => (
          <Grid size={{ xs: 6, md: 3 }} key={i}>
            <StatCard {...s} loading={loading} />
          </Grid>
        ))}
      </Grid>

      {/* Product Cards */}
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Your Products</Typography>
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {products.map((p, i) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={p.id}>
            {loading ? <Skeleton variant="rounded" height={200} sx={{ borderRadius: 3 }} /> : (
              <Card sx={{ cursor: 'pointer', border: tab === i ? '2px solid' : '1px solid', borderColor: tab === i ? 'primary.main' : 'divider' }}
                onClick={() => setTab(i)}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                    <Avatar sx={{ width: 44, height: 44, borderRadius: 2, background: COLORS[i % 4] + '22', color: COLORS[i % 4], fontWeight: 700 }}>
                      {p.name[0]}
                    </Avatar>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="subtitle2" fontWeight={700} noWrap>{p.name}</Typography>
                      <Typography variant="caption" color="text.secondary" noWrap>{p.category}</Typography>
                    </Box>
                    <StatusChip status={p.status} />
                  </Box>
                  <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block', mb: 2 }}>{p.tagline}</Typography>
                  <Grid container spacing={1}>
                    {[['Views', p.views], ['Clicks', p.clicks], ['Comments', p.comments]].map(([k, v]) => (
                      <Grid size={4} key={k}>
                        <Box sx={{ textAlign: 'center', p: 0.75, borderRadius: 1.5, background: 'rgba(108,92,231,0.06)' }}>
                          <Typography variant="subtitle2" fontWeight={700}>{v > 999 ? (v/1000).toFixed(1)+'K' : v}</Typography>
                          <Typography variant="caption" color="text.secondary">{k}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                  <Box sx={{ mt: 1.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      Launch: {new Date(p.launchDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            )}
          </Grid>
        ))}
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>Weekly Performance — {active.name}</Typography>
              <Typography variant="caption" color="text.secondary">Views, Clicks & Comments over 7 days</Typography>
              <Box sx={{ mt: 2, height: 260 }}>
                {loading ? <Skeleton variant="rectangular" height={260} sx={{ borderRadius: 2 }} /> : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={weeklyPerformance} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                      <defs>
                        <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6C5CE7" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#6C5CE7" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="clicksGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00CEC9" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#00CEC9" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(108,92,231,0.08)" />
                      <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.12)' }} />
                      <Area type="monotone" dataKey="views" stroke="#6C5CE7" strokeWidth={2} fill="url(#viewsGrad)" name="Views" />
                      <Area type="monotone" dataKey="clicks" stroke="#00CEC9" strokeWidth={2} fill="url(#clicksGrad)" name="Clicks" />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>Traffic Sources</Typography>
              <Typography variant="caption" color="text.secondary">Where your visitors come from</Typography>
              <Box sx={{ height: 260, mt: 1 }}>
                {loading ? <Skeleton variant="circular" width={200} height={200} sx={{ mx: 'auto', mt: 2 }} /> : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="45%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                        {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                      </Pie>
                      <Tooltip formatter={(v) => `${v}%`} contentStyle={{ borderRadius: 12, border: 'none' }} />
                      <Legend iconType="circle" iconSize={8} />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
