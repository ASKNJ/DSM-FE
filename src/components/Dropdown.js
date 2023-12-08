import React, { useEffect, useState } from 'react';
import './css/Dropdown.css'; // Import your CSS file for styling
import PropTypes from 'prop-types';
import { getCategoryImpactsData } from '../apiBundle/api';
import { useContext } from "react";
import { MasterDataContext } from "../context/master-context";

const Dropdown = (props) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const accesstoken = useContext(MasterDataContext).masterData.token;
    const { defaultOption, options, header, getCategoryData } = props;

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setDropdownVisible(false);
    };

    const toggleDropdown = () => {
        setDropdownVisible((prevVisible) => !prevVisible);
    };

    useEffect(() => {
        const callApiPerCatgory = async () => {
            if (selectedOption) {
                getCategoryData(null);
                const catId = options.filter((option, id) => option.category.toLowerCase() === selectedOption.toLowerCase())[0]?.catId;
                const data = await getCategoryImpactsData(catId, accesstoken);
                if(data){
                    getCategoryData(data);
                }
                else{
                    alert("Something went wrong!");
                }
            }
        }
        callApiPerCatgory();
    }, [selectedOption]);


    return (
        <>
            <div style={{ fontSize: 14, fontWeight: "bold", lineHeight: 3, paddingTop: 20 }}>{header}</div>
            <div className="dropdown-container">
                <div className="selected-option" onClick={toggleDropdown}>
                    {selectedOption ? (
                        <span style={{ paddingRight: 40, paddingLeft: 40 }}>
                            {selectedOption}
                        </span>
                    ) : (
                        <span style={{ paddingRight: 40, paddingLeft: 40 }}>
                            {defaultOption}
                        </span>
                    )}
                    <span className={`dropdown-arrow ${dropdownVisible ? 'up' : 'down'}`}></span>
                </div>
                {dropdownVisible && (
                    <div className="options-container">
                        {options.map((option) => (
                            <div
                                key={option.catId}
                                className={`option ${selectedOption === option.category ? 'selected' : ''}`}
                                onClick={() => handleOptionClick(option.category)}
                            >   <span>
                                    {option.category}
                                </span>
                                {selectedOption === option.category && <span className="green-tick">&#10003;</span>}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

Dropdown.propTypes = {
    options: PropTypes.array,
    defaultOption: PropTypes.string,
    getCategory: PropTypes.func
}

export default Dropdown;
