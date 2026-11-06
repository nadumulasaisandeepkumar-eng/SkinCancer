import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageHeader from '../components/common/PageHeader';

const PALETTE = [
  { color: '#2563eb', bg: '#eff6ff', blob: '#dbeafe' },
  { color: '#0d9488', bg: '#f0fdfa', blob: '#ccfbf1' },
  { color: '#2563eb', bg: '#eff6ff', blob: '#dbeafe' },
  { color: '#0d9488', bg: '#f0fdfa', blob: '#ccfbf1' },
];

const TEAM_MEMBERS = [
  { name: 'K. Sai Rama Krishna Murthy', rollNo: '22311A05AV' },
  { name: 'M. Anu Chandana',             rollNo: '22311A05JG' },
  { name: 'P. Chaitanya',                rollNo: '22311A05JH' },
];

const FACULTY = [
  { role: 'Internal Guide',       name: 'Dr. H. Balaji',    designation: 'Professor' },
  { role: 'Project Coordinator',  name: 'Mr. D. Bheekya',   designation: 'Assistant Professor' },
  { role: 'Head of Department',   name: 'Dr. K. Shirisha',  designation: 'Professor & HoD CSE' },
];

const SCOPE_ITEMS = [
  {
    title: 'Grad-CAM Visualization',
    description: 'Overlay gradient-weighted class activation maps to visually explain which lesion regions influenced the prediction.',
    icon: '🔬',
  },
  {
    title: 'Clinician Dashboard',
    description: 'A role-based interface for dermatologists to review, annotate, and export patient screening reports.',
    icon: '🏥',
  },
  {
    title: 'Clinical Deployment',
    description: 'HIPAA-compliant API design, model versioning, and audit logging for medical device integration.',
    icon: '🚀',
  },
  {
    title: 'Mobile Integration',
    description: 'TensorFlow Lite model export for on-device inference via mobile dermatology applications.',
    icon: '📱',
  },
];

const PIPELINE_STAGES = [
  {
    label: 'Image Preprocessing',
    detail: 'Resize to 224×224px · Normalize pixel values · Data augmentation via TensorFlow/Keras.',
  },
  {
    label: 'CNN Feature Extraction',
    detail: 'EfficientNetB3 backbone pretrained on ImageNet · Fine-tuned on HAM10000 dataset.',
  },
  {
    label: 'Age Feature Fusion',
    detail: 'Patient age integrated via a fusion layer · Combined with CNN features for clinical correlation.',
  },
  {
    label: 'Classification & Severity',
    detail: 'Predicts 7 diagnostic classes and 3 severity levels — Mild, Moderate, Severe.',
  },
];

const INFO_CARDS = [
  { label: 'Primary Accuracy', value: '94.7%',          sub: 'Age-fused model' },
  { label: 'Base Accuracy',    value: '91.4%',          sub: 'Image-only model' },
  { label: 'Backbone',         value: 'EfficientNetB3', sub: 'CNN Architecture' },
  { label: 'Framework',        value: 'TensorFlow/Keras', sub: 'Python' },
];

const EVAL_CARDS = [
  { label: 'Global Prevalence',  value: '2–3M Non-Melanoma / Year' },
  { label: 'Early Stage',        value: '> 95% Survival Rate' },
  { label: 'Late Stage',         value: '< 25% Survival Rate' },
];

// Shared style tokens
const eyebrow = {
  fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em',
  textTransform: 'uppercase', color: '#2563eb',
  display: 'block', marginBottom: '10px',
};

function SectionTitle({ children }) {
  return (
    <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0f172a', marginBottom: '4px', letterSpacing: '-0.01em' }}>
      {children}
    </h2>
  );
}

export default function About() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <PageHeader
        badge="Project Abstract"
        title="DermAI Methodology"
        subtitle="Optimized CNN with Age-Based Feature Fusion for Enhanced Skin Cancer Detection."
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px', display: 'flex', flexDirection: 'column', gap: '40px' }}>

        {/* ── College / Project Info ─────────────────────── */}
        <section style={{
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          overflow: 'hidden',
          background: '#fff',
          boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        }}>
          {/* Navy header bar */}
          <div className="bg-[#1e3a5f] p-6 text-center">
            <div style={{
              display: 'inline-block',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '6px',
              padding: '4px 14px',
              fontSize: '11px',
              fontWeight: 700,
              color: '#93c5fd',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '14px',
            }}>
              SNIST · AUTONOMOUS
            </div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>
              Sreenidhi Institute of Science and Technology
            </h2>
            <p style={{ fontSize: '13px', color: '#93c5fd', marginBottom: '10px' }}>
              Department of Computer Science and Engineering
            </p>
            <div style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '6px',
              padding: '8px 20px',
              marginTop: '4px',
            }}>
              <p style={{ fontSize: '12px', fontWeight: 600, color: '#e2e8f0', lineHeight: 1.6 }}>
                Abstract Seminar on · <span style={{ color: '#93c5fd' }}>Batch No: A2</span>
              </p>
              <p style={{ fontSize: '13px', fontWeight: 700, color: '#fff', marginTop: '4px' }}>
                Skin Cancer Detection and Stage Prediction Using CNN and Patient Age as a Feature
              </p>
            </div>
          </div>

          {/* Team & Faculty grid */}
          <div style={{
            gap: '0', borderTop: '1px solid #e2e8f0',
          }}
            className="grid grid-cols-1 md:grid-cols-2"
          >
            {/* Team Members */}
            <div className="p-6 border-b md:border-b-0 md:border-r border-[#e2e8f0]">
              <p style={{ ...eyebrow }}>Team Members</p>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <th style={{ textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#94a3b8', padding: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name</th>
                    <th style={{ textAlign: 'right', fontSize: '11px', fontWeight: 600, color: '#94a3b8', padding: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Roll No.</th>
                  </tr>
                </thead>
                <tbody>
                  {TEAM_MEMBERS.map((m, i) => (
                    <tr key={i} style={{ borderBottom: i < TEAM_MEMBERS.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                      <td style={{ fontSize: '13px', color: '#0f172a', fontWeight: 500, padding: '10px 0' }}>{m.name}</td>
                      <td style={{ fontSize: '12px', color: '#2563eb', fontWeight: 600, textAlign: 'right', fontFamily: 'monospace' }}>{m.rollNo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Faculty */}
            <div className="p-6">
              <p style={{ ...eyebrow }}>Faculty</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {FACULTY.map((f, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '10px 14px', borderRadius: '8px',
                    background: '#f8fafc', border: '1px solid #f1f5f9',
                  }}>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{f.name}</p>
                      <p style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{f.designation}</p>
                    </div>
                    <span style={{
                      fontSize: '11px', fontWeight: 600, color: '#2563eb',
                      background: '#eff6ff', padding: '3px 10px',
                      borderRadius: '20px', border: '1px solid #dbeafe',
                      whiteSpace: 'nowrap',
                    }}>
                      {f.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Abstract ──────────────────────────────────────*/}
        <section style={{
          background: '#f8fafc', border: '1px solid #e2e8f0',
          borderRadius: '12px', padding: '28px',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }} className="lg:grid-cols-5">
            <div style={{ gridColumn: 'span 3' }}>
              <span style={eyebrow}>Official Abstract</span>
              <div style={{ fontSize: '14px', color: '#475569', lineHeight: 1.8 }} className="space-y-3">
                <p>
                  Skin cancer is one of the most common and quickly growing types of cancer worldwide.
                  The WHO estimates 2–3 million non-melanoma and 132,000 melanoma cases globally each year.
                </p>
                <p>
                  <strong style={{ color: '#0f172a' }}>Early detection is critical:</strong> survival rates
                  exceed 95% in early stages but drop below 25% in later stages. Existing methods like
                  dermoscopy and biopsy are time-consuming and expensive.
                </p>
                <p>
                  This project uses an <strong style={{ color: '#0f172a' }}>optimized CNN with age-based feature fusion</strong>.
                  EfficientNetB3 extracts features from dermoscopic images; patient age is fused to classify
                  seven lesion types from the HAM10000 dataset.
                </p>
              </div>
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {INFO_CARDS.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 3 }}
                  style={{
                    background: '#fff', borderRadius: '10px',
                    border: '1px solid #e2e8f0', padding: '12px 16px',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    cursor: 'default', transition: 'border-color 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#2563eb'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#e2e8f0'}
                >
                  <span style={{ fontSize: '12px', color: '#64748b' }}>{item.label}</span>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#2563eb' }}>{item.value}</p>
                    <p style={{ fontSize: '11px', color: '#94a3b8' }}>{item.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pipeline ──────────────────────────────────────*/}
        <section>
          <span style={eyebrow}>Technical Workflow</span>
          <SectionTitle>Model Architecture &amp; Feature Fusion</SectionTitle>
          <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>
            A sequential pipeline from raw image input to diagnostic output.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
            {PIPELINE_STAGES.map((stage, i) => {
              const p = PALETTE[i];
              return (
                <motion.div
                  key={i}
                  style={{
                    display: 'flex', gap: '14px',
                    borderRadius: '14px', border: '1px solid #e2e8f0',
                    background: '#fff', padding: '18px',
                    cursor: 'default', transition: 'all 0.2s',
                    position: 'relative', overflow: 'hidden',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = p.color;
                    e.currentTarget.style.boxShadow = `0 6px 20px ${p.color}18`;
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: p.bg, border: `1px solid ${p.color}25`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '13px', fontWeight: 800, color: p.color, flexShrink: 0,
                  }}>
                    {i + 1}
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: p.color, marginBottom: '4px' }}>{stage.label}</p>
                    <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.6 }}>{stage.detail}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── Clinical Impact ───────────────────────────────*/}
        <section>
          <span style={eyebrow}>Performance Context</span>
          <SectionTitle>Clinical Impact &amp; Survival Analysis</SectionTitle>
          <div style={{
            borderRadius: '12px', border: '1px solid #e2e8f0',
            background: '#fff', padding: '24px',
            marginTop: '16px',
          }}>
            <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.75, marginBottom: '20px' }}>
              Developed in <strong style={{ color: '#0f172a' }}>Python with TensorFlow/Keras</strong>.
              The age-integrated model achieved <strong style={{ color: '#2563eb' }}>94.7% accuracy</strong>,
              outperforming the image-only approach (91.4%). Performance was evaluated via accuracy,
              precision, recall, F1 score, and confusion matrix analysis.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              {EVAL_CARDS.map((item, i) => (
                <div key={i} style={{
                  borderRadius: '8px', border: '1px solid #e2e8f0',
                  background: '#f8fafc', padding: '14px 16px',
                }}>
                  <p style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>{item.label}</p>
                  <p style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Future Scope ──────────────────────────────────*/}
        <section>
          <span style={eyebrow}>Roadmap</span>
          <SectionTitle>Future Clinical Scope</SectionTitle>
          <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px', marginTop: '4px' }}>
            Planned enhancements to move toward production-ready clinical deployment.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
            {SCOPE_ITEMS.map((item, i) => {
              const p = PALETTE[i];
              return (
                <motion.div
                  key={i}
                  style={{
                    borderRadius: '14px',
                    border: '1px solid #e2e8f0',
                    background: '#fff',
                    padding: '22px',
                    cursor: 'default',
                    transition: 'all 0.2s',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = p.color;
                    e.currentTarget.style.boxShadow = `0 6px 20px ${p.color}18`;
                    e.currentTarget.style.transform = 'translateY(-3px)';
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
                    width: '68px', height: '68px',
                    background: p.blob,
                    borderRadius: '0 14px 0 68px',
                    opacity: 0.7,
                    pointerEvents: 'none',
                  }} />
                  <div style={{
                    width: '38px', height: '38px', borderRadius: '10px',
                    background: p.bg, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', marginBottom: '14px',
                    border: `1px solid ${p.color}25`,
                  }}>
                    <span style={{ fontSize: '16px' }}>{item.icon}</span>
                  </div>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: p.color, marginBottom: '8px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.65 }}>
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
