// src/components/WindSpeedChart.js
import './styles/WindSpeedChart.css'; 
import React from 'react';
import { LinePath } from '@visx/shape';
import { curveMonotoneX } from '@visx/curve';
import { scaleTime, scaleLinear } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import { Group } from '@visx/group';
import { max, extent } from 'd3-array';
import { timeFormat } from 'd3-time-format';

// Formatage des dates
const formatDate = timeFormat('%b %d');

// Dimensions du graphique
const width = 600;
const height = 300;
const margin = { top: 40, right: 20, bottom: 40, left: 50 };

// Dimensions du contenu du graphique
const xMax = width - margin.left - margin.right;
const yMax = height - margin.top - margin.bottom;

const WindSpeedChart = ({ data }) => {
  // Création des échelles pour les axes X (temps) et Y (vitesse du vent)
  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(data, (d) => new Date(d.date)),
  });

  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [0, max(data, (d) => d.windSpeed) + 5], // Ajouter une marge en haut
  });

  return (
    <svg width={width} height={height}>
      <Group left={margin.left} top={margin.top}>
        {/* Grilles */}
        <GridRows scale={yScale} width={xMax} height={yMax} stroke="#e0e0e0" />
        <GridColumns scale={xScale} height={yMax} stroke="#e0e0e0" />

        {/* Axes */}
        <AxisBottom
          scale={xScale}
          top={yMax}
          tickFormat={formatDate}
          stroke="#333"
          tickStroke="#333"
          tickLabelProps={() => ({
            fill: '#333',
            fontSize: 11,
            textAnchor: 'middle',
          })}
        />
        <AxisLeft
          scale={yScale}
          stroke="#333"
          tickStroke="#333"
          tickLabelProps={() => ({
            fill: '#333',
            fontSize: 11,
            textAnchor: 'end',
            dx: '-0.25em',
            dy: '0.25em',
          })}
        />

        {/* Courbe de la vitesse du vent */}
        <LinePath
          data={data}
          x={(d) => xScale(new Date(d.date))}
          y={(d) => yScale(d.windSpeed)}
          stroke="#00b300"
          strokeWidth={2}
          curve={curveMonotoneX}
        />
      </Group>
    </svg>
  );
};

export default WindSpeedChart;
