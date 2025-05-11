import React, { useState, useEffect } from 'react';

import '../styles/Navbar.css';
import axios from 'axios';
import Popup from './Popup';
import '../styles/popup.css'
type NavBarProps = {
  submitFormData: (formData: Record<string, any>) => void;
};

type NavbarConfig = {
  type: string;
  label: string;
  key?: string;
};

const Navbar: React.FC<NavBarProps> = ({popUpTrigger,showPopup,closePopup}) => {
    const [refresh,setRefresh]=useState(false)
  const [menuItems, setMenuItems] = useState([]);
  const [activeSubMenuId, setActiveSubMenuId] = useState<number | null>(null);

  const navbarConfigs: NavbarConfig[] = [
    {
      type: 'text',
      label: 'Menu Name',
      key: 'menu_name',
    },
    {
      type: 'text',
      label: 'Background Color',
      key: 'color',
    },
    {
      type: 'checkbox',
      label: 'Does Menu have subItems',
    },
    {
      type: 'text',
      label: 'Sub Item Name',
      key: 'subMenu',
    },
    {
      type: 'text',
      label: 'Hyperlink',
      key: 'link',
    },
  ];

  type LabelData = Record<string, any>;
  type KeyedData = Record<string, any>;

  const postData = async (dataByLabel: LabelData): Promise<void> => {
    const labelToKey: Record<string, string> = {};

    navbarConfigs.forEach((config) => {
      if (config.key) {
        labelToKey[config.label] = config.key;
      }
    });

    const dataByKey: KeyedData = {};

    for (const label in dataByLabel) {
      const key = labelToKey[label] || label;
      dataByKey[key] = dataByLabel[label];
    }

    try {
      await axios.post('http://localhost:3001/api/navmenus', dataByKey);
      setRefresh(!refresh)
      closePopup(false)
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMenus = async () => {
    try {
      const menuData = await axios.get('http://localhost:3001/api/navmenus');
      setMenuItems(menuData.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, [refresh]);

  return (
    <>
      <div className="header">
        <div className="navbar">
          <div className="logo">
            <img alt="logo" src="/logo.svg" />
          </div>

          {menuItems.length > 0 && (
            <div className="listContainer">
              <ul className="nav-links">
                {menuItems.map((item) => (
                  <li
                    className="listClass"
                    key={item.id}
                    style={{
                      backgroundColor: item.stylecolor,
                      border: '1px solid transparent',
                      padding: '8px',
                      borderRadius: '4px',
                      fontWeight: 'bold',
                      display: 'inline-block',
                      position: 'relative',
                    }}
                    onMouseEnter={() => {
                      if (item.submenu?.length > 0) {
                        setActiveSubMenuId(item.id);
                      }
                    }}
                    onMouseLeave={() => setActiveSubMenuId(null)}
                  >
                    <a href="#">{item.name}</a>

                    {item.submenu?.length > 0 && (
                      <>
                        <img
                          src="./downarrow.svg"
                          style={{
                            width: '18px',
                            height: '18px',
                            marginLeft: '6px',
                          }}
                          alt="submenu"
                        />

                        {activeSubMenuId === item.id && (
                          <div className="submenu-block">
                            <ul>
                              {item.submenu.map((sub, index) => (
                                <li key={index}>
                                  <a href={sub.link}>{sub.menu}</a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {showPopup && popUpTrigger === 'navmenu' && (
        <div className="popup open">
          <div className="popup-content">
            <span className="popup-close" onClick={() => {closePopup(false)}}>&times;</span>
            <Popup configs={navbarConfigs} submitFormData={postData} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
