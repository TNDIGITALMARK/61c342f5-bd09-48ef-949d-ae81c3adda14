# 🔥 Fire Calls Tracker - Emergency Response System

A real-time emergency response management system built for fire departments with modern web technologies.

## ✨ Features

### 🏠 Dashboard (Command Center)
- **Real-time active calls display** with priority indicators
- **Unit status overview** showing available, deployed, and out-of-service units
- **Department metrics** including 24-hour call volume, average response time
- **Call volume trends** with interactive charts
- **Critical alert notifications** with visual and audible warnings
- **Quick search and filtering** for calls and units

### 📋 Call Detail Pages
- **Comprehensive call information** with editable fields
- **Timeline tracking** showing dispatch, response, arrival, and clearance times
- **Real-time elapsed time counters** with critical call highlighting
- **Unit assignment management** with drag-and-drop interface
- **Notes and updates** with rich text editing
- **Priority and status management** with visual indicators

### 🗺️ Interactive Map View
- **Geographic visualization** of all active calls and unit locations
- **Priority-based markers** with different colors and animations
- **Unit tracking** showing real-time positions and status
- **Filtering controls** for call types, priorities, and unit status
- **Click-to-view details** for calls and units
- **Zoom and pan controls** with responsive design

## 🎨 Design System

### Color Scheme (Fire Department Theme)
- **Dark Navy Background**: `hsl(215, 39%, 8%)` - Primary background
- **Fire Red**: `hsl(4, 84%, 58%)` - Critical alerts, primary actions
- **Emergency Red**: `hsl(0, 91%, 71%)` - Critical priority calls
- **Warning Orange**: `hsl(24, 95%, 53%)` - High priority, warnings
- **Alert Yellow**: `hsl(48, 96%, 53%)` - Medium priority, cautions
- **Status Green**: `hsl(122, 39%, 49%)` - Available units, success states

### Typography
- **Primary Font**: Geist Sans - Clean, readable sans-serif
- **Monospace Font**: Geist Mono - For times, IDs, coordinates
- **Font Sizes**: Responsive scale from 12px (labels) to 32px (headers)

### Components
- **Card-based UI** with consistent spacing and shadows
- **High contrast elements** for emergency visibility
- **Touch-optimized controls** for mobile devices
- **Responsive grid layouts** adapting to all screen sizes

## 🏗️ Technical Architecture

### Frontend Stack
- **Next.js 15.5.2** - React framework with App Router
- **React 19.1.0** - Modern React with concurrent features
- **TypeScript 5** - Type safety throughout the application
- **Tailwind CSS 4** - Utility-first styling with custom theme
- **Radix UI** - Accessible component primitives
- **Recharts** - Data visualization for charts and graphs
- **Lucide React** - Consistent icon library

### Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Dashboard (home page)
│   ├── call/[id]/         # Dynamic call detail pages
│   ├── map/               # Interactive map view
│   └── layout.tsx         # Root layout with theme
├── components/
│   ├── fire-calls/        # Domain-specific components
│   │   ├── call-card.tsx          # Call information cards
│   │   ├── unit-badge.tsx         # Unit status badges
│   │   ├── priority-indicator.tsx # Priority visual indicators
│   │   ├── time-counter.tsx       # Real-time counters
│   │   ├── stats-panel.tsx        # Department statistics
│   │   ├── call-volume-chart.tsx  # Chart components
│   │   └── navigation.tsx         # Main navigation
│   └── ui/                # Reusable UI components (Radix-based)
├── data/
│   └── mock-data.ts       # Comprehensive mock data
├── types/
│   └── fire-calls.ts      # TypeScript type definitions
├── hooks/
│   └── use-real-time-updates.ts # Real-time simulation
└── lib/
    └── utils.ts           # Utility functions and helpers
```

### Data Models

#### Fire Call
```typescript
interface FireCall {
  id: string;
  callNumber: string;        // FC24-0234
  type: CallType;           // structure-fire, medical-emergency, etc.
  priority: Priority;       // critical, high, medium, low
  status: CallStatus;       // dispatched, enroute, on-scene, etc.
  address: string;
  coordinates: { lat: number; lng: number };
  dispatchTime: Date;
  responseTime?: Date;
  arrivalTime?: Date;
  clearedTime?: Date;
  description: string;
  assignedUnits: string[];
  reportingParty?: string;
  notes?: string;
}
```

#### Response Unit
```typescript
interface ResponseUnit {
  id: string;
  callSign: string;         // Engine 1, Ladder 2, etc.
  type: UnitType;          // engine, ladder, rescue, ambulance, etc.
  status: UnitStatus;      // available, dispatched, on-scene, etc.
  location?: { lat: number; lng: number };
  currentCallId?: string;
  crew: CrewMember[];
  vehicleInfo: {
    make: string;
    model: string;
    year: number;
    equipmentLevel: string;
  };
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn package manager

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open browser to `http://localhost:3000`

### Mock Data
The application includes comprehensive mock data:
- **8 Active emergency calls** with various priorities and types
- **12 Response units** with different statuses and equipment
- **Historical data** showing 27 calls in last 24 hours
- **Real-time simulation** that updates call and unit status every 30 seconds

## 📱 Mobile Responsiveness

### Responsive Design Features
- **Collapsible navigation** for mobile screens
- **Touch-optimized controls** with larger tap targets
- **Responsive grid layouts** that adapt to screen size
- **Mobile-first approach** with progressive enhancement
- **Swipe gestures** for navigation between views
- **Optimized loading** for slower mobile connections

### Breakpoints
- **Mobile**: < 768px - Single column layout
- **Tablet**: 768px - 1024px - Two column layout
- **Desktop**: > 1024px - Full three column layout with sidebar

## 🎯 User Personas

### Fire Chief / Incident Commander
- **Needs**: Overall situational awareness, resource allocation decisions
- **Uses**: Dashboard for metrics, Map view for geographic overview
- **Features**: Critical alerts, department statistics, unit deployment status

### Dispatcher
- **Needs**: Call intake, unit assignment, status tracking
- **Uses**: Dashboard for active calls, Call detail pages for management
- **Features**: Real-time updates, search/filter, status management

### Field Personnel
- **Needs**: Current assignment status, location information
- **Uses**: Mobile-optimized views, unit status updates
- **Features**: Touch controls, simplified interface, key information

## 🔧 Customization

### Theme Customization
Colors can be customized in `src/app/globals.css`:
```css
:root {
  --fire-red: 4 84% 58%;
  --emergency-red: 0 91% 71%;
  --warning-orange: 24 95% 53%;
  /* Add custom colors */
}
```

### Adding New Call Types
Update the `CallType` union in `src/types/fire-calls.ts`:
```typescript
export type CallType =
  | 'structure-fire'
  | 'vehicle-fire'
  | 'custom-type'; // Add new types
```

### Mock Data Modification
Customize mock data in `src/data/mock-data.ts` to match your department's:
- Unit callsigns and equipment
- Geographic coordinates for your area
- Typical call types and frequencies

## 📊 Performance

### Optimization Features
- **Server-side rendering** for fast initial loads
- **Component code splitting** for smaller bundles
- **Image optimization** with Next.js Image component
- **Lazy loading** for non-critical components
- **Efficient re-rendering** with React optimizations

### Real-time Updates
- **Simulated real-time** updates every 30 seconds
- **Optimistic UI updates** for responsive interactions
- **Background sync** to maintain data consistency
- **WebSocket ready** architecture for true real-time

## 🔒 Security Considerations

### Data Protection
- **No sensitive data** stored in client-side code
- **Environment variable** support for API keys
- **Input validation** on all form fields
- **XSS protection** through React's built-in safeguards

### Access Control (Future Enhancement)
- Authentication system integration ready
- Role-based access control architecture
- Audit logging capability built-in
- Secure API endpoint structure

## 📈 Future Enhancements

### Phase 1 (Immediate)
- [ ] WebSocket integration for true real-time updates
- [ ] GPS integration for accurate unit positioning
- [ ] Voice alerts and notifications
- [ ] Offline capability with service workers

### Phase 2 (Medium Term)
- [ ] Integration with CAD (Computer-Aided Dispatch) systems
- [ ] Automated unit recommendation system
- [ ] Historical reporting and analytics
- [ ] Multi-department coordination features

### Phase 3 (Long Term)
- [ ] AI-powered incident prediction
- [ ] Resource optimization algorithms
- [ ] Mobile native applications
- [ ] Integration with IoT devices and sensors

## 🤝 Contributing

This is a demonstration application built for showcasing modern web development capabilities in emergency response systems.

### Development Guidelines
- Follow TypeScript strict mode
- Use semantic commit messages
- Maintain responsive design principles
- Ensure accessibility compliance
- Test on multiple device types

---

**Built with ❤️ for emergency responders who keep our communities safe**

*This application demonstrates modern web technologies applied to mission-critical emergency response systems, emphasizing usability, reliability, and real-time information management.*