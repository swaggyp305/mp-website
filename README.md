# Retro Portfolio Website

A unique personal portfolio website featuring a toggleable 3D workspace environment and an integrated typing race game with global leaderboard. Built with Next.js, Three.js, and deployed on Vercel.

## 🎯 Project Overview

This portfolio stands out with:
- **Dual viewing modes**: Toggle between immersive 3D workspace and traditional 2D layout
- **Interactive typing test**: MonkeyType-inspired game with persistent leaderboard
- **Retro-nostalgic design**: 1980s-90s computing aesthetic with CRT effects
- **Full-stack functionality**: User authentication, database persistence, real-time stats

📄 **Full PRD**: See `Portfolio_PRD_Enhanced.docx` for complete specifications

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm
- PostgreSQL database (Vercel Postgres recommended)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Initialize database
npx prisma db push

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Home/landing page
│   ├── about/page.tsx          # About section
│   ├── projects/
│   │   ├── page.tsx            # Projects listing
│   │   └── [slug]/page.tsx     # Individual project
│   ├── resume/page.tsx         # Resume/CV
│   ├── contact/page.tsx        # Contact form
│   ├── typing/page.tsx         # Typing race feature
│   └── api/
│       ├── auth/               # Authentication endpoints
│       ├── scores/             # Score submission
│       ├── leaderboard/        # Leaderboard data
│       └── contact/            # Contact form handler
├── components/
│   ├── layout/                 # Navigation, Footer, ViewModeToggle
│   ├── 3d/                     # Three.js scene components
│   ├── typing/                 # Typing test components
│   └── ui/                     # Reusable UI components
├── lib/
│   ├── db.ts                   # Prisma client
│   ├── auth.ts                 # Authentication utilities
│   └── stores/                 # Zustand state stores
├── prisma/
│   └── schema.prisma           # Database schema
└── public/
    └── models/                 # 3D assets (.glb files)
```

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE,
  display_name VARCHAR(100),
  avatar_url TEXT,
  oauth_provider VARCHAR(50),
  oauth_id VARCHAR(255),
  is_guest BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP WITH TIME ZONE
);
```

### Scores Table
```sql
CREATE TABLE scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  wpm DECIMAL(5,2) NOT NULL,
  accuracy DECIMAL(5,2) NOT NULL,
  raw_wpm DECIMAL(5,2),
  time_seconds INTEGER NOT NULL,
  total_characters INTEGER NOT NULL,
  correct_characters INTEGER NOT NULL,
  incorrect_characters INTEGER NOT NULL,
  test_mode VARCHAR(20) DEFAULT 'words',
  word_count INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  ip_address INET,
  user_agent TEXT
);
```

See `prisma/schema.prisma` for complete Prisma schema.

## 🔧 Environment Variables

Create a `.env.local` file with:

```bash
# Database
DATABASE_URL="postgresql://..."

# Authentication (if using NextAuth)
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers (optional)
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Email Service (for contact form)
RESEND_API_KEY="..."
CONTACT_EMAIL="your-email@example.com"

# Analytics (optional)
NEXT_PUBLIC_GA_ID="..."
```

## 🛠️ Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Type checking
npm run type-check

# Database commands
npx prisma studio          # Open Prisma Studio
npx prisma db push         # Push schema changes
npx prisma generate        # Generate Prisma Client
npx prisma migrate dev     # Create and apply migration
```

## 📦 Tech Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js + React Three Fiber + Drei
- **Animation**: Framer Motion
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)

### Backend
- **Runtime**: Vercel Serverless Functions
- **Database**: PostgreSQL (Vercel Postgres)
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Email**: Resend

### Deployment
- **Platform**: Vercel
- **CI/CD**: Automatic from GitHub

## 🎨 Design System

### Color Palette (Retro Theme)
```css
--cream: #F5F5DC
--amber: #FFBF00
--green-crt: #00FF00
--beige: #E8D5C4
--dark-brown: #3E2723
--pastel-blue: #B0C4DE
--pastel-pink: #FFB6C1
```

### Typography
- **Headings**: Press Start 2P, VT323
- **Body**: IBM Plex Mono
- **Code**: Courier New

### Key Components
- CRT scanline effect overlay
- Pixel art icons
- Terminal-style inputs
- Retro button styles with shadow effects

## 🎮 Features

### 1. Typing Race
- Random word generation
- Real-time WPM and accuracy tracking
- Character-by-character validation
- Color-coded feedback (green/red)
- Post-test results modal
- Leaderboard submission

### 2. 3D Mode
- Interactive desk scene with retro computer
- Clickable objects for navigation
- Orbital camera controls
- Virtual monitor displaying portfolio content
- CRT shader effects

### 3. 2D Mode
- Traditional scrollable layout
- Mobile-responsive design
- Fast navigation
- Accessibility-first

### 4. Content Sections
- About/Bio with social links
- Projects portfolio with filtering
- Downloadable resume
- Contact form with spam protection

## 📊 API Endpoints

### Authentication
```
POST /api/auth/login
POST /api/auth/guest
POST /api/auth/logout
GET  /api/auth/session
```

### Typing Test
```
GET  /api/leaderboard?limit=50&offset=0
POST /api/scores
```

### Contact
```
POST /api/contact
```

See PRD Section 7.3.2 for detailed specifications.

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
```

### Testing Strategy
- Unit tests for typing logic (WPM calculation, accuracy)
- Integration tests for API endpoints
- E2E tests for critical user flows
- Visual regression tests for 3D scene

## 🚢 Deployment

### Vercel Deployment

1. Push code to GitHub
2. Import project in Vercel dashboard
3. Configure environment variables
4. Deploy automatically on push to main

### Custom Domain
1. Add domain in Vercel dashboard
2. Update DNS records
3. SSL certificate auto-provisioned

### Database Setup
1. Create Vercel Postgres database
2. Copy connection string to `DATABASE_URL`
3. Run `npx prisma db push` in Vercel deployment

## 📈 Performance Targets

- **Lighthouse Performance**: >90
- **First Contentful Paint**: <1.5s
- **Time to Interactive**: <3s
- **Accessibility**: >95
- **SEO**: >90

## 🔒 Security

- HTTPS enforced
- Input sanitization on all forms
- Rate limiting on API endpoints
- CORS configured
- CSP headers
- Environment variables protected

## 📝 Content Management

Project data stored in:
```
data/
├── projects.json           # Project metadata
└── resume.json             # Resume data
```

Or integrate a headless CMS (Sanity/Contentful) for easier updates.

## 🤝 Contributing

This is a personal portfolio project, but feel free to:
- Report bugs via Issues
- Suggest features
- Fork for your own use

## 📄 License

MIT License - feel free to use this code for your own portfolio!

## 🎯 Roadmap

### Phase 1 (MVP) ✅
- [x] 2D layout and navigation
- [x] Typing test functionality
- [x] Database integration
- [x] Leaderboard

### Phase 2 (Enhanced)
- [ ] 3D scene implementation
- [ ] OAuth authentication
- [ ] User profiles
- [ ] Multiple typing modes

### Phase 3 (Polish)
- [ ] Dark mode toggle
- [ ] Blog section
- [ ] Achievement badges
- [ ] Social sharing

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Verify connection string
npx prisma studio

# Reset database
npx prisma migrate reset
```

### 3D Scene Not Rendering
- Check WebGL support in browser
- Verify Three.js version compatibility
- Check browser console for errors

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📞 Contact

- **Email**: your-email@example.com
- **GitHub**: @yourusername
- **LinkedIn**: linkedin.com/in/yourprofile

## 🙏 Acknowledgments

- Design inspiration: MonkeyType, Cool Retro Term
- 3D assets: [Source if applicable]
- Retro fonts: Press Start 2P, VT323, IBM Plex Mono

---

Built with ❤️ and a lot of nostalgia for the golden age of computing.
