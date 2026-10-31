// ============================================================
// InboxView.jsx – Clean customer inquiries list
// ============================================================
import { useState } from 'react';
import { Search, Plus, Phone } from 'lucide-react';
import { formatRelativeTime } from '../utils/time';

function stripMarkdown(text) {
  return (text || '').replace(/\*(.*?)\*/g, '$1').replace(/_(.*?)_/g, '$1');
}

export default function InboxView({ conversations, selectedId, onSelect, onSimulate }) {
  const [search, setSearch] = useState('');

  const filtered = conversations.filter(c =>
    c.customerName.toLowerCase().includes(search.toLowerCase()) ||
    c.customerPhone.includes(search) ||
    (c.lastMessage && c.lastMessage.toLowerCase().includes(search.toLowerCase()))
  );

  const totalUnread = conversations.reduce((s, c) => s + (c.unread || 0), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#ffffff' }}>
      {/* Header */}
      <div style={{ padding: '16px', borderBottom: '1px solid #e2e8f0', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div>
            <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
              Inbox
            </h2>
            <span style={{ fontSize: '11.5px', color: '#64748b' }}>
              {totalUnread > 0 ? `${totalUnread} unread` : 'All caught up'}
            </span>
          </div>

          <button
            onClick={onSimulate}
            style={{
              background: '#2563eb',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              padding: '6px 10px',
              fontSize: '11.5px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
            }}
          >
            <Plus size={12} />
            <span>New</span>
          </button>
        </div>

        {/* Search */}
        <div style={{ position: 'relative' }}>
          <Search size={13} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            placeholder="Search conversations..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '7px 10px 7px 30px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              background: '#f8fafc',
              fontSize: '12.5px',
              color: '#0f172a',
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Conversation items */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {filtered.length === 0 ? (
          <div style={{ padding: '36px 16px', textAlign: 'center', color: '#94a3b8', fontSize: '12.5px' }}>
            No conversations found
          </div>
        ) : (
          filtered.map(conv => {
            const isSelected = selectedId === conv.id;
            return (
              <div
                key={conv.id}
                onClick={() => onSelect(conv.id)}
                style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #f1f5f9',
                  background: isSelected ? '#eff6ff' : 'transparent',
                  borderLeft: isSelected ? '3px solid #2563eb' : '3px solid transparent',
                  cursor: 'pointer',
                  transition: 'background 0.1s',
                }}
              >
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    background: '#e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '12px',
                    color: '#334155',
                    flexShrink: 0,
                  }}>
                    {conv.avatar}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                      <span style={{
                        fontSize: '13px',
                        fontWeight: conv.unread > 0 ? 700 : 600,
                        color: '#0f172a',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                        {conv.customerName}
                      </span>
                      <span style={{ fontSize: '10.5px', color: '#94a3b8', flexShrink: 0, marginLeft: '6px' }}>
                        {formatRelativeTime(conv.lastTime)}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                      <span style={{
                        fontSize: '12px',
                        color: conv.unread > 0 ? '#0f172a' : '#64748b',
                        fontWeight: conv.unread > 0 ? 500 : 400,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        flex: 1,
                      }}>
                        {stripMarkdown(conv.lastMessage)}
                      </span>

                      {conv.unread > 0 && (
                        <span style={{
                          background: '#2563eb',
                          color: '#ffffff',
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '1px 5px',
                          borderRadius: '999px',
                        }}>
                          {conv.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
