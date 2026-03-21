import React, { useRef, useEffect } from "react";
import './App.css'
import { FlipText } from "./components/ui/flip-text";
import emiImage from "./assets/images/What-is-EMI.jpg";
import familyImage from "./assets/images/family.png";
import AnimatedButton from './components/ui/animatedbutton';

const App = () => {
  const [ConsumerName, setConsumerName] = React.useState('')
  const [loanName, setLoanName] = React.useState('')
  const [loanAmount, setLoanAmount] = React.useState('')
  const [interestRate, setInterestRate] = React.useState('')
  const [loanTenure, setLoanTenure] = React.useState('')
  const [emi, setEmi] = React.useState(null)
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const [itemImage, setItemImage] = React.useState(null)
  const [yourPhoto, setYourPhoto] = React.useState(null)

  const calculateEmi = (e) => {
    e.preventDefault();
    if (!loanAmount || !interestRate || !loanTenure) {
      alert("Please enter all the values to calculate your EMI-");
      return;
    }

    const p = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 12 / 100;
    const n = parseFloat(loanTenure) * 12;

    if (r === 0) {
      setEmi((p / n).toFixed(2));
      return;
    }

    const calcEmi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setEmi(calcEmi.toFixed(2));
  };
  const whatsapp = () => {
    if (!phoneNumber) {
      alert("Please enter a WhatsApp number.");
      return;
    }
    const message = 'Your Name - ' + '\n' + ConsumerName + '\n' + 'monthly EMI for ' + loanName + ' is ₹ ' + emi + '\n' + 'Thanks for using EMI Calculator by Anubhav Bhardwaj';
    const url = `https://wa.me/${phoneNumber}?text=` + encodeURIComponent(message);
    window.open(url);
  }
  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-6 text-white font-sans relative overflow-x-hidden">

      {/* Left side EMI Image */}
      <div className="absolute top-10 lg:top-1/2 left-1/2 lg:left-12 -translate-x-1/2 lg:-translate-x-0 lg:-translate-y-1/2 z-0 opacity-30 lg:opacity-100 pointer-events-none md:block">
        <img src={emiImage} className='Images shadow-lg shadow-indigo-500/50 w-[240px] h-[140px] lg:w-[340px] lg:h-[200px] object-cover' alt="EMI Image" />
      </div>

      {/* Right side Family Image */}
      <div className="absolute bottom-10 lg:bottom-auto lg:top-1/2 left-1/2 lg:left-auto lg:right-12 -translate-x-1/2 lg:translate-x-0 lg:-translate-y-1/2 z-0 opacity-30 lg:opacity-100 pointer-events-none md:block">
        <img src={familyImage} className='Images2 shadow-lg shadow-purple-500/50 w-[240px] h-[140px] lg:w-[340px] lg:h-[200px] object-cover' alt="Family" />
      </div>
      {/* Top Banner */}
      <div className="absolute top-8 left-0 right-0 ">
        <FlipText className="text-sm font-medium text-teal-400 tracking-wider uppercase ">
          Made By Anubhav Bhardwaj
        </FlipText>
      </div>

      {/* Main Glassmorphism Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-3xl p-8 mt-12 transition-all hover:shadow-[0_8px_40px_0_rgba(255,255,255,0.1)] z-10">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-cyan-400 mb-2">
            EMI Calculator
          </h1>
          <p className="text-gray-300 text-sm font-light">
            Calculate your Equated Monthly Installment
          </p>
        </div>

        {/* Form Elements */}
        <form className="space-y-6" onSubmit={calculateEmi}>
          {/* Display Output here when EMI is calculated */}
          {emi !== null && (
            <div className="p-4 bg-teal-500/20 border border-teal-500/50 rounded-xl mb-6 text-center shadow-[0_0_15px_rgba(45,212,191,0.2)]">
              <p className="text-gray-200 text-sm">Your Monthly EMI Of - <br></br>{loanName}</p>
              <p className="text-3xl font-bold text-teal-300">₹ {emi}</p>
              <br></br>
              <h1>Your Item Image</h1>
              {itemImage && (
                <img src={itemImage} className="w-full h-48 object-cover rounded-xl mt-4 mb-2 shadow-[0_0_15px_rgba(45,212,191,0.2)]" alt="Uploaded Item" />
              )}
              <br></br>
              <h1>Your Photo</h1>
              {yourPhoto && (
                <img src={yourPhoto} className="w-full h-48 object-cover rounded-xl mt-4 mb-2 shadow-[0_0_15px_rgba(45,212,191,0.2)]" alt="Uploaded Item" />
              )}
              <p> Consumer Name - {ConsumerName}</p>
              <input
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400/50 transition-all font-medium mt-4 mb-2"
                type="number"
                placeholder="Enter WhatsApp Number (e.g. 919876543210)"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <button
                onClick={whatsapp}
                className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-all">Send to your WhatsApp</button>

            </div>
          )}

          {/* Loan Amount Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 block" htmlFor="uploadItem">Upload Item Image:</label>
            <input
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400/50 transition-all font-medium"
              type="file"
              id="uploadItem"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setItemImage(URL.createObjectURL(e.target.files[0]));
                }
              }}
            />
            <label className="text-sm font-medium text-gray-200 block" htmlFor="uploadYourPhoto">Upload Your Photo to Verify:</label>
            <input
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400/50 transition-all font-medium"
              type="file"
              id="uploadYourPhoto"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setYourPhoto(URL.createObjectURL(e.target.files[0]));
                }
              }}
              accept="image/*"></input>
             <label htmlFor="ConsumerName" className="text-sm font-medium text-gray-200 block">
              Consumer Name - {ConsumerName}
            </label>
            <div className="relative">
              <input
                type="text"
                id="ConsumerName"
                name="ConsumerName"
                required
                value={ConsumerName}
                onChange={(e) => setConsumerName(e.target.value)}
                placeholder="Enter Consumer Name"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400/50 transition-all font-medium"
              />
            </div>

            <label htmlFor="loanName" className="text-sm font-medium text-gray-200 block">
              Loan Name - {loanName}
            </label>
            <div className="relative">
              <input
                type="text"
                id="loanName"
                name="loanName"
                value={loanName}
                onChange={(e) => setLoanName(e.target.value)}
                placeholder="Enter Loan Name"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400/50 transition-all font-medium"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="loanAmount" className="text-sm font-medium text-gray-200 block">
              Loan Amount (₹)
            </label>
            <div className="relative">
              <input
                type="number"
                id="loanAmount"
                name="loanAmount"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="e.g. ₹ 500000"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400/50 transition-all font-medium"
              />
            </div>
          </div>

          {/* Interest Rate Input */}
          <div className="space-y-2">
            <label htmlFor="interestRate" className="text-sm font-medium text-gray-200 block">
              Interest Rate (% p.a.)
            </label>
            <div className="relative">
              <input
                type="number"
                id="interestRate"
                name="interestRate"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="e.g. 8.5"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400/50 transition-all font-medium"
              />
            </div>
          </div>

          {/* Loan Tenure Input */}
          <div className="space-y-2">
            <label htmlFor="loanTenure" className="text-sm font-medium text-gray-200 block">
              Loan Tenure (Years)
            </label>
            <div className="relative">
              <input
                type="number"
                id="loanTenure"
                name="loanTenure"
                value={loanTenure}
                onChange={(e) => setLoanTenure(e.target.value)}
                placeholder="e.g. 5"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400/50 transition-all font-medium"
              />
            </div>
          </div>

          {/* Submit Button */}
          <AnimatedButton
            type="submit"
            className="w-full mt-2"
          >
            Calculate EMI
          </AnimatedButton>
        </form>
      </div>
    </div>
  )
}

export default App