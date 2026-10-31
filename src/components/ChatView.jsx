import { useEffect, useRef, useState } from 'react';
import { Send, User, Bot, Check, CheckCheck, ArrowLeft } from 'lucide-react';
import { formatMessageTime } from '../utils/time';
import { generateAIReply, DEMO_PROMPTS } from '../data/aiEngine';

function FormattedText({ text }) {
  const regex = /(\*[^*]+\*|_[^_]+_)/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex)
      parts.push(<span key={key++}>{text.slice(lastIndex, match.index)}</span>);
    const inner = match[0];
    if (inner.startsWith('*'))
      parts.push(<strong key={key++} style={{ fontWeight: 600 }}>{inner.slice(1, -1)}</strong>);
    else
      parts.push(<em key={key++} style={{ fontStyle: 'italic' }}>{inner.slice(1, -1)}</em>);
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length)
    parts.push(<span key={key++}>{text.slice(lastIndex)}</span>);

  return parts.length ? <>{parts}</> : <>{text}</>;
}

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginBottom: '14px' }}>
      <div style={{
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        background: '#2563eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        fontSize: '11px',
        fontWeight: 700,
        flexShrink: 0,
      }}>
        SG
      </div>
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '14px',
        borderBottomLeftRadius: '3px',
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
      }}>
        <span className="typing-dot" style={{ background: '#64748b' }} />
        <span className="typing-dot" style={{ background: '#64748b' }} />
        <span className="typing-dot" style={{ background: '#64748b' }} />
        <span style={{ fontSize: '11.5px', color: '#64748b', marginLeft: '6px' }}>
          Replying...
        </span>
      </div>
    </div>
  );
}

function MessageBubble({ message, customerName }) {
  const isAI = message.isAI;

  return (
    <div style={{
      display: 'flex',
      flexDirection: isAI ? 'row' : 'row-reverse',
      alignItems: 'flex-start',
      gap: '8px',
      marginBottom: '14px',
    }}>
      {/* Avatar */}
      <div style={{
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        flexShrink: 0,
        background: isAI ? '#2563eb' : '#e2e8f0',
        color: isAI ? '#ffffff' : '#334155',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '11px',
        fontWeight: 700,
      }}>
        {isAI ? 'SG' : <User size={13} />}
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '70%',
        gap: '3px',
        alignItems: isAI ? 'flex-start' : 'flex-end',
      }}>
        {/* Name label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#64748b' }}>
          <span>{isAI ? 'Shop Genie (Auto-reply)' : customerName}</span>
          <span>·</span>
          <span>{formatMessageTime(message.time)}</span>
        </div>

        {/* Bubble */}
        <div style={{
          background: isAI ? '#1e293b' : '#ffffff',
          color: isAI ? '#ffffff' : '#0f172a',
          border: isAI ? 'none' : '1px solid #e2e8f0',
          borderRadius: '14px',
          borderBottomLeftRadius: isAI ? '3px' : '14px',
          borderBottomRightRadius: isAI ? '14px' : '3px',
          padding: '10px 14px',
          fontSize: '13.5px',
          lineHeight: '1.55',
          boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
          whiteSpace: 'pre-wrap',
        }}>
          <FormattedText text={message.text} />
        </div>
      </div>
    </div>
  );
}

export default function ChatView({ conversation, onSendMessage, onAIReply, defaultPrompt, onBack }) {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation?.messages, isTyping]);

  useEffect(() => {
    if (defaultPrompt) {
      setInputText(defaultPrompt);
      inputRef.current?.focus();
    }
  }, [defaultPrompt]);

  const handleSend = async (textToSend) => {
    const text = (textToSend || inputText).trim();
    if (!text || !conversation) return;

    onSendMessage(conversation.id, text, 'customer');
    setInputText('');
    setIsTyping(true);

    try {
      const reply = await generateAIReply(text, conversation.messages || []);
      setIsTyping(false);
      onAIReply(conversation.id, reply);
    } catch {
      setIsTyping(false);
      onAIReply(
        conversation.id,
        "Hello! I am here to help you with sizes, prices, delivery, and stock availability."
      );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!conversation) {
    return (
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#64748b',
        fontSize: '13px',
      }}>
        Select a conversation from the left to start chatting
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#f8fafc' }}>
      {/* Chat Header */}
      <div style={{
        padding: '12px 16px',
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {onBack && (
            <button
              onClick={onBack}
              style={{
                background: '#f1f5f9',
                border: 'none',
                borderRadius: '6px',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#334155',
                flexShrink: 0,
              }}
            >
              <ArrowLeft size={16} />
            </button>
          )}

          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: '#e2e8f0',
            color: '#1e293b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '13px',
            flexShrink: 0,
          }}>
            {conversation.avatar}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>
                {conversation.customerName}
              </span>
              <span style={{
                fontSize: '11px',
                color: '#16a34a',
                background: '#dcfce7',
                padding: '1px 6px',
                borderRadius: '4px',
                fontWeight: 500,
              }}>
                Online
              </span>
            </div>
            <span style={{ fontSize: '11.5px', color: '#64748b' }}>
              {conversation.customerPhone} · WhatsApp
            </span>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: '#f1f5f9',
          padding: '5px 10px',
          borderRadius: '6px',
          fontSize: '11.5px',
          color: '#334155',
          fontWeight: 500,
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
          Auto-reply active
        </div>
      </div>

      {/* Demo Note */}
      <div style={{
        background: '#f1f5f9',
        borderBottom: '1px solid #e2e8f0',
        padding: '6px 20px',
        fontSize: '11.5px',
        color: '#475569',
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <span>Demo: You are chatting as the customer. Shop Genie automatically answers questions about items, sizes, prices, and returns.</span>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
        background: '#f8fafc',
      }}>
        {conversation.messages.map(msg => (
          <MessageBubble
            key={msg.id}
            message={msg}
            customerName={conversation.customerName}
          />
        ))}

        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      <div style={{
        padding: '8px 20px 0',
        background: '#ffffff',
        borderTop: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        overflowX: 'auto',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 500, flexShrink: 0 }}>
          Quick questions:
        </span>
        {DEMO_PROMPTS.slice(0, 4).map(prompt => (
          <button
            key={prompt.text}
            onClick={() => handleSend(prompt.text)}
            style={{
              padding: '4px 10px',
              borderRadius: '999px',
              border: '1px solid #e2e8f0',
              background: '#f8fafc',
              color: '#334155',
              fontSize: '11.5px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {prompt.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div style={{ padding: '12px 20px 16px', background: '#ffffff', flexShrink: 0 }}>
        <div style={{
          display: 'flex',
          gap: '8px',
          background: '#ffffff',
          border: '1px solid #cbd5e1',
          borderRadius: '8px',
          padding: '6px 8px 6px 14px',
        }}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Type any message as customer... (e.g. Do you have linen shirts in L?)"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '13.5px',
              color: '#0f172a',
            }}
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputText.trim() || isTyping}
            style={{
              background: '#2563eb',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 14px',
              fontSize: '12.5px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: !inputText.trim() || isTyping ? 'not-allowed' : 'pointer',
              opacity: !inputText.trim() || isTyping ? 0.5 : 1,
            }}
          >
            <span>Send</span>
            <Send size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
