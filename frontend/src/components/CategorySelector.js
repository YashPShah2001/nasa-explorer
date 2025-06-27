import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function CategorySelector({setSelectedCategory }) {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [categories, setCategories] = useState([]);
    // Getting list of all categories.
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${BASE_URL}/all-categories`);
                const data = await response.json();
                setCategories(data);
            } catch (err) {
                console.error('Error fetching categories', err);
            }
        };

        fetchCategories();
    }, [BASE_URL]);
    return (
        <Autocomplete
            size="small"
            options={categories}
            getOptionLabel={(option) => option.label}
            onChange={(event, newValue) => {
                setSelectedCategory(newValue ? newValue.id : null);
            }}
            renderInput={(params) => <TextField {...params} label="Category" />}
        />
    );
}

export default CategorySelector;