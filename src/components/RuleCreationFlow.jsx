import { useCallback, useState, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Play, Globe, Database, Link2, RefreshCw, HelpCircle, ZoomIn, ZoomOut, ChevronDown, X, Save, Plus, Trash2, Settings, Clock, Zap, Webhook, FileText, Mail, Bell, Server, Upload } from 'lucide-react';

// Configuration Modal Component
const ConfigModal = ({ isOpen, onClose, nodeType, nodeData, onSave }) => {
  const [config, setConfig] = useState(nodeData?.config || {});

  useEffect(() => {
    setConfig(nodeData?.config || {});
  }, [nodeData]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(config);
    onClose();
  };

  const renderTriggerConfig = () => (
    <div className="config-form">
      <div className="config-field">
        <label>Trigger Type</label>
        <select
          value={config.triggerType || 'event'}
          onChange={(e) => setConfig({ ...config, triggerType: e.target.value })}
        >
          <option value="event">Event Based</option>
          <option value="schedule">Scheduled</option>
          <option value="webhook">Webhook</option>
          <option value="form">Form Submit</option>
        </select>
      </div>

      {config.triggerType === 'schedule' && (
        <>
          <div className="config-field">
            <label>Frequency</label>
            <select
              value={config.frequency || 'daily'}
              onChange={(e) => setConfig({ ...config, frequency: e.target.value })}
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="custom">Custom (Cron)</option>
            </select>
          </div>
          {config.frequency === 'daily' && (
            <div className="config-field">
              <label>Time</label>
              <input
                type="time"
                value={config.time || '09:00'}
                onChange={(e) => setConfig({ ...config, time: e.target.value })}
              />
            </div>
          )}
          {config.frequency === 'custom' && (
            <div className="config-field">
              <label>Cron Expression</label>
              <input
                type="text"
                placeholder="0 9 * * *"
                value={config.cron || ''}
                onChange={(e) => setConfig({ ...config, cron: e.target.value })}
              />
            </div>
          )}
        </>
      )}

      {config.triggerType === 'event' && (
        <div className="config-field">
          <label>Event Name</label>
          <select
            value={config.eventName || ''}
            onChange={(e) => setConfig({ ...config, eventName: e.target.value })}
          >
            <option value="">Select event...</option>
            <option value="user_login">User Login</option>
            <option value="user_signup">User Signup</option>
            <option value="order_created">Order Created</option>
            <option value="payment_received">Payment Received</option>
            <option value="stock_low">Stock Low Alert</option>
            <option value="form_submitted">Form Submitted</option>
          </select>
        </div>
      )}

      {config.triggerType === 'webhook' && (
        <>
          <div className="config-field">
            <label>Webhook URL</label>
            <input
              type="text"
              placeholder="https://api.example.com/webhook"
              value={config.webhookUrl || ''}
              onChange={(e) => setConfig({ ...config, webhookUrl: e.target.value })}
            />
          </div>
          <div className="config-field">
            <label>Method</label>
            <select
              value={config.webhookMethod || 'POST'}
              onChange={(e) => setConfig({ ...config, webhookMethod: e.target.value })}
            >
              <option value="POST">POST</option>
              <option value="GET">GET</option>
            </select>
          </div>
        </>
      )}

      {config.triggerType === 'form' && (
        <div className="config-field">
          <label>Form Name</label>
          <select
            value={config.formName || ''}
            onChange={(e) => setConfig({ ...config, formName: e.target.value })}
          >
            <option value="">Select form...</option>
            <option value="leave_request">Leave Request Form</option>
            <option value="expense_report">Expense Report Form</option>
            <option value="overtime_request">Overtime Request Form</option>
            <option value="purchase_order">Purchase Order Form</option>
          </select>
        </div>
      )}
    </div>
  );

  const renderLogicConfig = () => (
    <div className="config-form">
      <div className="config-field">
        <label>Field to Check</label>
        <input
          type="text"
          placeholder="e.g., amount, user.role, stock_level"
          value={config.field || ''}
          onChange={(e) => setConfig({ ...config, field: e.target.value })}
        />
      </div>
      <div className="config-field">
        <label>Operator</label>
        <select
          value={config.operator || 'equals'}
          onChange={(e) => setConfig({ ...config, operator: e.target.value })}
        >
          <option value="equals">Equals (==)</option>
          <option value="not_equals">Not Equals (!=)</option>
          <option value="greater">Greater Than (&gt;)</option>
          <option value="less">Less Than (&lt;)</option>
          <option value="greater_eq">Greater or Equal (&gt;=)</option>
          <option value="less_eq">Less or Equal (&lt;=)</option>
          <option value="contains">Contains</option>
          <option value="not_contains">Does Not Contain</option>
          <option value="is_empty">Is Empty</option>
          <option value="is_not_empty">Is Not Empty</option>
        </select>
      </div>
      {!['is_empty', 'is_not_empty'].includes(config.operator) && (
        <div className="config-field">
          <label>Value</label>
          <input
            type="text"
            placeholder="e.g., 500, admin, true"
            value={config.value || ''}
            onChange={(e) => setConfig({ ...config, value: e.target.value })}
          />
        </div>
      )}
      <div className="config-field">
        <label>True Path Label</label>
        <input
          type="text"
          placeholder="e.g., Approved, Yes"
          value={config.trueLabel || 'Yes'}
          onChange={(e) => setConfig({ ...config, trueLabel: e.target.value })}
        />
      </div>
      <div className="config-field">
        <label>False Path Label</label>
        <input
          type="text"
          placeholder="e.g., Rejected, No"
          value={config.falseLabel || 'No'}
          onChange={(e) => setConfig({ ...config, falseLabel: e.target.value })}
        />
      </div>
    </div>
  );

  const renderDataConfig = () => (
    <div className="config-form">
      <div className="config-field">
        <label>Operation</label>
        <select
          value={config.operation || 'fetch'}
          onChange={(e) => setConfig({ ...config, operation: e.target.value })}
        >
          <option value="fetch">Fetch Data</option>
          <option value="update">Update Data</option>
          <option value="create">Create Record</option>
          <option value="delete">Delete Record</option>
        </select>
      </div>
      <div className="config-field">
        <label>Data Source</label>
        <select
          value={config.dataSource || ''}
          onChange={(e) => setConfig({ ...config, dataSource: e.target.value })}
        >
          <option value="">Select source...</option>
          <option value="users">Users Table</option>
          <option value="orders">Orders Table</option>
          <option value="inventory">Inventory Table</option>
          <option value="employees">Employees Table</option>
          <option value="leave_balance">Leave Balance Table</option>
          <option value="expenses">Expenses Table</option>
          <option value="api">External API</option>
        </select>
      </div>
      {config.dataSource === 'api' && (
        <div className="config-field">
          <label>API Endpoint</label>
          <input
            type="text"
            placeholder="https://api.example.com/data"
            value={config.apiEndpoint || ''}
            onChange={(e) => setConfig({ ...config, apiEndpoint: e.target.value })}
          />
        </div>
      )}
      <div className="config-field">
        <label>Fields</label>
        <input
          type="text"
          placeholder="e.g., id, name, balance (comma separated)"
          value={config.fields || ''}
          onChange={(e) => setConfig({ ...config, fields: e.target.value })}
        />
      </div>
      {config.operation !== 'create' && (
        <div className="config-field">
          <label>Filter Condition</label>
          <input
            type="text"
            placeholder="e.g., user_id = {{trigger.user_id}}"
            value={config.filter || ''}
            onChange={(e) => setConfig({ ...config, filter: e.target.value })}
          />
        </div>
      )}
      {config.operation === 'update' && (
        <div className="config-field">
          <label>Update Values</label>
          <textarea
            placeholder="balance = balance - {{request.days}}&#10;updated_at = NOW()"
            value={config.updateValues || ''}
            onChange={(e) => setConfig({ ...config, updateValues: e.target.value })}
            rows={3}
          />
        </div>
      )}
    </div>
  );

  const renderIntegrationConfig = () => (
    <div className="config-form">
      <div className="config-field">
        <label>Integration Type</label>
        <select
          value={config.integrationType || 'email'}
          onChange={(e) => setConfig({ ...config, integrationType: e.target.value })}
        >
          <option value="email">Send Email</option>
          <option value="notification">Push Notification</option>
          <option value="slack">Slack Message</option>
          <option value="api">API Call</option>
          <option value="storage">File Storage</option>
        </select>
      </div>

      {config.integrationType === 'email' && (
        <>
          <div className="config-field">
            <label>To</label>
            <input
              type="text"
              placeholder="{{user.email}} or email@example.com"
              value={config.emailTo || ''}
              onChange={(e) => setConfig({ ...config, emailTo: e.target.value })}
            />
          </div>
          <div className="config-field">
            <label>Subject</label>
            <input
              type="text"
              placeholder="e.g., Your request has been approved"
              value={config.emailSubject || ''}
              onChange={(e) => setConfig({ ...config, emailSubject: e.target.value })}
            />
          </div>
          <div className="config-field">
            <label>Body</label>
            <textarea
              placeholder="Email content... Use {{variable}} for dynamic values"
              value={config.emailBody || ''}
              onChange={(e) => setConfig({ ...config, emailBody: e.target.value })}
              rows={4}
            />
          </div>
        </>
      )}

      {config.integrationType === 'notification' && (
        <>
          <div className="config-field">
            <label>Recipient</label>
            <input
              type="text"
              placeholder="{{user.id}} or user ID"
              value={config.notifyTo || ''}
              onChange={(e) => setConfig({ ...config, notifyTo: e.target.value })}
            />
          </div>
          <div className="config-field">
            <label>Title</label>
            <input
              type="text"
              placeholder="Notification title"
              value={config.notifyTitle || ''}
              onChange={(e) => setConfig({ ...config, notifyTitle: e.target.value })}
            />
          </div>
          <div className="config-field">
            <label>Message</label>
            <textarea
              placeholder="Notification message..."
              value={config.notifyMessage || ''}
              onChange={(e) => setConfig({ ...config, notifyMessage: e.target.value })}
              rows={3}
            />
          </div>
        </>
      )}

      {config.integrationType === 'slack' && (
        <>
          <div className="config-field">
            <label>Channel</label>
            <input
              type="text"
              placeholder="#channel-name"
              value={config.slackChannel || ''}
              onChange={(e) => setConfig({ ...config, slackChannel: e.target.value })}
            />
          </div>
          <div className="config-field">
            <label>Message</label>
            <textarea
              placeholder="Slack message... Use {{variable}} for dynamic values"
              value={config.slackMessage || ''}
              onChange={(e) => setConfig({ ...config, slackMessage: e.target.value })}
              rows={3}
            />
          </div>
        </>
      )}

      {config.integrationType === 'api' && (
        <>
          <div className="config-field">
            <label>URL</label>
            <input
              type="text"
              placeholder="https://api.example.com/endpoint"
              value={config.apiUrl || ''}
              onChange={(e) => setConfig({ ...config, apiUrl: e.target.value })}
            />
          </div>
          <div className="config-field">
            <label>Method</label>
            <select
              value={config.apiMethod || 'POST'}
              onChange={(e) => setConfig({ ...config, apiMethod: e.target.value })}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="PATCH">PATCH</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>
          <div className="config-field">
            <label>Headers (JSON)</label>
            <textarea
              placeholder='{"Authorization": "Bearer {{token}}"}'
              value={config.apiHeaders || ''}
              onChange={(e) => setConfig({ ...config, apiHeaders: e.target.value })}
              rows={2}
            />
          </div>
          <div className="config-field">
            <label>Body (JSON)</label>
            <textarea
              placeholder='{"key": "{{value}}"}'
              value={config.apiBody || ''}
              onChange={(e) => setConfig({ ...config, apiBody: e.target.value })}
              rows={3}
            />
          </div>
        </>
      )}

      {config.integrationType === 'storage' && (
        <>
          <div className="config-field">
            <label>Storage Provider</label>
            <select
              value={config.storageProvider || 's3'}
              onChange={(e) => setConfig({ ...config, storageProvider: e.target.value })}
            >
              <option value="s3">AWS S3</option>
              <option value="gcs">Google Cloud Storage</option>
              <option value="azure">Azure Blob</option>
              <option value="local">Local Storage</option>
            </select>
          </div>
          <div className="config-field">
            <label>Bucket/Container</label>
            <input
              type="text"
              placeholder="bucket-name"
              value={config.bucket || ''}
              onChange={(e) => setConfig({ ...config, bucket: e.target.value })}
            />
          </div>
          <div className="config-field">
            <label>File Path</label>
            <input
              type="text"
              placeholder="backups/{{date}}/data.json"
              value={config.filePath || ''}
              onChange={(e) => setConfig({ ...config, filePath: e.target.value })}
            />
          </div>
        </>
      )}
    </div>
  );

  const getTitle = () => {
    switch (nodeType) {
      case 'trigger': return 'Configure Trigger';
      case 'logic': return 'Configure Condition';
      case 'data': return 'Configure Data Operation';
      case 'integration': return 'Configure Integration';
      default: return 'Configure Node';
    }
  };

  return (
    <div className="config-modal-overlay" onClick={onClose}>
      <div className="config-modal" onClick={(e) => e.stopPropagation()}>
        <div className="config-modal-header">
          <h3>{getTitle()}</h3>
          <button className="config-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="config-modal-body">
          {nodeType === 'trigger' && renderTriggerConfig()}
          {nodeType === 'logic' && renderLogicConfig()}
          {nodeType === 'data' && renderDataConfig()}
          {nodeType === 'integration' && renderIntegrationConfig()}
        </div>
        <div className="config-modal-footer">
          <button className="config-cancel-btn" onClick={onClose}>Cancel</button>
          <button className="config-save-btn" onClick={handleSave}>Save Configuration</button>
        </div>
      </div>
    </div>
  );
};

// Helper to get config summary
const getConfigSummary = (type, config) => {
  if (!config || Object.keys(config).length === 0) return 'Click to configure';

  switch (type) {
    case 'trigger':
      if (config.triggerType === 'schedule') return `${config.frequency || 'Daily'} at ${config.time || '09:00'}`;
      if (config.triggerType === 'event') return config.eventName?.replace(/_/g, ' ') || 'Event trigger';
      if (config.triggerType === 'webhook') return 'Webhook trigger';
      if (config.triggerType === 'form') return config.formName?.replace(/_/g, ' ') || 'Form submit';
      return 'Trigger configured';
    case 'logic':
      if (config.field && config.operator) {
        const ops = { equals: '==', not_equals: '!=', greater: '>', less: '<', greater_eq: '>=', less_eq: '<=', contains: 'contains', is_empty: 'is empty' };
        return `${config.field} ${ops[config.operator] || config.operator} ${config.value || ''}`;
      }
      return 'Condition configured';
    case 'data':
      return `${config.operation || 'Fetch'} from ${config.dataSource || 'source'}`;
    case 'integration':
      if (config.integrationType === 'email') return `Email to ${config.emailTo || '...'}`;
      if (config.integrationType === 'slack') return `Slack: ${config.slackChannel || '#channel'}`;
      if (config.integrationType === 'api') return `${config.apiMethod || 'POST'} ${config.apiUrl?.slice(0, 20) || 'API'}...`;
      if (config.integrationType === 'notification') return 'Push notification';
      if (config.integrationType === 'storage') return `Upload to ${config.storageProvider || 'storage'}`;
      return 'Integration configured';
    default:
      return 'Configured';
  }
};

// Editable Node Component Factory
const createEditableNode = (icon, iconClass, nodeType) => {
  return ({ data, id }) => {
    const [isEditingLabel, setIsEditingLabel] = useState(false);
    const [label, setLabel] = useState(data.label);

    const handleLabelSave = () => {
      setIsEditingLabel(false);
      if (data.onUpdate) {
        data.onUpdate(id, { label });
      }
    };

    const configSummary = getConfigSummary(nodeType, data.config);

    return (
      <div className="custom-node">
        <Handle type="target" position={Position.Left} />
        <Handle type="source" position={Position.Right} />

        {data.onDelete && (
          <button
            className="node-delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              data.onDelete(id);
            }}
          >
            <X size={12} />
          </button>
        )}

        <div className="custom-node-header">
          <div className={`flow-card-icon ${iconClass}`}>
            {icon}
          </div>
          {isEditingLabel ? (
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              onBlur={handleLabelSave}
              onKeyDown={(e) => e.key === 'Enter' && handleLabelSave()}
              className="node-edit-input"
              autoFocus
            />
          ) : (
            <span
              className="custom-node-title editable"
              onClick={() => setIsEditingLabel(true)}
            >
              {label}
            </span>
          )}
        </div>

        <div
          className="custom-node-config"
          onClick={() => data.onOpenConfig && data.onOpenConfig(id, nodeType, data)}
        >
          <Settings size={12} />
          <span>{configSummary}</span>
        </div>
      </div>
    );
  };
};

// Simple nodes (Request/Response)
const RequestNode = ({ data, id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label);

  const handleSave = () => {
    setIsEditing(false);
    if (data.onUpdate) {
      data.onUpdate(id, { label });
    }
  };

  return (
    <div className="request-node">
      <Handle type="source" position={Position.Right} />
      {data.onDelete && (
        <button
          className="node-delete-btn simple"
          onClick={(e) => {
            e.stopPropagation();
            data.onDelete(id);
          }}
        >
          <X size={10} />
        </button>
      )}
      <Play size={16} />
      {isEditing ? (
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          className="node-edit-input simple"
          autoFocus
        />
      ) : (
        <span className="editable" onClick={() => setIsEditing(true)}>{label}</span>
      )}
    </div>
  );
};

const ResponseNode = ({ data, id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label);

  const handleSave = () => {
    setIsEditing(false);
    if (data.onUpdate) {
      data.onUpdate(id, { label });
    }
  };

  return (
    <div className="response-node">
      <Handle type="target" position={Position.Left} />
      {data.onDelete && (
        <button
          className="node-delete-btn simple"
          onClick={(e) => {
            e.stopPropagation();
            data.onDelete(id);
          }}
        >
          <X size={10} />
        </button>
      )}
      <Play size={16} />
      {isEditing ? (
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          className="node-edit-input simple"
          autoFocus
        />
      ) : (
        <span className="editable" onClick={() => setIsEditing(true)}>{label}</span>
      )}
    </div>
  );
};

// Create editable versions of each node type
const TriggerNode = createEditableNode(<Play size={14} />, 'trigger', 'trigger');
const LogicNode = createEditableNode(<Globe size={14} />, 'logic', 'logic');
const DataNode = createEditableNode(<Database size={14} />, 'data', 'data');
const IntegrationNode = createEditableNode(<Link2 size={14} />, 'integration', 'integration');

const nodeTypes = {
  request: RequestNode,
  response: ResponseNode,
  trigger: TriggerNode,
  logic: LogicNode,
  data: DataNode,
  integration: IntegrationNode,
};

// Blank canvas flow
const blankCanvasFlow = {
  nodes: [
    { id: 'request', type: 'request', position: { x: 50, y: 200 }, data: { label: 'Request' } },
    { id: 'response', type: 'response', position: { x: 400, y: 200 }, data: { label: 'Response' } },
  ],
  edges: [],
  title: 'Blank Canvas',
  category: 'Custom'
};

// Dashboard Rules as Flows

// 1. Access Controls - Security
const accessControlsFlow = {
  nodes: [
    { id: 'request', type: 'request', position: { x: 50, y: 200 }, data: { label: 'Request' } },
    { id: 't1', type: 'trigger', position: { x: 200, y: 185 }, data: { label: 'User Login', config: { triggerType: 'event', eventName: 'user_login' } } },
    { id: 'd1', type: 'data', position: { x: 400, y: 185 }, data: { label: 'Get User Role', config: { operation: 'fetch', dataSource: 'users', fields: 'role, permissions' } } },
    { id: 'l1', type: 'logic', position: { x: 600, y: 185 }, data: { label: 'Check Permission', config: { field: 'user.role', operator: 'equals', value: 'admin' } } },
    { id: 'i1', type: 'integration', position: { x: 800, y: 120 }, data: { label: 'Grant Access', config: { integrationType: 'api', apiMethod: 'POST', apiUrl: '/api/grant-access' } } },
    { id: 'i2', type: 'integration', position: { x: 800, y: 260 }, data: { label: 'Deny & Log', config: { integrationType: 'api', apiMethod: 'POST', apiUrl: '/api/log-denied' } } },
    { id: 'response', type: 'response', position: { x: 1000, y: 200 }, data: { label: 'Response' } },
  ],
  edges: [
    { id: 'e1', source: 'request', target: 't1', style: { stroke: '#6366f1' } },
    { id: 'e2', source: 't1', target: 'd1', style: { stroke: '#6366f1' } },
    { id: 'e3', source: 'd1', target: 'l1', style: { stroke: '#6366f1' } },
    { id: 'e4', source: 'l1', target: 'i1', style: { stroke: '#10b981' } },
    { id: 'e5', source: 'l1', target: 'i2', style: { stroke: '#ef4444' } },
    { id: 'e6', source: 'i1', target: 'response', style: { stroke: '#6366f1' } },
    { id: 'e7', source: 'i2', target: 'response', style: { stroke: '#6366f1' } },
  ],
  title: 'Access Controls',
  category: 'Security'
};

// 2. Data Backup - Operations
const dataBackupFlow = {
  nodes: [
    { id: 'request', type: 'request', position: { x: 50, y: 200 }, data: { label: 'Request' } },
    { id: 't1', type: 'trigger', position: { x: 200, y: 185 }, data: { label: 'Daily 2 AM', config: { triggerType: 'schedule', frequency: 'daily', time: '02:00' } } },
    { id: 'd1', type: 'data', position: { x: 400, y: 185 }, data: { label: 'Get DB Tables', config: { operation: 'fetch', dataSource: 'api', apiEndpoint: '/api/tables' } } },
    { id: 'd2', type: 'data', position: { x: 600, y: 185 }, data: { label: 'Export Data', config: { operation: 'fetch', dataSource: 'api', apiEndpoint: '/api/export' } } },
    { id: 'i1', type: 'integration', position: { x: 800, y: 185 }, data: { label: 'Upload to S3', config: { integrationType: 'storage', storageProvider: 's3', bucket: 'backups' } } },
    { id: 'i2', type: 'integration', position: { x: 1000, y: 185 }, data: { label: 'Send Report', config: { integrationType: 'email', emailTo: 'admin@company.com', emailSubject: 'Backup Complete' } } },
    { id: 'response', type: 'response', position: { x: 1200, y: 200 }, data: { label: 'Response' } },
  ],
  edges: [
    { id: 'e1', source: 'request', target: 't1', style: { stroke: '#6366f1' } },
    { id: 'e2', source: 't1', target: 'd1', style: { stroke: '#6366f1' } },
    { id: 'e3', source: 'd1', target: 'd2', style: { stroke: '#6366f1' } },
    { id: 'e4', source: 'd2', target: 'i1', style: { stroke: '#6366f1' } },
    { id: 'e5', source: 'i1', target: 'i2', style: { stroke: '#6366f1' } },
    { id: 'e6', source: 'i2', target: 'response', style: { stroke: '#6366f1' } },
  ],
  title: 'Data Backup',
  category: 'Operations'
};

// 3. Leave Request - HR
const leaveRequestFlow = {
  nodes: [
    { id: 'request', type: 'request', position: { x: 50, y: 200 }, data: { label: 'Request' } },
    { id: 't1', type: 'trigger', position: { x: 200, y: 185 }, data: { label: 'Form Submit', config: { triggerType: 'form', formName: 'leave_request' } } },
    { id: 'd1', type: 'data', position: { x: 400, y: 185 }, data: { label: 'Get Balance', config: { operation: 'fetch', dataSource: 'leave_balance', fields: 'balance', filter: 'user_id = {{user.id}}' } } },
    { id: 'l1', type: 'logic', position: { x: 600, y: 185 }, data: { label: 'Balance > 0?', config: { field: 'balance', operator: 'greater', value: '0' } } },
    { id: 'i1', type: 'integration', position: { x: 800, y: 185 }, data: { label: 'Notify Manager', config: { integrationType: 'email', emailTo: '{{manager.email}}', emailSubject: 'Leave Request from {{user.name}}' } } },
    { id: 'd2', type: 'data', position: { x: 1000, y: 185 }, data: { label: 'Update Balance', config: { operation: 'update', dataSource: 'leave_balance', updateValues: 'balance = balance - {{request.days}}' } } },
    { id: 'response', type: 'response', position: { x: 1200, y: 200 }, data: { label: 'Response' } },
  ],
  edges: [
    { id: 'e1', source: 'request', target: 't1', style: { stroke: '#6366f1' } },
    { id: 'e2', source: 't1', target: 'd1', style: { stroke: '#6366f1' } },
    { id: 'e3', source: 'd1', target: 'l1', style: { stroke: '#6366f1' } },
    { id: 'e4', source: 'l1', target: 'i1', style: { stroke: '#6366f1' } },
    { id: 'e5', source: 'i1', target: 'd2', style: { stroke: '#6366f1' } },
    { id: 'e6', source: 'd2', target: 'response', style: { stroke: '#6366f1' } },
  ],
  title: 'Leave Request',
  category: 'HR'
};

// 4. Inventory Check - Logistics
const inventoryCheckFlow = {
  nodes: [
    { id: 'request', type: 'request', position: { x: 50, y: 200 }, data: { label: 'Request' } },
    { id: 't1', type: 'trigger', position: { x: 200, y: 185 }, data: { label: 'Daily 9 AM', config: { triggerType: 'schedule', frequency: 'daily', time: '09:00' } } },
    { id: 'd1', type: 'data', position: { x: 400, y: 185 }, data: { label: 'Get Stock', config: { operation: 'fetch', dataSource: 'inventory', fields: 'product_id, stock_level' } } },
    { id: 'l1', type: 'logic', position: { x: 600, y: 185 }, data: { label: 'Stock < 10?', config: { field: 'stock_level', operator: 'less', value: '10' } } },
    { id: 'i1', type: 'integration', position: { x: 800, y: 120 }, data: { label: 'Create PO', config: { integrationType: 'api', apiMethod: 'POST', apiUrl: '/api/purchase-orders' } } },
    { id: 'i2', type: 'integration', position: { x: 800, y: 260 }, data: { label: 'Alert Team', config: { integrationType: 'slack', slackChannel: '#logistics', slackMessage: 'Low stock alert!' } } },
    { id: 'response', type: 'response', position: { x: 1000, y: 200 }, data: { label: 'Response' } },
  ],
  edges: [
    { id: 'e1', source: 'request', target: 't1', style: { stroke: '#6366f1' } },
    { id: 'e2', source: 't1', target: 'd1', style: { stroke: '#6366f1' } },
    { id: 'e3', source: 'd1', target: 'l1', style: { stroke: '#6366f1' } },
    { id: 'e4', source: 'l1', target: 'i1', style: { stroke: '#6366f1' } },
    { id: 'e5', source: 'l1', target: 'i2', style: { stroke: '#6366f1' } },
    { id: 'e6', source: 'i1', target: 'response', style: { stroke: '#6366f1' } },
    { id: 'e7', source: 'i2', target: 'response', style: { stroke: '#6366f1' } },
  ],
  title: 'Inventory Check',
  category: 'Logistics'
};

// 5. Expense Reporting - Finance
const expenseReportingFlow = {
  nodes: [
    { id: 'request', type: 'request', position: { x: 50, y: 200 }, data: { label: 'Request' } },
    { id: 't1', type: 'trigger', position: { x: 200, y: 185 }, data: { label: 'Expense Submit', config: { triggerType: 'form', formName: 'expense_report' } } },
    { id: 'l1', type: 'logic', position: { x: 400, y: 185 }, data: { label: 'Amount > $500?', config: { field: 'amount', operator: 'greater', value: '500' } } },
    { id: 'i1', type: 'integration', position: { x: 600, y: 120 }, data: { label: 'Manager Review', config: { integrationType: 'email', emailTo: '{{manager.email}}', emailSubject: 'Expense Approval Needed' } } },
    { id: 'd1', type: 'data', position: { x: 600, y: 260 }, data: { label: 'Auto Approve', config: { operation: 'update', dataSource: 'expenses', updateValues: 'status = approved' } } },
    { id: 'i2', type: 'integration', position: { x: 800, y: 185 }, data: { label: 'Sync Finance', config: { integrationType: 'api', apiMethod: 'POST', apiUrl: '/api/finance/sync' } } },
    { id: 'response', type: 'response', position: { x: 1000, y: 200 }, data: { label: 'Response' } },
  ],
  edges: [
    { id: 'e1', source: 'request', target: 't1', style: { stroke: '#6366f1' } },
    { id: 'e2', source: 't1', target: 'l1', style: { stroke: '#6366f1' } },
    { id: 'e3', source: 'l1', target: 'i1', style: { stroke: '#ef4444' } },
    { id: 'e4', source: 'l1', target: 'd1', style: { stroke: '#10b981' } },
    { id: 'e5', source: 'i1', target: 'i2', style: { stroke: '#6366f1' } },
    { id: 'e6', source: 'd1', target: 'i2', style: { stroke: '#6366f1' } },
    { id: 'e7', source: 'i2', target: 'response', style: { stroke: '#6366f1' } },
  ],
  title: 'Expense Reporting',
  category: 'Finance'
};

// 6. Quality Check - Productions
const qualityCheckFlow = {
  nodes: [
    { id: 'request', type: 'request', position: { x: 50, y: 200 }, data: { label: 'Request' } },
    { id: 't1', type: 'trigger', position: { x: 200, y: 185 }, data: { label: 'Batch Complete', config: { triggerType: 'event', eventName: 'order_created' } } },
    { id: 'd1', type: 'data', position: { x: 400, y: 185 }, data: { label: 'Get Standards', config: { operation: 'fetch', dataSource: 'api', apiEndpoint: '/api/quality-standards' } } },
    { id: 'l1', type: 'logic', position: { x: 600, y: 185 }, data: { label: 'Meets Standard?', config: { field: 'quality_score', operator: 'greater_eq', value: '95' } } },
    { id: 'i1', type: 'integration', position: { x: 800, y: 120 }, data: { label: 'Approve Batch', config: { integrationType: 'api', apiMethod: 'POST', apiUrl: '/api/batches/approve' } } },
    { id: 'i2', type: 'integration', position: { x: 800, y: 260 }, data: { label: 'Flag Issue', config: { integrationType: 'slack', slackChannel: '#qa-team', slackMessage: 'Quality issue detected!' } } },
    { id: 'response', type: 'response', position: { x: 1000, y: 200 }, data: { label: 'Response' } },
  ],
  edges: [
    { id: 'e1', source: 'request', target: 't1', style: { stroke: '#6366f1' } },
    { id: 'e2', source: 't1', target: 'd1', style: { stroke: '#6366f1' } },
    { id: 'e3', source: 'd1', target: 'l1', style: { stroke: '#6366f1' } },
    { id: 'e4', source: 'l1', target: 'i1', style: { stroke: '#10b981' } },
    { id: 'e5', source: 'l1', target: 'i2', style: { stroke: '#ef4444' } },
    { id: 'e6', source: 'i1', target: 'response', style: { stroke: '#6366f1' } },
    { id: 'e7', source: 'i2', target: 'response', style: { stroke: '#6366f1' } },
  ],
  title: 'Quality Check',
  category: 'Productions'
};

// 7. Overtime Authorization - HR
const overtimeAuthFlow = {
  nodes: [
    { id: 'request', type: 'request', position: { x: 50, y: 200 }, data: { label: 'Request' } },
    { id: 't1', type: 'trigger', position: { x: 200, y: 185 }, data: { label: 'OT Request', config: { triggerType: 'form', formName: 'overtime_request' } } },
    { id: 'd1', type: 'data', position: { x: 400, y: 185 }, data: { label: 'Get Hours', config: { operation: 'fetch', dataSource: 'employees', fields: 'weekly_hours', filter: 'id = {{user.id}}' } } },
    { id: 'l1', type: 'logic', position: { x: 600, y: 185 }, data: { label: 'Under 50hrs?', config: { field: 'weekly_hours', operator: 'less', value: '50' } } },
    { id: 'i1', type: 'integration', position: { x: 800, y: 185 }, data: { label: 'Manager Approval', config: { integrationType: 'email', emailTo: '{{manager.email}}', emailSubject: 'OT Approval Request' } } },
    { id: 'd2', type: 'data', position: { x: 1000, y: 185 }, data: { label: 'Log Overtime', config: { operation: 'create', dataSource: 'employees', fields: 'overtime_hours, date, user_id' } } },
    { id: 'response', type: 'response', position: { x: 1200, y: 200 }, data: { label: 'Response' } },
  ],
  edges: [
    { id: 'e1', source: 'request', target: 't1', style: { stroke: '#6366f1' } },
    { id: 'e2', source: 't1', target: 'd1', style: { stroke: '#6366f1' } },
    { id: 'e3', source: 'd1', target: 'l1', style: { stroke: '#6366f1' } },
    { id: 'e4', source: 'l1', target: 'i1', style: { stroke: '#6366f1' } },
    { id: 'e5', source: 'i1', target: 'd2', style: { stroke: '#6366f1' } },
    { id: 'e6', source: 'd2', target: 'response', style: { stroke: '#6366f1' } },
  ],
  title: 'Overtime Authorization',
  category: 'HR'
};

// 8. Inventory Replenishment - Logistics
const inventoryReplenishFlow = {
  nodes: [
    { id: 'request', type: 'request', position: { x: 50, y: 200 }, data: { label: 'Request' } },
    { id: 't1', type: 'trigger', position: { x: 200, y: 185 }, data: { label: 'Stock Alert', config: { triggerType: 'event', eventName: 'stock_low' } } },
    { id: 'd1', type: 'data', position: { x: 400, y: 185 }, data: { label: 'Get Supplier', config: { operation: 'fetch', dataSource: 'api', apiEndpoint: '/api/suppliers/preferred' } } },
    { id: 'i1', type: 'integration', position: { x: 600, y: 185 }, data: { label: 'Create Order', config: { integrationType: 'api', apiMethod: 'POST', apiUrl: '/api/orders/create' } } },
    { id: 'i2', type: 'integration', position: { x: 800, y: 185 }, data: { label: 'Email Supplier', config: { integrationType: 'email', emailTo: '{{supplier.email}}', emailSubject: 'New Purchase Order' } } },
    { id: 'd2', type: 'data', position: { x: 1000, y: 185 }, data: { label: 'Update Status', config: { operation: 'update', dataSource: 'inventory', updateValues: 'status = pending_delivery' } } },
    { id: 'response', type: 'response', position: { x: 1200, y: 200 }, data: { label: 'Response' } },
  ],
  edges: [
    { id: 'e1', source: 'request', target: 't1', style: { stroke: '#6366f1' } },
    { id: 'e2', source: 't1', target: 'd1', style: { stroke: '#6366f1' } },
    { id: 'e3', source: 'd1', target: 'i1', style: { stroke: '#6366f1' } },
    { id: 'e4', source: 'i1', target: 'i2', style: { stroke: '#6366f1' } },
    { id: 'e5', source: 'i2', target: 'd2', style: { stroke: '#6366f1' } },
    { id: 'e6', source: 'd2', target: 'response', style: { stroke: '#6366f1' } },
  ],
  title: 'Inventory Replenishment',
  category: 'Logistics'
};

const defaultFlows = {
  'blank-canvas': blankCanvasFlow,
  'access-controls': accessControlsFlow,
  'data-backup': dataBackupFlow,
  'leave-request': leaveRequestFlow,
  'inventory-check': inventoryCheckFlow,
  'expense-reporting': expenseReportingFlow,
  'quality-check': qualityCheckFlow,
  'overtime-auth': overtimeAuthFlow,
  'inventory-replenish': inventoryReplenishFlow,
};

// Generate nodes from a template
const generateTemplateNodes = (template) => {
  const categoryFlowMapping = {
    'HR': leaveRequestFlow,
    'Finance': expenseReportingFlow,
    'Logistics': inventoryCheckFlow,
    'Security': accessControlsFlow,
    'Operations': dataBackupFlow,
  };

  // Get base flow for the category or use a default
  const baseFlow = categoryFlowMapping[template.category] || blankCanvasFlow;

  // Create customized nodes with the template name
  const nodes = baseFlow.nodes.map((node, index) => ({
    ...node,
    id: `template-${template.id}-${node.id}`,
    data: {
      ...node.data,
      label: index === 0 ? template.name : node.data.label,
    },
  }));

  // Update edges with new node IDs
  const edges = baseFlow.edges.map((edge) => ({
    ...edge,
    id: `template-${template.id}-${edge.id}`,
    source: `template-${template.id}-${edge.source}`,
    target: `template-${template.id}-${edge.target}`,
  }));

  return { nodes, edges };
};

const STORAGE_KEY = 'rule-intelligence-saved-rules';

const RuleCreationFlow = ({ selectedTemplate }) => {
  const [savedRules, setSavedRules] = useState({});
  const [selectedFlow, setSelectedFlow] = useState('blank-canvas');
  const [currentRuleName, setCurrentRuleName] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showSavedRules, setShowSavedRules] = useState(false);

  // Config modal state
  const [configModal, setConfigModal] = useState({ isOpen: false, nodeId: null, nodeType: null, nodeData: null });

  // Combine default flows with saved rules
  const exampleFlows = { ...defaultFlows, ...savedRules };

  const [nodes, setNodes, onNodesChange] = useNodesState(exampleFlows[selectedFlow]?.nodes || blankCanvasFlow.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(exampleFlows[selectedFlow]?.edges || blankCanvasFlow.edges);
  const [nodeIdCounter, setNodeIdCounter] = useState(10);

  // Load saved rules from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setSavedRules(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved rules:', e);
      }
    }
  }, []);

  // Handle selected template from Templates page
  useEffect(() => {
    if (selectedTemplate) {
      // Create a flow based on the template
      const templateNodes = generateTemplateNodes(selectedTemplate);
      setNodes(templateNodes.nodes);
      setEdges(templateNodes.edges);
      setCurrentRuleName(selectedTemplate.name);
      setSelectedFlow('template-' + selectedTemplate.id);
    }
  }, [selectedTemplate]);

  // Update node data handler
  const handleNodeUpdate = useCallback((nodeId, newData) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...newData } }
          : node
      )
    );
  }, [setNodes]);

  // Delete node handler
  const handleDeleteNode = useCallback((nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  }, [setNodes, setEdges]);

  // Open config modal
  const handleOpenConfig = useCallback((nodeId, nodeType, nodeData) => {
    setConfigModal({ isOpen: true, nodeId, nodeType, nodeData });
  }, []);

  // Save config
  const handleSaveConfig = useCallback((config) => {
    if (configModal.nodeId) {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === configModal.nodeId
            ? { ...node, data: { ...node.data, config } }
            : node
        )
      );
    }
  }, [configModal.nodeId, setNodes]);

  // Inject handlers into nodes
  const nodesWithHandlers = nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      onUpdate: handleNodeUpdate,
      onDelete: handleDeleteNode,
      onOpenConfig: handleOpenConfig,
    },
  }));

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, style: { stroke: '#6366f1' } }, eds)),
    [setEdges]
  );

  const loadFlow = (flowId) => {
    const flow = exampleFlows[flowId];
    if (flow) {
      setSelectedFlow(flowId);
      setNodes(flow.nodes);
      setEdges(flow.edges);
    }
  };

  const addNode = (type) => {
    const newNode = {
      id: `${type}-${nodeIdCounter}`,
      type,
      position: { x: 300 + Math.random() * 200, y: 200 + Math.random() * 100 },
      data: {
        label: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
        config: {},
        onUpdate: handleNodeUpdate,
        onDelete: handleDeleteNode,
        onOpenConfig: handleOpenConfig,
      },
    };
    setNodes((nds) => [...nds, newNode]);
    setNodeIdCounter((c) => c + 1);
  };

  const saveRule = () => {
    if (!currentRuleName.trim()) return;

    // Clean nodes data before saving (remove handlers)
    const cleanNodes = nodes.map(({ data, ...rest }) => ({
      ...rest,
      data: {
        label: data.label,
        config: data.config || {},
      },
    }));

    const ruleId = `custom-${currentRuleName.toLowerCase().replace(/\s+/g, '-')}`;
    const newRule = {
      nodes: cleanNodes,
      edges: [...edges],
      title: currentRuleName,
      category: 'Custom'
    };

    const updatedRules = { ...savedRules, [ruleId]: newRule };
    setSavedRules(updatedRules);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRules));

    setSelectedFlow(ruleId);
    setShowSaveModal(false);
    setCurrentRuleName('');
  };

  const deleteRule = (ruleId) => {
    const { [ruleId]: removed, ...remaining } = savedRules;
    setSavedRules(remaining);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(remaining));

    if (selectedFlow === ruleId) {
      loadFlow('blank-canvas');
    }
  };

  const savedRuleIds = Object.keys(savedRules);

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">Rule Creation - {exampleFlows[selectedFlow]?.title || 'Blank Canvas'}</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {Object.keys(defaultFlows).map((flowId) => (
            <button
              key={flowId}
              onClick={() => loadFlow(flowId)}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                border: selectedFlow === flowId ? '2px solid #6366f1' : '1px solid #e2e8f0',
                background: selectedFlow === flowId ? '#eef2ff' : flowId === 'blank-canvas' ? '#f0fdf4' : 'white',
                color: selectedFlow === flowId ? '#6366f1' : flowId === 'blank-canvas' ? '#16a34a' : '#64748b',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: flowId === 'blank-canvas' ? 600 : 400,
              }}
            >
              {flowId === 'blank-canvas' && <Plus size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />}
              {defaultFlows[flowId].title}
            </button>
          ))}

          {savedRuleIds.length > 0 && (
            <button
              onClick={() => setShowSavedRules(!showSavedRules)}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                border: '1px solid #f59e0b',
                background: '#fffbeb',
                color: '#d97706',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Saved Rules ({savedRuleIds.length})
            </button>
          )}
        </div>
      </div>

      {/* Saved Rules Dropdown */}
      {showSavedRules && savedRuleIds.length > 0 && (
        <div style={{
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          padding: '12px 16px',
          background: '#fffbeb',
          borderRadius: 8,
          marginBottom: 16
        }}>
          {savedRuleIds.map((ruleId) => (
            <div key={ruleId} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <button
                onClick={() => {
                  loadFlow(ruleId);
                  setShowSavedRules(false);
                }}
                style={{
                  padding: '6px 12px',
                  borderRadius: 6,
                  border: selectedFlow === ruleId ? '2px solid #f59e0b' : '1px solid #fcd34d',
                  background: selectedFlow === ruleId ? '#fef3c7' : 'white',
                  color: '#92400e',
                  cursor: 'pointer',
                  fontSize: 12,
                }}
              >
                {savedRules[ruleId].title}
              </button>
              <button
                onClick={() => deleteRule(ruleId)}
                style={{
                  padding: '4px',
                  borderRadius: 4,
                  border: 'none',
                  background: '#fee2e2',
                  color: '#dc2626',
                  cursor: 'pointer',
                }}
                title="Delete rule"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flow-container">
        <ReactFlow
          nodes={nodesWithHandlers}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          style={{ background: '#fafbfc' }}
          deleteKeyCode={['Backspace', 'Delete']}
        >
          <Background color="#e2e8f0" gap={20} />
        </ReactFlow>

        {/* Toolbar */}
        <div className="flow-toolbar">
          <button className="flow-card-btn" onClick={() => addNode('trigger')}>
            <div className="flow-card-icon trigger">
              <Play size={14} />
            </div>
            Trigger Cards
            <ChevronDown size={16} />
          </button>
          <button className="flow-card-btn" onClick={() => addNode('logic')}>
            <div className="flow-card-icon logic">
              <Globe size={14} />
            </div>
            Logic Cards
            <ChevronDown size={16} />
          </button>
          <button className="flow-card-btn" onClick={() => addNode('data')}>
            <div className="flow-card-icon data">
              <Database size={14} />
            </div>
            Data Cards
            <ChevronDown size={16} />
          </button>
          <button className="flow-card-btn" onClick={() => addNode('integration')}>
            <div className="flow-card-icon integration">
              <Link2 size={14} />
            </div>
            Integration Cards
            <ChevronDown size={16} />
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="flow-bottom-bar">
          <button className="flow-action-btn" onClick={() => setShowSaveModal(true)}>
            <Save size={16} />
            Save Rule
          </button>
          <button className="flow-action-btn">
            <Play size={16} />
            Test Rule
          </button>
          <button className="flow-action-btn" onClick={() => loadFlow(selectedFlow)}>
            <RefreshCw size={16} />
            Reset
          </button>
          <button className="flow-action-btn">
            <HelpCircle size={16} />
            Help
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="zoom-controls">
          <button className="zoom-btn">
            <ZoomIn size={18} />
          </button>
          <button className="zoom-btn">
            <ZoomOut size={18} />
          </button>
        </div>
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            background: 'white',
            padding: 24,
            borderRadius: 12,
            width: 400,
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          }}>
            <h3 style={{ margin: '0 0 16px', color: '#1e293b' }}>Save Rule</h3>
            <input
              type="text"
              placeholder="Enter rule name..."
              value={currentRuleName}
              onChange={(e) => setCurrentRuleName(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 8,
                border: '1px solid #e2e8f0',
                fontSize: 14,
                marginBottom: 16,
                boxSizing: 'border-box',
              }}
              autoFocus
            />
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setShowSaveModal(false);
                  setCurrentRuleName('');
                }}
                style={{
                  padding: '10px 20px',
                  borderRadius: 8,
                  border: '1px solid #e2e8f0',
                  background: 'white',
                  color: '#64748b',
                  cursor: 'pointer',
                  fontSize: 14,
                }}
              >
                Cancel
              </button>
              <button
                onClick={saveRule}
                disabled={!currentRuleName.trim()}
                style={{
                  padding: '10px 20px',
                  borderRadius: 8,
                  border: 'none',
                  background: currentRuleName.trim() ? '#6366f1' : '#cbd5e1',
                  color: 'white',
                  cursor: currentRuleName.trim() ? 'pointer' : 'not-allowed',
                  fontSize: 14,
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Config Modal */}
      <ConfigModal
        isOpen={configModal.isOpen}
        onClose={() => setConfigModal({ isOpen: false, nodeId: null, nodeType: null, nodeData: null })}
        nodeType={configModal.nodeType}
        nodeData={configModal.nodeData}
        onSave={handleSaveConfig}
      />
    </div>
  );
};

export default RuleCreationFlow;
