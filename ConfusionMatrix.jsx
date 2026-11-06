/**
 * ConfusionMatrix — responsive with controlled horizontal scroll
 * on small screens so the page never overflows.
 */
export default function ConfusionMatrix({ labels, fullLabels, matrix }) {
  if (!matrix || !labels) return null;

  const globalMax = Math.max(...matrix.flat());

  function getCellBg(value, rowIdx, colIdx) {
    const intensity = globalMax > 0 ? value / globalMax : 0;
    if (rowIdx === colIdx) {
      const alpha = 0.15 + intensity * 0.7;
      return {
        backgroundColor: `rgba(26, 79, 191, ${alpha})`,
        color: intensity > 0.5 ? '#fff' : '#1A4FBF',
      };
    }
    if (value === 0) return { backgroundColor: '#F8FAFC', color: '#9CA3AF' };
    const alpha = 0.08 + intensity * 0.55;
    return {
      backgroundColor: `rgba(220, 38, 38, ${alpha})`,
      color: intensity > 0.45 ? '#fff' : '#DC2626',
    };
  }

  return (
    <div>
      {/* Controlled horizontal scroll — only the matrix scrolls, not the page */}
      <div className="overflow-x-auto -mx-1 px-1 pb-1">
        <div className="min-w-[420px]">
          <table className="text-xs border-collapse w-full" aria-label="Confusion matrix">
            <thead>
              <tr>
                <th className="p-1.5 sm:p-2 text-left">
                  <div className="text-[10px] text-text-muted font-normal leading-tight">
                    <span className="block">Actual →</span>
                    <span className="block">Pred ↓</span>
                  </div>
                </th>
                {labels.map((label, i) => (
                  <th
                    key={i}
                    className="p-1.5 sm:p-2 text-center font-semibold text-text-secondary whitespace-nowrap text-[11px] sm:text-xs"
                    title={fullLabels?.[i]}
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrix.map((row, rowIdx) => (
                <tr key={rowIdx}>
                  <td
                    className="p-1.5 sm:p-2 font-semibold text-text-secondary text-center whitespace-nowrap text-[11px] sm:text-xs"
                    title={fullLabels?.[rowIdx]}
                  >
                    {labels[rowIdx]}
                  </td>
                  {row.map((value, colIdx) => {
                    const cellStyle = getCellBg(value, rowIdx, colIdx);
                    return (
                      <td
                        key={colIdx}
                        className="p-0 text-center"
                        title={`Predicted ${labels[rowIdx]}, Actual ${labels[colIdx]}: ${value}`}
                      >
                        <div
                          className="w-full h-8 sm:h-10 flex items-center justify-center font-semibold text-[11px] sm:text-xs border border-white/60"
                          style={cellStyle}
                        >
                          {value}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-4 px-1">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-primary/70 shrink-0" />
          <span className="text-xs text-text-secondary">Correct prediction (diagonal)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-danger/50 shrink-0" />
          <span className="text-xs text-text-secondary">Misclassification</span>
        </div>
      </div>
    </div>
  );
}
