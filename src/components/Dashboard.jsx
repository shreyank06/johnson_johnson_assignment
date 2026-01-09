import { useState } from 'react';
import { Info, Users, Briefcase, Truck, Shield, FileCheck, Settings } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LabelList,
} from 'recharts';
import { dashboardStats, usageTrendData, teamUsageData, departmentUsageData, ruleInsights } from '../data/mockData';

const Dashboard = () => {
  const [dateFilter, setDateFilter] = useState('all');
  const { rules, overallUsage, cost, successRate, totalRules, executionsThisMonth, successfulExecutions, failedExecutions, avgDailyExecutions, newRules } = dashboardStats;

  const pieData = [
    { name: 'Spent', value: cost.spent },
    { name: 'Remaining', value: cost.remaining },
  ];
  const COLORS = ['#0ea5e9', '#06b6d4'];

  // System Health data
  const systemHealth = 85;

  // Department icons mapping
  const deptIcons = {
    HR: <Users size={18} />,
    Finance: <Briefcase size={18} />,
    Logistics: <Truck size={18} />,
    Security: <Shield size={18} />,
    Compliance: <FileCheck size={18} />,
    Operations: <Settings size={18} />,
  };

  const deptColors = {
    HR: '#f59e0b',
    Finance: '#3b82f6',
    Logistics: '#8b5cf6',
    Security: '#10b981',
    Compliance: '#ef4444',
    Operations: '#6366f1',
  };

  return (
    <div>
      <div className="dashboard-header">
        <div className="welcome-section">
          <h2 className="welcome-text">Welcome, David</h2>
          <p className="alert-text">
            Hey Chris. <span>{overallUsage.failed} rules have failed</span> and require your attention
          </p>
        </div>

        {/* Date Filter Tabs */}
        <div className="filter-tabs">
          <button
            className={`filter-tab ${dateFilter === 'all' ? 'active' : ''}`}
            onClick={() => setDateFilter('all')}
          >
            All Time
          </button>
          <button
            className={`filter-tab ${dateFilter === '7days' ? 'active' : ''}`}
            onClick={() => setDateFilter('7days')}
          >
            Last 7 Days
          </button>
          <button
            className={`filter-tab ${dateFilter === '30days' ? 'active' : ''}`}
            onClick={() => setDateFilter('30days')}
          >
            Last 30 Days
          </button>
          <button
            className={`filter-tab ${dateFilter === 'custom' ? 'active' : ''}`}
            onClick={() => setDateFilter('custom')}
          >
            Date Range ▾
          </button>
        </div>
      </div>

      {/* Top Stats Row */}
      <div className="top-stats-row">
        <div className="top-stat-card highlight">
          <div className="top-stat-label">Success Rate</div>
          <div className="top-stat-value success">{successRate}%</div>
        </div>
        <div className="top-stat-card">
          <div className="top-stat-label">Total Rules</div>
          <div className="top-stat-value">{totalRules}</div>
        </div>
        <div className="top-stat-card">
          <div className="top-stat-label">Executions this month</div>
          <div className="top-stat-value">{executionsThisMonth.toLocaleString()}</div>
          <div className="top-stat-breakdown">
            <span className="success-text">Successful: {successfulExecutions.toLocaleString()}</span>
            <span className="failed-text">Failed: {failedExecutions}</span>
          </div>
        </div>
        <div className="top-stat-card">
          <div className="top-stat-label">Average Daily Executions</div>
          <div className="top-stat-value">{avgDailyExecutions}</div>
        </div>
        <div className="top-stat-card">
          <div className="top-stat-label">New Rules</div>
          <div className="top-stat-value">{newRules}</div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="stats-grid">
        {/* Rules Card */}
        <div className="stat-card">
          <div className="stat-label">Rules</div>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <span className="stat-value">{rules.total}</span>
            <span className="stat-change">↑ {rules.change}</span>
          </div>
          <div className="stat-breakdown">
            <div className="stat-item">
              <div className="stat-item-value active">{rules.active}</div>
              <div className="stat-item-label">Active</div>
            </div>
            <div className="stat-item">
              <div className="stat-item-value inactive">{rules.inactive}</div>
              <div className="stat-item-label">Inactive</div>
            </div>
          </div>
        </div>

        {/* System Health Card */}
        <div className="stat-card">
          <div className="stat-label">
            System Health <Info size={14} />
          </div>
          <div className="system-health-container">
            <div className="health-bar">
              <div className="health-segment red" style={{ width: '15%' }}></div>
              <div className="health-segment yellow" style={{ width: '20%' }}></div>
              <div className="health-segment green" style={{ width: '65%' }}>
                <div className="health-indicator" style={{ left: `${systemHealth - 35}%` }}></div>
              </div>
            </div>
            <div className="health-value">{systemHealth}%</div>
          </div>
        </div>

        {/* Cost Card */}
        <div className="stat-card">
          <div className="stat-label">
            Cost <Info size={14} />
          </div>
          <div className="cost-card">
            <div style={{ width: 100, height: 100, position: 'relative' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={45}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="donut-center">
                <div className="donut-label">Budget</div>
                <div className="donut-value">${cost.budget.toLocaleString()}</div>
              </div>
            </div>
            <div style={{ marginLeft: 20 }}>
              <div className="stat-value" style={{ fontSize: 24 }}>{cost.utilization}%</div>
              <div className="stat-item-label">Budget Utilization</div>
            </div>
            <div className="cost-details">
              <div className="cost-item">
                <span className="cost-amount">$ {cost.spent.toLocaleString()}</span>
                <span className="cost-label">Spent</span>
              </div>
              <div className="cost-item">
                <span className="cost-amount remaining">$ {cost.remaining.toLocaleString()}</span>
                <span className="cost-label">Remaining</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rule Insights Section */}
      <div className="insights-section">
        <div className="insights-card">
          <h3 className="insights-title">Rule Insights</h3>
          <div className="insights-grid">
            {Object.entries(ruleInsights).map(([dept, count]) => (
              <div key={dept} className="insight-item">
                <div className="insight-icon" style={{ backgroundColor: `${deptColors[dept]}20`, color: deptColors[dept] }}>
                  {deptIcons[dept]}
                </div>
                <div className="insight-info">
                  <div className="insight-dept">{dept}</div>
                  <div className="insight-count">{count}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        {/* Usage Trend by Month */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Usage Trend</h3>
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-dot success"></span>
                Successful
              </div>
              <div className="legend-item">
                <span className="legend-dot failed"></span>
                Failed
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={usageTrendData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Bar dataKey="successful" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="failed" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Department Usage Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Usage Trend by Department</h3>
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-dot success"></span>
                Successful
              </div>
              <div className="legend-item">
                <span className="legend-dot failed"></span>
                Failed
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={departmentUsageData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Bar dataKey="successful" fill="#10b981" radius={[4, 4, 0, 0]}>
                <LabelList dataKey="successful" position="top" fill="#10b981" fontSize={12} />
              </Bar>
              <Bar dataKey="failed" fill="#ef4444" radius={[4, 4, 0, 0]}>
                <LabelList dataKey="failed" position="top" fill="#ef4444" fontSize={12} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Second Row Charts */}
      <div className="charts-grid">
        {/* Team Usage */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Team Usage</h3>
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-dot success"></span>
                Successful
              </div>
              <div className="legend-item">
                <span className="legend-dot failed"></span>
                Failed
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={teamUsageData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={60} />
              <Bar dataKey="successful" fill="#10b981" radius={[0, 4, 4, 0]} stackId="stack" />
              <Bar dataKey="failed" fill="#ef4444" radius={[0, 4, 4, 0]} stackId="stack" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Rules */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Top Rules</h3>
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-dot success"></span>
                Successful
              </div>
              <div className="legend-item">
                <span className="legend-dot failed"></span>
                Failed
              </div>
            </div>
          </div>
          <div className="top-rules-list">
            {['Rule 1', 'Rule 2', 'Rule 3', 'Rule 4', 'Rule 5'].map((rule, idx) => (
              <div key={rule} className="top-rule-item">
                <span className="top-rule-name">{rule}</span>
                <div className="top-rule-bar">
                  <div
                    className="top-rule-success"
                    style={{ width: `${90 - idx * 10}%` }}
                  ></div>
                  <div
                    className="top-rule-failed"
                    style={{ width: `${10 + idx * 2}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
