import React from 'react';
import './Header.scss';
import { IoSearchOutline, IoCalendarOutline, IoNotificationsOutline, IoHelpCircleOutline } from 'react-icons/io5';
import { MdLanguage } from 'react-icons/md';
import { LuPanelRightOpen, LuPanelLeftOpen } from 'react-icons/lu';

const Header = ({ onMenuToggle, isCollapsed }) => {
  return (
    <header className={`header ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="header-left">
        <button className="menu-toggle-btn" onClick={onMenuToggle}>
          {isCollapsed ? <LuPanelRightOpen /> : <LuPanelLeftOpen />}
        </button>
      </div>

      <div className="header-center">
        <div className="search-bar">
          <IoSearchOutline className="search-icon" />
          <input 
            type="text" 
            placeholder="Search GRNs, POs, Items..." 
            className="search-input"
          />
        </div>
      </div>

      <div className="header-right">
        <button className="header-icon-btn">
          <IoCalendarOutline />
          <span className="time-text">11:28am</span>
        </button>

        <button className="header-icon-btn notification-btn">
          <IoNotificationsOutline />
          <span className="notification-badge">1</span>
        </button>

        <button className="header-icon-btn">
          <IoHelpCircleOutline />
        </button>

        <button className="header-icon-btn">
          <MdLanguage />
        </button>

        <div className="user-profile">
          <img 
            src="https://ui-avatars.com/api/?name=Rajesh+Kumar&background=4f46e5&color=fff" 
            alt="User Avatar" 
            className="user-avatar"
          />
          <div className="user-info">
            <div className="user-name">Rajesh Kumar</div>
            <div className="user-role">Warehouse Manager</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
