import {
  Grid, Card, CardContent, Typography, Box, Chip, TextField,
  LinearProgress, IconButton, Tooltip, Divider,
} from '@mui/material'
import {
  Article,
  ContentCopy as ContentCopyIcon,
  Check,
  AutoAwesome,
  ArrowForward,
} from '@mui/icons-material'
import { useState } from 'react'
import {
  taglineSuggestions,
  ctaCopies,
  beforeAfterContent,
} from '../data/dummyData'
import PageHeader from '../components/PageHeader'

export default function ContentCopy() {
  const [copied, setCopied] = useState(null)
  const [headline, setHeadline] = useState('')

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const headlineScore =
    headline.length > 0
      ? Math.min(
          100,
          Math.round(
            (Math.min(headline.length, 60) / 60) * 70 +
              (headline.split(' ').length >= 5 ? 30 : 0)
          )
        )
      : 0

  return (
    <Box>
      <PageHeader
        title="Content & Copy Guidance"
        subtitle="AI-powered copy suggestions to maximize your launch impact"
        icon={<Article />}
        breadcrumb
      />

      <Grid container spacing={2.5}>
        {/* Tagline Suggestions */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  mb: 2,
                }}
              >
                <AutoAwesome color="primary" sx={{ fontSize: 20 }} />
                <Typography variant="h6" fontWeight={700}>
                  Tagline Suggestions
                </Typography>
              </Box>

              {taglineSuggestions.map((t, i) => (
                <Box
                  key={i}
                  sx={{
                    mb: 2,
                    p: 2,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: i === 0 ? 'primary.main' : 'divider',
                    background:
                      i === 0
                        ? 'rgba(108,92,231,0.05)'
                        : 'transparent',
                    position: 'relative',
                  }}
                >
                  {i === 0 && (
                    <Chip
                      label="⭐ Top Pick"
                      size="small"
                      color="primary"
                      sx={{
                        position: 'absolute',
                        top: -10,
                        right: 12,
                        fontWeight: 700,
                      }}
                    />
                  )}

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 1,
                    }}
                  >
                    <Chip
                      label={t.type}
                      size="small"
                      sx={{ fontSize: 11, fontWeight: 600 }}
                    />

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                      }}
                    >
                      <Typography
                        variant="caption"
                        fontWeight={700}
                        color="primary"
                      >
                        {t.score}/100
                      </Typography>

                      <Tooltip
                        title={
                          copied === `tag-${i}` ? 'Copied!' : 'Copy'
                        }
                      >
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleCopy(t.text, `tag-${i}`)
                          }
                        >
                          {copied === `tag-${i}` ? (
                            <Check
                              color="success"
                              fontSize="small"
                            />
                          ) : (
                            <ContentCopyIcon fontSize="small" />
                          )}
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>

                  <Typography variant="body2" fontWeight={500}>
                    {t.text}
                  </Typography>

                  <LinearProgress
                    variant="determinate"
                    value={t.score}
                    sx={{ mt: 1.5, height: 5 }}
                    color={t.score >= 90 ? 'success' : 'primary'}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Headline Analyzer */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ mb: 0.5 }}
              >
                Headline Analyzer
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                Type your tagline to get an instant score
              </Typography>

              <TextField
                fullWidth
                multiline
                rows={2}
                placeholder="e.g. The all-in-one tool for SaaS founders to launch faster"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                sx={{ mt: 2, mb: 2 }}
              />

              {headline.length > 0 && (
                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      fontWeight={700}
                    >
                      Score
                    </Typography>

                    <Typography
                      variant="body2"
                      fontWeight={700}
                      color={
                        headlineScore >= 70
                          ? 'success.main'
                          : 'warning.main'
                      }
                    >
                      {headlineScore}/100
                    </Typography>
                  </Box>

                  <LinearProgress
                    variant="determinate"
                    value={headlineScore}
                    sx={{ mb: 2, height: 10 }}
                    color={
                      headlineScore >= 70
                        ? 'success'
                        : 'warning'
                    }
                  />

                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 1,
                    }}
                  >
                    <Chip
                      label={`${headline.length} chars`}
                      size="small"
                      color={
                        headline.length <= 60
                          ? 'success'
                          : 'error'
                      }
                      sx={{ fontWeight: 600 }}
                    />

                    <Chip
                      label={`${headline.split(' ').length} words`}
                      size="small"
                      color="default"
                      sx={{ fontWeight: 600 }}
                    />

                    {headline.length <= 60 && (
                      <Chip
                        label="✅ Good length"
                        size="small"
                        color="success"
                        sx={{ fontWeight: 600 }}
                      />
                    )}
                  </Box>
                </Box>
              )}

              <Divider sx={{ my: 2.5 }} />

              <Typography
                variant="subtitle2"
                fontWeight={700}
                sx={{ mb: 1.5 }}
              >
                CTA Copy Suggestions
              </Typography>

              {ctaCopies.map((c, i) => (
                <Box
                  key={i}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    mb: 1.5,
                    p: 1.5,
                    borderRadius: 2,
                    background: 'rgba(108,92,231,0.04)',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontWeight={600}
                    >
                      {c.context}
                    </Typography>

                    <Typography variant="body2">
                      {c.text}
                    </Typography>
                  </Box>

                  <IconButton
                    size="small"
                    onClick={() =>
                      handleCopy(c.text, `cta-${i}`)
                    }
                  >
                    {copied === `cta-${i}` ? (
                      <Check
                        color="success"
                        fontSize="small"
                      />
                    ) : (
                      <ContentCopyIcon fontSize="small" />
                    )}
                  </IconButton>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Before / After */}
        <Grid size={12}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ mb: 3 }}
              >
                Before / After Content Preview
              </Typography>

              <Grid container spacing={2.5}>
                {beforeAfterContent.map((item, i) => (
                  <Grid
                    size={{ xs: 12, md: 6 }}
                    key={i}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={700}
                      sx={{ mb: 1.5 }}
                    >
                      {item.label}
                    </Typography>

                    <Box
                      sx={{
                        display: 'flex',
                        gap: 1,
                        flexDirection: 'column',
                      }}
                    >
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          background:
                            'rgba(225,112,85,0.08)',
                          border:
                            '1px solid rgba(225,112,85,0.3)',
                        }}
                      >
                        <Chip
                          label="Before"
                          size="small"
                          color="error"
                          sx={{
                            mb: 1,
                            fontWeight: 700,
                          }}
                        />

                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {item.before}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        <ArrowForward color="success" />
                      </Box>

                      <Box
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          background:
                            'rgba(0,184,148,0.08)',
                          border:
                            '1px solid rgba(0,184,148,0.3)',
                        }}
                      >
                        <Chip
                          label="After"
                          size="small"
                          color="success"
                          sx={{
                            mb: 1,
                            fontWeight: 700,
                          }}
                        />

                        <Typography variant="body2">
                          {item.after}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}