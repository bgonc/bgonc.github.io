import React, { useEffect, useState } from 'react';

interface ContributionDay {
  date: string;
  count: number;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Mon', '', 'Wed', '', 'Fri', '', ''];
const CELL_SIZE = 11;
const GAP = 2;

function getColor(count: number, dark: boolean): string {
  if (count === 0) return dark ? '#1e293b' : '#e2e8f0';
  if (count <= 2) return dark ? '#1e3a5f' : '#bfdbfe';
  if (count <= 5) return dark ? '#1d4ed8' : '#60a5fa';
  if (count <= 10) return dark ? '#2563eb' : '#3b82f6';
  return dark ? '#3b82f6' : '#1d4ed8';
}

const ActivityHeatmap: React.FC = () => {
  const [days, setDays] = useState<ContributionDay[]>([]);
  const [total, setTotal] = useState(0);
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetch('https://codeberg.org/api/v1/users/bgonc/heatmap')
      .then(r => r.json())
      .then((data: { timestamp: number; contributions: number }[]) => {
        // Aggregate contributions by date
        const byDate: Record<string, number> = {};
        for (const entry of data) {
          const d = new Date(entry.timestamp * 1000);
          const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
          byDate[key] = (byDate[key] || 0) + entry.contributions;
        }

        // Build full year grid
        const today = new Date();
        const start = new Date(today);
        start.setFullYear(start.getFullYear() - 1);
        start.setDate(start.getDate() - start.getDay() + 1); // Start on Monday

        const result: ContributionDay[] = [];
        let sum = 0;
        const cursor = new Date(start);
        while (cursor <= today) {
          const key = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, '0')}-${String(cursor.getDate()).padStart(2, '0')}`;
          const count = byDate[key] || 0;
          result.push({ date: key, count });
          sum += count;
          cursor.setDate(cursor.getDate() + 1);
        }
        setDays(result);
        setTotal(sum);
      })
      .catch(() => {});
  }, []);

  if (days.length === 0) return null;

  // Group by weeks (columns), 7 rows (Mon=0..Sun=6)
  const weeks: ContributionDay[][] = [];
  let week: ContributionDay[] = [];
  // Pad initial week if first day isn't Monday
  const firstDow = new Date(days[0].date).getDay();
  const mondayOffset = firstDow === 0 ? 6 : firstDow - 1;
  for (let i = 0; i < mondayOffset; i++) {
    week.push({ date: '', count: -1 });
  }
  for (const day of days) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push({ date: '', count: -1 });
    weeks.push(week);
  }

  // Month labels
  const monthLabels: { label: string; x: number }[] = [];
  let lastMonth = -1;
  for (let w = 0; w < weeks.length; w++) {
    for (const d of weeks[w]) {
      if (d.date) {
        const m = parseInt(d.date.split('-')[1]) - 1;
        if (m !== lastMonth) {
          monthLabels.push({ label: MONTHS[m], x: w * (CELL_SIZE + GAP) });
          lastMonth = m;
        }
        break;
      }
    }
  }

  const svgWidth = weeks.length * (CELL_SIZE + GAP) + 30;
  const svgHeight = 7 * (CELL_SIZE + GAP) + 20;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-text-muted tracking-wide uppercase">
          Codeberg Activity
        </h3>
        <span className="text-xs text-text-muted">
          {total} contributions in the last year
        </span>
      </div>
      <div className="overflow-x-auto pb-2" style={{ position: 'relative' }}>
        <svg width={svgWidth} height={svgHeight} className="block">
          {/* Month labels */}
          {monthLabels.map((m, i) => (
            <text
              key={i}
              x={m.x + 30}
              y={10}
              className="fill-text-muted"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              {m.label}
            </text>
          ))}

          {/* Day labels */}
          {DAYS.map((label, i) => (
            label ? (
              <text
                key={i}
                x={0}
                y={20 + i * (CELL_SIZE + GAP) + CELL_SIZE - 2}
                className="fill-text-muted"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                {label}
              </text>
            ) : null
          ))}

          {/* Cells */}
          {weeks.map((week, wi) =>
            week.map((day, di) => {
              if (day.count < 0) return null;
              const x = wi * (CELL_SIZE + GAP) + 30;
              const y = di * (CELL_SIZE + GAP) + 16;
              return (
                <rect
                  key={`${wi}-${di}`}
                  x={x}
                  y={y}
                  width={CELL_SIZE}
                  height={CELL_SIZE}
                  rx={2}
                  fill={getColor(day.count, isDark)}
                  className="transition-colors duration-200"
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={(e) => {
                    const rect = (e.target as SVGRectElement).getBoundingClientRect();
                    setTooltip({
                      text: `${day.count} contribution${day.count !== 1 ? 's' : ''} on ${day.date}`,
                      x: rect.left + rect.width / 2,
                      y: rect.top - 8,
                    });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                />
              );
            })
          )}
        </svg>

        {/* Legend */}
        <div className="flex items-center gap-1 mt-2 justify-end text-xs text-text-muted">
          <span>Less</span>
          {[0, 1, 3, 6, 11].map((n) => (
            <span
              key={n}
              style={{
                width: CELL_SIZE,
                height: CELL_SIZE,
                borderRadius: 2,
                display: 'inline-block',
                backgroundColor: getColor(n, isDark),
              }}
            />
          ))}
          <span>More</span>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          style={{
            position: 'fixed',
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translate(-50%, -100%)',
            pointerEvents: 'none',
            zIndex: 50,
          }}
          className="bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap"
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
};

export default ActivityHeatmap;
