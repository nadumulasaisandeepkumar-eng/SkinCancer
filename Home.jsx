/* eslint-disable */
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Professional 2-color palette: blue + teal only
const PALETTE = [
  { color: '#2563eb', bg: '#eff6ff', blob: '#dbeafe' },
  { color: '#0d9488', bg: '#f0fdfa', blob: '#ccfbf1' },
  { color: '#2563eb', bg: '#eff6ff', blob: '#dbeafe' },
  { color: '#0d9488', bg: '#f0fdfa', blob: '#ccfbf1' },
];

const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Upload Image',
    description: 'Submit a dermoscopic photograph of the skin lesion in JPG, PNG, or WebP format.',
    icon: '🖼',
  },
  {
    step: '02',
    title: 'Enter Patient Age',
    description: "Provide the patient's age. This metadata improves classification accuracy via feature fusion.",
    icon: '👤',
  },
  {
    step: '03',
    title: 'AI Analysis',
    description: 'EfficientNetB3 extracts visual features from the lesion and combines them with the age signal.',
    icon: '🧠',
  },
  {
    step: '04',
    title: 'Prediction Output',
    description: 'Receive a structured report: lesion class, severity level, confidence score, and clinical recommendation.',
    icon: '📋',
  },
];

const FEATURES = [
  {
    title: 'Lesion Classification',
    description: 'Classifies dermoscopic images across 7 lesion types using the HAM10000 benchmark dataset.',
    icon: ClassifyIcon,
  },
  {
    title: 'Age-Fused Inference',
    description: 'Patient age is fused as a secondary feature to improve diagnostic accuracy for age-correlated lesions.',
    icon: AgeIcon,
  },
  {
    title: 'Severity Assessment',
    description: 'Each prediction is mapped to a clinical severity level — Mild, Moderate, or Severe.',
    icon: SeverityIcon,
  },
  {
    title: 'Model Evaluation',
    description: 'Explore model performance: accuracy, precision, recall, F1, and a full confusion matrix.',
    icon: ChartIcon,
  },
];

const PIPELINE_STEPS = [
  'Image Preprocessing',
  'CNN Feature Extraction',
  'Age Feature Fusion',
  'Lesion Classification',
  'Severity Output',
];

const S = {
  // Layout
  page: { fontFamily: "'Inter', sans-serif" },
  section: (bg = '#fff') => ({
    background: bg,
    borderBottom: '1px solid #e2e8f0',
  }),
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '64px 24px',
  },
  // Typography
  eyebrow: {
    fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em',
    textTransform: 'uppercase', color: '#2563eb',
    display: 'block', marginBottom: '10px',
  },
  h1: {
    fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800,
    color: '#0f172a', lineHeight: 1.2, letterSpacing: '-0.02em',
    marginBottom: '16px',
  },
  h2: {
    fontSize: '1.5rem', fontWeight: 700,
    color: '#0f172a', letterSpacing: '-0.01em', marginBottom: '8px',
  },
  body: {
    fontSize: '15px', color: '#475569', lineHeight: 1.7,
  },
};

export default function Home() {
  return (
    <div style={S.page}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section style={{ background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ ...S.container, paddingTop: '80px', paddingBottom: '80px' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ maxWidth: '640px' }}
          >
            <span style={S.eyebrow}>Clinical AI · EfficientNetB3 · HAM10000</span>

            <h1 style={S.h1}>
              Automated Skin Cancer<br />
              <span style={{ color: '#2563eb' }}>Detection &amp; Severity</span>
            </h1>

            <p style={{ ...S.body, marginBottom: '32px', maxWidth: '520px' }}>
              An optimized <strong style={{ color: '#0f172a' }}>EfficientNetB3 CNN</strong> with age-based feature fusion.
              Designed for early detection where survival rates exceed <strong style={{ color: '#0f172a' }}>95%</strong>,
              classifying seven lesion types with <strong style={{ color: '#0f172a' }}>94.7% accuracy</strong>.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <Link
                to="/predict"
                style={{
                  height: '42px', padding: '0 22px', display: 'inline-flex',
                  alignItems: 'center', fontSize: '14px', fontWeight: 600,
                  borderRadius: '8px', background: '#2563eb', color: '#fff',
                  textDecoration: 'none', transition: 'background 0.15s',
                  border: '1px solid #2563eb',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#1d4ed8'}
                onMouseLeave={e => e.currentTarget.style.background = '#2563eb'}
              >
                Start Prediction
              </Link>
              <Link
                to="/performance"
                style={{
                  height: '42px', padding: '0 22px', display: 'inline-flex',
                  alignItems: 'center', fontSize: '14px', fontWeight: 600,
                  borderRadius: '8px', background: '#fff', color: '#2563eb',
                  textDecoration: 'none', transition: 'background 0.15s',
                  border: '1px solid #2563eb',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#eff6ff'}
                onMouseLeave={e => e.currentTarget.style.background = '#fff'}
              >
                View Performance
              </Link>
            </div>

            {/* Stats */}
            <div 
              style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid #e2e8f0' }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                { val: '94.7%', label: 'Model Accuracy' },
                { val: '7', label: 'Lesion Classes' },
                { val: '10K+', label: 'Training Images' },
                { val: '3', label: 'Severity Levels' },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>{s.val}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500, marginTop: '2px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────── */}
      <section style={S.section('#f8fafc')}>
        <div style={S.container}>
          <div style={{ marginBottom: '40px' }}>
            <span style={S.eyebrow}>Workflow</span>
            <h2 style={S.h2}>How It Works</h2>
            <p style={{ ...S.body, fontSize: '14px' }}>Four steps from image to clinical prediction.</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
          }}>
            {WORKFLOW_STEPS.map((item, i) => {
              const p = PALETTE[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  style={{
                    background: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '14px',
                    padding: '24px',
                    cursor: 'default',
                    transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = p.color;
                    e.currentTarget.style.boxShadow = `0 6px 20px ${p.color}18`;
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Corner blob */}
                  <div style={{
                    position: 'absolute', top: 0, right: 0,
                    width: '72px', height: '72px',
                    background: p.blob,
                    borderRadius: '0 14px 0 72px',
                    opacity: 0.7,
                    pointerEvents: 'none',
                  }} />
                  {/* Step badge */}
                  <div style={{
                    fontSize: '10px', fontWeight: 700, color: p.color,
                    background: p.bg, display: 'inline-block',
                    padding: '3px 10px', borderRadius: '20px',
                    marginBottom: '14px', letterSpacing: '0.06em',
                    border: `1px solid ${p.color}30`,
                  }}>
                    STEP {item.step}
                  </div>
                  {/* Icon */}
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: p.bg, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '18px',
                    marginBottom: '14px', border: `1px solid ${p.color}20`,
                  }}>
                    {item.icon}
                  </div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: p.color, marginBottom: '8px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.65 }}>
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────── */}
      <section style={S.section('#fff')}>
        <div style={S.container}>
          <div style={{ marginBottom: '40px' }}>
            <span style={S.eyebrow}>Capabilities</span>
            <h2 style={S.h2}>System Features</h2>
            <p style={{ ...S.body, fontSize: '14px' }}>Everything you need for clinical-grade skin lesion analysis.</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
          }}>
            {FEATURES.map((feat, i) => {
              const p = PALETTE[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  style={{
                    background: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '14px',
                    padding: '24px',
                    cursor: 'default',
                    transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = p.color;
                    e.currentTarget.style.boxShadow = `0 6px 20px ${p.color}18`;
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Corner blob */}
                  <div style={{
                    position: 'absolute', top: 0, right: 0,
                    width: '72px', height: '72px',
                    background: p.blob,
                    borderRadius: '0 14px 0 72px',
                    opacity: 0.7,
                    pointerEvents: 'none',
                  }} />
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '10px',
                    background: p.bg, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', marginBottom: '16px',
                    border: `1px solid ${p.color}25`,
                  }}>
                    <feat.icon style={{ width: '22px', height: '22px', color: p.color }} />
                  </div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: p.color, marginBottom: '8px' }}>
                    {feat.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.65 }}>
                    {feat.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Architecture Overview ─────────────────────────── */}
      <section style={S.section('#f8fafc')}>
        <div style={S.container}>
          <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
            <span style={S.eyebrow}>Methodology</span>
            <h2 style={S.h2}>Architecture Overview</h2>
            <p style={{ ...S.body, fontSize: '14px', marginBottom: '36px' }}>
              The model pipeline processes dermoscopic images through an EfficientNetB3 backbone,
              fuses visual features with patient age, and classifies into seven diagnostic categories.
            </p>

            {/* Clean pipeline — numbered steps */}
            <div style={{
              display: 'flex', flexWrap: 'wrap', alignItems: 'center',
              justifyContent: 'center', gap: '4px',
            }}>
              {PIPELINE_STEPS.map((step, i, arr) => (
                <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <motion.span
                    whileHover={{ borderColor: '#2563eb', color: '#2563eb', background: '#eff6ff' }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      padding: '7px 14px', borderRadius: '6px',
                      border: '1px solid #cbd5e1', background: '#fff',
                      fontSize: '13px', fontWeight: 500, color: '#334155',
                      cursor: 'default', transition: 'all 0.18s',
                    }}
                  >
                    <span style={{
                      width: '18px', height: '18px', borderRadius: '50%',
                      background: '#2563eb', color: '#fff',
                      fontSize: '10px', fontWeight: 700,
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {i + 1}
                    </span>
                    {step}
                  </motion.span>
                  {i < arr.length - 1 && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  )}
                </span>
              ))}
            </div>

            <div style={{ marginTop: '28px' }}>
              <Link
                to="/about"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  fontSize: '14px', fontWeight: 600, color: '#2563eb',
                  textDecoration: 'none', transition: 'opacity 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Read full methodology
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section style={{ background: '#2563eb' }}>
        <div style={{
          maxWidth: '1200px', margin: '0 auto', padding: '48px 24px',
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'space-between', gap: '20px',
        }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>
              Ready to run a prediction?
            </h2>
            <p style={{ fontSize: '14px', color: '#bfdbfe' }}>
              Upload a dermoscopic image and enter patient age to get started.
            </p>
          </div>
          <Link
            to="/predict"
            style={{
              height: '42px', padding: '0 24px', display: 'inline-flex',
              alignItems: 'center', fontSize: '14px', fontWeight: 700,
              borderRadius: '8px', background: '#fff', color: '#2563eb',
              textDecoration: 'none', transition: 'opacity 0.15s',
              flexShrink: 0,
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Start Prediction →
          </Link>
        </div>
      </section>

    </div>
  );
}

// ── Icons ───────────────────────────────────────────────────────
function ClassifyIcon({ style }) {
  return (
    <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
    </svg>
  );
}
function AgeIcon({ style }) {
  return (
    <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  );
}
function SeverityIcon({ style }) {
  return (
    <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  );
}
function ChartIcon({ style }) {
  return (
    <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  );
}
