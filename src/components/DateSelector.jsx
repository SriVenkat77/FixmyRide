import React, { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';

const DateSelector = () => {
    const [value, setValue] = useState({
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)), 
    });

    const handleValueChange = (newValue) => {
        console.log('Selected Date Range:', newValue);
        setValue(newValue);
    };

    return (
        <div className="flex flex-col bg-white items-center space-y-3">
            <label className="text-lg font-semibold">Select a Date Range:</label>
            <Datepicker 
                value={value} 
                onChange={handleValueChange} 
                primaryColor="blue"
            />
        </div>
    );
};

export default DateSelector;
