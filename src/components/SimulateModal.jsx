// ============================================================
// SimulateModal.jsx – Clean modal matching the new dashboard UI
// ============================================================
import { useState } from 'react';
import { X, Send } from 'lucide-react';
import { generateId } from '../data/conversations';
import { now } from '../utils/time';

const PRESET_SCENARIOS = [
  {
    name: 'Kabir Malhotra',
    phone: '+91 98711 23456',
    query: 'Hi! Do you have the Classic Linen Shirt in Sage Green Size L available right now?',
    category: 'Stock & Sizing',
  },
  {
    name: 'Ananya Roy',
    phone: '+91 98199 87654',
    query: 'Can I get a discount if I purchase 2 items together?',
    category: 'Discounts & Offers',
  },
  {
    name: 'Vikram Joshi',
    phone: '+91 99201 34567',
    query: 'If the size doesn’t fit properly, how do I return or exchange it?',
    category: 'Returns & Exchange',
  },
  {
    name: 'Meera Sengupta',
    phone: '+91 98302 45678',
    query: 'How soon can you deliver to Bangalore? I need it before Thursday.',
    category: 'Shipping & Delivery',
  },
];

export default function SimulateModal({ onClose, onSimulate }) {
  const [name, setName] = useState('Kabir Malhotra');
  const [phone, setPhone] = useState('+91 98711 23456');
  const [query, setQuery] = useState(PRESET_SCENARIOS[0].query);

  const handleApplyPreset = (preset) => {
    setName(preset.name);
    setPhone(preset.phone);
    setQuery(preset.query);
  };

  const handleLaunch = () => {
    if (!query.trim()) return;

    const initials = name
      .split(' ')
      .map(p => p[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'CU';

    const timestamp = now();
    const newConv = {
      id: generateId(),
      customerName: name.trim() || 'New Customer',
      customerPhone: phone.trim() || '+91 98000 00000',
      avatar: initials,
      avatarColor: '#2563eb',
      isOnline: true,
      lastMessage: query.trim(),
      lastTime: timestamp,
      unread: 0,
      messages: [
        {
          id: generateId(),
          sender: 'customer',
          text: query.trim(),
          time: timestamp,
          isAI: false,
        },
      ],
    };

    onSimulate(newConv);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(15, 23, 42, 0.45)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '520px',
        maxHeight: '90dvh',
        overflowY: 'auto',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
              Simulate Customer Inquiry
            </h3>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0' }}>
              Choose a scenario or type a custom question to test Shop Genie auto-replies
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#f1f5f9',
              border: 'none',
              borderRadius: '6px',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#64748b',
            }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '20px' }}>
          {/* Quick presets */}
          <div style={{ marginBottom: '16px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              Preset Scenarios:
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {PRESET_SCENARIOS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleApplyPreset(p)}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '6px',
                    border: '1px solid',
                    borderColor: query === p.query ? '#2563eb' : '#e2e8f0',
                    background: query === p.query ? '#eff6ff' : '#f8fafc',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.1s',
                  }}
                >
                  <span style={{ fontSize: '10px', fontWeight: 600, color: query === p.query ? '#2563eb' : '#64748b', display: 'block' }}>
                    {p.category}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#0f172a' }}>
                    {p.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Form fields */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
            <div>
              <label style={{ fontSize: '11.5px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
                Customer Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '7px 10px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  fontSize: '13px',
                  color: '#0f172a',
                  outline: 'none',
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: '11.5px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                style={{
                  width: '100%',
                  padding: '7px 10px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  fontSize: '13px',
                  color: '#0f172a',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          {/* Message field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '11.5px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
              Customer Message
            </label>
            <textarea
              rows={3}
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Type incoming customer query..."
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                fontSize: '13px',
                fontFamily: 'Inter, sans-serif',
                lineHeight: 1.5,
                color: '#0f172a',
                outline: 'none',
                resize: 'none',
              }}
            />
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
            <button
              onClick={onClose}
              style={{
                background: '#f1f5f9',
                color: '#475569',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 14px',
                fontSize: '12.5px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleLaunch}
              style={{
                background: '#2563eb',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 16px',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>Start Conversation</span>
              <Send size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
