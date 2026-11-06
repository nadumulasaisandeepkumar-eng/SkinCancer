import { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import PageHeader from '../components/common/PageHeader';
import SectionHeader from '../components/common/SectionHeader';
import MetricsGrid from '../components/performance/MetricsGrid';
import ChartCard from '../components/performance/ChartCard';
import ConfusionMatrix from '../components/performance/ConfusionMatrix';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import { fetchMetrics, fetchConfusionMatrix, fetchTrainingCurves } from '../services/predictionService';

const METRIC_EXPLANATIONS = [
  {
    title: 'Accuracy',
    definition:
      'The proportion of total predictions that were correct. A model with 92% accuracy correctly classifies 92 out of every 100 lesion images.',
  },
  {
    title: 'Precision',
    definition:
      'Of all predictions for a class, what fraction were actually that class. High precision means fewer false alarms — critical in cancer screening.',
  },
  {
    title: 'Recall (Sensitivity)',
    definition:
      'Of all actual cases of a class, what fraction did the model detect. High recall is essential to minimize missed diagnoses.',
  },
  {
    title: 'F1 Score',
    definition:
      'The harmonic mean of precision and recall. It balances both concerns and is especially useful when classes are imbalanced.',
  },
  {
    title: 'Validation Loss',
    definition:
      'Cross-entropy loss on the held-out validation set. Lower values indicate better-calibrated probability outputs.',
  },
  {
    title: 'Confusion Matrix',
    definition:
      'A grid showing predicted vs. actual class for every sample. The diagonal represents correct predictions; off-diagonal cells show misclassifications.',
  },
];

const TICK_STYLE = { fill: '#4B5563', fontSize: 11 };

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-border rounded-md shadow-elevated px-3 py-2 text-xs">
      <p className="font-semibold text-text-secondary mb-1">Epoch {label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }} className="font-medium">
          {entry.name}: {(entry.value * 100).toFixed(2)}%
        </p>
      ))}
    </div>
  );
}

function LossTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-border rounded-md shadow-elevated px-3 py-2 text-xs">
      <p className="font-semibold text-text-secondary mb-1">Epoch {label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }} className="font-medium">
          {entry.name}: {Number(entry.value).toFixed(4)}
        </p>
      ))}
    </div>
  );
}

export default function Performance() {
  const [metrics, setMetrics] = useState(null);
  const [confMatrix, setConfMatrix] = useState(null);
  const [curves, setCurves] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [m, cm, c] = await Promise.all([
        fetchMetrics(),
        fetchConfusionMatrix(),
        fetchTrainingCurves(),
      ]);
      setMetrics(m);
      setConfMatrix(cm);
      setCurves(c);
    } catch (err) {
      setError(err?.message || 'Failed to load performance data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const accuracyData = curves?.epochs?.map((ep, i) => ({
    epoch: ep,
    'Train Acc': curves.training_accuracy[i],
    'Val Acc': curves.validation_accuracy[i],
  }));

  const lossData = curves?.epochs?.map((ep, i) => ({
    epoch: ep,
    'Train Loss': curves.training_loss[i],
    'Val Loss': curves.validation_loss[i],
  }));

  if (loading) {
    return (
      <div>
        <PageHeader badge="Model Evaluation" title="Performance Dashboard" subtitle="Evaluation metrics and training analysis." />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
          <LoadingState message="Loading performance data…" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <PageHeader badge="Model Evaluation" title="Performance Dashboard" subtitle="Evaluation metrics and training analysis." />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
          <ErrorState title="Failed to Load Data" message={error} onRetry={loadData} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        badge="Model Evaluation"
        title="Performance Dashboard"
        subtitle={`${metrics?.model ?? 'EfficientNetB3'} · Dataset: ${metrics?.dataset ?? 'HAM10000'} · ${metrics?.epochs_trained ?? 50} epochs`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 sm:space-y-10">

        {/* Section A: Key Metrics */}
        <section>
          <SectionHeader
            title="Key Performance Metrics"
            subtitle="Aggregated evaluation on the held-out test set."
          />
          {metrics && (
            <div className="space-y-4">
              <MetricsGrid metrics={metrics} />
              
              {/* Research Comparison Note */}
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-blue-200">
                    <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-primary">Research Finding</p>
                    <p className="text-xs text-text-secondary">Improvement through Age-Based Feature Fusion</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 sm:px-4">
                  <div className="text-center">
                    <p className="text-[10px] uppercase font-bold text-text-muted">Base Model</p>
                    <p className="text-sm font-semibold text-text-secondary line-through">91.4%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] uppercase font-bold text-primary">Fused Model</p>
                    <p className="text-base font-bold text-primary">94.7%</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Section B: Training Curves */}
        <section>
          <SectionHeader
            title="Training Curves"
            subtitle="Accuracy and loss tracked over all training epochs."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
            {/* Accuracy chart */}
            <ChartCard className="min-w-0 overflow-hidden" title="Accuracy" subtitle="Training vs. Validation Accuracy per epoch">
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={accuracyData} margin={{ top: 4, right: 4, bottom: 4, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="epoch"
                    tick={TICK_STYLE}
                    label={{ value: 'Epoch', position: 'insideBottom', offset: -2, fontSize: 10, fill: '#9CA3AF' }}
                    height={28}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    tick={TICK_STYLE}
                    tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
                    domain={[0.4, 1]}
                    width={45}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend iconType="plainline" iconSize={14} wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                  <Line type="monotone" dataKey="Train Acc" stroke="#1A4FBF" strokeWidth={1.75} dot={false} activeDot={{ r: 4 }} />
                  <Line type="monotone" dataKey="Val Acc" stroke="#16A34A" strokeWidth={1.75} dot={false} strokeDasharray="5 3" activeDot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Loss chart */}
            <ChartCard className="min-w-0 overflow-hidden" title="Loss" subtitle="Training vs. Validation Loss per epoch">
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={lossData} margin={{ top: 4, right: 4, bottom: 4, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="epoch"
                    tick={TICK_STYLE}
                    label={{ value: 'Epoch', position: 'insideBottom', offset: -2, fontSize: 10, fill: '#9CA3AF' }}
                    height={28}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    tick={TICK_STYLE}
                    tickFormatter={(v) => Number(v).toFixed(2)}
                    domain={[0, 1.5]}
                    width={45}
                  />
                  <Tooltip content={<LossTooltip />} />
                  <Legend iconType="plainline" iconSize={14} wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                  <Line type="monotone" dataKey="Train Loss" stroke="#1A4FBF" strokeWidth={1.75} dot={false} activeDot={{ r: 4 }} />
                  <Line type="monotone" dataKey="Val Loss" stroke="#DC2626" strokeWidth={1.75} dot={false} strokeDasharray="5 3" activeDot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </section>

        {/* Section C: Confusion Matrix */}
        <section>
          <SectionHeader
            title="Confusion Matrix"
            subtitle="Predicted vs. actual class distribution across the test set."
          />
          {confMatrix && (
            <div className="rounded-lg border border-border bg-white shadow-card p-4 sm:p-5">
              <ConfusionMatrix
                labels={confMatrix.labels}
                fullLabels={confMatrix.fullLabels}
                matrix={confMatrix.matrix}
              />
            </div>
          )}
        </section>

        {/* Section D: Metric Interpretation */}
        <section>
          <SectionHeader
            title="Metric Interpretation"
            subtitle="Understanding each evaluation metric in a clinical context."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {METRIC_EXPLANATIONS.map((item, i) => (
              <div key={i} className="rounded-lg border border-border bg-white p-4 sm:p-5 shadow-card">
                <h3 className="text-sm font-semibold text-text-primary mb-2">{item.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{item.definition}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
