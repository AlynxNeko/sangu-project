# 💰 Expense & Income Tracker

> A comprehensive full-stack expense and income tracking application with AI-powered features, automated workflows, and beautiful analytics.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18+-61DAFB.svg)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E.svg)
![N8N](https://img.shields.io/badge/N8N-Automation-EA4B71.svg)

---

## ✨ Features

### 💳 Transaction Management
- ✅ Add income and expenses manually
- 📸 Photo upload for receipts/invoices
- 🤖 AI-powered OCR for automatic data extraction
- 🏷️ Customizable categories and tags
- 💰 Multiple payment methods support
- 🔄 Recurring transactions (daily, weekly, monthly, etc.)

### 👥 Split Bills
- ✂️ Split expenses with friends/family
- 👤 Manage participants and track payments
- 📊 View who owes you and who you owe
- ✅ Mark splits as paid

### 💵 Income Management
- 📄 Upload salary slips with AI extraction
- 🎯 Automatic income splitting (% based rules)
- 📈 Track multiple income sources
- 💼 Allocate income to different categories

### 📊 Budgets & Goals
- 🎯 Set monthly budgets per category
- 🔔 Automatic alerts at 80% budget usage
- 📉 Budget rollover options
- 🏆 Financial goals with progress tracking
- 💎 Emergency fund, vacation fund, etc.

### 📈 Analytics & Reports
- 📊 Beautiful dashboard with key metrics
- 📉 Income vs Expenses charts
- 🥧 Spending by category breakdown
- 📅 Monthly, weekly, and 6-month views
- 💡 Savings rate calculation
- 🔍 Unusual spending detection

### 🔔 Notifications & Alerts
- ⚠️ Budget threshold alerts
- 💰 Split payment reminders
- 🎯 Goal milestone notifications
- 📅 Recurring transaction reminders
- 📊 Monthly report summaries

### 🔐 Security
- 🔒 Multi-user authentication
- 🛡️ Row Level Security (RLS)
- 🔑 Secure file storage
- 🚫 XSS protection
- ✅ Input validation

---

## 🛠 Technology Stack

### Frontend
```
React 18+
Tailwind CSS
Recharts (Charts & Graphs)
Lucide React (Icons)
Supabase Client
```

### Backend & Database
```
Supabase (PostgreSQL)
Supabase Auth (Authentication)
Supabase Storage (File Storage)
Row Level Security (RLS)
```

### Automation & AI
```
N8N (Workflow Automation)
Claude API (OCR & AI Processing)
OpenAI Vision API (Alternative OCR)
Email/SMS Services (Notifications)
```

### Deployment
```
Vercel (Recommended)
Replit (Alternative)
Netlify (Alternative)
```

---

## 📁 Project Structure

```
expense-tracker/
├── supabase-schema.sql              # Database schema
├── database-schema-diagram.mermaid  # Visual schema diagram
├── n8n-workflows-guide.md           # N8N setup guide
├── n8n-invoice-ocr-workflow.json    # Invoice OCR workflow
├── n8n-recurring-workflow.json      # Recurring transactions workflow
├── expense-tracker-prototype.jsx    # React application
├── SETUP-GUIDE.md                   # Complete setup guide
└── README.md                        # This file
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Supabase account (free tier works)
- N8N instance (cloud or self-hosted)
- Anthropic Claude API key or OpenAI API key

### 1. Database Setup

1. Create a new Supabase project
2. Go to SQL Editor
3. Copy and paste the contents of `supabase-schema.sql`
4. Execute the SQL
5. Create storage bucket: `transaction-attachments`

### 2. N8N Setup

1. Install N8N or use N8N Cloud
2. Import workflow files:
   - `n8n-invoice-ocr-workflow.json`
   - `n8n-recurring-workflow.json`
3. Add credentials (Supabase, Claude API, etc.)
4. Activate workflows
5. Copy webhook URLs

### 3. Frontend Setup

**Option A: Deploy to Vercel**

```bash
# Create new React app
npm create vite@latest expense-tracker -- --template react
cd expense-tracker

# Install dependencies
npm install @supabase/supabase-js recharts lucide-react react-router-dom

# Copy prototype code to src/App.jsx

# Create .env file
echo "VITE_SUPABASE_URL=your-url" > .env
echo "VITE_SUPABASE_ANON_KEY=your-key" >> .env

# Deploy
git init && git add . && git commit -m "Initial commit"
vercel
```

**Option B: Use Replit**

1. Create new Repl (React)
2. Copy prototype code
3. Add environment variables
4. Run

### 4. Environment Variables

Create `.env` file:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_N8N_OCR_WEBHOOK=https://your-n8n.com/webhook/process-invoice
VITE_N8N_SALARY_WEBHOOK=https://your-n8n.com/webhook/process-salary
```

---

## 📊 Database Schema

The application uses the following main tables:

- **user_profiles** - User information and settings
- **transactions** - All income and expense transactions
- **categories** - Custom categories for transactions
- **budgets** - Budget limits per category
- **financial_goals** - Savings and financial goals
- **transaction_splits** - Split bill tracking
- **recurring_transactions** - Automated recurring entries
- **income_split_rules** - Automatic income allocation rules
- **notifications** - User notifications and alerts

For complete schema, see `supabase-schema.sql` or `database-schema-diagram.mermaid`

---

## 🤖 N8N Workflows

### 1. Invoice/Receipt OCR Processing
Automatically extracts data from uploaded receipts:
- Amount, date, vendor
- Line items
- Tax and totals
- Category suggestions

### 2. Salary Slip Processing
Processes salary documents:
- Extracts gross and net salary
- Identifies deductions
- Applies income split rules automatically
- Allocates to categories

### 3. Recurring Transaction Creator
Runs daily to create scheduled transactions:
- Rent, subscriptions, bills
- Automatic transaction creation
- Updates next occurrence date
- Sends notifications

### 4. Budget Alert System
Monitors spending vs budgets:
- Hourly checks
- Alerts at 80% threshold
- Email/push notifications
- Unusual spending detection

### 5. Split Payment Reminders
Weekly reminders for unpaid splits:
- Identifies overdue payments
- Sends reminders via email/SMS
- Tracks payment status

For complete workflow documentation, see `n8n-workflows-guide.md`

---

## 📸 Screenshots

### Dashboard
![Dashboard](https://via.placeholder.com/800x450/0a0a0a/4ECDC4?text=Beautiful+Dashboard+with+Charts+%26+Analytics)

### Transactions
![Transactions](https://via.placeholder.com/800x450/0a0a0a/FF6B9D?text=Transaction+Management+%26+Search)

### Add Transaction Modal
![Add Transaction](https://via.placeholder.com/800x450/0a0a0a/FFD93D?text=Easy+Transaction+Entry+with+OCR)

---

## 🎨 Design Features

- **Modern Dark Theme** - Easy on the eyes
- **Smooth Animations** - Delightful micro-interactions
- **Responsive Design** - Works on all devices
- **Gradient Accents** - Beautiful color scheme
- **Typography** - Custom fonts (Sora + Space Mono)
- **Glassmorphism** - Modern UI effects

---

## 🔧 Configuration

### Default Categories
The system comes with default categories:
- Income: Salary, Freelance, Investments
- Expenses: Food & Dining, Transportation, Shopping, Bills, Entertainment

Users can add custom categories.

### Budget Periods
Supported periods:
- Daily
- Weekly
- Monthly
- Yearly

### Recurring Frequencies
- Daily
- Weekly
- Bi-weekly
- Monthly
- Quarterly
- Yearly

---

## 📝 API Endpoints (Supabase)

All data access is through Supabase client with Row Level Security:

```javascript
import { supabase } from './lib/supabase'

// Get transactions
const { data, error } = await supabase
  .from('transactions')
  .select('*')
  .order('transaction_date', { ascending: false })

// Add transaction
const { data, error } = await supabase
  .from('transactions')
  .insert({
    type: 'expense',
    amount: 50,
    category_id: 'xxx',
    description: 'Lunch'
  })

// Upload receipt
const { data, error } = await supabase.storage
  .from('transaction-attachments')
  .upload(`${userId}/${fileName}`, file)
```

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Add income transaction
- [ ] Add expense transaction
- [ ] Upload receipt (test OCR)
- [ ] Create split expense
- [ ] Set budget
- [ ] Create financial goal
- [ ] Test recurring transaction
- [ ] Verify notifications
- [ ] Test on mobile

### N8N Workflow Testing
- [ ] Invoice OCR extracts data correctly
- [ ] Salary processing applies split rules
- [ ] Recurring transactions created on schedule
- [ ] Budget alerts trigger at threshold
- [ ] Monthly reports generated

---

## 🐛 Troubleshooting

### Common Issues

**Database Connection Failed**
```
Solution: Check Supabase URL and API key in .env file
```

**OCR Not Working**
```
Solution: Verify N8N webhook URL and Claude API key
```

**Transactions Not Showing**
```
Solution: Check RLS policies and user authentication
```

**Charts Not Rendering**
```
Solution: Ensure Recharts is installed: npm install recharts
```

For more troubleshooting, see `SETUP-GUIDE.md`

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel --prod
```

### Netlify
```bash
netlify deploy --prod
```

### Docker
```bash
docker build -t expense-tracker .
docker run -p 3000:3000 expense-tracker
```

---

## 🔮 Future Enhancements

- [ ] Bank account integration
- [ ] Credit card sync
- [ ] Multi-currency support
- [ ] Export to PDF/CSV
- [ ] Mobile app (React Native)
- [ ] Predictive analytics with ML
- [ ] Collaborative budgets
- [ ] Tax report generation
- [ ] Investment tracking
- [ ] Bill payment integration

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Built with ❤️ by [Your Name]

---

## 🙏 Acknowledgments

- Supabase for amazing backend infrastructure
- N8N for powerful automation
- Anthropic Claude for AI capabilities
- Recharts for beautiful charts
- Lucide React for icons

---

## 📞 Support

For support, email your@email.com or create an issue in the repository.

---

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

**Happy Tracking! 💰📊**
