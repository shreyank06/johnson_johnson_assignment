// Mock data for Rule Intelligence Dashboard

export const dashboardStats = {
  rules: {
    total: 220,
    active: 120,
    inactive: 100,
    change: 40
  },
  overallUsage: {
    total: 4256,
    successful: 3762,
    failed: 494,
    changePercent: 2
  },
  cost: {
    budget: 5000,
    spent: 2000,
    remaining: 3000,
    utilization: 40
  },
  successRate: 92,
  totalRules: 456,
  executionsThisMonth: 6200,
  successfulExecutions: 5707,
  failedExecutions: 496,
  avgDailyExecutions: 207,
  newRules: 15
};

export const usageTrendData = [
  { month: 'Oct', successful: 1200, failed: 200 },
  { month: 'Nov', successful: 3200, failed: 1400 },
  { month: 'Dec', successful: 3600, failed: 600 },
  { month: 'Jan', successful: 2800, failed: 1000 },
  { month: 'Feb', successful: 1200, failed: 800 },
  { month: 'Mar', successful: 4200, failed: 400 },
  { month: 'Apr', successful: 4400, failed: 1000 }
];

export const teamUsageData = [
  { name: 'Team 1', successful: 2800, failed: 200 },
  { name: 'Team 2', successful: 2600, failed: 300 },
  { name: 'Team 3', successful: 2400, failed: 250 },
  { name: 'Team 4', successful: 1800, failed: 200 },
  { name: 'Team 5', successful: 1200, failed: 150 },
  { name: 'Team 6', successful: 1000, failed: 400 },
  { name: 'Team 7', successful: 2200, failed: 100 }
];

export const departmentUsageData = [
  { name: 'HR', successful: 250, failed: 11 },
  { name: 'Finance', successful: 192, failed: 8 },
  { name: 'Logistics', successful: 205, failed: 6 },
  { name: 'Security', successful: 176, failed: 9 },
  { name: 'Compliance', successful: 259, failed: 7 },
  { name: 'Operations', successful: 137, failed: 8 }
];

export const ruleInsights = {
  HR: 15,
  Finance: 35,
  Logistics: 35,
  Security: 35,
  Compliance: 35,
  Operations: 35
};

export const rulesData = [
  {
    id: 1,
    title: 'Access Controls',
    description: 'Manages user access levels and permissions',
    category: 'Security',
    activationDate: '13/04/2024',
    executions: 423,
    trend: 'up',
    errorRate: 20,
    status: 'active'
  },
  {
    id: 2,
    title: 'Data Backup',
    description: 'Automates regular data backup processes',
    category: 'Operations',
    activationDate: '01/02/2024',
    executions: 423,
    trend: 'up',
    errorRate: 3,
    status: 'active'
  },
  {
    id: 3,
    title: 'Leave Request',
    description: 'Automates employee leave requests',
    category: 'HR',
    activationDate: '21/02/2024',
    executions: 423,
    trend: 'up',
    errorRate: 4.5,
    status: 'active'
  },
  {
    id: 4,
    title: 'Inventory Check',
    description: 'Checks for low stock and initiates reorder',
    category: 'Logistics',
    activationDate: '01/02/2024',
    executions: 423,
    trend: 'up',
    errorRate: 10,
    status: 'active'
  },
  {
    id: 5,
    title: 'Expense Reporting',
    description: 'Streamlines submission of expense reports',
    category: 'Finance',
    activationDate: '13/04/2024',
    executions: 423,
    trend: 'down',
    errorRate: 22,
    status: 'active'
  },
  {
    id: 6,
    title: 'Quality Check',
    description: 'Ensures product quality meets standards',
    category: 'Productions',
    activationDate: '01/02/2024',
    executions: 423,
    trend: 'down',
    errorRate: 20,
    status: 'active'
  },
  {
    id: 7,
    title: 'Overtime Authorization',
    description: 'Authorizes overtime work for employees',
    category: 'HR',
    activationDate: '13/04/2024',
    executions: 423,
    trend: 'down',
    errorRate: 34,
    status: 'active'
  },
  {
    id: 8,
    title: 'Inventory Replenishment',
    description: 'Triggers restock when inventory falls below threshold',
    category: 'Logistics',
    activationDate: '01/02/2024',
    executions: 423,
    trend: 'up',
    errorRate: 0.1,
    status: 'active'
  }
];

export const categoryCounts = {
  Logistics: 1,
  HR: 1,
  Security: 1,
  Finance: 1,
  Operations: 1
};

export const flowCardTypes = [
  { id: 'trigger', label: 'Trigger Cards', icon: 'play', color: '#6366f1' },
  { id: 'logic', label: 'Logic Cards', icon: 'globe', color: '#f59e0b' },
  { id: 'data', label: 'Data Cards', icon: 'database', color: '#8b5cf6' },
  { id: 'integration', label: 'Integration Cards', icon: 'link', color: '#ec4899' }
];
