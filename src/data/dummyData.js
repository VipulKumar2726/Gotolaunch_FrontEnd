// ─── Products ───────────────────────────────────────────────
export const products = [
  {
    id: 1, name: 'LaunchPilot AI', tagline: 'Automate your Product Hunt launch strategy',
    status: 'Live', launchDate: '2024-12-15', category: 'Artificial Intelligence',
    views: 12480, clicks: 3240, comments: 187, upvotes: 842,
    thumbnail: 'https://via.placeholder.com/60x60/6C5CE7/fff?text=LP',
    trafficSources: { direct: 45, social: 30, search: 15, referral: 10 },
  },
  {
    id: 2, name: 'ContentFlow', tagline: 'AI-powered content calendar for founders',
    status: 'Planned', launchDate: '2025-01-22', category: 'Productivity',
    views: 3210, clicks: 890, comments: 42, upvotes: 0,
    thumbnail: 'https://via.placeholder.com/60x60/00CEC9/fff?text=CF',
    trafficSources: { direct: 35, social: 40, search: 18, referral: 7 },
  },
  {
    id: 3, name: 'SaaSmetrics', tagline: 'Real-time SaaS KPI dashboard',
    status: 'Draft', launchDate: '2025-02-10', category: 'Analytics',
    views: 0, clicks: 0, comments: 0, upvotes: 0,
    thumbnail: 'https://via.placeholder.com/60x60/E17055/fff?text=SM',
    trafficSources: { direct: 50, social: 20, search: 20, referral: 10 },
  },
  {
    id: 4, name: 'OnboardKit', tagline: 'User onboarding flows without code',
    status: 'Completed', launchDate: '2024-10-05', category: 'No-Code',
    views: 28900, clicks: 7420, comments: 312, upvotes: 1840,
    thumbnail: 'https://via.placeholder.com/60x60/FDCB6E/fff?text=OK',
    trafficSources: { direct: 30, social: 45, search: 12, referral: 13 },
  },
]

export const weeklyPerformance = [
  { day: 'Mon', views: 1200, clicks: 320, comments: 18 },
  { day: 'Tue', views: 1800, clicks: 490, comments: 27 },
  { day: 'Wed', views: 2400, clicks: 680, comments: 34 },
  { day: 'Thu', views: 3100, clicks: 820, comments: 41 },
  { day: 'Fri', views: 4800, clicks: 1240, comments: 68 },
  { day: 'Sat', views: 2900, clicks: 750, comments: 29 },
  { day: 'Sun', views: 1600, clicks: 410, comments: 22 },
]

// ─── Strategy ───────────────────────────────────────────────
export const strategySteps = [
  { id: 1, title: 'Define Your Target Audience', desc: 'Identify the exact personas most likely to upvote and share your product.', completed: true, effort: 'Low' },
  { id: 2, title: 'Craft Your Tagline', desc: 'Write a clear, compelling tagline under 60 characters.', completed: true, effort: 'Low' },
  { id: 3, title: 'Prepare Launch Assets', desc: 'Create thumbnail, screenshots, and demo video.', completed: false, effort: 'High' },
  { id: 4, title: 'Build Pre-Launch Community', desc: 'Warm up your network on LinkedIn, Twitter, and Slack communities.', completed: false, effort: 'Medium' },
  { id: 5, title: 'Schedule Launch Day Posts', desc: 'Prepare all posts and schedule them for 12:01 AM PST.', completed: false, effort: 'Medium' },
  { id: 6, title: 'Activate Maker Network', desc: 'Reach out to fellow makers to support your launch.', completed: false, effort: 'Medium' },
]

export const competitors = [
  { name: 'LaunchBase', upvotes: 1240, comments: 98, rank: '#3', category: 'AI', strength: 'Strong community' },
  { name: 'RocketLaunch', upvotes: 890, comments: 67, rank: '#7', category: 'Productivity', strength: 'Great visuals' },
  { name: 'HuntKit', upvotes: 2100, comments: 145, rank: '#1', category: 'AI', strength: 'Influencer support' },
]

export const launchTimings = [
  { day: 'Tuesday', score: 92, reason: 'Highest Product Hunt traffic' },
  { day: 'Wednesday', score: 88, reason: 'Strong engagement mid-week' },
  { day: 'Monday', score: 75, reason: 'Fresh start energy, less competition' },
]

// ─── Promotion ───────────────────────────────────────────────
export const promotionPlatforms = [
  {
    name: 'LinkedIn', icon: 'LinkedIn', score: 87, bestTime: '8–10 AM Tuesday',
    checklist: ['Personal post with story', 'Company page share', 'Tag 5 connections'],
    template: '🚀 Excited to share [Product] on Product Hunt today! We built this because [problem]. Check it out 👇',
    color: '#0077B5',
  },
  {
    name: 'Twitter/X', icon: 'Twitter', score: 92, bestTime: '9 AM PST launch day',
    checklist: ['Thread with backstory', 'Pin tweet', 'Engage replies fast'],
    template: '🎉 We just launched [Product] on @ProductHunt! [Tagline] – would love your support! #buildinpublic',
    color: '#1DA1F2',
  },
  {
    name: 'Reddit', icon: 'Reddit', score: 74, bestTime: '10 AM–12 PM EST',
    checklist: ['r/SaaS post', 'r/Entrepreneur post', 'No self-promotion tone'],
    template: 'I built [Product] after struggling with [problem]. Happy to answer any questions!',
    color: '#FF4500',
  },
  {
    name: 'Indie Hackers', icon: 'Code', score: 81, bestTime: 'Any time launch day',
    checklist: ['Milestone post', 'Product page update', 'Comment in relevant threads'],
    template: 'Just launched [Product] on Product Hunt – [MRR/traction data]. Here is what I learned...',
    color: '#0056D2',
  },
  {
    name: 'Facebook Groups', icon: 'Facebook', score: 68, bestTime: '12–2 PM local time',
    checklist: ['SaaS Founders group', 'Startup groups', 'Personal profile share'],
    template: 'Big day for us! We just launched [Product] on Product Hunt. [Brief value prop]. Support appreciated!',
    color: '#1877F2',
  },
]

// ─── Readiness ───────────────────────────────────────────────
export const readinessScores = {
  overall: 74,
  tagline: 88,
  thumbnail: 62,
  description: 79,
  socialProof: 65,
  firstComment: 71,
  media: 58,
  timing: 90,
}

export const aiRecommendations = [
  { priority: 'High', title: 'Upgrade your thumbnail', desc: 'Use a dark background with bold product UI. Current image lacks contrast.', icon: 'Image' },
  { priority: 'High', title: 'Add more social proof', desc: 'Include 2–3 user testimonials or beta tester quotes in your description.', icon: 'Star' },
  { priority: 'Medium', title: 'Enhance media gallery', desc: 'Add a 60-second demo video. Products with video get 40% more upvotes.', icon: 'PlayCircle' },
  { priority: 'Low', title: 'Refine first comment', desc: 'Your first comment should tell the founding story and invite feedback.', icon: 'Chat' },
]

// ─── Content & Copy ───────────────────────────────────────────
export const taglineSuggestions = [
  { text: 'Automate your Product Hunt launch strategy with AI', score: 94, type: 'AI-Powered' },
  { text: 'Launch smarter. Rank higher. Grow faster.', score: 89, type: 'Action-Oriented' },
  { text: 'The all-in-one Product Hunt launch toolkit for founders', score: 82, type: 'Descriptive' },
]

export const ctaCopies = [
  { context: 'Twitter CTA', text: '👉 Support us on Product Hunt today!' },
  { context: 'Email CTA', text: 'Tap here to upvote us on Product Hunt 🚀' },
  { context: 'LinkedIn CTA', text: 'We would love your support! Link in comments 👇' },
]

export const beforeAfterContent = [
  {
    label: 'Product Description',
    before: 'We made an app for founders to launch on Product Hunt.',
    after: 'GoToLaunch gives founders an unfair advantage on Product Hunt — with AI-powered strategy, real-time analytics, and battle-tested launch playbooks.',
  },
  {
    label: 'First Comment',
    before: 'Hi Product Hunt! We hope you like our product.',
    after: 'Hey PH! 👋 We spent 6 months watching 500+ launches fail because of poor preparation. So we built GoToLaunch. Would love brutal feedback from this community!',
  },
]

// ─── Audience ─────────────────────────────────────────────────
export const personas = [
  {
    name: 'Solo Founder Sam', role: 'Indie Hacker', segment: 'B2C',
    painPoints: ['No audience', 'Limited time', 'First launch ever'],
    messaging: 'Step-by-step launch guide, no experience needed',
    fitScore: 95, icon: 'Person',
  },
  {
    name: 'SaaS CEO Sarah', role: 'B2B SaaS Founder', segment: 'B2B',
    painPoints: ['Wrong audience targeting', 'Poor engagement', 'Team coordination'],
    messaging: 'Team launch dashboard with role-based tasks',
    fitScore: 88, icon: 'Business',
  },
  {
    name: 'AI Builder Alex', role: 'AI Product Maker', segment: 'AI',
    painPoints: ['Saturated AI category', 'Standing out', 'Credibility'],
    messaging: 'AI-specific launch strategies & differentiation tactics',
    fitScore: 91, icon: 'Psychology',
  },
  {
    name: 'Growth Guru Gina', role: 'Growth Lead', segment: 'Agency',
    painPoints: ['Managing multiple launches', 'Client reporting', 'Scaling'],
    messaging: 'Multi-product dashboard with client export reports',
    fitScore: 76, icon: 'TrendingUp',
  },
]

export const audienceSegments = [
  { label: 'Founder / Solo', value: 38, color: '#6C5CE7' },
  { label: 'SaaS Teams', value: 27, color: '#00CEC9' },
  { label: 'AI Builders', value: 19, color: '#FDCB6E' },
  { label: 'Agencies', value: 10, color: '#E17055' },
  { label: 'Others', value: 6, color: '#A29BFE' },
]

// ─── Distribution Channels ────────────────────────────────────
export const channels = [
  { id: 1, name: 'Product Hunt', type: 'Platform', authority: 98, niche: 'All', members: '500K+', saved: true },
  { id: 2, name: 'Hacker News Show HN', type: 'Community', authority: 94, niche: 'Tech/Dev', members: '12M+', saved: false },
  { id: 3, name: 'r/SaaS', type: 'Community', authority: 82, niche: 'SaaS', members: '180K', saved: true },
  { id: 4, name: 'Indie Hackers', type: 'Community', authority: 88, niche: 'Founders', members: '500K+', saved: false },
  { id: 5, name: 'BetaList', type: 'Directory', authority: 79, niche: 'Startups', members: '100K+', saved: false },
  { id: 6, name: 'AppSumo Launch', type: 'Platform', authority: 91, niche: 'SaaS/Tools', members: '1M+', saved: true },
  { id: 7, name: 'SaaS Founders Slack', type: 'Community', authority: 76, niche: 'SaaS', members: '45K', saved: false },
  { id: 8, name: 'G2 Listing', type: 'Directory', authority: 87, niche: 'B2B SaaS', members: '80M+', saved: false },
  { id: 9, name: 'Dev.to', type: 'Community', authority: 84, niche: 'Developers', members: '900K+', saved: false },
  { id: 10, name: 'Capterra', type: 'Directory', authority: 85, niche: 'Software', members: '15M+', saved: false },
]

// ─── Timeline ─────────────────────────────────────────────────
export const timelineTasks = [
  { day: -7, label: 'Day -7', title: 'Audience Warmup', tasks: ['Post teaser on Twitter', 'Send teaser email to list', 'Join 3 relevant communities'], completed: true },
  { day: -6, label: 'Day -6', title: 'Asset Creation', tasks: ['Finalize thumbnail', 'Write product description', 'Prepare media gallery'], completed: true },
  { day: -5, label: 'Day -5', title: 'Community Building', tasks: ['Post on Indie Hackers', 'Reach out to 10 makers', 'Schedule LinkedIn posts'], completed: true },
  { day: -4, label: 'Day -4', title: 'Content Prep', tasks: ['Write first comment', 'Prepare Twitter thread', 'Draft email sequences'], completed: false },
  { day: -3, label: 'Day -3', title: 'Hunter Outreach', tasks: ['DM top hunters', 'Confirm launch slot', 'Test all links'], completed: false },
  { day: -2, label: 'Day -2', title: 'Final Review', tasks: ['Proofread all copy', 'Test demo video', 'Final checklist review'], completed: false },
  { day: -1, label: 'Day -1', title: 'Pre-Launch Blast', tasks: ['Send launch reminder email', 'Post countdown on social', 'Notify core supporters'], completed: false },
  { day: 0, label: 'Launch Day 🚀', title: 'GO LIVE', tasks: ['Post at 12:01 AM PST', 'Submit first comment', 'Activate all channels'], completed: false },
  { day: 1, label: 'Day +1', title: 'Momentum Push', tasks: ['Reply to all comments', 'Post gratitude thread', 'Send results email'], completed: false },
  { day: 3, label: 'Day +3', title: 'Follow-Up', tasks: ['Email new leads', 'Post launch recap', 'Update landing page'], completed: false },
  { day: 7, label: 'Day +7', title: 'Growth Review', tasks: ['Analyze metrics', 'Identify top traffic sources', 'Plan next steps'], completed: false },
]

// ─── Engagement ───────────────────────────────────────────────
export const commentTemplates = [
  { type: 'Thank You', text: 'Thank you so much for the kind words, [Name]! That means a lot to our team. We built this specifically to solve [pain point] — glad it resonates! 🙏' },
  { type: 'Feature Request', text: 'Great suggestion, [Name]! This is on our roadmap for Q1. I will DM you when it ships — would love your feedback on it!' },
  { type: 'Pricing Question', text: 'Hey [Name]! Great question. We have a free tier and paid plans starting at $29/mo. Happy to walk you through which plan fits your use case.' },
  { type: 'Criticism', text: 'Thank you for the honest feedback, [Name]! You are right that [issue] needs work. We are shipping a fix by [date]. Would love to show you the improvement!' },
]

export const engagementMetrics = [
  { time: '12 AM', engagements: 12 }, { time: '2 AM', engagements: 8 },
  { time: '4 AM', engagements: 5 }, { time: '6 AM', engagements: 18 },
  { time: '8 AM', engagements: 45 }, { time: '10 AM', engagements: 89 },
  { time: '12 PM', engagements: 124 }, { time: '2 PM', engagements: 98 },
  { time: '4 PM', engagements: 76 }, { time: '6 PM', engagements: 54 },
  { time: '8 PM', engagements: 38 }, { time: '10 PM', engagements: 22 },
]

// ─── Post-Launch ───────────────────────────────────────────────
export const emailSequences = [
  { day: 1, subject: 'Thank you for your support on Product Hunt! 🎉', preview: 'We are overwhelmed by the amazing response...', status: 'Sent' },
  { day: 3, subject: 'Here is what we are building next based on your feedback', preview: 'You gave us 312 incredible pieces of feedback...', status: 'Sent' },
  { day: 7, subject: 'One week later — here are our launch results', preview: 'After 7 days, we are sharing everything...', status: 'Scheduled' },
  { day: 14, subject: 'New feature drop: [Feature Name] is now live!', preview: 'Thanks to your feedback, we shipped...', status: 'Draft' },
  { day: 30, subject: '30-day update: Here is our growth story', preview: 'One month after our Product Hunt launch...', status: 'Draft' },
]

export const growthKPIs = [
  { month: 'Week 1', mrr: 0, users: 184, retention: 0 },
  { month: 'Week 2', mrr: 890, users: 312, retention: 72 },
  { month: 'Week 3', mrr: 2100, users: 489, retention: 68 },
  { month: 'Week 4', mrr: 3800, users: 621, retention: 74 },
  { month: 'Week 5', mrr: 5200, users: 780, retention: 71 },
  { month: 'Week 6', mrr: 6900, users: 934, retention: 76 },
]

export const growthOpportunities = [
  { title: 'AppSumo Campaign', potential: 'High', effort: 'Medium', desc: 'Lifetime deal campaign can generate $50K+ in one week' },
  { title: 'SEO Blog Strategy', potential: 'High', effort: 'High', desc: 'Target 20 high-intent keywords to generate organic signups' },
  { title: 'Partner Integrations', potential: 'Medium', effort: 'Low', desc: 'Integrate with Notion, Slack to reach their user bases' },
  { title: 'YouTube Tutorial Series', potential: 'Medium', effort: 'High', desc: 'Reach 500K+ developers actively looking for tools' },
]

// ─── Notifications ─────────────────────────────────────────────
export const notifications = [
  { id: 1, title: 'Launch day approaching!', desc: 'LaunchPilot AI launches in 3 days', time: '2h ago', read: false, type: 'warning' },
  { id: 2, title: 'Readiness score improved', desc: 'Your score jumped from 68 to 74', time: '5h ago', read: false, type: 'success' },
  { id: 3, title: 'New competitor detected', desc: 'HuntKit launched in your category', time: '1d ago', read: true, type: 'info' },
  { id: 4, title: 'Strategy milestone hit', desc: 'Asset creation step completed', time: '2d ago', read: true, type: 'success' },
]
