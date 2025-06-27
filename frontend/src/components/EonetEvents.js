import React, { useState, useEffect } from 'react';

import { FaMapMarkerAlt, FaLink, FaCalendarAlt, FaExternalLinkAlt } from 'react-icons/fa';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

import SourceSelector from './SourceSelector';
import CategorySelector from './CategorySelector';

function EonetEvents() {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const [events, setEvents] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [sourceIds,setSourceIds] = useState('');
    const [selectedCategory, setSelectedCategory] = useState();
    const [limit, setLimit] = useState(12);
    const [priorDays, setPriorDays] = useState(10);
    const [status, setStatus] = useState('open');
    const [eventsPerPage, setEventsPerPage] = useState(12);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Logic & implementation for fetching data from /events and /category endpoints with respective parameters.
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                let url = `${BASE_URL}/events`;
                if (selectedCategory) {
                    url = `${BASE_URL}/category/${selectedCategory}`;
                }
    
                const params = new URLSearchParams();
                params.append('limit', limit);
                params.append('days', priorDays);
                params.append('status', status);
                if (sourceIds) params.append('source', sourceIds); //only if sourceID's selected.
    
                url += `?${params.toString()}`;
                
                const response = await fetch(url);
                const data = await response.json();
                
                setEvents(data);
                setCurrentPage(1);
                setError(null); 
            } catch (err) {
                console.error('Error fetching Events', err);
                setError('Error fetching Events, contact support!');
            } finally{
                setLoading(false);
            }
        };
    
        fetchEvents();
    }, [selectedCategory, limit, priorDays, status, sourceIds, BASE_URL]);

    // Filtering the events list with respect to event id, event title, categories and sources
    const filteredEvents = events?.events.filter((event) => {
        const search = searchTerm.toLowerCase();
        const matchId = event.id.toLowerCase().includes(search);
        const matchTitle = event.title.toLowerCase().includes(search);
        const matchCategory = event.categories.some(cat => cat.title.toLowerCase().includes(search));
        const matchSource = event.sources.some(src => src.id.toLowerCase().includes(search));
        return matchId || matchTitle || matchCategory || matchSource;
    });
    // Pagination logic on filtered events list
    const indexOfLast = currentPage * eventsPerPage;
    const indexOfFirst = indexOfLast - eventsPerPage;
    const currentEvents = filteredEvents?.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredEvents?.length / eventsPerPage);
    // settign to page moved or selected
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
    };
    // Initial loading until events are fetched. Checking for events key in the response.
    if (!events?.events) return <div className="d-flex justify-content-center align-items-center mt-4 text-white"><CircularProgress/>Loading...</div>;
    // Throwing error when caught, so the user understands something is wrong.
    if(error) return (
        <div className="alert alert-danger" role="alert">
            {error || 'An unexpected error occurred. Please contact the developer.'}
        </div>
    );
    // Main component
    return (
        <div className="container mt-4 d-flex flex-column min-vh-100">
            <h2 className="text-center text-white mb-4">{events.title}</h2>
            <Form 
                setSelectedCategory={setSelectedCategory} 
                limit={limit} 
                setLimit={setLimit} 
                priorDays={priorDays} 
                setPriorDays={setPriorDays} 
                status={status}
                setStatus={setStatus}
                setSourceIds={setSourceIds}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setCurrentPage={setCurrentPage}
            />
            {
                loading && (
                    <div className='d-flex justify-content-center items-center'>
                        <LinearProgress className='w-100'/>
                    </div>
                )
            }
            <div className='flex-grow-1'>
            {
                filteredEvents?.length === 0 ? (
                    <div className="text-center text-white my-5">
                        <h5>No events found for the selected filters.</h5>
                        <p>Try changing the filters to see more results.</p>
                    </div>
                ) : (
                    <div className="row p-2">
                        {currentEvents?.map((event) => (
                            <div key={event.id} className="col-md-4 col-sm-6 mb-4">
                                <EventCard event={event} />
                            </div>
                        ))}
                    </div>
                )
            }
            </div>
            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                eventsPerPage={eventsPerPage}
                setEventsPerPage={(val) => {
                    setEventsPerPage(val);
                    setCurrentPage(1);
                }}
            />
        </div>
    );
}
function EventCard({ event }) {
    const category = event.categories[0]?.title; // getting only the first category from list of categories
    return (
        <div className="card h-100 shadow-lg border-0 bg-dark text-white rounded-4 overflow-hidden">
            <div className="card-body d-flex flex-column justify-content-between">
                <div>
                    <h5 className="card-title fw-bold mb-2">{event.title}</h5>
                    <span className="badge bg-info text-dark mb-3">{category}</span>
                    <div className="mb-3">
                        <strong>Sources:</strong>
                        <div className="mt-2 d-flex flex-wrap gap-2">
                            {event.sources.map((source) => (
                                <a
                                    key={source.id}
                                    href={source.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="badge rounded-pill bg-primary text-decoration-none"
                                    title={source.url}
                                >
                                    <FaLink className="me-1" />
                                    {source.id}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div>
                        <strong>Recent Locations:</strong>
                        <ul className="list-unstyled mt-2">
                            {event.geometries.slice(0, 3).map((geo, index) => (
                                <li key={index} className="mb-1">
                                    <FaCalendarAlt className="me-1" />
                                    <span className="fw-light">{geo.date}</span><br />
                                    <FaMapMarkerAlt className="me-1" />
                                    <span>{geo.coordinates.join(', ')}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <a 
                    title={event.link} 
                    href={event.link} 
                    className='card-link'
                    target='_blank'
                    rel="noopener noreferrer"
                >
                    <span>{event.id} </span><FaExternalLinkAlt className='mb-1'/>
                </a>
            </div>
        </div>
    );
}

function Form({setSelectedCategory, limit, setLimit , priorDays, setPriorDays, status, setStatus, setSourceIds, searchTerm, setSearchTerm, setCurrentPage }) {
    return (
        <div className="d-flex row pb-2">
            <div className='col-md-2 col-xs-6 pt-2'>
                <CategorySelector setSelectedCategory={setSelectedCategory} />
            </div>
            <div className='col-md-2 col-xs-6 pt-2'>
                <FormControl fullWidth size="small">
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={status}
                        label="Status"
                        onChange={(e) => setStatus(e.target.value)}
                        >
                        <MenuItem value="open">Open</MenuItem>
                        <MenuItem value="closed">Closed</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className='col-md-2 col-xs-6 pt-2'>
                <TextField
                    label="Limit"
                    type="number"
                    size="small"
                    defaultValue={limit}
                    onBlur={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val) && val > 0) {
                            setLimit(val);
                        }
                    }}
                    className='w-100'
                />
            </div>
            <div className='col-md-2 col-xs-6 pt-2'>
                <TextField
                    type="number"
                    label="Prior Days"
                    size='small'
                    defaultValue={priorDays}
                    onBlur={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val) && val > 0) {
                            setPriorDays(val);
                        }
                    }}
                    className='w-100'
                />
            </div>
            <div className="col-md-2 col-xs-6 pt-2">
                <SourceSelector setSourceIds={setSourceIds} />
            </div>
            <div className="col-md-2 col-xs-6 pt-2">
                <TextField
                label="Filter events"
                size="small"
                value={searchTerm}
                onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
                className="w-100"
                />
            </div>
        </div>
    );
}

function PaginationControls({ currentPage, totalPages, onPageChange, eventsPerPage, setEventsPerPage }) {
    return (
        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center py-2 gap-3">
            <div>
                <TextField
                    label="Per page"
                    type="number"
                    size="small"
                    inputProps={{ min: 1, max: 50 }}
                    value={eventsPerPage}
                    onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val) && val > 0) {
                        setEventsPerPage(val);
                        }
                    }}
                />
            </div>
            <div className="d-flex align-items-center text-white">
                <button
                    className="btn btn-secondary mx-2"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    ⬅ Prev
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className="btn btn-secondary mx-2"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next ➡
                </button>
            </div>
        </div>
    );
}

export default EonetEvents;
