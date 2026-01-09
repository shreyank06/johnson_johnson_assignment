import { useState } from 'react';
import { FileText, Search, Filter, Star, Clock, Users, Play, Copy, MoreVertical, Grid3X3, List, Zap } from 'lucide-react';

const Templates = ({ onUseTemplate }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Templates', count: 12 },
    { id: 'hr', label: 'HR', count: 3 },
    { id: 'finance', label: 'Finance', count: 2 },
    { id: 'logistics', label: 'Logistics', count: 3 },
    { id: 'security', label: 'Security', count: 2 },
    { id: 'operations', label: 'Operations', count: 2 },
  ];

  const templates = [
    {
      id: 1,
      name: 'Leave Request Automation',
      description: 'Automate employee leave requests with manager approval workflow',
      category: 'HR',
      usedBy: 156,
      rating: 4.8,
      featured: true,
      nodes: 6,
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Expense Approval Flow',
      description: 'Streamline expense submissions with automatic routing based on amount',
      category: 'Finance',
      usedBy: 234,
      rating: 4.9,
      featured: true,
      nodes: 7,
      createdAt: '2024-01-10'
    },
    {
      id: 3,
      name: 'Inventory Reorder Alert',
      description: 'Automatically trigger restock orders when inventory falls below threshold',
      category: 'Logistics',
      usedBy: 189,
      rating: 4.7,
      featured: true,
      nodes: 5,
      createdAt: '2024-01-08'
    },
    {
      id: 4,
      name: 'Access Control Management',
      description: 'Manage user permissions and access levels based on role changes',
      category: 'Security',
      usedBy: 98,
      rating: 4.6,
      featured: false,
      nodes: 8,
      createdAt: '2024-01-05'
    },
    {
      id: 5,
      name: 'Daily Backup Scheduler',
      description: 'Schedule automated backups with cloud storage integration',
      category: 'Operations',
      usedBy: 312,
      rating: 4.9,
      featured: true,
      nodes: 6,
      createdAt: '2024-01-03'
    },
    {
      id: 6,
      name: 'Overtime Authorization',
      description: 'Process overtime requests with automatic hour tracking',
      category: 'HR',
      usedBy: 87,
      rating: 4.5,
      featured: false,
      nodes: 6,
      createdAt: '2024-01-01'
    },
    {
      id: 7,
      name: 'Invoice Processing',
      description: 'Automate invoice validation and payment scheduling',
      category: 'Finance',
      usedBy: 145,
      rating: 4.7,
      featured: false,
      nodes: 9,
      createdAt: '2023-12-28'
    },
    {
      id: 8,
      name: 'Shipment Tracking',
      description: 'Track shipments and send automatic status updates to customers',
      category: 'Logistics',
      usedBy: 203,
      rating: 4.8,
      featured: false,
      nodes: 7,
      createdAt: '2023-12-25'
    },
    {
      id: 9,
      name: 'Security Audit Logger',
      description: 'Log and monitor all security-related events automatically',
      category: 'Security',
      usedBy: 67,
      rating: 4.4,
      featured: false,
      nodes: 5,
      createdAt: '2023-12-20'
    },
    {
      id: 10,
      name: 'Server Health Monitor',
      description: 'Monitor server health and trigger alerts on anomalies',
      category: 'Operations',
      usedBy: 178,
      rating: 4.6,
      featured: false,
      nodes: 6,
      createdAt: '2023-12-15'
    },
    {
      id: 11,
      name: 'Employee Onboarding',
      description: 'Complete onboarding workflow with task assignments',
      category: 'HR',
      usedBy: 124,
      rating: 4.7,
      featured: false,
      nodes: 10,
      createdAt: '2023-12-10'
    },
    {
      id: 12,
      name: 'Warehouse Management',
      description: 'Manage warehouse operations with real-time inventory updates',
      category: 'Logistics',
      usedBy: 156,
      rating: 4.5,
      featured: false,
      nodes: 8,
      createdAt: '2023-12-05'
    },
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredTemplates = templates.filter(t => t.featured);

  const getCategoryColor = (category) => {
    const colors = {
      HR: '#f59e0b',
      Finance: '#3b82f6',
      Logistics: '#8b5cf6',
      Security: '#10b981',
      Operations: '#6366f1',
    };
    return colors[category] || '#64748b';
  };

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">Templates</h2>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div className="search-container">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 size={20} />
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Featured Templates */}
      <div className="featured-section">
        <h3 className="section-title">
          <Star size={18} className="star-icon" />
          Featured Templates
        </h3>
        <div className="featured-grid">
          {featuredTemplates.map(template => (
            <div key={template.id} className="featured-card">
              <div className="featured-card-header">
                <div className="featured-icon" style={{ backgroundColor: `${getCategoryColor(template.category)}20` }}>
                  <Zap size={24} style={{ color: getCategoryColor(template.category) }} />
                </div>
                <span className="featured-badge">Featured</span>
              </div>
              <h4 className="featured-title">{template.name}</h4>
              <p className="featured-desc">{template.description}</p>
              <div className="featured-meta">
                <span className="meta-item">
                  <Users size={14} />
                  {template.usedBy} uses
                </span>
                <span className="meta-item">
                  <Star size={14} className="star-filled" />
                  {template.rating}
                </span>
              </div>
              <button className="use-template-btn" onClick={() => onUseTemplate(template)}>
                <Play size={16} />
                Use Template
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="template-categories">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.label}
            <span className="category-count">{cat.count}</span>
          </button>
        ))}
      </div>

      {/* All Templates */}
      <div className="templates-section">
        <h3 className="section-title">All Templates ({filteredTemplates.length})</h3>

        {viewMode === 'grid' ? (
          <div className="templates-grid">
            {filteredTemplates.map(template => (
              <div key={template.id} className="template-card">
                <div className="template-card-header">
                  <span
                    className="template-category"
                    style={{ backgroundColor: `${getCategoryColor(template.category)}20`, color: getCategoryColor(template.category) }}
                  >
                    {template.category}
                  </span>
                  <button className="actions-btn">
                    <MoreVertical size={16} />
                  </button>
                </div>
                <h4 className="template-title">{template.name}</h4>
                <p className="template-desc">{template.description}</p>
                <div className="template-stats">
                  <span className="template-stat">
                    <FileText size={14} />
                    {template.nodes} nodes
                  </span>
                  <span className="template-stat">
                    <Users size={14} />
                    {template.usedBy}
                  </span>
                  <span className="template-stat">
                    <Star size={14} className="star-filled" />
                    {template.rating}
                  </span>
                </div>
                <div className="template-actions">
                  <button className="template-btn secondary">
                    <Copy size={14} />
                    Duplicate
                  </button>
                  <button className="template-btn primary" onClick={() => onUseTemplate(template)}>
                    <Play size={14} />
                    Use
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="templates-list">
            {filteredTemplates.map(template => (
              <div key={template.id} className="template-list-item">
                <div className="template-list-icon" style={{ backgroundColor: `${getCategoryColor(template.category)}20` }}>
                  <FileText size={20} style={{ color: getCategoryColor(template.category) }} />
                </div>
                <div className="template-list-info">
                  <h4>{template.name}</h4>
                  <p>{template.description}</p>
                </div>
                <span
                  className="template-category"
                  style={{ backgroundColor: `${getCategoryColor(template.category)}20`, color: getCategoryColor(template.category) }}
                >
                  {template.category}
                </span>
                <div className="template-list-stats">
                  <span><Users size={14} /> {template.usedBy}</span>
                  <span><Star size={14} className="star-filled" /> {template.rating}</span>
                </div>
                <div className="template-list-actions">
                  <button className="template-btn primary" onClick={() => onUseTemplate(template)}>
                    <Play size={14} />
                    Use
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Templates;
