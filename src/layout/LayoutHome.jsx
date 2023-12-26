import css from "./layout.module.scss";
import Header from "./../pages/home/header/Header";
import { useEffect, useState } from "react";
import { URL_POKEMON } from "./../api/apiRest";
import axios from "axios";
import Card from "./../pages/home/card/Card";
import * as FaIcon from "react-icons/fa";
import Footer from "../pages/home/footer/Footer";
export const LayoutHome = () => {
  const [arrayPokemon, setArrayPokemon] = useState([]);
  const [xpage, setXPage] = useState(1);
  const [search, setSearch] = useState("");
  const [globalPokemon, setGlobalPokemon] = useState([]);
  useEffect(() => {
    const api = async () => {
      const limit = 15;
      const xp = (xpage - 1) * limit;
      const apiPoke = await axios.get(
        `${URL_POKEMON}/?offset=${xp}&limit=${limit}`
      );
      setArrayPokemon(apiPoke.data.results);
    };
    api();
    getGlobalPokemons();
  }, [xpage]);

  const getGlobalPokemons = async () => {
    const res = await axios.get(`${URL_POKEMON}?offset=0&limit=1302`);
    const promises = res.data.results.map((pokemon) => {
      return pokemon;
    });
    const results = await Promise.all(promises);
    setGlobalPokemon(results);
  };

  const filterPokemons =
    search?.length > 0
      ? globalPokemon?.filter((pokemon) => pokemon?.name?.includes(search))
      : arrayPokemon;

  const obtenerSearch = (e) => {
    const texto = e.toLowerCase();
    setSearch(texto);
    setXPage(1);
  };

  return (
    <div className={css.layout}>
      <Header obtenerSearch={obtenerSearch} />
      <section className={css.section_pagination}>
        <div className={css.div_pagination}>
          <span
            className={css.item_izquierdo}
            onClick={() => {
              if (xpage === 1) {
                return alert("first page");
              }
              setXPage(xpage - 1);
            }}
          >
            <FaIcon.FaAngleLeft />
          </span>
          <span className={css.item}> {xpage} </span>
          <span className={css.item}> de </span>
          <span className={css.item}>
            {" "}
            {Math.round(globalPokemon?.length / 15)}{" "}
          </span>
          <span
            className={css.item_derecho}
            onClick={() => {
              if (xpage === 87) {
                return alert("last page");
              }
              setXPage(xpage + 1);
            }}
          >
            <FaIcon.FaAngleRight />
          </span>
        </div>
      </section>
      <div className={css.card_content}>
        {filterPokemons.map((card, index) => {
          return <Card key={index} card={card} />;
        })}
      </div>
      <Footer />
    </div>
  );
};
