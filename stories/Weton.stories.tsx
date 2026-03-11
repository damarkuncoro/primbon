import type { Meta, StoryObj } from '@storybook/react';
import { calculateWeton, calculatePasaran, calculateKalenderJawa } from '../src/index.js';
import React, { useState } from 'react';

const meta: Meta = {
  title: 'Primbon/Weton',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    date: { control: 'date' },
  },
};

export default meta;
type Story = StoryObj;

// Interactive component for Weton
const WetonCalculator = () => {
  const [date, setDate] = useState('1990-08-17');
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const d = new Date(date);
    setResult({
      weton: calculateWeton(d),
      kalender: calculateKalenderJawa(d),
    });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px' }}>
      <h2 style={{ marginBottom: '16px' }}>Kalkulator Weton</h2>
      
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px' }}>Pilih Tanggal:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>
      
      <button
        onClick={handleCalculate}
        style={{
          padding: '10px 20px',
          backgroundColor: '#5A5A40',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        Hitung Weton
      </button>

      {result && (
        <div style={{ backgroundColor: '#f5f5f0', padding: '16px', borderRadius: '8px' }}>
          <h3>Hasil:</h3>
          <p><strong>Hari:</strong> {result.weton.hari}</p>
          <p><strong>Pasaran:</strong> {result.weton.pasaran}</p>
          <p><strong>Weton:</strong> {result.weton.weton}</p>
          <p><strong>Neptu:</strong> {result.weton.neptu}</p>
          <hr style={{ margin: '12px 0' }} />
          <p><strong>Kalender Jawa:</strong></p>
          <p>{result.kalender.tanggal} {result.kalender.bulan} {result.kalender.tahun}</p>
          <p>Tahun: {result.kalender.namaTahun}</p>
        </div>
      )}
    </div>
  );
};

export const Interactive: Story = {
  render: () => <WetonCalculator />,
};

export const MingguLegi: Story = {
  args: {
    date: new Date('2024-01-14').getTime(),
  },
  render: () => {
    const d = new Date('2024-01-14');
    const weton = calculateWeton(d);
    return (
      <div style={{ padding: '20px', backgroundColor: '#f5f5f0', borderRadius: '8px' }}>
        <h3>{weton.weton}</h3>
        <p>Neptu: {weton.neptu}</p>
        <p>Hari: {weton.hari}</p>
        <p>Pasaran: {weton.pasaran}</p>
      </div>
    );
  },
};

export const SeninKliwon: Story = {
  render: () => {
    const d = new Date('2024-01-15');
    const weton = calculateWeton(d);
    return (
      <div style={{ padding: '20px', backgroundColor: '#f5f5f0', borderRadius: '8px' }}>
        <h3>{weton.weton}</h3>
        <p>Neptu: {weton.neptu}</p>
        <p>Hari: {weton.hari}</p>
        <p>Pasaran: {weton.pasaran}</p>
      </div>
    );
  },
};

export const JumatPahing: Story = {
  render: () => {
    const d = new Date('1990-08-17');
    const weton = calculateWeton(d);
    return (
      <div style={{ padding: '20px', backgroundColor: '#f5f5f0', borderRadius: '8px' }}>
        <h3>{weton.weton}</h3>
        <p>Neptu: {weton.neptu}</p>
        <p>Hari: {weton.hari}</p>
        <p>Pasaran: {weton.pasaran}</p>
      </div>
    );
  },
};