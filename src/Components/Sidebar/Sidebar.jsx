import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.scss';
import { MdDashboard, MdShoppingCart, MdInventory, MdFactory, MdBarChart, MdSettings } from 'react-icons/md';
import { FaFileInvoice, FaBoxOpen } from 'react-icons/fa';
import { IoChevronDown, IoChevronForward } from 'react-icons/io5';
import fullLogo from '../../assets/images/biziquickFullLogo.png';
import smallLogo from '../../assets/images/biziquickLogo.png';

const Sidebar = ({ isCollapsed }) => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({ ERP: true, Procurement: true });

  const toggleMenu = (menuName) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  const menuItems = [
    {
      name: 'CRM',
      icon: <MdDashboard />,
      path: '/crm',
      submenu: []
    },
    {
      name: 'ERP',
      icon: <MdShoppingCart />,
      path: '/erp',
      hasSubmenu: true,
      submenu: [
        { name: 'Dashboard', path: '/erp/dashboard', icon: <MdDashboard /> },
        { name: 'Procurement', path: '/erp/procurement', icon: <MdShoppingCart />, 
          subItems: [
            { name: 'Purchase Orders', path: '/erp/procurement/purchase-orders' },
            { name: 'Goods Receipt Note', path: '/erp/procurement/grn' },
            { name: 'Purchase Invoices', path: '/erp/procurement/purchase-invoices' }
          ]
        },
        { name: 'Inventory', path: '/erp/inventory', icon: <MdInventory /> },
        { name: 'Manufacturing', path: '/erp/manufacturing', icon: <MdFactory /> },
        { name: 'Reports', path: '/erp/reports', icon: <MdBarChart /> }
      ]
    },
    {
      name: 'Configurations',
      icon: <MdSettings />,
      path: '/configurations',
      submenu: []
    }
  ];

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          {isCollapsed ? (
            <img src={smallLogo} alt="BiziQuick Logo" className="logo-small" />
          ) : (
            <img src={fullLogo} alt="BiziQuick" className="logo-full" />
          )}
        </div>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item, index) => (
          <div key={index} className="menu-item-wrapper">
            {item.hasSubmenu ? (
              <>
                <div 
                  className={`menu-item ${expandedMenus[item.name] ? 'active' : ''}`}
                  onClick={() => toggleMenu(item.name)}
                >
                  <span className="menu-icon">{item.icon}</span>
                  {!isCollapsed && (
                    <>
                      <span className="menu-text">{item.name}</span>
                      <span className="menu-arrow">
                        {expandedMenus[item.name] ? <IoChevronDown /> : <IoChevronForward />}
                      </span>
                    </>
                  )}
                </div>
                
                {expandedMenus[item.name] && !isCollapsed && (
                  <div className="submenu">
                    {item.submenu.map((subItem, subIndex) => (
                      <div key={subIndex}>
                        {subItem.subItems ? (
                          <>
                            <div 
                              className={`submenu-item ${expandedMenus[subItem.name] ? 'active' : ''}`}
                              onClick={() => toggleMenu(subItem.name)}
                            >
                              <span className="submenu-icon">{subItem.icon}</span>
                              <span className="submenu-text">{subItem.name}</span>
                              <span className="submenu-arrow">
                                {expandedMenus[subItem.name] ? <IoChevronDown /> : <IoChevronForward />}
                              </span>
                            </div>
                            {expandedMenus[subItem.name] && (
                              <div className="sub-submenu">
                                {subItem.subItems.map((subSubItem, subSubIndex) => (
                                  <Link
                                    key={subSubIndex}
                                    to={subSubItem.path}
                                    className={`sub-submenu-item ${location.pathname === subSubItem.path ? 'active' : ''}`}
                                  >
                                    <span className="sub-submenu-text">{subSubItem.name}</span>
                                  </Link>
                                ))}
                              </div>
                            )}
                          </>
                        ) : (
                          <Link
                            to={subItem.path}
                            className={`submenu-item ${location.pathname === subItem.path ? 'active' : ''}`}
                          >
                            <span className="submenu-icon">{subItem.icon}</span>
                            <span className="submenu-text">{subItem.name}</span>
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={item.path}
                className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="menu-icon">{item.icon}</span>
                {!isCollapsed && <span className="menu-text">{item.name}</span>}
              </Link>
            )}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="help-support">
          <span className="help-icon">❓</span>
          {!isCollapsed && <span>Help & Support</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
