import React from "react";

function CountryModal({ country, onClose }) {

  return (

    <div className="modal-overlay">

      <div className="modal">

        <h2>{country.name}</h2>

        <img src={country.flag} alt="flag" width="120"/>

        <p><strong>Capital:</strong> {country.capital}</p>
        <p><strong>Region:</strong> {country.region}</p>
        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>

        <button onClick={onClose}>Close</button>

      </div>

    </div>

  );
}

export default CountryModal;