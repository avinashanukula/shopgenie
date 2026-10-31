// ============================================================
// HistoryView.jsx – Clean, minimal conversation history
// ============================================================
import { useState } from 'react';
import { Search, ChevronRight, MessageSquare, Phone } from 'lucide-react';
import { formatRelativeTime, formatMessageTime } from '../utils/time';

function stripMarkdown(text) {
  return (text || '').replace(/\*(.*?)\*/g, '$1').replace(/_(.*?)_/g, '$1');
}

export default function HistoryView({ conversations, onSelectConversation }) {
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const filtered = conversations.filter(c =>
    c.customerName.toLowerCase().includes(search.toLowerCase()) ||
    c.customerPhone.includes(search) ||
    c.messages.some(m => m.text.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ padding: '24px 32px', maxWidth: '880px', margin: '0 auto', width: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
            Conversation History
          </h2>
          <p style={{ fontSize: '12.5px', color: '#64748b', margin: '2px 0 0' }}>
            Previous customer chats and automated replies
          </p>
        </div>

        <div style={{ position: 'relative', width: '240px' }}>
          <Search size={13} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search past chats..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '6px 10px 6px 30px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              fontSize: '12.5px',
              color: '#0f172a',
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {filtered.map(conv => {
          const isExpanded = expandedId === conv.id;
          return (
            <div
              key={conv.id}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <div
                onClick={() => setExpandedId(isExpanded ? null : conv.id)}
                style={{
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
                  }}>
                    {conv.avatar}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#0f172a' }}>
                        {conv.customerName}
                      </span>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>
                        {conv.customerPhone}
                      </span>
                    </div>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>
                      {stripMarkdown(conv.lastMessage)}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                    {formatRelativeTime(conv.lastTime)}
                  </span>
                  <span style={{
                    fontSize: '11px',
                    background: '#f1f5f9',
                    padding: '2px 7px',
                    borderRadius: '4px',
                    color: '#475569',
                  }}>
                    {conv.messages.length} messages
                  </span>
                  <ChevronRight size={14} color="#94a3b8" style={{
                    transform: isExpanded ? 'rotate(90deg)' : 'none',
                    transition: 'transform 0.15s',
                  }} />
                </div>
              </div>

              {isExpanded && (
                <div style={{
                  borderTop: '1px solid #f1f5f9',
                  background: '#f8fafc',
                  padding: '14px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}>
                  {conv.messages.map(msg => (
                    <div
                      key={msg.id}
                      style={{
                        display: 'flex',
                        flexDirection: msg.isAI ? 'row-reverse' : 'row',
                        gap: '6px',
                      }}
                    >
                      <div style={{
                        maxWidth: '75%',
                        background: msg.isAI ? '#1e293b' : '#ffffff',
                        color: msg.isAI ? '#ffffff' : '#0f172a',
                        border: msg.isAI ? 'none' : '1px solid #e2e8f0',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        fontSize: '12.5px',
                        lineHeight: 1.45,
                      }}>
                        <div style={{ fontSize: '10px', opacity: 0.7, marginBottom: '2px' }}>
                          {msg.isAI ? 'Shop Genie' : conv.customerName} · {formatMessageTime(msg.time)}
                        </div>
                        <div>{stripMarkdown(msg.text)}</div>
                      </div>
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                    <button
                      onClick={() => onSelectConversation(conv.id)}
                      style={{
                        background: '#2563eb',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Open in Chat
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
