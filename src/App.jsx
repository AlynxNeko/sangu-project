import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Camera, Plus, TrendingUp, TrendingDown, DollarSign, Calendar, PieChart as PieIcon, Target, Users, Bell, Settings, LogOut, Upload, X, Check, AlertTriangle, ChevronDown, Filter, Search, Edit2, Trash2 } from 'lucide-react';

export default function ExpenseTrackerApp() {
  const [activeView, setActiveView] = useState('dashboard');
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [showSplitModal, setShowSplitModal] = useState(false);
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'expense', amount: 125.50, category: 'Food & Dining', description: 'Grocery Shopping', date: '2026-02-01', payment: 'Credit Card' },
    { id: 2, type: 'income', amount: 5000, category: 'Salary', description: 'Monthly Salary', date: '2026-02-01', payment: 'Bank Transfer' },
    { id: 3, type: 'expense', amount: 45, category: 'Transportation', description: 'Uber', date: '2026-01-31', payment: 'E-Wallet', isSplit: true },
    { id: 4, type: 'expense', amount: 89.99, category: 'Shopping', description: 'Clothes', date: '2026-01-30', payment: 'Credit Card' },
  ]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data
  const monthlyData = [
    { month: 'Aug', income: 5000, expenses: 3200 },
    { month: 'Sep', income: 5200, expenses: 3500 },
    { month: 'Oct', income: 5000, expenses: 2800 },
    { month: 'Nov', income: 5400, expenses: 3900 },
    { month: 'Dec', income: 5000, expenses: 4200 },
    { month: 'Jan', income: 5300, expenses: 3600 },
  ];

  const categoryData = [
    { name: 'Food & Dining', value: 850, color: '#FF6B9D' },
    { name: 'Transportation', value: 450, color: '#4ECDC4' },
    { name: 'Shopping', value: 620, color: '#FFD93D' },
    { name: 'Bills', value: 980, color: '#A78BFA' },
    { name: 'Entertainment', value: 340, color: '#60A5FA' },
  ];

  const budgets = [
    { category: 'Food & Dining', spent: 850, limit: 1000, percentage: 85 },
    { category: 'Transportation', spent: 450, limit: 600, percentage: 75 },
    { category: 'Shopping', spent: 620, limit: 500, percentage: 124 },
  ];

  const goals = [
    { name: 'Emergency Fund', current: 4200, target: 10000, percentage: 42 },
    { name: 'Vacation Fund', current: 1500, target: 3000, percentage: 50 },
    { name: 'New Laptop', current: 800, target: 2000, percentage: 40 },
  ];

  const totalIncome = 5300;
  const totalExpenses = 3240;
  const balance = totalIncome - totalExpenses;
  const savingsRate = ((balance / totalIncome) * 100).toFixed(1);

  const DashboardView = () => (
    <div className="dashboard-grid">
      {/* Stats Cards */}
      <div className="stats-row">
        <div className="stat-card balance-card">
          <div className="stat-icon">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Available Balance</div>
            <div className="stat-value">${balance.toLocaleString()}</div>
            <div className="stat-change positive">+{savingsRate}% savings rate</div>
          </div>
        </div>
        
        <div className="stat-card income-card">
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Monthly Income</div>
            <div className="stat-value">${totalIncome.toLocaleString()}</div>
            <div className="stat-change positive">+4.2% from last month</div>
          </div>
        </div>
        
        <div className="stat-card expense-card">
          <div className="stat-icon">
            <TrendingDown size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Monthly Expenses</div>
            <div className="stat-value">${totalExpenses.toLocaleString()}</div>
            <div className="stat-change negative">-8.3% from last month</div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-row">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Income vs Expenses</h3>
            <select value={selectedTimeframe} onChange={(e) => setSelectedTimeframe(e.target.value)} className="timeframe-select">
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="6months">Last 6 Months</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid #333' }} />
              <Legend />
              <Bar dataKey="income" fill="#4ECDC4" radius={[8, 8, 0, 0]} />
              <Bar dataKey="expenses" fill="#FF6B9D" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Spending by Category</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid #333' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="category-legend">
            {categoryData.map((cat) => (
              <div key={cat.name} className="legend-item">
                <div className="legend-color" style={{ background: cat.color }}></div>
                <span>{cat.name}</span>
                <span className="legend-value">${cat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Budgets */}
      <div className="budgets-section">
        <h3>Budget Overview</h3>
        <div className="budgets-grid">
          {budgets.map((budget) => (
            <div key={budget.category} className={`budget-item ${budget.percentage > 100 ? 'over-budget' : ''}`}>
              <div className="budget-header">
                <span className="budget-category">{budget.category}</span>
                <span className="budget-amount">${budget.spent} / ${budget.limit}</span>
              </div>
              <div className="budget-bar">
                <div 
                  className="budget-progress" 
                  style={{ 
                    width: `${Math.min(budget.percentage, 100)}%`,
                    background: budget.percentage > 100 ? '#FF4757' : budget.percentage > 80 ? '#FFD93D' : '#4ECDC4'
                  }}
                ></div>
              </div>
              <div className="budget-footer">
                <span>{budget.percentage}% used</span>
                {budget.percentage > 100 && (
                  <span className="over-budget-label">Over budget!</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Goals */}
      <div className="goals-section">
        <h3>Financial Goals</h3>
        <div className="goals-grid">
          {goals.map((goal) => (
            <div key={goal.name} className="goal-item">
              <div className="goal-icon">
                <Target size={24} />
              </div>
              <div className="goal-content">
                <div className="goal-name">{goal.name}</div>
                <div className="goal-progress-text">
                  ${goal.current.toLocaleString()} of ${goal.target.toLocaleString()}
                </div>
                <div className="goal-bar">
                  <div className="goal-progress" style={{ width: `${goal.percentage}%` }}></div>
                </div>
                <div className="goal-percentage">{goal.percentage}% complete</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const TransactionsView = () => (
    <div className="transactions-view">
      <div className="transactions-header">
        <h2>Transactions</h2>
        <div className="transactions-actions">
          <div className="search-box">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search transactions..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn-filter">
            <Filter size={18} />
            Filter
          </button>
        </div>
      </div>

      <div className="transactions-list">
        {transactions.map((txn) => (
          <div key={txn.id} className={`transaction-item ${txn.type}`}>
            <div className="txn-icon">
              {txn.type === 'income' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
            </div>
            <div className="txn-details">
              <div className="txn-description">{txn.description}</div>
              <div className="txn-meta">
                <span>{txn.category}</span>
                <span>•</span>
                <span>{txn.payment}</span>
                {txn.isSplit && (
                  <>
                    <span>•</span>
                    <span className="split-badge"><Users size={12} /> Split</span>
                  </>
                )}
              </div>
            </div>
            <div className="txn-amount">
              <div className={`amount ${txn.type}`}>
                {txn.type === 'income' ? '+' : '-'}${txn.amount.toLocaleString()}
              </div>
              <div className="txn-date">{txn.date}</div>
            </div>
            <div className="txn-actions">
              <button className="btn-icon"><Edit2 size={16} /></button>
              <button className="btn-icon"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const AddTransactionModal = () => (
    <div className="modal-overlay" onClick={() => setShowAddTransaction(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add Transaction</h3>
          <button onClick={() => setShowAddTransaction(false)} className="btn-close">
            <X size={20} />
          </button>
        </div>
        
        <div className="modal-body">
          <div className="transaction-type-tabs">
            <button className="tab-btn active">Expense</button>
            <button className="tab-btn">Income</button>
          </div>

          <div className="form-group">
            <label>Amount</label>
            <div className="amount-input">
              <span className="currency">$</span>
              <input type="number" placeholder="0.00" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select>
                <option>Food & Dining</option>
                <option>Transportation</option>
                <option>Shopping</option>
                <option>Bills</option>
                <option>Entertainment</option>
              </select>
            </div>

            <div className="form-group">
              <label>Payment Method</label>
              <select>
                <option>Credit Card</option>
                <option>Cash</option>
                <option>E-Wallet</option>
                <option>Bank Transfer</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <input type="text" placeholder="What did you buy?" />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input type="date" defaultValue="2026-02-02" />
          </div>

          <div className="form-group">
            <label>Receipt / Invoice (Optional)</label>
            <div className="upload-area">
              <Camera size={32} />
              <p>Click to upload or drag and drop</p>
              <span>AI will extract details automatically</span>
            </div>
          </div>

          <div className="form-check">
            <input type="checkbox" id="split-check" />
            <label htmlFor="split-check">Split this expense with others</label>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={() => setShowAddTransaction(false)}>Cancel</button>
          <button className="btn-primary">Add Transaction</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <DollarSign size={32} />
          <span>FinTrack</span>
        </div>

        <nav className="nav-menu">
          <button 
            className={`nav-item ${activeView === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveView('dashboard')}
          >
            <PieIcon size={20} />
            <span>Dashboard</span>
          </button>
          <button 
            className={`nav-item ${activeView === 'transactions' ? 'active' : ''}`}
            onClick={() => setActiveView('transactions')}
          >
            <Calendar size={20} />
            <span>Transactions</span>
          </button>
          <button className="nav-item">
            <Target size={20} />
            <span>Goals</span>
          </button>
          <button className="nav-item">
            <Users size={20} />
            <span>Split Bills</span>
          </button>
          <button className="nav-item">
            <Bell size={20} />
            <span>Notifications</span>
            <span className="notification-badge">3</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item">
            <Settings size={20} />
            <span>Settings</span>
          </button>
          <button className="nav-item">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="top-bar">
          <div className="greeting">
            <h1>Welcome back! 👋</h1>
            <p>Here's your financial overview for February 2026</p>
          </div>
          <button className="btn-add" onClick={() => setShowAddTransaction(true)}>
            <Plus size={20} />
            Add Transaction
          </button>
        </header>

        {activeView === 'dashboard' && <DashboardView />}
        {activeView === 'transactions' && <TransactionsView />}
      </main>

      {showAddTransaction && <AddTransactionModal />}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Sora:wght@300;400;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Sora', sans-serif;
          background: #0a0a0a;
          color: #fff;
          overflow-x: hidden;
        }

        .app-container {
          display: flex;
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
        }

        /* Sidebar */
        .sidebar {
          width: 280px;
          background: rgba(20, 20, 30, 0.95);
          backdrop-filter: blur(20px);
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          padding: 2rem 1.5rem;
          position: sticky;
          top: 0;
          height: 100vh;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 3rem;
          padding: 0.5rem;
        }

        .logo svg {
          color: #4ECDC4;
        }

        .logo span {
          font-size: 1.5rem;
          font-weight: 700;
          font-family: 'Space Mono', monospace;
          background: linear-gradient(135deg, #4ECDC4 0%, #FFD93D 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .nav-menu {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .nav-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(135deg, #4ECDC4, #FFD93D);
          transform: translateX(-4px);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
          transform: translateX(4px);
        }

        .nav-item.active {
          background: linear-gradient(135deg, rgba(78, 205, 196, 0.15), rgba(255, 217, 61, 0.15));
          color: #fff;
        }

        .nav-item.active::before {
          transform: translateX(0);
        }

        .notification-badge {
          margin-left: auto;
          background: #FF4757;
          color: #fff;
          font-size: 0.75rem;
          padding: 0.25rem 0.5rem;
          border-radius: 10px;
          font-weight: 700;
        }

        .sidebar-footer {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 1rem;
          margin-top: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        /* Main Content */
        .main-content {
          flex: 1;
          padding: 2rem 3rem;
          overflow-y: auto;
        }

        .top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2.5rem;
          animation: slideDown 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .greeting h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #fff 0%, #4ECDC4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .greeting p {
          color: rgba(255, 255, 255, 0.6);
          font-size: 1rem;
        }

        .btn-add {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #4ECDC4 0%, #3FBDB4 100%);
          border: none;
          border-radius: 14px;
          color: #0a0a0a;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 8px 24px rgba(78, 205, 196, 0.3);
        }

        .btn-add:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(78, 205, 196, 0.4);
        }

        .btn-add:active {
          transform: translateY(0);
        }

        /* Dashboard Grid */
        .dashboard-grid {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .stat-card {
          background: rgba(20, 20, 30, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 2rem;
          display: flex;
          gap: 1.5rem;
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          animation-fill-mode: both;
        }

        .stat-card:nth-child(1) { animation-delay: 0.1s; }
        .stat-card:nth-child(2) { animation-delay: 0.2s; }
        .stat-card:nth-child(3) { animation-delay: 0.3s; }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at top right, rgba(78, 205, 196, 0.1), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          border-color: rgba(78, 205, 196, 0.3);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
        }

        .stat-card:hover::before {
          opacity: 1;
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(78, 205, 196, 0.2), rgba(255, 217, 61, 0.2));
        }

        .balance-card .stat-icon {
          background: linear-gradient(135deg, rgba(78, 205, 196, 0.3), rgba(78, 205, 196, 0.1));
          color: #4ECDC4;
        }

        .income-card .stat-icon {
          background: linear-gradient(135deg, rgba(96, 165, 250, 0.3), rgba(96, 165, 250, 0.1));
          color: #60A5FA;
        }

        .expense-card .stat-icon {
          background: linear-gradient(135deg, rgba(255, 107, 157, 0.3), rgba(255, 107, 157, 0.1));
          color: #FF6B9D;
        }

        .stat-content {
          flex: 1;
        }

        .stat-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 700;
          font-family: 'Space Mono', monospace;
          margin-bottom: 0.5rem;
          line-height: 1;
        }

        .stat-change {
          font-size: 0.85rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .stat-change.positive {
          color: #4ECDC4;
        }

        .stat-change.negative {
          color: #FF6B9D;
        }

        /* Charts */
        .charts-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
          gap: 1.5rem;
        }

        .chart-card {
          background: rgba(20, 20, 30, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 2rem;
          animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both;
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .chart-header h3 {
          font-size: 1.25rem;
          font-weight: 600;
        }

        .timeframe-select {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-size: 0.9rem;
          cursor: pointer;
          outline: none;
        }

        .category-legend {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 1.5rem;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9rem;
        }

        .legend-color {
          width: 16px;
          height: 16px;
          border-radius: 4px;
        }

        .legend-value {
          margin-left: auto;
          font-weight: 600;
          font-family: 'Space Mono', monospace;
        }

        /* Budgets */
        .budgets-section,
        .goals-section {
          animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.5s both;
        }

        .budgets-section h3,
        .goals-section h3 {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          font-weight: 600;
        }

        .budgets-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .budget-item {
          background: rgba(20, 20, 30, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 1.5rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .budget-item:hover {
          transform: translateY(-4px);
          border-color: rgba(78, 205, 196, 0.3);
        }

        .budget-item.over-budget {
          border-color: rgba(255, 71, 87, 0.5);
        }

        .budget-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .budget-category {
          font-weight: 600;
          font-size: 1rem;
        }

        .budget-amount {
          font-family: 'Space Mono', monospace;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .budget-bar {
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 0.75rem;
        }

        .budget-progress {
          height: 100%;
          border-radius: 10px;
          transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .budget-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .over-budget-label {
          color: #FF4757;
          font-weight: 600;
        }

        /* Goals */
        .goals-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        .goal-item {
          background: rgba(20, 20, 30, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 1.5rem;
          display: flex;
          gap: 1.25rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .goal-item:hover {
          transform: translateY(-4px);
          border-color: rgba(255, 217, 61, 0.3);
        }

        .goal-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(255, 217, 61, 0.2), rgba(255, 217, 61, 0.05));
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFD93D;
        }

        .goal-content {
          flex: 1;
        }

        .goal-name {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .goal-progress-text {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 0.75rem;
          font-family: 'Space Mono', monospace;
        }

        .goal-bar {
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }

        .goal-progress {
          height: 100%;
          background: linear-gradient(90deg, #FFD93D 0%, #4ECDC4 100%);
          border-radius: 10px;
          transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .goal-percentage {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
        }

        /* Transactions View */
        .transactions-view {
          animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .transactions-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .transactions-header h2 {
          font-size: 2rem;
          font-weight: 700;
        }

        .transactions-actions {
          display: flex;
          gap: 1rem;
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(20, 20, 30, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 0.75rem 1.25rem;
          width: 300px;
        }

        .search-box input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #fff;
          font-size: 0.95rem;
        }

        .search-box input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .btn-filter {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: rgba(20, 20, 30, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          color: #fff;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-filter:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .transactions-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .transaction-item {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          background: rgba(20, 20, 30, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 1.5rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .transaction-item:hover {
          transform: translateY(-2px);
          border-color: rgba(255, 255, 255, 0.15);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .txn-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .transaction-item.income .txn-icon {
          background: rgba(78, 205, 196, 0.2);
          color: #4ECDC4;
        }

        .transaction-item.expense .txn-icon {
          background: rgba(255, 107, 157, 0.2);
          color: #FF6B9D;
        }

        .txn-details {
          flex: 1;
        }

        .txn-description {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .txn-meta {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .split-badge {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background: rgba(255, 217, 61, 0.2);
          color: #FFD93D;
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
          font-weight: 600;
        }

        .txn-amount {
          text-align: right;
        }

        .amount {
          font-size: 1.5rem;
          font-weight: 700;
          font-family: 'Space Mono', monospace;
          margin-bottom: 0.25rem;
        }

        .amount.income {
          color: #4ECDC4;
        }

        .amount.expense {
          color: #FF6B9D;
        }

        .txn-date {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .txn-actions {
          display: flex;
          gap: 0.5rem;
        }

        .btn-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-icon:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background: rgba(20, 20, 30, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          width: 90%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .modal-header h3 {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .btn-close {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.05);
          border: none;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }

        .btn-close:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .modal-body {
          padding: 2rem;
        }

        .transaction-type-tabs {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          background: rgba(255, 255, 255, 0.05);
          padding: 0.5rem;
          border-radius: 12px;
        }

        .tab-btn {
          flex: 1;
          padding: 0.75rem;
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.95rem;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .tab-btn.active {
          background: linear-gradient(135deg, #4ECDC4, #3FBDB4);
          color: #0a0a0a;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.8);
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 0.875rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          color: #fff;
          font-size: 0.95rem;
          outline: none;
          transition: all 0.3s;
        }

        .form-group input:focus,
        .form-group select:focus {
          background: rgba(255, 255, 255, 0.08);
          border-color: #4ECDC4;
        }

        .amount-input {
          position: relative;
        }

        .amount-input .currency {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1.25rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.6);
        }

        .amount-input input {
          padding-left: 2.5rem;
          font-size: 1.25rem;
          font-weight: 700;
          font-family: 'Space Mono', monospace;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .upload-area {
          border: 2px dashed rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          padding: 2rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s;
        }

        .upload-area:hover {
          border-color: #4ECDC4;
          background: rgba(78, 205, 196, 0.05);
        }

        .upload-area svg {
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 1rem;
        }

        .upload-area p {
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .upload-area span {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .form-check {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 1.5rem;
        }

        .form-check input[type="checkbox"] {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }

        .form-check label {
          font-size: 0.95rem;
          cursor: pointer;
        }

        .modal-footer {
          display: flex;
          gap: 1rem;
          padding: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .btn-secondary,
        .btn-primary {
          flex: 1;
          padding: 1rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .btn-primary {
          background: linear-gradient(135deg, #4ECDC4 0%, #3FBDB4 100%);
          border: none;
          color: #0a0a0a;
          box-shadow: 0 8px 24px rgba(78, 205, 196, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(78, 205, 196, 0.4);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .sidebar {
            width: 240px;
          }

          .charts-row {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .sidebar {
            position: fixed;
            left: -280px;
            z-index: 100;
            transition: left 0.3s;
          }

          .main-content {
            padding: 1.5rem;
          }

          .greeting h1 {
            font-size: 1.75rem;
          }

          .stats-row {
            grid-template-columns: 1fr;
          }

          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
