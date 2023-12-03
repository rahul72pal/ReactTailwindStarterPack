import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux'

const ChipInput = ({
    label,
    name,
    placeholder,
    register,
    errors,
    setValue,
    getValues
}) => {

    const { course, editCourse } = useSelector((state) => state.course);

    // setting up the chip for arrray
    const [chips, setChips] = useState([]);

    useEffect(() => {
        if (editCourse) {
            // console.log("COURSE TAGS = ",course?.tag.split(','));
            // Split the tag string into an array using ',' as the delimiter
            if(course?.tag){
                setChips(course?.tag[0].split(','));
            }
            // console.log("CHIPS = ",chips);
        }
        register(name, { require: true, validate: (value) => value.length > 0 })
    }, []);

    useEffect(() => {
        setValue(name, chips);
    }, [chips]);

    const handleKeyDown = (event) => {
        if (event.key === "Enter" || event.key === ',') {
            event.preventDefault();
            const chipvalue = event.target.value.trim();
            if (chipvalue && !chips.includes(chipvalue)) {
                const newchips = [...chips, chipvalue];
                setChips(newchips);
                event.target.value = '';
            }
        }
    }

    const handleDeleteChip = (chipIndex) => {
        const newchips = chips.filter((_, index) => index !== chipIndex);
        setChips(newchips);
    
        // Update the form data when a chip is deleted
        const updatedTags = newchips.join(',');
        console.log("NEW UPDATE TAGS = ", updatedTags);
        setValue(name, updatedTags);
    }

    // console.log(chips)

    return (

        <div className=''>
            <label>{label}</label>

            <div>
                <div className='flex flex-wrap gap-2 '>
                    {
                        chips?.map((chip, index) => (
                            <div key={index}>
                                {chip}
                                <button
                                    type='button'
                                    onClick={() => handleDeleteChip(index)}
                                >
                                    x
                                </button>
                            </div>
                        ))
                    }
                </div>
                <input
                    type="text"
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    onKeyDown={handleKeyDown}
                    className='w-full p-2 border  text-white bg-richblack-600 border-gray-300 rounded'
                />
            </div>
            {
                errors[name] && (
                    <span className='text-pink-400'>
                        {label}
                        is Required
                    </span>
                )
            }

        </div>
    )
}

export default ChipInput
