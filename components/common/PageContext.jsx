"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const PageContext = createContext();

export const usePageContext = () => {
    const context = useContext(PageContext);
    if (!context) {
        throw new Error('usePageContext must be used within a PageProvider');
    }
    return context;
};

export const PageProvider = ({ children }) => {
    const [pages, setPages] = useState([]);
    const [pageIds, setPageIds] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all pages on component mount
    useEffect(() => {
        fetchPages();
    }, []);

    const fetchPages = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('/api/cms/pages');

            if (!response.ok) {
                throw new Error(`Failed to fetch pages: ${response.status}`);
            }

            const data = await response.json();
            console.log('Fetched pages:', data);

            setPages(data.data || []);

            // Create a mapping of page names/types to IDs
            const pageMapping = {};
            if (data.data && Array.isArray(data.data)) {
                data.data.forEach(page => {
                    // Map based on title and slug from the actual API response
                    const pageTitle = page.title?.toLowerCase() || '';
                    const pageSlug = page.slug?.toLowerCase() || '';

                    // Map specific pages based on actual API response
                    if (pageTitle.includes('landing page') && !pageTitle.includes('visa')) {
                        // "Landing page" -> main landing page
                        pageMapping.landing = page.id;
                    } else if (pageTitle.includes('visa landing page') || pageSlug.includes('visa-landing')) {
                        // "Visa Landing page" -> visa specific landing
                        pageMapping.visa = page.id;
                        pageMapping.visaLanding = page.id;
                    } else if (pageTitle.includes('holiday home page') || pageSlug.includes('holiday-home')) {
                        // "Holiday Home Page" -> holidays page
                        pageMapping.holidays = page.id;
                        pageMapping.holidayHome = page.id;
                    } else if (pageTitle.includes('dubai') || pageSlug.includes('dubai')) {
                        // Dubai specific holiday packages
                        pageMapping.dubai = page.id;
                        pageMapping.dubaiHolidays = page.id;
                    }

                    // Also store by exact title and slug for flexibility
                    pageMapping[pageTitle.replace(/\s+/g, '')] = page.id; // Remove spaces
                    pageMapping[pageSlug] = page.id;

                    // Store by ID as well for direct access
                    pageMapping[`id_${page.id}`] = page.id;
                });
            }

            setPageIds(pageMapping);
            console.log('Page ID mapping:', pageMapping);
            console.log('Available page types:', Object.keys(pageMapping).filter(key => !key.startsWith('id_')));

        } catch (err) {
            console.error('Error fetching pages:', err);
            setError(err.message);

            // Set fallback page IDs if API fails
            const fallbackPageIds = {
                landing: '63',    // Default fallback based on your API response
                visa: '66',       // Default fallback
                holidays: '65',   // Default fallback
                dubai: '19'       // Default fallback
            };

            console.log('Using fallback page IDs:', fallbackPageIds);
            setPageIds(fallbackPageIds);
        } finally {
            setLoading(false);
        }
    };

    // Helper function to get page ID by page type
    const getPageId = (pageType) => {
        return pageIds[pageType] || null;
    };

    // Helper function to get page ID with fallback
    const getPageIdWithFallback = (pageType, fallbackId = null) => {
        return pageIds[pageType] || fallbackId;
    };

    // Helper function to get full page information by type
    const getPageInfo = (pageType) => {
        const pageId = pageIds[pageType];
        if (!pageId) return null;

        return pages.find(page => page.id === pageId) || null;
    };

    // Helper function to get all available page types
    const getAvailablePageTypes = () => {
        return Object.keys(pageIds).filter(key => !key.startsWith('id_'));
    };

    const value = {
        pages,
        pageIds,
        loading,
        error,
        getPageId,
        getPageIdWithFallback,
        getPageInfo,
        getAvailablePageTypes,
        refetchPages: fetchPages
    };

    return (
        <PageContext.Provider value={value}>
            {children}
        </PageContext.Provider>
    );
};
