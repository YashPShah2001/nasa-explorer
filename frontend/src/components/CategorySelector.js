import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function CategorySelector({ setSelectedCategory }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:5000/all-categories');
                const data = await response.json();
                setCategories(data);
            } catch (err) {
                console.error('Error fetching categories', err);
            }
        };

        fetchCategories();
    }, []);

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