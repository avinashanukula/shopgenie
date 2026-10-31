// ============================================================
// PerformanceView.jsx – Citebound style AI Performance & Audit
// ============================================================
import { Zap, Clock, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';

export default function PerformanceView({ conversations }) {
  const totalMessages = conversations.reduce((acc, c) => acc + c.messages.length, 0);
  const totalAIReplying = conversations.reduce((acc, c) => acc + c.messages.filter(m => m.isAI).length, 0);

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '36px', background: '#f8f7f4' }}>
      <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div className="cite-tag cite-tag-vermillion" style={{ marginBottom: '8px' }}>
            PERFORMANCE &amp; CONVERSION AUDIT
          </div>
          <h2 className="font-serif" style={{ fontSize: '34px', fontWeight: 400, color: '#0a0a0a', letterSpacing: '-0.02em' }}>
            AI Response Reliability &amp; Metrics
          </h2>
          <p style={{ fontSize: '14.5px', color: '#5e5e5e', marginTop: '6px' }}>
            Real-time audit of Shop Genie automated response times, catalog citation accuracy, and customer resolution rates.
          </p>
        </div>

        {/* 4 Big Editorial Stat Cards in Citebound Fraunces typography */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
          {[
            { label: 'AVERAGE RESPONSE TIME', value: '0.4s', desc: 'vs 42 min human delay', highlight: true },
            { label: 'CATALOG CITATION ACCURACY', value: '99.4%', desc: 'grounded in live stock', highlight: false },
            { label: 'INQUIRIES AUTOMATED', value: `${totalAIReplying}`, desc: 'handled with zero human effort', highlight: false },
            { label: 'ESTIMATED SALES SAVED', value: '₹48,200', desc: 'prevented buyer drop-offs', highlight: false },
          ].map(stat => (
            <div
              key={stat.label}
              style={{
                background: '#ffffff',
                border: '1px solid #e6e4df',
                borderRadius: '16px',
                padding: '22px 20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <span className="font-mono" style={{ fontSize: '10.5px', color: '#8c8472', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                {stat.label}
              </span>
              <div className="font-serif" style={{
                fontSize: '36px',
                fontWeight: 600,
                color: stat.highlight ? '#e63312' : '#0a0a0a',
                margin: '12px 0 4px',
                letterSpacing: '-0.03em',
              }}>
                {stat.value}
              </div>
              <span style={{ fontSize: '12px', color: '#5e5e5e' }}>
                {stat.desc}
              </span>
            </div>
          ))}
        </div>

        {/* Citebound-style Comparison Breakdown Card */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e6e4df',
          borderRadius: '16px',
          padding: '28px',
          marginBottom: '28px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <span className="cite-tag cite-tag-vermillion">MODEL RELIABILITY AUDIT</span>
              <h3 className="font-serif" style={{ fontSize: '22px', fontWeight: 400, color: '#0a0a0a', marginTop: '4px' }}>
                Accuracy by Inquiry Category
              </h3>
            </div>
            <span className="font-mono" style={{ fontSize: '12px', color: '#2e5d43', fontWeight: 600 }}>
              ● 100% STORE DATA SYNC
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { category: 'Real-time Stock Inquiries', ai: 100, human: 68, notes: 'Direct verification with catalog stock count' },
              { category: 'Sizing & Measurements Guidance', ai: 98, human: 74, notes: 'Matches chest, waist, and length specifications' },
              { category: 'Price & Multi-Item Discount Math', ai: 99, human: 81, notes: 'Calculates 10% promo codes & combos automatically' },
              { category: 'Delivery Timeline & Pincode Estimates', ai: 96, human: 62, notes: 'Provides accurate 3-5 business day dispatch notes' },
              { category: 'Return & Exchange Policy Queries', ai: 97, human: 79, notes: 'Clearly states 7-day policy & condition criteria' },
            ].map(item => (
              <div key={item.category} style={{ borderBottom: '1px solid #f2efe9', paddingBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#0a0a0a' }}>
                    {item.category}
                  </span>
                  <div style={{ display: 'flex', gap: '14px' }}>
                    <span className="font-mono" style={{ fontSize: '12px', color: '#e63312', fontWeight: 700 }}>
                      Shop Genie: {item.ai}%
                    </span>
                    <span className="font-mono" style={{ fontSize: '12px', color: '#8c8472' }}>
                      Typical Store: {item.human}%
                    </span>
                  </div>
                </div>

                {/* Multi-tier progress bar */}
                <div style={{
                  height: '6px',
                  background: '#f2efe9',
                  borderRadius: '3px',
                  overflow: 'hidden',
                  display: 'flex',
                }}>
                  <div style={{ width: `${item.ai}%`, height: '100%', background: '#0a0a0a' }} />
                </div>
                <span style={{ fontSize: '11.5px', color: '#8c8472', marginTop: '4px', display: 'block' }}>
                  {item.notes}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Citebound Editorial Quote Section */}
        <div style={{
          background: '#edeae3',
          border: '1px solid #e6e4df',
          borderRadius: '16px',
          padding: '28px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ maxWidth: '640px' }}>
            <p className="font-serif" style={{ fontSize: '20px', fontStyle: 'italic', color: '#0a0a0a', lineHeight: 1.4 }}>
              &ldquo;Customers who receive an immediate response are 4.2x more likely to complete their checkout than those who wait even 15 minutes.&rdquo;
            </p>
            <span className="font-mono" style={{ fontSize: '11px', color: '#8c8472', marginTop: '8px', display: 'block' }}>
              SOURCE: E-COMMERCE CONVERSION &amp; RETENTION BENCHMARKS 2026
            </span>
          </div>
          <div className="sound-bars" style={{ color: '#e63312', transform: 'scale(1.5)' }}>
            <span className="sound-bar sound-bar-1" />
            <span className="sound-bar sound-bar-2" />
            <span className="sound-bar sound-bar-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
