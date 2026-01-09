import { useState, useMemo } from 'react';
import { List, Grid3X3, LayoutList, MoreVertical, CheckCircle, Search, Filter, X, Calendar, AlertTriangle, Activity } from 'lucide-react';
import { rulesData, categoryCounts } from '../data/mockData';

const RuleManagement = ({ onViewFlow }) => {
  const [viewMode, setViewMode] = useState('table');
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [errorRateFilter, setErrorRateFilter] = useState('all');
  const [trendFilter, setTrendFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [executionRange, setExecutionRange] = useState({ min: '', max: '' });

  const categories = [
    { id: 'all', label: 'All', count: rulesData.length },
    { id: 'logistics', label: 'Logistics', count: rulesData.filter(r => r.category.toLowerCase() === 'logistics').length, color: '#10b981' },
    { id: 'hr', label: 'HR', count: rulesData.filter(r => r.category.toLowerCase() === 'hr').length, color: '#ef4444' },
    { id: 'security', label: 'Security', count: rulesData.filter(r => r.category.toLowerCase() === 'security').length, color: '#10b981' },
    { id: 'finance', label: 'Finance', count: rulesData.filter(r => r.category.toLowerCase() === 'finance').length, color: '#3b82f6' },
    { id: 'operations', label: 'Operations', count: rulesData.filter(r => r.category.toLowerCase() === 'operations').length, color: '#6366f1' },
    { id: 'productions', label: 'Productions', count: rulesData.filter(r => r.category.toLowerCase() === 'productions').length, color: '#a855f7' },
  ];

  // Filter logic
  const filteredRules = useMemo(() => {
    return rulesData.filter(rule => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!rule.title.toLowerCase().includes(query) &&
            !rule.description.toLowerCase().includes(query)) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'all' && rule.category.toLowerCase() !== selectedCategory) {
        return false;
      }

      // Status filter
      if (selectedStatus !== 'all') {
        const isActive = rule.errorRate < 20;
        if (selectedStatus === 'active' && !isActive) return false;
        if (selectedStatus === 'inactive' && isActive) return false;
      }

      // Error rate filter
      if (errorRateFilter !== 'all') {
        if (errorRateFilter === 'high' && rule.errorRate <= 15) return false;
        if (errorRateFilter === 'low' && rule.errorRate > 15) return false;
        if (errorRateFilter === 'zero' && rule.errorRate !== 0) return false;
      }

      // Trend filter
      if (trendFilter !== 'all' && rule.trend !== trendFilter) {
        return false;
      }

      // Execution range filter
      if (executionRange.min && rule.executions < parseInt(executionRange.min)) {
        return false;
      }
      if (executionRange.max && rule.executions > parseInt(executionRange.max)) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedStatus, errorRateFilter, trendFilter, executionRange]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedStatus('all');
    setErrorRateFilter('all');
    setTrendFilter('all');
    setDateRange({ from: '', to: '' });
    setExecutionRange({ min: '', max: '' });
  };

  const activeFilterCount = [
    searchQuery,
    selectedCategory !== 'all',
    selectedStatus !== 'all',
    errorRateFilter !== 'all',
    trendFilter !== 'all',
    executionRange.min,
    executionRange.max,
  ].filter(Boolean).length;

  const TrendLine = ({ trend }) => (
    <svg width="60" height="24" viewBox="0 0 60 24">
      <path
        d={trend === 'up'
          ? "M5,20 L15,15 L25,18 L35,10 L45,12 L55,5"
          : "M5,5 L15,10 L25,8 L35,15 L45,12 L55,20"}
        fill="none"
        stroke={trend === 'up' ? '#10b981' : '#ef4444'}
        strokeWidth="2"
      />
    </svg>
  );

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">
          Rule Management <span>({filteredRules.length})</span>
        </h2>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {/* Search Bar */}
          <div className="search-container">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search rules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button className="search-clear" onClick={() => setSearchQuery('')}>
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filter Toggle */}
          <button
            className={`filter-toggle-btn ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} />
            Filters
            {activeFilterCount > 0 && (
              <span className="filter-badge">{activeFilterCount}</span>
            )}
          </button>

          {/* View Toggle */}
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
            >
              <LayoutList size={20} />
            </button>
            <button
              className={`view-btn ${viewMode === 'card' ? 'active' : ''}`}
              onClick={() => setViewMode('card')}
            >
              <Grid3X3 size={20} />
            </button>
            <button
              className={`view-btn ${viewMode === 'flow' ? 'active' : ''}`}
              onClick={onViewFlow}
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="filter-panel">
          <div className="filter-panel-header">
            <h3>Filters</h3>
            {activeFilterCount > 0 && (
              <button className="clear-filters-btn" onClick={clearFilters}>
                Clear all ({activeFilterCount})
              </button>
            )}
          </div>
          <div className="filter-grid">
            {/* Category Filter */}
            <div className="filter-group">
              <label>Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label} ({cat.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="filter-group">
              <label>Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Error Rate Filter */}
            <div className="filter-group">
              <label>Error Rate</label>
              <select
                value={errorRateFilter}
                onChange={(e) => setErrorRateFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="zero">No Errors (0%)</option>
                <option value="low">Low (&lt;= 15%)</option>
                <option value="high">High (&gt; 15%)</option>
              </select>
            </div>

            {/* Trend Filter */}
            <div className="filter-group">
              <label>Trend</label>
              <select
                value={trendFilter}
                onChange={(e) => setTrendFilter(e.target.value)}
              >
                <option value="all">All Trends</option>
                <option value="up">Trending Up</option>
                <option value="down">Trending Down</option>
              </select>
            </div>

            {/* Execution Range */}
            <div className="filter-group">
              <label>Min Executions</label>
              <input
                type="number"
                placeholder="Min"
                value={executionRange.min}
                onChange={(e) => setExecutionRange({ ...executionRange, min: e.target.value })}
              />
            </div>

            <div className="filter-group">
              <label>Max Executions</label>
              <input
                type="number"
                placeholder="Max"
                value={executionRange.max}
                onChange={(e) => setExecutionRange({ ...executionRange, max: e.target.value })}
              />
            </div>
          </div>
        </div>
      )}

      {/* Category Pills - Clickable */}
      <div className="category-pills">
        {categories.filter(c => c.id !== 'all').map((cat) => (
          <div
            key={cat.id}
            className={`category-pill ${selectedCategory === cat.id ? 'selected' : ''}`}
            onClick={() => setSelectedCategory(selectedCategory === cat.id ? 'all' : cat.id)}
          >
            <div className={`category-icon ${cat.id}`}>
              <CheckCircle size={20} />
            </div>
            <div className="category-info">
              <div className="category-label">{cat.label}</div>
              <div className="category-count">{String(cat.count).padStart(2, '0')}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Results Summary */}
      {(searchQuery || selectedCategory !== 'all' || activeFilterCount > 0) && (
        <div className="results-summary">
          <span>Showing {filteredRules.length} of {rulesData.length} rules</span>
          {selectedCategory !== 'all' && (
            <span className="active-filter-tag">
              {categories.find(c => c.id === selectedCategory)?.label}
              <X size={12} onClick={() => setSelectedCategory('all')} />
            </span>
          )}
          {errorRateFilter !== 'all' && (
            <span className="active-filter-tag">
              Error: {errorRateFilter}
              <X size={12} onClick={() => setErrorRateFilter('all')} />
            </span>
          )}
          {trendFilter !== 'all' && (
            <span className="active-filter-tag">
              Trend: {trendFilter}
              <X size={12} onClick={() => setTrendFilter('all')} />
            </span>
          )}
        </div>
      )}

      {/* No Results */}
      {filteredRules.length === 0 && (
        <div className="no-results">
          <AlertTriangle size={48} />
          <h3>No rules found</h3>
          <p>Try adjusting your filters or search query</p>
          <button onClick={clearFilters}>Clear all filters</button>
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && filteredRules.length > 0 && (
        <div className="rules-table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Category</th>
                <th>Activation Date</th>
                <th>Executions</th>
                <th>Trend</th>
                <th>Error Rate</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRules.map((rule) => (
                <tr key={rule.id}>
                  <td className="rule-title">{rule.title}</td>
                  <td className="rule-description">{rule.description}</td>
                  <td>
                    <span className={`category-badge ${rule.category.toLowerCase()}`}>
                      • {rule.category}
                    </span>
                  </td>
                  <td>{rule.activationDate}</td>
                  <td>
                    <div className="executions-cell">
                      <span>{rule.executions}</span>
                      <span className="executions-change">0 since yesterday</span>
                    </div>
                  </td>
                  <td className="trend-cell">
                    <TrendLine trend={rule.trend} />
                  </td>
                  <td>
                    <span className={`error-rate ${rule.errorRate > 15 ? 'high' : 'low'}`}>
                      {rule.errorRate}%
                    </span>
                  </td>
                  <td>
                    <button className="actions-btn">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Card View */}
      {viewMode === 'card' && filteredRules.length > 0 && (
        <div className="rules-card-grid">
          {filteredRules.map((rule) => (
            <div key={rule.id} className="rule-card">
              <div className="rule-card-header">
                <div className="rule-card-title">{rule.title}</div>
                <div className="rule-card-date">{rule.activationDate}</div>
                <button className="actions-btn">
                  <MoreVertical size={18} />
                </button>
              </div>
              <div className="rule-card-description">{rule.description}</div>
              <div className="rule-card-category">{rule.category}</div>
              <div className="rule-card-stats">
                <div className="rule-card-stat">
                  <div className="rule-card-stat-value">{rule.executions}</div>
                  <div className="rule-card-stat-label">Executions</div>
                </div>
                <div className="rule-card-stat">
                  <TrendLine trend={rule.trend} />
                  <div className="rule-card-stat-label">Trend</div>
                </div>
                <div className="rule-card-stat">
                  <div className="rule-card-stat-value" style={{ color: rule.errorRate > 15 ? '#ef4444' : '#1a1a2e' }}>
                    {rule.errorRate}%
                  </div>
                  <div className={`rule-card-stat-label ${rule.errorRate > 15 ? 'error' : ''}`}>Error Rate</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RuleManagement;
