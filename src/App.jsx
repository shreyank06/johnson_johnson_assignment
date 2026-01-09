import { useState } from 'react';
import './index.css';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import RuleManagement from './components/RuleManagement';
import RuleCreationFlow from './components/RuleCreationFlow';
import Organization from './components/Organization';
import Templates from './components/Templates';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showRuleCreation, setShowRuleCreation] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleCreateRule = () => {
    setSelectedTemplate(null);
    setShowRuleCreation(true);
  };

  const handleViewFlow = () => {
    setSelectedTemplate(null);
    setShowRuleCreation(true);
  };

  const handleUseTemplate = (template) => {
    setSelectedTemplate(template);
    setShowRuleCreation(true);
  };

  const renderContent = () => {
    if (showRuleCreation) {
      return <RuleCreationFlow selectedTemplate={selectedTemplate} />;
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'rule-management':
        return <RuleManagement onViewFlow={handleViewFlow} />;
      case 'organization':
        return <Organization />;
      case 'templates':
        return <Templates onUseTemplate={handleUseTemplate} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <div className="main-container">
        <Header
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setShowRuleCreation(false);
          }}
          onCreateRule={handleCreateRule}
        />
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
