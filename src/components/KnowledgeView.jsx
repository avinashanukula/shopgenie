// ============================================================
// KnowledgeView.jsx – Store Catalog & AI Grounding Data
// ============================================================
import { useState } from 'react';
import { PRODUCTS, BUSINESS, FAQS } from '../data/products';
import { Package, ShieldCheck, Truck, HelpCircle, Check, Search, Tag } from 'lucide-react';

export default function KnowledgeView({ onTestProductQuestion }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  const filteredProducts = PRODUCTS.filter(p => {
    const matchCategory = activeCategory === 'all' || p.category.toLowerCase() === activeCategory.toLowerCase();
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.description.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '32px 36px', background: '#f8f7f4' }}>
      <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px' }}>
          <div>
            <div className="cite-tag cite-tag-vermillion" style={{ marginBottom: '8px' }}>
              GROUND TRUTH REPOSITORY
            </div>
            <h2 className="font-serif" style={{ fontSize: '32px', fontWeight: 400, color: '#0a0a0a', letterSpacing: '-0.02em' }}>
              Store Knowledge Base &amp; Catalog
            </h2>
            <p style={{ fontSize: '14px', color: '#5e5e5e', marginTop: '6px' }}>
              Shop Genie reads this real-time data to answer sizing, pricing, stock levels, discounts, and return policies.
            </p>
          </div>
          <div style={{
            background: '#ffffff',
            border: '1px solid #e6e4df',
            borderRadius: '12px',
            padding: '12px 18px',
            textAlign: 'right',
          }}>
            <span className="font-mono" style={{ fontSize: '10.5px', color: '#8c8472', textTransform: 'uppercase' }}>
              AI STATUS
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#2e5d43' }} />
              <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#0a0a0a' }}>
                Synced &amp; Active
              </span>
            </div>
          </div>
        </div>

        {/* Business Overview Card */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e6e4df',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '28px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            <div>
              <span className="font-mono" style={{ fontSize: '10px', color: '#8c8472', textTransform: 'uppercase' }}>STORE NAME</span>
              <p style={{ fontSize: '15px', fontWeight: 600, color: '#0a0a0a', marginTop: '4px' }}>{BUSINESS.name}</p>
              <span style={{ fontSize: '12px', color: '#5e5e5e' }}>{BUSINESS.type || 'Apparel & Fashion'}</span>
            </div>
            <div>
              <span className="font-mono" style={{ fontSize: '10px', color: '#8c8472', textTransform: 'uppercase' }}>DELIVERY TIMELINE</span>
              <p style={{ fontSize: '15px', fontWeight: 600, color: '#0a0a0a', marginTop: '4px' }}>3–5 Business Days</p>
              <span style={{ fontSize: '12px', color: '#5e5e5e' }}>Free over ₹1,499</span>
            </div>
            <div>
              <span className="font-mono" style={{ fontSize: '10px', color: '#8c8472', textTransform: 'uppercase' }}>RETURN POLICY</span>
              <p style={{ fontSize: '15px', fontWeight: 600, color: '#0a0a0a', marginTop: '4px' }}>7-Day Easy Returns</p>
              <span style={{ fontSize: '12px', color: '#5e5e5e' }}>Free reverse exchange</span>
            </div>
            <div>
              <span className="font-mono" style={{ fontSize: '10px', color: '#8c8472', textTransform: 'uppercase' }}>SPECIAL OFFERS</span>
              <p style={{ fontSize: '15px', fontWeight: 600, color: '#e63312', marginTop: '4px' }}>10% OFF on 2+ items</p>
              <span style={{ fontSize: '12px', color: '#5e5e5e' }}>Use code: GENIE10</span>
            </div>
          </div>
        </div>

        {/* Catalog Filter & Search Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          gap: '16px',
        }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['all', 'Apparel', 'Traditional', 'Bottoms'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '999px',
                  border: '1px solid',
                  borderColor: activeCategory === cat ? '#0a0a0a' : '#e6e4df',
                  background: activeCategory === cat ? '#0a0a0a' : '#ffffff',
                  color: activeCategory === cat ? '#ffffff' : '#5e5e5e',
                  fontSize: '12px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  textTransform: 'capitalize',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', width: '260px' }}>
            <Search size={13} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#8c8472' }} />
            <input
              type="text"
              placeholder="Search catalog items..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '7px 12px 7px 32px',
                borderRadius: '999px',
                border: '1px solid #e6e4df',
                background: '#ffffff',
                fontSize: '12.5px',
                color: '#0a0a0a',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Product Cards Grid in Citebound Editorial Style */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '36px' }}>
          {filteredProducts.map(prod => (
            <div
              key={prod.id}
              style={{
                background: '#ffffff',
                border: '1px solid #e6e4df',
                borderRadius: '14px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.15s ease',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <h3 className="font-serif" style={{ fontSize: '18px', fontWeight: 600, color: '#0a0a0a' }}>
                    {prod.name}
                  </h3>
                  <span className="font-mono" style={{ fontSize: '14px', fontWeight: 700, color: '#0a0a0a' }}>
                    ₹{prod.price}
                  </span>
                </div>

                <p style={{ fontSize: '13px', color: '#5e5e5e', lineHeight: 1.5, marginBottom: '12px' }}>
                  {prod.description}
                </p>

                {/* Sizing & colors */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span className="font-mono" style={{ fontSize: '10px', color: '#8c8472' }}>SIZES:</span>
                    {prod.sizes?.map(s => (
                      <span key={s} style={{
                        padding: '1px 6px',
                        background: '#f2efe9',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: '#0a0a0a',
                      }}>
                        {s}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '6px' }}>
                    <span className="font-mono" style={{ fontSize: '10px', color: '#8c8472' }}>COLORS:</span>
                    {prod.colors?.map(c => (
                      <span key={c} style={{
                        padding: '1px 6px',
                        background: '#f2efe9',
                        borderRadius: '4px',
                        fontSize: '11px',
                        color: '#5e5e5e',
                      }}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stock status & Quick Test Button */}
              {(() => {
                const totalStock = prod.stock ? Object.values(prod.stock).reduce((a, b) => a + b, 0) : 0;
                const inStock = totalStock > 0;
                return (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '12px',
                    borderTop: '1px solid #f2efe9',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: inStock ? '#2e5d43' : '#e63312',
                      }} />
                      <span className="font-mono" style={{ fontSize: '11px', color: inStock ? '#2e5d43' : '#e63312', fontWeight: 600 }}>
                        {inStock ? `IN STOCK (${totalStock} units)` : 'OUT OF STOCK'}
                      </span>
                    </div>

                    <button
                      onClick={() => onTestProductQuestion(`Do you have the ${prod.name} in stock and what sizes are available?`)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#e63312',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      Test In Chat ❯
                    </button>
                  </div>
                );
              })()}
            </div>
          ))}
        </div>

        {/* Standard FAQs Section */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e6e4df',
          borderRadius: '16px',
          padding: '24px',
        }}>
          <div className="cite-tag cite-tag-vermillion" style={{ marginBottom: '6px' }}>
            FAQ MATRIX
          </div>
          <h3 className="font-serif" style={{ fontSize: '20px', fontWeight: 400, color: '#0a0a0a', marginBottom: '16px' }}>
            Store Policy Rules Known by Genie AI
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
            {FAQS.map((faq, idx) => (
              <div key={idx} style={{
                padding: '14px',
                background: '#fcfbf9',
                border: '1px solid #edeae3',
                borderRadius: '10px',
              }}>
                <span className="font-mono" style={{ fontSize: '11px', fontWeight: 600, color: '#0a0a0a', display: 'block', marginBottom: '4px' }}>
                  Q: {faq.q}
                </span>
                <p style={{ fontSize: '12.5px', color: '#5e5e5e', lineHeight: 1.5 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
