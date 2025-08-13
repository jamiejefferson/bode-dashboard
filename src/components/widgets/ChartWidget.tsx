'use client';

interface ChartData {
  [key: string]: any;
}

interface ChartWidgetProps {
  title: string;
  type: 'line' | 'bar' | 'pie' | 'doughnut';
  data: ChartData[];
}

export default function ChartWidget({ title, type, data }: ChartWidgetProps) {
  const renderChart = () => {
    switch (type) {
      case 'line':
        return renderLineChart();
      case 'bar':
        return renderBarChart();
      case 'pie':
        return renderPieChart();
      case 'doughnut':
        return renderDoughnutChart();
      default:
        return renderLineChart();
    }
  };

  const renderLineChart = () => {
    const maxValue = Math.max(...data.map(d => d.occupancy || d.noi || 0));
    const minValue = Math.min(...data.map(d => d.occupancy || d.noi || 0));
    const range = maxValue - minValue;

    return (
      <div className="h-48 flex items-end justify-between space-x-2">
        {data.map((item, index) => {
          const value = item.occupancy || item.noi || 0;
          const height = range > 0 ? ((value - minValue) / range) * 100 : 50;
          const month = item.month || item.quarter || `Q${index + 1}`;
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-blue-100 rounded-t transition-all duration-300 hover:bg-blue-200 relative group">
                <div 
                  className="bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600"
                  style={{ height: `${height}%` }}
                ></div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {value}
                </div>
              </div>
              <span className="text-xs text-gray-600 mt-2">{month}</span>
            </div>
          );
        })}
      </div>
    );
  };

  const renderBarChart = () => {
    const maxValue = Math.max(...data.map(d => d.noi || d.occupancy || d.staff || 0));
    
    return (
      <div className="h-48 flex items-end justify-between space-x-2">
        {data.map((item, index) => {
          const value = item.noi || item.occupancy || item.staff || 0;
          const height = (value / maxValue) * 100;
          const label = item.property || item.day || `Item ${index + 1}`;
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-green-100 rounded-t transition-all duration-300 hover:bg-green-200 relative group">
                <div 
                  className="bg-green-500 rounded-t transition-all duration-300 hover:bg-green-600"
                  style={{ height: `${height}%` }}
                ></div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {value}
                </div>
              </div>
              <span className="text-xs text-gray-600 mt-2 text-center">{label}</span>
            </div>
          );
        })}
      </div>
    );
  };

  const renderPieChart = () => {
    const total = data.reduce((sum, item) => sum + (item.count || 0), 0);
    
    return (
      <div className="h-48 flex items-center justify-center">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 32 32">
            {data.map((item, index) => {
              const value = item.count || 0;
              const percentage = total > 0 ? (value / total) * 100 : 0;
              const circumference = 2 * Math.PI * 14; // radius = 14
              const strokeDasharray = (percentage / 100) * circumference;
              const strokeDashoffset = circumference - strokeDasharray;
              const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
              
              return (
                <circle
                  key={index}
                  cx="16"
                  cy="16"
                  r="14"
                  fill="none"
                  stroke={colors[index % colors.length]}
                  strokeWidth="4"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-300 hover:stroke-opacity-80"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">{total}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderDoughnutChart = () => {
    const total = data.reduce((sum, item) => sum + (item.count || 0), 0);
    
    return (
      <div className="h-48 flex items-center justify-center">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 32 32">
            {data.map((item, index) => {
              const value = item.count || 0;
              const percentage = total > 0 ? (value / total) * 100 : 0;
              const circumference = 2 * Math.PI * 12; // radius = 12
              const strokeDasharray = (percentage / 100) * circumference;
              const strokeDashoffset = circumference - strokeDasharray;
              const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];
              
              return (
                <circle
                  key={index}
                  cx="16"
                  cy="16"
                  r="12"
                  fill="none"
                  stroke={colors[index % colors.length]}
                  strokeWidth="3"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-300 hover:stroke-opacity-80"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">{total}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center space-x-2">
          <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </button>
          <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>
      
      {renderChart()}
      
      {/* Legend for pie/doughnut charts */}
      {(type === 'pie' || type === 'doughnut') && (
        <div className="mt-4 flex flex-wrap gap-2">
          {data.map((item, index) => {
            const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
            const category = item.category || item.status || `Category ${index + 1}`;
            
            return (
              <div key={index} className="flex items-center space-x-1">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors[index % colors.length] }}
                ></div>
                <span className="text-xs text-gray-600">{category}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
