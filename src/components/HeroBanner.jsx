// ============================================================
// HeroBanner.jsx – Citebound editorial hero & live AI audit widget
// ============================================================
import { useState } from 'react';
import { ArrowUpRight, ChevronDown, ChevronUp, Sparkles, MessageCircle, Globe, ShoppingBag } from 'lucide-react';

function InstagramIcon({ size = 11, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function HeroBanner({ onGoToChat, onGoToKnowledge }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div style={{
      background: 'radial-gradient(ellipse at 50% 0%, #f4eee2 0%, #f8f7f4 70%)',
      borderBottom: '1px solid #e6e4df',
      padding: isCollapsed ? '12px 32px' : '36px 32px 32px',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
    }}>
      {/* Collapse / Expand toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{
          position: 'absolute',
          top: '14px',
          right: '28px',
          background: 'none',
          border: 'none',
          color: '#8c8472',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '11px',
          fontFamily: 'JetBrains Mono, monospace',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        <span>{isCollapsed ? 'Show Citebound Showcase' : 'Minimize'}</span>
        {isCollapsed ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
      </button>

      {isCollapsed ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: '120px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span className="cite-tag cite-tag-vermillion">Shop Genie Live</span>
            <span className="font-serif" style={{ fontSize: '16px', color: '#0a0a0a' }}>
              Instant AI replies that turn inquiries into sales.
            </span>
          </div>
          <button
            onClick={onGoToChat}
            className="btn-vermillion"
            style={{ padding: '6px 14px', fontSize: '11.5px' }}
          >
            Open Interactive Chat Demo ❯
          </button>
        </div>
      ) : (
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          {/* Top mono badge */}
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <span className="cite-tag cite-tag-vermillion">
              AI CUSTOMER ENQUIRY AGENT
            </span>
          </div>

          {/* Main Fraunces serif headline */}
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 16px' }}>
            <h1 className="font-serif" style={{
              fontSize: '48px',
              fontWeight: 400,
              lineHeight: 1.1,
              color: '#0a0a0a',
              letterSpacing: '-0.025em',
            }}>
              Get answered where <br />
              <span style={{ fontStyle: 'italic', fontWeight: 300 }}>buyers ask questions.</span>
            </h1>
          </div>

          {/* Subtitle */}
          <p style={{
            textAlign: 'center',
            maxWidth: '620px',
            margin: '0 auto 24px',
            fontSize: '14.5px',
            lineHeight: 1.6,
            color: '#5e5e5e',
          }}>
            Buyers used to wait hours. Now they buy from who answers first. Shop Genie reads your catalog, answers sizing, pricing, stock, and returns in 0.4 seconds — fully automated.
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '32px' }}>
            <button
              onClick={onGoToChat}
              className="btn-vermillion"
              style={{ fontSize: '13.5px', padding: '10px 22px' }}
            >
              <span>Test Live Customer Chat</span>
              <div className="sound-bars">
                <span className="sound-bar sound-bar-1" />
                <span className="sound-bar sound-bar-2" />
                <span className="sound-bar sound-bar-3" />
              </div>
            </button>
            <button
              onClick={onGoToKnowledge}
              className="btn-outline"
              style={{ fontSize: '13px', padding: '10px 18px' }}
            >
              <span>Store Product Knowledge</span>
              <ArrowUpRight size={14} />
            </button>
          </div>

          {/* Citebound-style Live AI Performance Card with Orbit Nodes */}
          <div style={{
            position: 'relative',
            maxWidth: '560px',
            margin: '0 auto',
            padding: '20px 24px',
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            border: '1px solid #e6e4df',
            boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
          }}>
            {/* Header of widget */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '12px',
              marginBottom: '14px',
              borderBottom: '1px solid #edeae3',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="sound-bars" style={{ color: '#e63312' }}>
                  <span className="sound-bar sound-bar-1" />
                  <span className="sound-bar sound-bar-2" />
                  <span className="sound-bar sound-bar-3" />
                </span>
                <span className="font-mono" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', color: '#0a0a0a' }}>
                  GENIE RESPONSE AUDIT
                </span>
              </div>
              <span className="font-mono" style={{ fontSize: '11px', color: '#e63312', fontWeight: 700 }}>
                99.4% ACCURACY / 980
              </span>
            </div>

            {/* Benchmark progress bars in Citebound style */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'SIZING & FABRIC SPECS', pct: 98, color: '#0a0a0a' },
                { label: 'LIVE STOCK AVAILABILITY', pct: 100, color: '#e63312' },
                { label: 'DELIVERY & RETURN RULES', pct: 96, color: '#0a0a0a' },
                { label: 'DISCOUNT & BUNDLE LOGIC', pct: 99, color: '#0a0a0a' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <span className="font-mono" style={{
                    width: '180px',
                    fontSize: '10px',
                    fontWeight: 600,
                    color: '#5e5e5e',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}>
                    {item.label}
                  </span>
                  <div style={{
                    flex: 1,
                    height: '5px',
                    background: '#edeae3',
                    borderRadius: '2px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${item.pct}%`,
                      height: '100%',
                      background: item.color,
                      borderRadius: '2px',
                    }} />
                  </div>
                  <span className="font-mono" style={{
                    fontSize: '10.5px',
                    fontWeight: 700,
                    color: item.color === '#e63312' ? '#e63312' : '#0a0a0a',
                    width: '32px',
                    textAlign: 'right',
                  }}>
                    {item.pct}%
                  </span>
                </div>
              ))}
            </div>

            {/* Supported channels tags */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px',
              marginTop: '16px',
              paddingTop: '12px',
              borderTop: '1px solid #edeae3',
              fontSize: '11px',
              color: '#8c8472',
            }}>
              <span className="font-mono" style={{ fontSize: '9.5px', letterSpacing: '0.05em' }}>CHANNELS:</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#0a0a0a' }}>
                <MessageCircle size={11} color="#2e5d43" /> WhatsApp
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#0a0a0a' }}>
                <InstagramIcon size={11} color="#e63312" /> Instagram DM
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#0a0a0a' }}>
                <Globe size={11} /> Web Store Chat
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#0a0a0a' }}>
                <ShoppingBag size={11} /> Shopify
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
