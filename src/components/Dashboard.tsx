'use client';

import { useState, useRef, useEffect } from 'react';

interface DashboardProps {
  activeView: string;
}

interface CardData {
  id: string;
  type: string;
  content: React.ReactNode;
  minWidth: string;
}

export default function Dashboard({ activeView }: DashboardProps) {
  const [cards, setCards] = useState<CardData[]>([
    {
      id: 'sales-stats',
      type: 'card',
      minWidth: '300px',
      content: (
        <div className="card masonry-card" style={{ minWidth: '300px' }}>
          <h3 className="h3">Sales Statistics</h3>
          <div className="kpi">$320,202.11</div>
          <div className="kpi-change positive">+3%</div>
          <div className="chart-surface" style={{ marginTop: 'var(--space-4)', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-2)' }}>
            Chart Placeholder
          </div>
        </div>
      )
    },
    {
      id: 'top-sellers',
      type: 'card',
      minWidth: '350px',
      content: (
        <div className="card masonry-card" style={{ minWidth: '350px' }}>
          <h3 className="h3">Top Seller by Country</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <div className="status-indicator status-active">Indonesia — 70%</div>
            <div className="status-indicator status-info">USA — 34%</div>
            <div className="status-indicator status-warning">Thailand — 87%</div>
          </div>
        </div>
      )
    },
    {
      id: 'top-sales',
      type: 'card',
      minWidth: '280px',
      content: (
        <div className="card masonry-card" style={{ minWidth: '280px' }}>
          <h3 className="h3">Top Sales</h3>
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <button className="pill pill--dark">All</button>
            <button className="pill">Male</button>
            <button className="pill">Female</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ padding: 'var(--space-3)', background: 'var(--ui-2)', borderRadius: 'var(--radius-md)', fontSize: 'var(--fs-sm)' }}>
              <strong>Ryan Collins</strong> - 1240 Points
            </div>
            <div style={{ padding: 'var(--space-3)', background: 'var(--ui-2)', borderRadius: 'var(--radius-md)', fontSize: 'var(--fs-sm)' }}>
              <strong>Chloe Harper</strong> - 1190 Points
            </div>
            <div style={{ padding: 'var(--space-3)', background: 'var(--ui-2)', borderRadius: 'var(--radius-md)', fontSize: 'var(--fs-sm)' }}>
              <strong>Ethan Mitchell</strong> - 1008 Points
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'marketing',
      type: 'card',
      minWidth: '300px',
      content: (
        <div className="card masonry-card" style={{ minWidth: '300px' }}>
          <h3 className="h3">Marketing Activities</h3>
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <div style={{ marginBottom: 'var(--space-2)' }}>Team Activities: <strong>16.5 hours</strong></div>
            <div>Team: <strong>235 members</strong></div>
          </div>
          <button className="btn btn--accent">See All</button>
        </div>
      )
    },
    {
      id: 'annual-profit',
      type: 'card',
      minWidth: '300px',
      content: (
        <div className="card masonry-card" style={{ minWidth: '300px' }}>
          <h3 className="h3">Annual Profit</h3>
          <div className="kpi">$62,890.00</div>
          <div className="chart-surface" style={{ marginTop: 'var(--space-4)', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-2)' }}>
            Chart Placeholder
          </div>
        </div>
      )
    },
    {
      id: 'promo',
      type: 'promo',
      minWidth: '320px',
      content: (
        <div className="promo masonry-card" style={{ minWidth: '320px' }}>
          <h3 style={{ color: '#fff', margin: 0 }}>Upgrade to Bode Pro</h3>
          <p style={{ color: '#fff', marginBottom: 'var(--space-4)', marginTop: 'var(--space-2)' }}>Ready to boost your performance?</p>
          <button className="btn" style={{ background: '#222327' }}>Get Started</button>
        </div>
      )
    },
    {
      id: 'predictive-maintenance',
      type: 'card',
      minWidth: '320px',
      content: (
        <div className="card masonry-card" style={{ minWidth: '320px' }}>
          <h3 className="h3">Predictive Maintenance</h3>
          <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div className="kpi-value" style={{ color: 'var(--accent-yellow)' }}>7</div>
              <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--ink-2)' }}>Predicted Failures (7d)</div>
            </div>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div className="kpi-value" style={{ color: 'var(--accent-green-1)' }}>2.3h</div>
              <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--ink-2)' }}>Avg MTTR</div>
            </div>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div className="kpi-value" style={{ color: 'var(--accent-lilac)' }}>78%</div>
              <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--ink-2)' }}>PM vs RM</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ padding: 'var(--space-3)', background: 'var(--ui-2)', borderRadius: 'var(--radius-sm)', fontSize: 'var(--fs-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-1)' }}>
                <span><strong>HVAC Unit A-12</strong></span>
                <span style={{ color: 'var(--accent-yellow)', fontSize: 'var(--fs-xs)', fontWeight: 'var(--fw-semibold)' }}>High Risk</span>
              </div>
              <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--ink-2)' }}>Temperature sensor drift detected</div>
            </div>
            <div style={{ padding: 'var(--space-3)', background: 'var(--ui-2)', borderRadius: 'var(--radius-sm)', fontSize: 'var(--fs-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-1)' }}>
                <span><strong>Elevator B-3</strong></span>
                <span style={{ color: 'var(--accent-yellow)', fontSize: 'var(--fs-xs)', fontWeight: 'var(--fw-semibold)' }}>Medium Risk</span>
              </div>
              <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--ink-2)' }}>Vibration pattern anomaly</div>
            </div>
            <div style={{ padding: 'var(--space-3)', background: 'var(--ui-2)', borderRadius: 'var(--radius-sm)', fontSize: 'var(--fs-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-1)' }}>
                <span><strong>Boiler System C-1</strong></span>
                <span style={{ color: 'var(--accent-green-1)', fontSize: 'var(--fs-xs)', fontWeight: 'var(--fw-semibold)' }}>Low Risk</span>
              </div>
              <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--ink-2)' }}>Operating within normal parameters</div>
            </div>
          </div>
          <button className="btn btn--accent" style={{ marginTop: 'var(--space-4)', width: '100%' }}>Create PPM Schedule</button>
        </div>
      )
    },
    {
      id: 'kpi-occupancy',
      type: 'kpi-card',
      minWidth: '200px',
      content: (
        <div className="kpi-card masonry-card" style={{ minWidth: '200px' }}>
          <h4 className="h4">Occupancy Rate</h4>
          <div className="kpi-value">94.2%</div>
          <div className="kpi-change positive">+2.1%</div>
        </div>
      )
    },
    {
      id: 'kpi-maintenance',
      type: 'kpi-card',
      minWidth: '200px',
      content: (
        <div className="kpi-card masonry-card" style={{ minWidth: '200px' }}>
          <h4 className="h4">Maintenance Tickets</h4>
          <div className="kpi-value">12</div>
          <div className="kpi-change negative">-3</div>
        </div>
      )
    },
    {
      id: 'kpi-rent',
      type: 'kpi-card',
      minWidth: '200px',
      content: (
        <div className="kpi-card masonry-card" style={{ minWidth: '200px' }}>
          <h4 className="h4">Average Rent</h4>
          <div className="kpi-value">£1,250</div>
          <div className="kpi-change positive">+5.2%</div>
        </div>
      )
    },
    {
      id: 'kpi-satisfaction',
      type: 'kpi-card',
      minWidth: '200px',
      content: (
        <div className="kpi-card masonry-card" style={{ minWidth: '200px' }}>
          <h4 className="h4">Tenant Satisfaction</h4>
          <div className="kpi-value">4.6/5</div>
          <div className="kpi-change positive">+0.2</div>
        </div>
      )
    },
    {
      id: 'chart-occupancy',
      type: 'card',
      minWidth: '320px',
      content: (
        <div className="card masonry-card" style={{ minWidth: '320px' }}>
          <h3 className="h3">Occupancy Trends</h3>
          <div className="chart-surface" style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-2)' }}>
            Chart Placeholder
          </div>
        </div>
      )
    },
    {
      id: 'chart-maintenance',
      type: 'card',
      minWidth: '320px',
      content: (
        <div className="card masonry-card" style={{ minWidth: '320px' }}>
          <h3 className="h3">Maintenance by Category</h3>
          <div className="chart-surface" style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-2)' }}>
            Chart Placeholder
          </div>
        </div>
      )
    },
    {
      id: 'ai-widget',
      type: 'card',
      minWidth: '100%',
      content: (
        <div className="card card--soft masonry-card" style={{ minWidth: '100%' }}>
          <h3 className="h3">AI Widget Creation</h3>
          <p className="meta">Ask the AI assistant to create custom widgets for your dashboard</p>
        </div>
      )
    }
  ]);

  const [draggedCard, setDraggedCard] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [enlargedCard, setEnlargedCard] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const dragRef = useRef<HTMLDivElement>(null);

  // Simulate loading time for smooth animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleDragStart = (e: React.DragEvent, cardId: string) => {
    setDraggedCard(cardId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', cardId);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedCard) {
      const draggedIndex = cards.findIndex(card => card.id === draggedCard);
      if (draggedIndex !== -1) {
        const newCards = [...cards];
        const [draggedItem] = newCards.splice(draggedIndex, 1);
        newCards.splice(dropIndex, 0, draggedItem);
        setCards(newCards);
      }
    }
    setDraggedCard(null);
    setDragOverIndex(null);
  };

  const handleCardClick = (cardId: string) => {
    setEnlargedCard(enlargedCard === cardId ? null : cardId);
  };

  if (isLoading) {
    return (
      <div className="bode-content">
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h1 className="h1">
            Dashboard
          </h1>
          <p className="meta">Real-time overview and key performance indicators</p>
        </div>

        {/* Loading skeleton */}
        <div className="masonry-grid">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} style={{ minWidth: '300px', height: '200px' }}>
              <div className="loading-skeleton" style={{ height: '100%' }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bode-content">
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h1 className="h1">
          Dashboard
        </h1>
        <p className="meta">Real-time overview and key performance indicators</p>
      </div>

      {/* Masonry Dashboard Layout */}
      <div className="masonry-grid">
        {cards.map((card, index) => (
          <div
            key={card.id}
            draggable
            onDragStart={(e) => handleDragStart(e, card.id)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            onClick={() => handleCardClick(card.id)}
            style={{
              cursor: 'grab',
              transform: enlargedCard === card.id ? 'scale(1.02)' : 'scale(1)',
              transition: 'transform 0.2s ease-in-out',
              position: 'relative',
              zIndex: draggedCard === card.id ? 1000 : enlargedCard === card.id ? 10 : 1
            }}
            onDragEnd={() => {
              setDraggedCard(null);
              setDragOverIndex(null);
            }}
          >
            {/* Drop target indicator */}
            {dragOverIndex === index && draggedCard !== card.id && (
              <div
                style={{
                  position: 'absolute',
                  top: '-8px',
                  left: '-8px',
                  right: '-8px',
                  bottom: '-8px',
                  border: '2px dashed var(--ui-4)',
                  borderRadius: 'var(--radius-lg)',
                  background: 'rgba(200, 200, 200, 0.1)',
                  zIndex: 999,
                  pointerEvents: 'none'
                }}
              />
            )}
            
            {/* Card content */}
            <div
              style={{
                opacity: draggedCard === card.id ? 0.5 : 1,
                transform: draggedCard === card.id ? 'rotate(5deg)' : 'none',
                transition: 'opacity 0.2s ease-in-out, transform 0.2s ease-in-out'
              }}
            >
              {card.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
