import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AdminContext } from "../../context/AdminContext";
import { toast } from 'react-toastify';

const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: '', // Initialize other expected fields
    // otherField: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { accessToken, backendURL, endpoint } = useContext(AdminContext);
  
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(
          `${backendURL}${endpoint}/settings`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        setSettings(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [accessToken, backendURL, endpoint]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page
    try {
      await axios.put(
        `${backendURL}${endpoint}/update-settings`, 
        settings, 
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      toast.success('Settings saved successfully!');
     
    } catch (err) {
      setError(err.message);
      toast.error(`Error saving settings: ${err.message}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <form onSubmit={handleSave}>
      <label>
        Site Name:
        <input
          type="text"
          name="siteName"
          value={settings.siteName || ''}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Save Settings</button>
    </form>
  );
};

export default Settings;