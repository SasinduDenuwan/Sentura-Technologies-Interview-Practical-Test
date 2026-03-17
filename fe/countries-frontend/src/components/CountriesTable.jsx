import React, { useEffect, useState, useRef } from "react";
import { getCountries, searchCountries } from "../service/api";
import CountryModal from "./CountryModal.jsx";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function CountriesTable() {
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fading, setFading] = useState(false);
    const [error, setError] = useState(null);
    const [animKey, setAnimKey] = useState(0);
    const debounceRef = useRef(null);

    useEffect(() => {
        loadCountries();
    }, []);

    const loadCountries = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await getCountries();
            setCountries(res.data);
            setAnimKey((k) => k + 1);
        } catch (err) {
            setError("Failed to load countries. Make sure the backend is running.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (value) => {
        setSearch(value);
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(async () => {
            setError(null);
            // 1. Fade out the current table
            setFading(true);
            await sleep(180);          // let the CSS transition finish

            if (value === "") {
                setFading(false);
                loadCountries();
            } else {
                setLoading(true);
                try {
                    const res = await searchCountries(value);
                    setCountries(res.data);
                    setAnimKey((k) => k + 1);
                } catch (err) {
                    setError("No countries found for that search.");
                    setCountries([]);
                } finally {
                    setLoading(false);
                    // 2. Fade back in with the new rows
                    setFading(false);
                }
            }
        }, 320);
    };

    return (
        <div className="container">
            <header className="app-header">
                <h1 className="app-title">🌍 World Countries</h1>
                <p className="app-subtitle">Explore countries, capitals, regions and populations</p>
            </header>

            {/* ── Sticky search bar ── */}
            <div className="search-sticky">
                <div className="search-wrapper">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search country..."
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="search-input"
                    />
                    {loading && <span className="search-spinner" />}
                </div>
            </div>

            {error && <div className="error-banner">{error}</div>}

            <p className="results-count">{countries.length} countries found</p>

            {/* ── Desktop Table ── */}
            <div className={`table-wrapper desktop-only${loading ? " table-loading" : ""}${fading ? " table-fading" : ""}`}>
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
                    <tbody key={animKey}>
                        {countries.map((country, i) => (
                            <tr
                                key={country.name}
                                style={{ animationDelay: `${i * 30}ms` }}
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
            <div className={`cards-grid mobile-only${fading ? " table-fading" : ""}`} key={animKey}>
                {countries.map((country, i) => (
                    <div
                        key={country.name}
                        className="country-card"
                        style={{ animationDelay: `${i * 40}ms` }}
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