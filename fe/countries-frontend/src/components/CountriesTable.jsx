import React, { useEffect, useState } from "react";
import { getCountries, searchCountries } from "../service/api";
import CountryModal from "./CountryModal.jsx";

function CountriesTable() {
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadCountries();
    }, []);

    const loadCountries = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await getCountries();
            setCountries(res.data);
        } catch (err) {
            setError("Failed to load countries. Make sure the backend is running.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (value) => {
        setSearch(value);
        setError(null);
        if (value === "") {
            loadCountries();
        } else {
            setLoading(true);
            try {
                const res = await searchCountries(value);
                setCountries(res.data);
            } catch (err) {
                setError("No countries found for that search.");
                setCountries([]);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="container">
            <header className="app-header">
                <h1 className="app-title">🌍 World Countries</h1>
                <p className="app-subtitle">Explore countries, capitals, regions and populations</p>
            </header>

            <div className="search-wrapper">
                <span className="search-icon">🔍</span>
                <input
                    type="text"
                    placeholder="Search country..."
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="search-input"
                />
            </div>

            {error && <div className="error-banner">{error}</div>}

            {loading ? (
                <div className="loading">
                    <div className="spinner"></div>
                    <span>Loading countries…</span>
                </div>
            ) : (
                <>
                    <p className="results-count">{countries.length} countries found</p>

                    {/* ── Desktop Table ── */}
                    <div className="table-wrapper desktop-only">
                        <table>
                            <thead>
                                <tr>
                                    <th>Flag</th>
                                    <th>Name</th>
                                    <th>Capital</th>
                                    <th>Region</th>
                                    <th>Population</th>
                                </tr>
                            </thead>
                            <tbody>
                                {countries.map((country) => (
                                    <tr
                                        key={country.name}
                                        onClick={() => setSelectedCountry(country)}
                                    >
                                        <td>
                                            <img
                                                src={country.flag}
                                                alt={`${country.name} flag`}
                                                className="flag-img"
                                            />
                                        </td>
                                        <td className="country-name">{country.name}</td>
                                        <td>{country.capital}</td>
                                        <td><span className="region-badge">{country.region}</span></td>
                                        <td>{country.population?.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* ── Mobile Card Grid ── */}
                    <div className="cards-grid mobile-only">
                        {countries.map((country) => (
                            <div
                                key={country.name}
                                className="country-card"
                                onClick={() => setSelectedCountry(country)}
                            >
                                <img
                                    src={country.flag}
                                    alt={`${country.name} flag`}
                                    className="card-flag"
                                />
                                <span className="card-name">{country.name}</span>
                                <span className="card-capital">{country.capital || "—"}</span>
                                <span className="region-badge card-region">{country.region}</span>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {selectedCountry && (
                <CountryModal
                    country={selectedCountry}
                    onClose={() => setSelectedCountry(null)}
                />
            )}
        </div>
    );
}

export default CountriesTable;