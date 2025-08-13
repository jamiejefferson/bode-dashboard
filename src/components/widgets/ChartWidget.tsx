'use client';

interface ChartData {
  label: string;
  value: number;
}

interface ChartWidgetProps {
  data: ChartData[];
  type?: 'line' | 'bar' | 'pie';
  title?: string;
}

export default function ChartWidget({ data, type = 'bar', title }: ChartWidgetProps) {
  return (
    <div className="chart-widget">
      {title && <h3>{title}</h3>}
      <div className="chart-container">
        {type === 'bar' && (
          <div className="bar-chart">
            {data.map((d, index) => (
              <div key={index} className="bar" style={{ height: `${d.value}%` }}>
                <span>{d.label}</span>
              </div>
            ))}
          </div>
        )}
        {type === 'line' && (
          <div className="line-chart">
            {data.map((d, index) => (
              <div key={index} className="point" style={{ left: `${(index / (data.length - 1)) * 100}%`, bottom: `${d.value}%` }}>
                <span>{d.label}</span>
              </div>
            ))}
          </div>
        )}
        {type === 'pie' && (
          <div className="pie-chart">
            {data.map((item, index) => (
              <div key={index} className="slice" style={{ 
                transform: `rotate(${(index / data.length) * 360}deg)`,
                background: `hsl(${(index * 360) / data.length}, 70%, 50%)`
              }}>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
