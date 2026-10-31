// ============================================================
// HeaderNav.jsx – Citebound luxury minimal top navigation bar
// ============================================================
import { Inbox, MessageSquare, BookOpen, Clock, BarChart3, Plus } from 'lucide-react';
import { BUSINESS } from '../data/products';

export default function HeaderNav({ activeTab, onTabChange, totalUnread, onOpenSimulate }) {
  const navItems = [
    { id: 'inbox', label: 'Inbox', icon: Inbox, count: totalUnread },
    { id: 'chat', label: 'Chat Demo', icon: MessageSquare },
    { id: 'knowledge', label: 'Catalog & AI Data', icon: BookOpen },
    { id: 'history', label: 'History Archive', icon: Clock },
    { id: 'performance', label: 'AI Accuracy', icon: BarChart3 },
  ];

  return (
    <header style={{
      height: '68px',
      background: '#f8f7f4',
      borderBottom: '1px solid #e6e4df',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px',
      position: 'sticky',
      top: 0,
      zIndex: 40,
    }}>
      {/* Brand Logo - Citebound Soundbars + Fraunces Wordmark */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '2.5px',
          height: '18px',
          paddingBottom: '2px',
        }}>
          <span style={{ width: '3px', height: '10px', background: '#e63312', borderRadius: '1px' }} />
          <span style={{ width: '3px', height: '17px', background: '#0a0a0a', borderRadius: '1px' }} />
          <span style={{ width: '3px', height: '12px', background: '#0a0a0a', borderRadius: '1px' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span className="font-serif" style={{
            fontSize: '20px',
            fontWeight: 600,
            color: '#0a0a0a',
            letterSpacing: '-0.02em',
          }}>
            Shop Genie.
          </span>
          <span className="font-mono" style={{
            fontSize: '10px',
            color: '#8c8472',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>
            AI Agent
          </span>
        </div>
      </div>

      {/* Nav Tabs - Citebound minimal pill styling */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        background: '#edeae3',
        padding: '4px',
        borderRadius: '9999px',
        border: '1px solid #e6e4df',
      }}>
        {navItems.map(item => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => onTabChange(item.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                padding: '6px 14px',
                borderRadius: '9999px',
                border: 'none',
                background: isActive ? '#0a0a0a' : 'transparent',
                color: isActive ? '#ffffff' : '#5e5e5e',
                fontFamily: 'Inter, sans-serif',
                fontSize: '12.5px',
                fontWeight: isActive ? 600 : 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <Icon size={13} color={isActive ? '#ffffff' : '#777'} />
              <span>{item.label}</span>
              {Boolean(item.count && item.count > 0) && (
                <span style={{
                  background: '#e63312',
                  color: '#ffffff',
                  fontSize: '9.5px',
                  fontWeight: 700,
                  fontFamily: 'JetBrains Mono, monospace',
                  padding: '1px 5px',
                  borderRadius: '999px',
                  marginLeft: '2px',
                }}>
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Right Controls - Live Store status & Citebound Black Pill Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Active Store Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          padding: '5px 12px',
          background: '#ffffff',
          border: '1px solid #e6e4df',
          borderRadius: '9999px',
        }}>
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#2e5d43',
            display: 'inline-block',
          }} />
          <span style={{ fontSize: '11.5px', fontWeight: 500, color: '#0a0a0a' }}>
            {BUSINESS.name}
          </span>
          <span className="font-mono" style={{ fontSize: '9px', color: '#8c8472', textTransform: 'uppercase' }}>
            Live
          </span>
        </div>

        {/* Citebound Style Action Button with Soundwave */}
        <button
          id="header-simulate-btn"
          onClick={onOpenSimulate}
          className="btn-dark"
          style={{ padding: '8px 16px', fontSize: '12.5px' }}
        >
          <Plus size={13} />
          <span>Simulate Customer</span>
          <div className="sound-bars" style={{ marginLeft: '4px' }}>
            <span className="sound-bar sound-bar-1" />
            <span className="sound-bar sound-bar-2" style={{ background: '#e63312' }} />
            <span className="sound-bar sound-bar-3" />
          </div>
        </button>
      </div>
    </header>
  );
}
