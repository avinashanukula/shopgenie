// ============================================================
// Sidebar – Navigation component (minimal light redesign)
// ============================================================
import { MessageSquare, Clock, Inbox, Sparkles, Zap } from 'lucide-react';
import { BUSINESS } from '../data/products';

const NAV_ITEMS = [
  { id: 'inbox',   label: 'Inbox',   icon: Inbox },
  { id: 'chat',    label: 'Chat',    icon: MessageSquare },
  { id: 'history', label: 'History', icon: Clock },
];

export default function Sidebar({ activeTab, onTabChange, totalUnread }) {
  return (
    <aside style={{
      width: '210px',
      minWidth: '210px',
      background: '#ffffff',
      borderRight: '1px solid #ececf1',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 16px 14px', borderBottom: '1px solid #f0f0f5' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '12px' }}>
          <div className="genie-avatar" style={{
            width: '30px', height: '30px', borderRadius: '9px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Sparkles size={15} color="white" />
          </div>
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#1a1a2e', letterSpacing: '-0.01em' }}>
            Shop Genie
          </span>
        </div>

        {/* Active business chip */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '7px',
          padding: '7px 10px',
          background: '#f5f5fa',
          borderRadius: '8px',
          border: '1px solid #eaeaf5',
        }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '7px',
            background: 'linear-gradient(135deg,#e0e7ff,#c7d2fe)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '10px', fontWeight: 700, color: '#4f46e5', flexShrink: 0,
          }}>
            T&C
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#9ca3af', lineHeight: 1.2 }}>Business</div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#1a1a2e', lineHeight: 1.3 }}>{BUSINESS.name}</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ padding: '10px 10px', flex: 1 }}>
        <p style={{ fontSize: '10px', fontWeight: 600, color: '#c4c4d4', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '4px', padding: '0 4px' }}>
          Menu
        </p>
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            id={`nav-${id}`}
            className={`nav-item ${activeTab === id ? 'active' : ''}`}
            onClick={() => onTabChange(id)}
          >
            <Icon size={15} />
            <span style={{ flex: 1 }}>{label}</span>
            {id === 'inbox' && totalUnread > 0 && (
              <span style={{
                background: '#4f46e5', color: 'white',
                fontSize: '10px', fontWeight: 700,
                padding: '1px 6px', borderRadius: '99px',
              }}>
                {totalUnread}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* AI Status */}
      <div style={{ padding: '12px 10px', borderTop: '1px solid #f0f0f5' }}>
        <div style={{
          background: '#f5f5fa',
          border: '1px solid #eaeaf5',
          borderRadius: '9px',
          padding: '10px 11px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '3px' }}>
            <Zap size={11} color="#4f46e5" fill="#4f46e5" />
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#4f46e5' }}>AI Auto-Reply</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
            <span style={{ fontSize: '11px', color: '#6b7280' }}>Active & running</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
