// ============================================================
// App.jsx – Fully responsive (Mobile, Tablet, Desktop)
// ============================================================
import { useState, useCallback, useEffect } from 'react';
import { Inbox, MessageSquare, History, Plus, Menu, X } from 'lucide-react';
import InboxView from './components/InboxView';
import ChatView from './components/ChatView';
import HistoryView from './components/HistoryView';
import SimulateModal from './components/SimulateModal';
import { loadConversations, saveConversations, generateId } from './data/conversations';
import { generateAIReply } from './data/aiEngine';
import { BUSINESS } from './data/products';
import { now } from './utils/time';

export default function App() {
  const [activeTab, setActiveTab] = useState('inbox');
  const [conversations, setConversations] = useState(() => loadConversations());
  const [selectedConvId, setSelectedConvId] = useState(() => {
    const list = loadConversations();
    return list && list.length > 0 ? list[0].id : null;
  });
  const [showSimulateModal, setShowSimulateModal] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Responsive breakpoints
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  useEffect(() => {
    saveConversations(conversations);
  }, [conversations]);

  const totalUnread = conversations.reduce((sum, c) => sum + (c.unread || 0), 0);
  const selectedConversation = conversations.find(c => c.id === selectedConvId) || conversations[0] || null;

  const handleSelectConversation = useCallback((convId) => {
    setSelectedConvId(convId);
    setActiveTab('chat');
    setConversations(prev =>
      prev.map(c => c.id === convId ? { ...c, unread: 0 } : c)
    );
  }, []);

  const handleSendMessage = useCallback((convId, text, sender) => {
    const messageId = generateId();
    const timestamp = now();
    setConversations(prev =>
      prev.map(c => {
        if (c.id !== convId) return c;
        return {
          ...c,
          messages: [
            ...c.messages,
            { id: messageId, sender, text, time: timestamp, isAI: false },
          ],
          lastMessage: text,
          lastTime: timestamp,
          unread: 0,
        };
      })
    );
  }, []);

  const handleAIReply = useCallback((convId, text) => {
    const messageId = generateId();
    const timestamp = now();
    setConversations(prev =>
      prev.map(c => {
        if (c.id !== convId) return c;
        return {
          ...c,
          messages: [
            ...c.messages,
            { id: messageId, sender: 'ai', text, time: timestamp, isAI: true },
          ],
          lastMessage: text,
          lastTime: timestamp,
        };
      })
    );
  }, []);

  const handleSimulatedConversation = useCallback(async (newConv) => {
    setConversations(prev => [newConv, ...prev]);
    setSelectedConvId(newConv.id);
    setActiveTab('chat');

    const firstMessage = newConv.messages[0]?.text;
    if (firstMessage) {
      const aiReply = await generateAIReply(firstMessage, []);
      const messageId = generateId();
      const timestamp = now();
      setConversations(prev =>
        prev.map(c => {
          if (c.id !== newConv.id) return c;
          return {
            ...c,
            messages: [
              ...c.messages,
              { id: messageId, sender: 'ai', text: aiReply, time: timestamp, isAI: true },
            ],
            lastMessage: aiReply,
            lastTime: timestamp,
            unread: 0,
          };
        })
      );
    }
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      height: '100dvh',
      background: '#f1f3f5',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#1a1d20',
      overflow: 'hidden',
    }}>
      {/* ── DESKTOP & TABLET SIDEBAR ── */}
      {!isMobile && (
        <aside style={{
          width: isTablet ? '72px' : '220px',
          minWidth: isTablet ? '72px' : '220px',
          background: '#ffffff',
          borderRight: '1px solid #e9ecef',
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.2s ease',
        }}>
          {/* Header */}
          <div style={{
            padding: isTablet ? '18px 0' : '18px 16px 14px',
            borderBottom: '1px solid #f1f3f5',
            display: 'flex',
            flexDirection: 'column',
            alignItems: isTablet ? 'center' : 'stretch',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '9px',
              justifyContent: isTablet ? 'center' : 'flex-start',
              marginBottom: isTablet ? '0' : '12px',
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '14px',
                flexShrink: 0,
              }}>
                SG
              </div>
              {!isTablet && (
                <div>
                  <h1 style={{ fontSize: '14px', fontWeight: 700, margin: 0, color: '#111827' }}>Shop Genie</h1>
                  <p style={{ fontSize: '11px', color: '#6b7280', margin: 0 }}>Customer Support</p>
                </div>
              )}
            </div>

            {!isTablet && (
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '7px',
                padding: '6px 10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#0f172a' }}>{BUSINESS.name}</span>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e' }} />
              </div>
            )}
          </div>

          {/* Navigation Items */}
          <nav style={{ padding: '12px 8px', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <button
              title="Inbox"
              onClick={() => {
                setActiveTab('inbox');
                if (!selectedConvId && conversations.length > 0) setSelectedConvId(conversations[0].id);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: isTablet ? 'center' : 'flex-start',
                gap: '10px',
                padding: isTablet ? '10px' : '8px 12px',
                borderRadius: '7px',
                border: 'none',
                background: activeTab === 'inbox' ? '#eff6ff' : 'transparent',
                color: activeTab === 'inbox' ? '#1d4ed8' : '#475569',
                fontWeight: activeTab === 'inbox' ? 600 : 500,
                fontSize: '13px',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              <Inbox size={17} color={activeTab === 'inbox' ? '#1d4ed8' : '#64748b'} />
              {!isTablet && <span style={{ flex: 1, textAlign: 'left' }}>Inbox</span>}
              {!isTablet && totalUnread > 0 && (
                <span style={{
                  background: '#2563eb',
                  color: '#ffffff',
                  fontSize: '10.5px',
                  fontWeight: 700,
                  padding: '1px 6px',
                  borderRadius: '999px',
                }}>
                  {totalUnread}
                </span>
              )}
            </button>

            <button
              title="Chat"
              onClick={() => {
                setActiveTab('chat');
                if (!selectedConvId && conversations.length > 0) setSelectedConvId(conversations[0].id);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: isTablet ? 'center' : 'flex-start',
                gap: '10px',
                padding: isTablet ? '10px' : '8px 12px',
                borderRadius: '7px',
                border: 'none',
                background: activeTab === 'chat' ? '#eff6ff' : 'transparent',
                color: activeTab === 'chat' ? '#1d4ed8' : '#475569',
                fontWeight: activeTab === 'chat' ? 600 : 500,
                fontSize: '13px',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              <MessageSquare size={17} color={activeTab === 'chat' ? '#1d4ed8' : '#64748b'} />
              {!isTablet && <span style={{ flex: 1, textAlign: 'left' }}>Chat</span>}
            </button>

            <button
              title="History"
              onClick={() => setActiveTab('history')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: isTablet ? 'center' : 'flex-start',
                gap: '10px',
                padding: isTablet ? '10px' : '8px 12px',
                borderRadius: '7px',
                border: 'none',
                background: activeTab === 'history' ? '#eff6ff' : 'transparent',
                color: activeTab === 'history' ? '#1d4ed8' : '#475569',
                fontWeight: activeTab === 'history' ? 600 : 500,
                fontSize: '13px',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              <History size={17} color={activeTab === 'history' ? '#1d4ed8' : '#64748b'} />
              {!isTablet && <span style={{ flex: 1, textAlign: 'left' }}>History</span>}
            </button>
          </nav>

          {/* Action button */}
          <div style={{ padding: '12px 8px', borderTop: '1px solid #f1f3f5' }}>
            <button
              title="Simulate Customer"
              onClick={() => setShowSimulateModal(true)}
              style={{
                width: '100%',
                background: '#0f172a',
                color: '#ffffff',
                border: 'none',
                borderRadius: '7px',
                padding: isTablet ? '10px' : '8px 12px',
                fontSize: '12px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                cursor: 'pointer',
              }}
            >
              <Plus size={15} />
              {!isTablet && <span>Simulate</span>}
            </button>
          </div>
        </aside>
      )}

      {/* ── MOBILE TOP BAR ── */}
      {isMobile && (
        <header style={{
          height: '52px',
          background: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '7px',
              background: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '12px',
            }}>
              SG
            </div>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Shop Genie</span>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
          </div>

          <button
            onClick={() => setShowSimulateModal(true)}
            style={{
              background: '#0f172a',
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
            <Plus size={13} />
            <span>Simulate</span>
          </button>
        </header>
      )}

      {/* ── MAIN CONTENT AREA ── */}
      <main style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>
        {/* On Mobile: Switch between full views */}
        {isMobile ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
            {activeTab === 'inbox' && (
              <InboxView
                conversations={conversations}
                selectedId={selectedConvId}
                onSelect={handleSelectConversation}
                onSimulate={() => setShowSimulateModal(true)}
              />
            )}

            {activeTab === 'chat' && (
              <ChatView
                conversation={selectedConversation}
                onSendMessage={handleSendMessage}
                onAIReply={handleAIReply}
                onBack={() => setActiveTab('inbox')}
              />
            )}

            {activeTab === 'history' && (
              <HistoryView
                conversations={conversations}
                onSelectConversation={(convId) => {
                  setSelectedConvId(convId);
                  setActiveTab('chat');
                }}
              />
            )}
          </div>
        ) : (
          /* On Tablet & Desktop: Two-pane split */
          <div style={{ flex: 1, display: 'flex', height: '100%', overflow: 'hidden' }}>
            {(activeTab === 'inbox' || activeTab === 'chat') && (
              <>
                <div style={{
                  width: isTablet ? '270px' : '320px',
                  minWidth: isTablet ? '270px' : '320px',
                  height: '100%',
                  background: '#ffffff',
                  borderRight: '1px solid #e9ecef',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  <InboxView
                    conversations={conversations}
                    selectedId={selectedConvId}
                    onSelect={handleSelectConversation}
                    onSimulate={() => setShowSimulateModal(true)}
                  />
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', background: '#f8fafc' }}>
                  <ChatView
                    conversation={selectedConversation}
                    onSendMessage={handleSendMessage}
                    onAIReply={handleAIReply}
                  />
                </div>
              </>
            )}

            {activeTab === 'history' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', background: '#ffffff', overflowY: 'auto' }}>
                <HistoryView
                  conversations={conversations}
                  onSelectConversation={(convId) => {
                    setSelectedConvId(convId);
                    setActiveTab('chat');
                  }}
                />
              </div>
            )}
          </div>
        )}
      </main>

      {/* ── MOBILE BOTTOM NAVIGATION BAR ── */}
      {isMobile && (
        <nav style={{
          height: '56px',
          background: '#ffffff',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '0 8px',
          flexShrink: 0,
          zIndex: 50,
        }}>
          <button
            onClick={() => setActiveTab('inbox')}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              padding: '6px 16px',
              color: activeTab === 'inbox' ? '#2563eb' : '#64748b',
              fontWeight: activeTab === 'inbox' ? 600 : 500,
              fontSize: '11px',
              cursor: 'pointer',
              position: 'relative',
            }}
          >
            <Inbox size={18} />
            <span>Inbox</span>
            {totalUnread > 0 && (
              <span style={{
                position: 'absolute',
                top: '2px',
                right: '18px',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: '#2563eb',
              }} />
            )}
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              padding: '6px 16px',
              color: activeTab === 'chat' ? '#2563eb' : '#64748b',
              fontWeight: activeTab === 'chat' ? 600 : 500,
              fontSize: '11px',
              cursor: 'pointer',
            }}
          >
            <MessageSquare size={18} />
            <span>Chat</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              padding: '6px 16px',
              color: activeTab === 'history' ? '#2563eb' : '#64748b',
              fontWeight: activeTab === 'history' ? 600 : 500,
              fontSize: '11px',
              cursor: 'pointer',
            }}
          >
            <History size={18} />
            <span>History</span>
          </button>
        </nav>
      )}

      {/* Simulate Modal */}
      {showSimulateModal && (
        <SimulateModal
          onClose={() => setShowSimulateModal(false)}
          onSimulate={handleSimulatedConversation}
        />
      )}
    </div>
  );
}
