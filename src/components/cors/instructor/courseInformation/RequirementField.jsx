import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const RequirementField = ({ name, label, errors, setValue, getValues, register ,editData}) => {
    const [requirement, setRequirement] = useState("");
    const [requirementlist, setRequirementList] = useState(editData? JSON.parse(editData):[]);

    const handleAddRequirement = () => {
        if (requirement) {
            setRequirementList([...requirementlist, requirement]);
            setRequirement("");
        }
    }

    const handleRemoveRequirement = (index) => {
        // console.log(index);
        const updateRequirementList = [...requirementlist];
        updateRequirementList.splice(index, 1);
        setRequirementList(updateRequirementList);
    }

    useEffect(() => {
        register(name, {
            required: true,
            validate: (value) => value.length > 0
        })
    }, [])

    useEffect(() => {
        setValue(name, requirementlist);
    }, [requirementlist])

    // console.log(requirementlist);

    return (
        <div>
            <label>{label}<span>*</span></label>
            <div>
                <div className='flex gap-2 mb-3'>
                    <input
                        type="text"
                        id={name}
                        value={requirement}
                        onChange={(e) => setRequirement(e.target.value)}
                        className='w-full p-2 bg-richblack-600 text-white border border-gray-300 rounded'
                    />
                    <button
                        type='button'
                        onClick={handleAddRequirement}
                    >
                        Add
                    </button>
                </div>
                {
                    requirementlist && requirementlist.length > 0 && (
                        <ul className='flex flex-wrap gap-2 w-full'>
                            {
                                requirementlist.map((requie, index) => (
                                    <li key={index} className='w- p-1 text-white bg-richblack-200 flex justify-between gap-2  border border-gray-300 rounded'>
                                        <span className='text-black'>{requie}</span>
                                        <button className='text-black text-[14px] font-bold ' onClick={() => { handleRemoveRequirement(index) }}>
                                            clear
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
                {
                    errors[name] && (
                        <span>{label} is required</span>
                    )
                }
            </div>
        </div>
    )
}

export default RequirementField
