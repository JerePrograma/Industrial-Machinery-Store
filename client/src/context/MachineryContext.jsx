import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchNewMachinery, fetchUsedMachinery, fetchOffers, getFilteredMachinery } from '../services/api';

const MachineryContext = createContext();

export const useMachinery = () => useContext(MachineryContext);

export const MachineryProvider = ({ children }) => {
  const [newMachinery, setNewMachinery] = useState([]);
  const [usedMachinery, setUsedMachinery] = useState([]);
  const [offers, setOffers] = useState([]);
  const [filteredMachinery, setFilteredMachinery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    subCategory: '',
    condition: '',
    minPrice: '',
    maxPrice: '',
    minYear: '',
    maxYear: '',
    searchTerm: '',
    manufacturer: ''
  });

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const [newData, usedData, offersData] = await Promise.all([
          fetchNewMachinery(),
          fetchUsedMachinery(),
          fetchOffers()
        ]);
        setNewMachinery(newData);
        setUsedMachinery(usedData);
        setOffers(offersData);
        setFilteredMachinery([...newData, ...usedData]);
        setError(null);
      } catch (err) {
        setError('Error loading machinery data. Please try again later.');
        console.error('Error fetching initial data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Apply filters
  const applyFilters = async (newFilters) => {
    setLoading(true);
    try {
      const updatedFilters = { ...filters, ...newFilters };
      setFilters(updatedFilters);

      const activeFilters = Object.fromEntries(
        Object.entries(updatedFilters).filter(([_, value]) => value !== '')
      );

      if (Object.keys(activeFilters).length === 0) {
        setFilteredMachinery([...newMachinery, ...usedMachinery]);
        return;
      }

      const data = await getFilteredMachinery(activeFilters);
      setFilteredMachinery(data);
      setError(null);
    } catch (err) {
      setError('Error applying filters. Please try again.');
      console.error('Error applying filters:', err);
    } finally {
      setLoading(false);
    }
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      category: '',
      subCategory: '',
      condition: '',
      minPrice: '',
      maxPrice: '',
      minYear: '',
      maxYear: '',
      searchTerm: '',
      manufacturer: ''
    });
    setFilteredMachinery([...newMachinery, ...usedMachinery]);
  };

  const value = {
    newMachinery,
    usedMachinery,
    offers,
    filteredMachinery,
    loading,
    error,
    filters,
    applyFilters,
    resetFilters
  };

  return (
    <MachineryContext.Provider value={value}>
      {children}
    </MachineryContext.Provider>
  );
};

MachineryProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default MachineryProvider;