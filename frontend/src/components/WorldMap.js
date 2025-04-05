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
              Founded in 1997, Çankaya University is a leading institution for technology and innovation in Turkey. 
              As the project coordinator, the university leads research initiatives in information technology 
              and software quality standards across Europe.
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
              Lorem ipsum dolor sit amet consectetur. Sagittis cursus nibh dolor placerat ac velit suscipit ligula ac. Viverra morbi interdum nunc sed duis. Morbi morbi euismod dui aliquet. Tristique euismod elementum sed tincidunt malesuada libero. Varius lacinia sed morbi risus fermentum semper rutrum diam sagittis.
            </p>
            <p className="tooltip-description">
              Molestie molestie est consequat purus mus risus turpis sit neque. Nam pretium aenean suspendisse netus lectus nullam. Duis pellentesque egestas lacinia pellentesque turpis est.
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
              Lorem ipsum dolor sit amet consectetur. Sagittis cursus nibh dolor placerat ac velit suscipit ligula ac. Viverra morbi interdum nunc sed duis. Morbi morbi euismod dui aliquet. Tristique euismod elementum sed tincidunt malesuada libero. Varius lacinia sed morbi risus fermentum semper rutrum diam sagittis.
            </p>
            <p className="tooltip-description">
              Molestie molestie est consequat purus mus risus turpis sit neque. Nam pretium aenean suspendisse netus lectus nullam. Duis pellentesque egestas lacinia pellentesque turpis est.
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
              Lorem ipsum dolor sit amet consectetur. Sagittis cursus nibh dolor placerat ac velit suscipit ligula ac. Viverra morbi interdum nunc sed duis. Morbi morbi euismod dui aliquet. Tristique euismod elementum sed tincidunt malesuada libero. Varius lacinia sed morbi risus fermentum semper rutrum diam sagittis.
            </p>
            <p className="tooltip-description">
              Molestie molestie est consequat purus mus risus turpis sit neque. Nam pretium aenean suspendisse netus lectus nullam. Duis pellentesque egestas lacinia pellentesque turpis est.
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