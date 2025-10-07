import GlassmorphMenu from '../holidayspage/holidays-section/menu/menu';
import './styles/MainFilterSearchBox.styles.css'
import { useState, useCallback } from 'react';

const MainFilterSearchBoxNew = ({ onCategoryChange, selectedLabel }) => {
    const [localLabel, setLocalLabel] = useState(selectedLabel || 'Beaches');

    const handleSelect = useCallback((label) => {
        setLocalLabel(label || 'Beaches');
        if (typeof onCategoryChange === 'function') {
            try { onCategoryChange(label); } catch (_) {}
        }
    }, [onCategoryChange]);
    return (
        <>
            <div className="mainSearch  px-10 py-10 lg:px-20 lg:pt-5 lg:pb-20 rounded-4 mt-30">
                <div className="search-section-header">
                    <div className="seacrh-section-header-part-1">
                        <div className="search-section-header-part-1-1"><h3>Trip Packages</h3></div>
                        <div className="search-section-header-part-1-2"><h2>Best Recommendation <br /> Destination For You</h2></div>
                    </div>
                    <div className="search-section-header-part-2"><p>Discover your next adventure with our curated list of the best recommendation trips tailored just for you! . whether you’re seeking relaxation, adventure or exploration, let us guide you to unforgettable destination that will create
                        lasting memories</p>
                    </div>


                </div>
                <div className="search-menu"><GlassmorphMenu onSelect={handleSelect} /></div>
                <h2 className="search-sub-heading">{localLabel}</h2>

                {/* End Location */}
            </div>
        </>
    );
};

export default MainFilterSearchBoxNew;
