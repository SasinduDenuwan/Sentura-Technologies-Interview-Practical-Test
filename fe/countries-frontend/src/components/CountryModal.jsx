import React from "react";

function CountryModal({ country, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>✕</button>
        <img src={country.flag} alt={`${country.name} flag`} className="modal-flag" />
        <h2 className="modal-title">{country.name}</h2>
        <div className="modal-details">
          <div className="modal-detail-item">
            <span className="detail-label">🏛️ Capital</span>
            <span className="detail-value">{country.capital}</span>
          </div>
          <div className="modal-detail-item">
            <span className="detail-label">🌐 Region</span>
            <span className="detail-value">{country.region}</span>
          </div>
          <div className="modal-detail-item">
            <span className="detail-label">👥 Population</span>
            <span className="detail-value">{country.population?.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryModal;