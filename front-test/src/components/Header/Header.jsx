import { useEffect, useState } from "react";
import "./Header.css";
import { ReactComponent as SearchIcon } from "./svgs/search.svg";
import { ReactComponent as CloseIcon } from "./svgs/close.svg";
import { ReactComponent as ChevronDownIcon } from "./svgs/chevron-down.svg";
import { ReactComponent as ChevronRightIcon } from "./svgs/chevron-right.svg";

export default function Header({ searchQuery = '', onSearchChange }) {
  const [hidden, setHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const getHeaderTopHeight = () => {
      const headerTop = document.querySelector('.header-top');
      return headerTop ? headerTop.offsetHeight : 80;
    };

    const onScroll = () => {
      const currentScroll = window.scrollY;
      const scrollDifference = currentScroll - lastScroll;
      const headerTopHeight = getHeaderTopHeight();
      const hideThreshold = headerTopHeight + 200; // Height of header-top + 200px additional scroll

      // At the top of the page, menu should be visible
      if (currentScroll <= 0) {
        setHidden(false);
        setLastScroll(currentScroll);
        return;
      }

      // Menu behavior:
      // 1. When scrolling down: hide menu only after header-top height + 200px
      // 2. When scrolling up: always show menu
      if (scrollDifference > 0) {
        // Scrolling down
        if (currentScroll > hideThreshold) {
          setHidden(true);
        } else {
          setHidden(false);
        }
      } else if (scrollDifference < 0) {
        // Scrolling up - always show menu
        setHidden(false);
      } else {
        // No scroll change - maintain current state but ensure visibility if below threshold
        if (currentScroll <= hideThreshold) {
          setHidden(false);
        }
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Initial check
    onScroll();
    
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScroll]);

  return (
    <>
      <header className="header">
        {/* TOP BAR */}
        <div className="header-top">
          <button className="burger" onClick={() => setMobileOpen(true)}>
            ☰
          </button>

          <div className="logo">
            <img className="logo-img" src="/logo.svg" alt="Logotype" />
          </div>

          <div className="search">
            <button
              type="button"
              className="search-button"
              aria-label="Open search"
              onClick={() => setSearchOpen((open) => !open)}
            >
              <SearchIcon className="search-icon" aria-hidden="true" focusable="false" />
            </button>

            {searchOpen && (
              <div className="search-input-wrapper">
                <input
                  className="search-input"
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(event) => onSearchChange(event.target.value)}
                />
              </div>
            )}
          </div>
        </div>

        {/* DESKTOP MENU */}
        <nav className={`menu ${hidden ? "menu--hidden" : ""}`}>
          <ul className="menu-list">
            <li className="menu-item">
              <span className="menu-item-label">
                Demos
                <ChevronDownIcon className="chevron-down" aria-hidden="true" focusable="false" />
              </span>
    
            </li>

            <li className="menu-item">
              <span className="menu-item-label">
                Post
                <ChevronDownIcon className="chevron-down" aria-hidden="true" focusable="false" />
              </span>
              <ul className="submenu">
                <li className="submenu-item">
                  <span>Post Header</span>
                  <ChevronRightIcon className="submenu-chevron" aria-hidden="true" focusable="false" />
                </li>
                <li className="submenu-item">
                  <span>Post Layout</span>
                  <ChevronRightIcon className="submenu-chevron" aria-hidden="true" focusable="false" />
                </li>
                <li className="submenu-item">
                  <span>Gallery Post</span>
                  <ChevronRightIcon className="submenu-chevron" aria-hidden="true" focusable="false" />
                </li>
                <li className="submenu-item">
                  <span>Video Post</span>
                  <ChevronRightIcon className="submenu-chevron" aria-hidden="true" focusable="false" />
                </li>
              </ul>
            </li>

            <li className="menu-item">
              <span className="menu-item-label">
                Features
                <ChevronDownIcon className="chevron-down" aria-hidden="true" focusable="false" />
              </span>
            </li>
            <li className="menu-item">
              <span className="menu-item-label">
                Categories
                <ChevronDownIcon className="chevron-down" aria-hidden="true" focusable="false" />
              </span>
            </li>
            <li className="menu-item">
              <span className="menu-item-label">
                Shop
                <ChevronDownIcon className="chevron-down" aria-hidden="true" focusable="false" />
              </span>
            </li>
            <li className="menu-item">Buy Now</li>
          </ul>
        </nav>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`mobile-overlay ${mobileOpen ? "open" : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      <aside className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        <div className="mobile-header">
          <img className="logo-img" src="/logo.svg" alt="Logotype" />
          <button
            type="button"
            className="mobile-close"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          >
            <CloseIcon className="mobile-close-icon" aria-hidden="true" focusable="false" />
          </button>
        </div>

        <ul className="mobile-list">
          <li>Demos</li>
          <li>Post</li>
          <li>Features</li>
          <li>Categories</li>
          <li>Shop</li>
          <li>Buy Now</li>
        </ul>
      </aside>
    </>
  );
}