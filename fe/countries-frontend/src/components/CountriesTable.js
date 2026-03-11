import React, { useEffect, useState } from "react";
import { getCountries, searchCountries } from "../service/api";
import CountryModal from "./CountryModal";

function CountriesTable() {

    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        loadCountries();
    }, []);

    const loadCountries = async () => {
        const res = await getCountries();
        setCountries(res.data);
    };

    const handleSearch = async (value) => {

        setSearch(value);

        if (value === "") {
            loadCountries();
        } else {
            const res = await searchCountries(value);
            setCountries(res.data);
        }
    };

    return (

        <div className="container">

            <h2>Countries</h2>

            <input
                type="text"
                placeholder="Search country..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
            />

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

                    {countries.map((country, index) => (

                        <tr
                            key={index}
                            onClick={() => setSelectedCountry(country)}
                        >

                            <td>
                                <img src={country.flag} alt="flag" width="40" />
                            </td>

                            <td>{country.name}</td>
                            <td>{country.capital}</td>
                            <td>{country.region}</td>
                            <td>{country.population.toLocaleString()}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

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