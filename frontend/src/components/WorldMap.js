import React from 'react';
import { 
  ComposableMap, 
  Geographies, 
  Geography, 
  Marker
} from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import "../styles/WorldMap.css";

// Import university logos
import cankayaLogoImg from '../assets/cankaya-logo.png';
import openLogoImg from '../assets/open-logo.png';
import fufdvLogoImg from '../assets/fufdv-logo.png';
import tedLogoImg from '../assets/ted-logo.png';

// Using a different topojson source with better defined countries
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Custom tooltip content for markers
const CustomTooltipContent = ({ type, data }) => {
  switch(type) {
    case "cankaya":
      return (
        <div className="custom-tooltip-container">
          <div className="tooltip-logo-container">
            <img src={cankayaLogoImg} alt="Çankaya Üniversitesi Logo" className="tooltip-logo" />
          </div>
          <div className="tooltip-content">
            <h3 className="tooltip-title">Cankaya University (Türkiye)</h3>
            <p className="tooltip-subtitle">(Project Coordinator)</p>
            <p className="tooltip-description">
                Çankaya University, serving as the project coordinator, is a leading private institution in Ankara, Türkiye. Known for its emphasis on research, innovation, and quality education, the university plays a key role in the strategic and operational management of the project. Its extensive experience in international collaborations ensures smooth coordination and impactful outcomes.
            </p>
          </div>
        </div>
      );
    
    case "open-uni":
      return (
        <div className="custom-tooltip-container">
          <div className="tooltip-logo-container">
            <img src={openLogoImg} alt="Open Universiteit Logo" className="tooltip-logo" />
          </div>
          <div className="tooltip-content">
            <h3 className="tooltip-title">Open Universiteit (Netherlands)</h3>
            <p className="tooltip-description">
                Open Universiteit, based in Heerlen, the Netherlands, is renowned for its pioneering role in distance education and digital learning. As a partner, it provides critical expertise in online education tools and methodologies, helping the project reach wider audiences and foster flexible, inclusive learning environments.
            </p>
          </div>
        </div>
      );

    case "fufdv":
      return (
        <div className="custom-tooltip-container">
          <div className="tooltip-logo-container">
            <img src={fufdvLogoImg} alt="Fundacion Universidad Francisco De Vitoria Logo" className="tooltip-logo" />
          </div>
          <div className="tooltip-content">
            <h3 className="tooltip-title">Fundacion Universidad</h3>
            <h3 className="tooltip-title">Francisco De Vitoria (Spain)</h3>
            <p className="tooltip-description">
                Located in Madrid, Spain, Universidad Francisco de Vitoria is a prestigious university recognized for its commitment to ethical values and academic excellence. Its participation enriches the project through deep-rooted experience in educational reform, international mobility, and cultural integration.
            </p>
          </div>
        </div>
      );
      
    case "ted":
      return (
        <div className="custom-tooltip-container">
          <div className="tooltip-logo-container">
            <img src={tedLogoImg} alt="TED Üniversitesi Logo" className="tooltip-logo" />
          </div>
          <div className="tooltip-content">
            <h3 className="tooltip-title">TED University (Türkiye)</h3>
            <p className="tooltip-description">
                TED University, based in Ankara, Türkiye, is a progressive and dynamic institution dedicated to liberal education and student-centered learning. With its strong focus on pedagogy and interdisciplinary approaches, TEDU brings valuable insights to the development of innovative teaching methodologies within the project.
            </p>
          </div>
        </div>
      );
    
    default:
      return <span>{data}</span>;
  }
};

// Partnership locations with coordinates
const partnerLocations = [
  // Çankaya University in Ankara (red dot)
  { name: "Çankaya University", coordinates: [32.7597, 39.4334], color: "#FF3A33", tooltipType: "cankaya" },
  
  // Other universities (orange dots)
  { name: "Open Universiteit", coordinates: [5.9815, 50.8883], color: "#FF9326", tooltipType: "open-uni" },
  { name: "Universidad Francisco De Vitoria", coordinates: [-3.7038, 40.4168], color: "#FF9326", tooltipType: "fufdv" },
  { name: "TED University", coordinates: [35, 39.5334], color: "#FF9326", tooltipType: "ted" },
];

const WorldMap = () => {
  return (
    <div className="world-map-container">
      <Tooltip id="map-tooltip" className="map-custom-tooltip" render={({ content, activeAnchor }) => {
        const marker = partnerLocations.find(loc => loc.name === content);
        return <CustomTooltipContent type={marker?.tooltipType} data={content} />;
      }} />
      
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 275,
          center: [32, 18]
        }}
        className="static-map"
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#B3C9E3"
                stroke="#738FB5"
                strokeWidth={0.8}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none", fill: "#A0B9D8" },
                  pressed: { outline: "none" }
                }}
              />
            ))
          }
        </Geographies>
        
        {partnerLocations.map(({ name, coordinates, color }) => (
          <Marker 
            key={name} 
            coordinates={coordinates}
            data-tooltip-id="map-tooltip"
            data-tooltip-content={name}
          >
            <circle r={7} fill={color} stroke="#fff" strokeWidth={2} className="map-marker" />
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
};

export default WorldMap;