// ============================================================
// App.jsx – Clean, minimal customer support dashboard
// ============================================================
import { useState, useCallback, useEffect } from 'react';
import { Inbox, MessageSquare, History, Plus, Search, Sparkles, CheckCheck } from 'lucide-react';
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

  useEffect(() => {
    saveConversations(conversations);
  }, [conversations]);

  const totalUnread = conversations.reduce((sum, c) => sum + (c.unread || 0), 0);
  const selectedConversation = conversations.find(c => c.id === selectedConvId) || conversations[0] || null;

  const handleSelectConversation = useCallback((convId) => {
    setSelectedConvId(convId);
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
      height: '100vh',
      background: '#f1f3f5',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#1a1d20',
      overflow: 'hidden',
    }}>
      {/* Clean Minimal Sidebar */}
      <aside style={{
        width: '230px',
        minWidth: '230px',
        background: '#ffffff',
        borderRight: '1px solid #e9ecef',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* App Title & Store */}
        <div style={{ padding: '20px 18px 16px', borderBottom: '1px solid #f1f3f5' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '14px' }}>
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
              fontSize: '15px',
            }}>
              SG
            </div>
            <div>
              <h1 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: '#111827', letterSpacing: '-0.01em' }}>
                Shop Genie
              </h1>
              <p style={{ fontSize: '11px', color: '#6b7280', margin: 0 }}>Customer Support</p>
            </div>
          </div>

          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '8px 10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div>
              <span style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Active Store</span>
              <p style={{ fontSize: '12px', fontWeight: 600, color: '#0f172a', margin: 0 }}>{BUSINESS.name}</p>
            </div>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#22c55e',
              display: 'inline-block',
            }} />
          </div>
        </div>

        {/* Navigation Tabs: Inbox, Chat, History */}
        <nav style={{ padding: '14px 10px', flex: 1, display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <button
            onClick={() => {
              setActiveTab('inbox');
              if (!selectedConvId && conversations.length > 0) setSelectedConvId(conversations[0].id);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '9px 12px',
              borderRadius: '7px',
              border: 'none',
              background: activeTab === 'inbox' ? '#eff6ff' : 'transparent',
              color: activeTab === 'inbox' ? '#1d4ed8' : '#475569',
              fontWeight: activeTab === 'inbox' ? 600 : 500,
              fontSize: '13px',
              cursor: 'pointer',
              textAlign: 'left',
              width: '100%',
              transition: 'background 0.1s',
            }}
          >
            <Inbox size={16} color={activeTab === 'inbox' ? '#1d4ed8' : '#64748b'} />
            <span style={{ flex: 1 }}>Inbox</span>
            {totalUnread > 0 && (
              <span style={{
                background: '#2563eb',
                color: '#ffffff',
                fontSize: '11px',
                fontWeight: 700,
                padding: '1px 6px',
                borderRadius: '999px',
              }}>
                {totalUnread}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab('chat');
              if (!selectedConvId && conversations.length > 0) setSelectedConvId(conversations[0].id);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '9px 12px',
              borderRadius: '7px',
              border: 'none',
              background: activeTab === 'chat' ? '#eff6ff' : 'transparent',
              color: activeTab === 'chat' ? '#1d4ed8' : '#475569',
              fontWeight: activeTab === 'chat' ? 600 : 500,
              fontSize: '13px',
              cursor: 'pointer',
              textAlign: 'left',
              width: '100%',
              transition: 'background 0.1s',
            }}
          >
            <MessageSquare size={16} color={activeTab === 'chat' ? '#1d4ed8' : '#64748b'} />
            <span style={{ flex: 1 }}>Chat</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '9px 12px',
              borderRadius: '7px',
              border: 'none',
              background: activeTab === 'history' ? '#eff6ff' : 'transparent',
              color: activeTab === 'history' ? '#1d4ed8' : '#475569',
              fontWeight: activeTab === 'history' ? 600 : 500,
              fontSize: '13px',
              cursor: 'pointer',
              textAlign: 'left',
              width: '100%',
              transition: 'background 0.1s',
            }}
          >
            <History size={16} color={activeTab === 'history' ? '#1d4ed8' : '#64748b'} />
            <span style={{ flex: 1 }}>History</span>
          </button>
        </nav>

        {/* Simulate New Message Button */}
        <div style={{ padding: '14px', borderTop: '1px solid #f1f3f5' }}>
          <button
            onClick={() => setShowSimulateModal(true)}
            style={{
              width: '100%',
              background: '#0f172a',
              color: '#ffffff',
              border: 'none',
              borderRadius: '7px',
              padding: '9px 12px',
              fontSize: '12.5px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer',
            }}
          >
            <Plus size={14} />
            <span>Simulate Customer</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {(activeTab === 'inbox' || activeTab === 'chat') && (
          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            {/* Conversation list */}
            <div style={{
              width: '320px',
              minWidth: '320px',
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

            {/* Chat conversation */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', background: '#f8fafc' }}>
              <ChatView
                conversation={selectedConversation}
                onSendMessage={handleSendMessage}
                onAIReply={handleAIReply}
              />
            </div>
          </div>
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
      </main>

      {showSimulateModal && (
        <SimulateModal
          onClose={() => setShowSimulateModal(false)}
          onSimulate={handleSimulatedConversation}
        />
      )}
    </div>
  );
}
