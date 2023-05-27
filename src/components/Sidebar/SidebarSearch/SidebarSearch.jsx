import './SidebarSearch.css';
import React from 'react';
import useForm from '../../../hooks/useForm';

const SidebarSearch = ({ usersList, onUserSelect }) => {
  const { values, handleChange } = useForm();

  function handleSearch(e) {
    e.preventDefault();

    const chat_id = `${values.phone}@c.us`;
    const selectedUser = usersList.find((user) => user.id === chat_id);

    if (selectedUser) {
      onUserSelect(selectedUser.id);
    }
  }

  return (
    <div className="sidebar_search">
      <form className="searchbar_container" onSubmit={handleSearch}>
        <button type="submit">
          <div className="searchbar_icon" />
        </button>
        <input type="text" name="phone" placeholder="Enter phone like: 79175714340" value={values.phone || ''} minLength={11} maxLength={11} pattern="^\d+$" onChange={handleChange} required />
      </form>
    </div>
  );
};

export default SidebarSearch;
