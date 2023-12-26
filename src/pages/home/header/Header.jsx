/* eslint-disable react/prop-types */
import css from "./header.module.scss";
import logo from "../../../assets/pokemon.png";
import * as FaIcon from "react-icons/fa";

function Header({ obtenerSearch }) {
  return (
    <nav className={css.header}>
      <div className={css.div_header}>
        <div className={css.div_logo}>
          <img src={logo} alt="logo" />
        </div>
        <div className={css.div_search}>
          <div>
            <FaIcon.FaSearch />
          </div>
          <input
            type="search"
            name="search"
            id="search"
            onChange={(e) => obtenerSearch(e.target.value)}
          />
        </div>
      </div>
    </nav>
  );
}

export default Header;
