import React, { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const EmiCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(50000);
  const [duration, setDuration] = useState<number>(1);
  const [interestRate, setInterestRate] = useState<number>(11.5);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayable, setTotalPayable] = useState<number>(0);

  useEffect(() => {
    const monthlyInterestRate = interestRate / 12 / 100;
    const numberOfMonthlyPayments = duration * 12;
    const EMI =
      (loanAmount *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfMonthlyPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfMonthlyPayments) - 1);
    const totalPayableAmount = EMI * numberOfMonthlyPayments;
    const totalInterestAmount = totalPayableAmount - loanAmount;

    setMonthlyPayment(EMI);
    setTotalInterest(totalInterestAmount);
    setTotalPayable(totalPayableAmount);
  }, [loanAmount, duration, interestRate]);

  const handleLoanAmountChange = (value: number | number[]) => {
    if (typeof value === 'number') {
      setLoanAmount(value);
    }
  };

  const handleDurationChange = (value: number | number[]) => {
    if (typeof value === 'number') {
      setDuration(value);
    }
  };

  const handleInterestRateChange = (value: number | number[]) => {
    if (typeof value === 'number') {
      setInterestRate(value);
    }
  };

  return (
    <div className="flex lg:flex-row flex-col justify-center items-center rounded-lg px-4 bg-white w-full">
      <div className="w-full lg:w-1/2 lg:px-8 pt-16 pb-2 flex flex-col items-center">
        <div className="flex flex-col justify-between mb-2 w-full">
          <div className="flex flex-row justify-between">
            <label htmlFor="loanAmount">Loan Amount (₹)</label>
            <span>{loanAmount}</span>
          </div>
          <Slider
            min={50000}
            max={5000000}
            step={50000}
            value={loanAmount}
            onChange={handleLoanAmountChange}
            handleStyle={{ borderColor: '#f71979', backgroundColor: '#f71979' }}
            trackStyle={{ backgroundColor: '#f71979' }}
            railStyle={{ backgroundColor: '#d9d9d9' }}
          />
        </div>
        <div className="flex flex-col justify-between mb-2 w-full">
          <div className="flex flex-row justify-between">
            <label htmlFor="duration">Duration (Years)</label>
            <span>{duration}</span>
          </div>
          <Slider
            min={1}
            max={30}
            step={1}
            value={duration}
            onChange={handleDurationChange}
            handleStyle={{ borderColor: '#f71979', backgroundColor: '#f71979' }}
            trackStyle={{ backgroundColor: '#f71979' }}
            railStyle={{ backgroundColor: '#d9d9d9' }}
          />
        </div>
        <div className="flex flex-col justify-between mb-2 w-full">
          <div className="flex flex-row justify-between">
            <label htmlFor="interestRate">Interest Rate (%)</label>
            <span>{interestRate}%</span>
          </div>
          <Slider
            min={10}
            max={20}
            step={0.1}
            value={interestRate}
            onChange={handleInterestRateChange}
            handleStyle={{ borderColor: '#f71979', backgroundColor: '#f71979' }}
            trackStyle={{ backgroundColor: '#f71979' }}
            railStyle={{ backgroundColor: '#d9d9d9' }}
          />
        </div>
      </div>
      <div className="lg:w-1/2 lg:px-8 text-sm pt-2 text-left">
        <h2 className="text-2xl font-semibold mb-4">
          <b>EMI Details</b>
        </h2>
        <p className="mb-2">
          <b>Monthly EMI:</b> ₹{monthlyPayment.toFixed(2)}
        </p>
        <p className="mb-2">
          <b>Principal Loan Amount:</b> ₹{loanAmount}
        </p>
        <p className="mb-2">
          <b>Total Interest Amount:</b> ₹{totalInterest.toFixed(2)}
        </p>
        <p className="mb-2">
          <b>Total Payable Amount:</b> ₹{totalPayable.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default EmiCalculator;
