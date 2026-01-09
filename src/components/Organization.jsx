import { useState } from 'react';
import { Users, Building2, Shield, Mail, Phone, MapPin, Edit2, Trash2, Plus, Search, MoreVertical } from 'lucide-react';

const Organization = () => {
  const [activeTab, setActiveTab] = useState('teams');
  const [searchQuery, setSearchQuery] = useState('');

  const teams = [
    { id: 1, name: 'Engineering', members: 24, lead: 'John Smith', rules: 45, status: 'active' },
    { id: 2, name: 'Operations', members: 18, lead: 'Sarah Johnson', rules: 32, status: 'active' },
    { id: 3, name: 'Finance', members: 12, lead: 'Mike Wilson', rules: 28, status: 'active' },
    { id: 4, name: 'HR', members: 8, lead: 'Emily Davis', rules: 15, status: 'active' },
    { id: 5, name: 'Security', members: 10, lead: 'David Brown', rules: 35, status: 'active' },
    { id: 6, name: 'Logistics', members: 15, lead: 'Lisa Anderson', rules: 22, status: 'active' },
  ];

  const members = [
    { id: 1, name: 'John Smith', email: 'john.smith@company.com', role: 'Admin', team: 'Engineering', status: 'active' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.j@company.com', role: 'Manager', team: 'Operations', status: 'active' },
    { id: 3, name: 'Mike Wilson', email: 'mike.w@company.com', role: 'Manager', team: 'Finance', status: 'active' },
    { id: 4, name: 'Emily Davis', email: 'emily.d@company.com', role: 'Manager', team: 'HR', status: 'active' },
    { id: 5, name: 'David Brown', email: 'david.b@company.com', role: 'Admin', team: 'Security', status: 'active' },
    { id: 6, name: 'Lisa Anderson', email: 'lisa.a@company.com', role: 'User', team: 'Logistics', status: 'inactive' },
    { id: 7, name: 'James Taylor', email: 'james.t@company.com', role: 'User', team: 'Engineering', status: 'active' },
    { id: 8, name: 'Anna White', email: 'anna.w@company.com', role: 'User', team: 'Operations', status: 'active' },
  ];

  const roles = [
    { id: 1, name: 'Admin', permissions: 'Full Access', users: 2, color: '#ef4444' },
    { id: 2, name: 'Manager', permissions: 'Create, Edit, View Rules', users: 3, color: '#f59e0b' },
    { id: 3, name: 'User', permissions: 'View Rules Only', users: 3, color: '#10b981' },
  ];

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.lead.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.team.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">Organization</h2>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div className="search-container">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <button className="primary-btn">
            <Plus size={18} />
            {activeTab === 'teams' ? 'Add Team' : activeTab === 'members' ? 'Add Member' : 'Add Role'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="org-tabs">
        <button
          className={`org-tab ${activeTab === 'teams' ? 'active' : ''}`}
          onClick={() => setActiveTab('teams')}
        >
          <Building2 size={18} />
          Teams
        </button>
        <button
          className={`org-tab ${activeTab === 'members' ? 'active' : ''}`}
          onClick={() => setActiveTab('members')}
        >
          <Users size={18} />
          Members
        </button>
        <button
          className={`org-tab ${activeTab === 'roles' ? 'active' : ''}`}
          onClick={() => setActiveTab('roles')}
        >
          <Shield size={18} />
          Roles & Permissions
        </button>
      </div>

      {/* Teams Tab */}
      {activeTab === 'teams' && (
        <div className="org-grid">
          {filteredTeams.map(team => (
            <div key={team.id} className="org-card">
              <div className="org-card-header">
                <div className="org-card-icon">
                  <Building2 size={24} />
                </div>
                <button className="actions-btn">
                  <MoreVertical size={18} />
                </button>
              </div>
              <h3 className="org-card-title">{team.name}</h3>
              <p className="org-card-subtitle">Lead: {team.lead}</p>
              <div className="org-card-stats">
                <div className="org-stat">
                  <span className="org-stat-value">{team.members}</span>
                  <span className="org-stat-label">Members</span>
                </div>
                <div className="org-stat">
                  <span className="org-stat-value">{team.rules}</span>
                  <span className="org-stat-label">Rules</span>
                </div>
              </div>
              <div className="org-card-footer">
                <span className={`status-badge ${team.status}`}>{team.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Members Tab */}
      {activeTab === 'members' && (
        <div className="org-table-container">
          <table className="org-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Team</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map(member => (
                <tr key={member.id}>
                  <td>
                    <div className="member-cell">
                      <div className="member-avatar">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span>{member.name}</span>
                    </div>
                  </td>
                  <td>{member.email}</td>
                  <td>
                    <span className={`role-badge ${member.role.toLowerCase()}`}>
                      {member.role}
                    </span>
                  </td>
                  <td>{member.team}</td>
                  <td>
                    <span className={`status-badge ${member.status}`}>
                      {member.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="icon-btn">
                        <Edit2 size={16} />
                      </button>
                      <button className="icon-btn danger">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Roles Tab */}
      {activeTab === 'roles' && (
        <div className="roles-grid">
          {roles.map(role => (
            <div key={role.id} className="role-card">
              <div className="role-card-header" style={{ borderLeftColor: role.color }}>
                <Shield size={24} style={{ color: role.color }} />
                <h3>{role.name}</h3>
              </div>
              <p className="role-permissions">{role.permissions}</p>
              <div className="role-users">
                <Users size={16} />
                <span>{role.users} users</span>
              </div>
              <div className="role-actions">
                <button className="text-btn">Edit Permissions</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Organization;
