import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function CategorySelector({ selectedCategory, setSelectedCategory }) {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [categories, setCategories] = useState([]);

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
    const selectedOption = categories.find(cat => cat.id === selectedCategory) || null;
    return (
        <Autocomplete
            size="small"
            options={categories}
            getOptionLabel={(option) => option.label}
            value={selectedOption}
            onChange={(event, newValue) => {
                setSelectedCategory(newValue ? newValue.id : null);
            }}
            renderInput={(params) => <TextField {...params} label="Category" />}
        />
    );
}

export default CategorySelector;