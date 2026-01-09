import { LayoutDashboard, List, Building2, FileText, Plus } from 'lucide-react';

const Header = ({ activeTab, setActiveTab, onCreateRule }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'rule-management', label: 'Rule Management', icon: List },
    { id: 'organization', label: 'Organization', icon: Building2 },
    { id: 'templates', label: 'Templates', icon: FileText },
  ];

  return (
    <header className="header">
      <div className="logo">Rule Intelligence Platform</div>

      <nav className="nav-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="header-actions">
        <button className="create-btn" onClick={onCreateRule}>
          Create New Rule
          <Plus size={18} />
        </button>
        <div className="avatar" />
      </div>
    </header>
  );
};

export default Header;
