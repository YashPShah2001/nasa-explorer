import React, { useEffect, useState } from 'react';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';

function SourceSelector({ setSourceIds }) {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const [sources, setSources] = useState([]);
    const filterOptions = createFilterOptions({
        stringify: (option) => `${option.id} ${option.title}`,
    });

    useEffect(()=>{
        const fetchSources = async ()=> {
            try{
                let url = `${BASE_URL}/sources`;
                const response = await fetch(url);
                const data = await response.json();
                setSources(data);
            } catch(err) {
                console.error('Error fetching sources', err);
            }
        }    
        fetchSources();
    },[BASE_URL]);

    return (
        <Autocomplete
            multiple
            options={sources}
            filterOptions={filterOptions}
            getOptionLabel={(option) => option.id}
            onChange={(event, newValues) => {
                const ids = newValues.map((item) => item.id).join(',');
                setSourceIds(ids);
            }}
            renderOption={(props, option) => (
                <Tooltip title={option.title} arrow>
                    <li {...props}>{option.id}</li>
                </Tooltip>
            )}
            renderInput={(params) => (
            <TextField {...params} label="Source ID" size="small" />
            )}
        />
    );
}

export default SourceSelector;
