import React, { useState } from 'react';
import '../styles/Exchange.css'; // Ensure this path is correct
import Headers from '../components/Layout/Header.js';
const Exchange = () => {
  const topMobileBrands = ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Huawei', 'Sony', 'LG'];
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [variant, setVariant] = useState('');
  const [condition, setCondition] = useState('');
  const [price, setPrice] = useState('');
  const [yearsUsed, setYearsUsed] = useState('');
  const [screenCondition, setScreenCondition] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(''); // Reset error state

    // Validate input
    if (!brand || !model || !variant || !condition || !price || !yearsUsed || !screenCondition) {
      setError('All fields are required');
      return;
    }

    if (isNaN(price) || isNaN(yearsUsed)) {
      setError('Price and Years Used must be valid numbers');
      return;
    }

    const depreciationFactor = 0.25 * parseInt(yearsUsed, 10);
    let calculatedAmount = parseFloat(price); // Initialize with the original price

    switch (condition) {
      case 'Excellent':
        calculatedAmount *= (1 - depreciationFactor);
        break;
      case 'Good':
        calculatedAmount *= (1 - 2 * depreciationFactor);
        break;
      case 'Fair':
        calculatedAmount *= (1 - 3 * depreciationFactor);
        break;
      default:
        setError('Invalid condition selected');
        return;
    }

    // Adjust amount based on screen condition
    switch (screenCondition) {
      case 'Perfect':
        // No adjustment needed
        break;
      case 'Scratches':
        calculatedAmount *= 0.8; // Assuming 20% depreciation for scratches
        break;
      case 'Cracked':
        calculatedAmount *= 0.5; // Assuming cracked screen halves the value
        break;
      case 'Faulty':
        calculatedAmount *= 0.3; // Assuming faulty screen significantly reduces value
        break;
      default:
        setError('Invalid screen condition selected');
        return;
    }

    // Adjust amount based on variant
    switch (variant) {
      case 'Basic':
        calculatedAmount *= 0.6; // Assuming basic variant decreases the value by 20%
        break;
      case 'Standard':
        // No adjustment needed for standard variant
        break;
      case 'Premium':
        calculatedAmount *= 0.8; // Assuming premium variant increases the value by 20%
        break;
        case 'Premium2':
            calculatedAmount *= 1.0; // Assuming premium variant increases the value by 20%
            break;
      default:
        setError('Invalid variant selected');
        return;
    }

    // Check for negative amount which can happen if depreciation is too high
    if (calculatedAmount < 0) {
      alert('No Amount will be provided');
      return;
    }

    setAmount(calculatedAmount.toFixed(2));
  };

  return (
    <div className="page-wrapper"><Headers/><br/>
    <div className="mobile-selling-form" >
      <h2>Sell Your Old Mobile Phone</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Brand */}
        <div className="form-group">
          <label>Mobile Brand:</label>
          <select value={brand} onChange={(e) => setBrand(e.target.value)} required>
            <option value="">Select Brand</option>
            {topMobileBrands.map((brand, index) => (
              <option key={index} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
        
        {/* Model */}
        <div className="form-group">
          <label>Mobile Model:</label>
          <input type="text" value={model} onChange={(e) => setModel(e.target.value)} required />
        </div>
        
        {/* Variant */}
        <div className="form-group">
          <label>Variant:</label>
          <select value={variant} onChange={(e) => setVariant(e.target.value)} required>
            <option value="">Select Variant</option>
            <option value="Basic">2/32</option>
            <option value="Standard">4/64</option>
            <option value="Premium">8/128</option>
            <option value="Premium2">12/256</option> {/* Corrected */}
          </select>
        </div>

        {/* Condition */}
        <div className="form-group">
          <label>Body Condition:</label>
          <select value={condition} onChange={(e) => setCondition(e.target.value)} required>
            <option value="">Select Condition</option>
            <option value="Excellent">Flawless</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
          </select>
        </div>
        
        {/* Screen Condition */}
        <div className="form-group">
          <label>Screen Condition:</label>
          <select value={screenCondition} onChange={(e) => setScreenCondition(e.target.value)} required>
            <option value="">Select Screen Condition</option>
            <option value="Perfect">Flawless Screen</option>
            <option value="Scratches">Scratches on screen</option>
            <option value="Cracked">Cracked Screen</option>
            <option value="Faulty">Faulty Screen</option>
          </select>
        </div>
        
        {/* Price */}
        <div className="form-group">
          <label>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        
        {/* Years Used */}
        <div className="form-group">
          <label>Years Used:</label>
          <input type="number" value={yearsUsed} onChange={(e) => setYearsUsed(e.target.value)} required />
        </div>
        
        <button type="submit" className='exchangebutton' id='exchangebutton'>Calculate Amount</button>
      </form>
      {amount && (
        <div className="result">
          <h3>Amount Generated:</h3>
          <p>Rs: {amount} </p>
        </div>
      )}
    </div><br/></div>
  );
};

export default Exchange;
