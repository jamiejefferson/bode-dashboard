'use client';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export default function Sidebar({ activeView, setActiveView }: SidebarProps) {
  const views = [
    {
      id: 'operator',
      title: 'Operator View',
      description: 'Daily KPIs, maintenance, tasks'
    },
    {
      id: 'investor',
      title: 'Investor View',
      description: 'NOI trends, valuations, ESG'
    },
    {
      id: 'site-manager',
      title: 'Site Manager',
      description: 'Work orders, occupancy, staff'
    }
  ];

  const quickActions = [
    { title: 'Create Maintenance Ticket' },
    { title: 'Generate Report' },
    { title: 'Check Compliance' }
  ];

  const navigationItems = [
    { id: 'dashboard', title: 'Dashboard', active: activeView === 'operator' },
    { id: 'properties', title: 'Properties', active: false },
    { id: 'tenants', title: 'Tenants', active: false },
    { id: 'maintenance', title: 'Maintenance', active: false },
    { id: 'reports', title: 'Reports', active: false }
  ];

  return (
    <div className="bode-sidebar">
      {/* Brand */}
      <div style={{ padding: 'var(--space-5)', borderBottom: 'var(--border-1)', height: 'calc(2 * var(--space-5) + 32px)', display: 'flex', alignItems: 'center', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            background: 'var(--accent-green-1)', 
            borderRadius: 'var(--radius-md)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: 'var(--ink-1)', 
            fontWeight: 'var(--fw-bold)' 
          }}>
            B
          </div>
          <div>
            <h2 style={{ fontSize: 'var(--fs-lg)', fontWeight: 'var(--fw-semibold)', color: 'var(--ink-1)', margin: 0 }}>Bode</h2>
            <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--ink-2)', margin: 0 }}>AI-Powered Management</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div style={{ padding: 'var(--space-5)', borderBottom: 'var(--border-1)' }}>
        <h3 style={{ fontSize: 'var(--fs-xs)', fontWeight: 'var(--fw-semibold)', color: 'var(--ink-2)', marginBottom: 'var(--space-3)', textTransform: 'uppercase' }}>
          Navigation
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {navigationItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                if (item.id === 'dashboard') {
                  setActiveView('operator');
                }
                // Add other navigation handlers as needed
              }}
              style={{
                width: '100%',
                padding: 'var(--space-2) var(--space-3)',
                textAlign: 'left',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                background: item.active ? 'var(--accent-green-1)' : 'transparent',
                color: item.active ? 'var(--ink-1)' : 'var(--ink-2)',
                cursor: 'pointer',
                fontSize: 'var(--fs-sm)',
                fontWeight: item.active ? 'var(--fw-semibold)' : 'var(--fw-regular)',
                transition: 'all var(--dur-1) var(--ease-out)'
              }}
              onMouseEnter={(e) => {
                if (!item.active) {
                  e.currentTarget.style.background = 'var(--ui-2)';
                  e.currentTarget.style.color = 'var(--ink-1)';
                }
              }}
              onMouseLeave={(e) => {
                if (!item.active) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--ink-2)';
                }
              }}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>

      {/* Dashboard Views */}
      <div style={{ padding: 'var(--space-5)' }}>
        <h3 style={{ fontSize: 'var(--fs-xs)', fontWeight: 'var(--fw-semibold)', color: 'var(--ink-2)', marginBottom: 'var(--space-3)', textTransform: 'uppercase' }}>
          Dashboard Views
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {views.map((view) => (
            <button
              key={view.id}
              onClick={() => setActiveView(view.id)}
              style={{
                width: '100%',
                padding: 'var(--space-3)',
                textAlign: 'left',
                border: 'var(--border-1)',
                borderRadius: 'var(--radius-md)',
                background: activeView === view.id ? 'var(--accent-green-1)' : 'var(--ui-1)',
                cursor: 'pointer',
                transition: 'all var(--dur-1) var(--ease-out)'
              }}
            >
              <div style={{ fontWeight: 'var(--fw-semibold)', fontSize: 'var(--fs-sm)', color: 'var(--ink-1)' }}>{view.title}</div>
              <div style={{ fontSize: 'var(--fs-xs)', color: activeView === view.id ? 'var(--ink-1)' : 'var(--ink-2)' }}>{view.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ padding: 'var(--space-5)' }}>
        <h3 style={{ fontSize: 'var(--fs-xs)', fontWeight: 'var(--fw-semibold)', color: 'var(--ink-2)', marginBottom: 'var(--space-3)', textTransform: 'uppercase' }}>
          Quick Actions
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {quickActions.map((action, index) => (
            <button
              key={index}
              style={{
                width: '100%',
                padding: 'var(--space-3)',
                textAlign: 'left',
                border: 'var(--border-1)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--ui-1)',
                cursor: 'pointer',
                fontSize: 'var(--fs-sm)',
                color: 'var(--ink-1)',
                transition: 'all var(--dur-1) var(--ease-out)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--ui-2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--ui-1)';
              }}
            >
              {action.title}
            </button>
          ))}
        </div>
      </div>

      {/* AI Status */}
      <div style={{ padding: 'var(--space-5)' }}>
        <div style={{ 
          padding: 'var(--space-3)', 
          background: 'var(--accent-green-1)', 
          border: 'var(--border-1)', 
          borderRadius: 'var(--radius-md)' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
            <div style={{ width: '8px', height: '8px', background: 'var(--ink-1)', borderRadius: '50%' }}></div>
            <span style={{ fontSize: 'var(--fs-xs)', fontWeight: 'var(--fw-semibold)', color: 'var(--ink-1)' }}>AI Assistant Active</span>
          </div>
          <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--ink-1)', margin: 0 }}>Ready to help with queries and automation</p>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: 'var(--space-5)', borderTop: 'var(--border-1)', marginTop: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--fs-xs)', color: 'var(--ink-2)' }}>
          <span>Last updated: 2 min ago</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
            <div style={{ width: '8px', height: '8px', background: 'var(--accent-green-1)', borderRadius: '50%' }}></div>
            <span>Live</span>
          </div>
        </div>
      </div>
    </div>
  );
}
