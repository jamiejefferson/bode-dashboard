# Bode - AI-Powered Property Management Dashboard

A modern, interactive dashboard for property management with AI assistance, drag-and-drop functionality, and real-time analytics.

## 🚀 Live Demo

The dashboard is now live and password-protected for secure access.

### Access Information:
- **Demo Password**: `bode2024`
- **Features**: Full dashboard with drag-and-drop cards, AI chat panel, and responsive design

## ✨ Features

### 🎯 Interactive Dashboard
- **Drag & Drop Cards**: Reposition dashboard widgets with smooth animations
- **Click to Enlarge**: Cards scale up when clicked for better viewing
- **Masonry Layout**: Responsive grid that adapts to screen size
- **Loading Animations**: Smooth entrance animations for all components

### 🤖 AI Assistant
- **Collapsible Chat Panel**: Right-side AI assistant panel
- **Real-time Responses**: Simulated AI interactions
- **Quick Actions**: Pre-built action buttons for common tasks

### 🎨 Modern Design
- **Host Grotesk Typography**: Professional font for headers and big stats
- **Space Mono**: Monospace font for technical content
- **Dark/Light Mode**: Toggle between themes
- **Responsive Design**: Works on all device sizes

### 🔐 Security
- **Password Protection**: Simple authentication system
- **Session Management**: Persistent login state
- **Secure Headers**: Protection against common web vulnerabilities

## 🛠️ Technology Stack

- **Framework**: Next.js 15.4.6 with React 19
- **Styling**: Custom CSS with CSS Variables
- **Deployment**: Vercel
- **Authentication**: Client-side with localStorage
- **Animations**: CSS keyframes and transitions

## 📊 Dashboard Cards

### Core Metrics
- Sales Statistics
- Top Seller by Country
- Top Sales Performance
- Marketing Activities
- Annual Profit

### Property Management
- Predictive Maintenance
- Occupancy Trends
- Maintenance by Category
- Financial Health Snapshot
- Energy Efficiency Insights

### KPI Cards
- Occupancy Rate
- Maintenance Tickets
- Average Rent
- Tenant Satisfaction

## 🚀 Deployment

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Vercel account (for deployment)

### Local Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on push to main branch

### Environment Variables
No environment variables required for basic functionality.

## 🔧 Customization

### Changing the Password
Edit the password in `/src/app/login/page.tsx`:
```typescript
if (password === 'your-new-password') {
  // Authentication logic
}
```

### Adding New Cards
1. Add card data to the `cards` array in `/src/components/Dashboard.tsx`
2. Follow the existing card structure with `id`, `type`, `minWidth`, and `content`

### Modifying Colors
Update CSS variables in `/src/app/globals.css`:
```css
:root {
  --accent-green-1: #your-color;
  --accent-green-2: #your-color;
  /* ... other colors */
}
```

## 📱 Responsive Design

The dashboard is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔒 Security Notes

- This is a demo implementation with client-side authentication
- For production use, implement proper server-side authentication
- Consider adding rate limiting and additional security measures
- The password is visible in the client-side code (for demo purposes)

## 📄 License

This project is for demonstration purposes. Feel free to use as a starting point for your own projects.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**Demo Access**: Use password `bode2024` to access the live dashboard.
