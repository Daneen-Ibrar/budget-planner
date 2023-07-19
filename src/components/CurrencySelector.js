import React from 'react';

const CurrencySelector = ({ selectedCurrency, onCurrencyChange }) => {
  const handleCurrencyChange = (e) => {
    const selectedCurrency = e.target.value;
    onCurrencyChange(selectedCurrency);
  };

  return (
    <div>
      <label className="currency-select">Currency: </label>
      <select
        id="currency-select"
        value={selectedCurrency}
        onChange={handleCurrencyChange}
      >
        <option value="£">£ (GBP)</option>
        <option value="$">$ (USD)</option>
        <option value="€">€ (EUR)</option>
      </select>
    </div>
  );
};

export default CurrencySelector;
