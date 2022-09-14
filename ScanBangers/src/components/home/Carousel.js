import React, { useEffect, useState } from "react";
import CarouselItem from "./CarouselItem";
import axios from "axios";
import MyHeroAcademia from "../../assets/carouselHome/MyHeroAcademia.jpg";
import Berzerk from "../../assets/carouselHome/Berzerk.jpg";
import OnePiece from "../../assets/carouselHome/OnePiece.jpg";
import OnePunchMan from "../../assets/carouselHome/OnePunchMan.jpg";
import Jujutsunokaisen from "../../assets/carouselHome/Jujutsunokaisen.jpg";
import SoloLeveling from "../../assets/carouselHome/SoloLeveling.png";
import TheBeginningaftertheEnd from "../../assets/carouselHome/TheBeginningaftertheEnd.jpg";
import TowerofGod from "../../assets/carouselHome/TowerofGod.jpg";
import deathnote from "../../assets/carouselHome/deathnote.jpg";
import bleach from "../../assets/carouselHome/bleach.jpg";
import { Rings } from "react-loader-spinner";

const Carousel = () => {
  let mangaTable = [];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const mangaList = [
    "Solo Leveling",
    "The Beginning after the End",
    "Tower of God",
    "One piece",
    "One punch man",
    "Bleach",
    "My Hero Academia",
    "Death note",
    "Berserk",
    "Jujutsu no Kaisen",
  ];

  let mangaPoster = [
    SoloLeveling,
    TheBeginningaftertheEnd,
    TowerofGod,
    OnePiece,
    OnePunchMan,
    bleach,
    MyHeroAcademia,
    deathnote,
    Berzerk,
    Jujutsunokaisen,
  ];

  async function getData() {
    try {
      setLoading(true);
      let res = "";
      for (let i = 0; i < mangaList.length; i++) {
        res = await axios({
          url: `https://kitsu.io/api/edge/manga?filter[text]=${mangaList[i]}&page[limit]=10`,
          method: "get",
          timeout: 8000,
        });
        if (res.status === 200) {
          mangaTable.push(res.data.data[0]);
        }
      }

      return mangaTable;
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (data.length === 0) {
      Promise.resolve(getData())
        .then(async (response) => {
          setData(response);
          setLoading(false);
        }, [])
        .catch((error) => {
          console.log(error);
        });
    }
  });

  function displayCarousel() {
    return (
      <React.Fragment>
        <div className="carousel-inner carouselContainer">
          {data.map((manga, index) => (
            <CarouselItem
              key={index}
              manga={manga}
              index={index}
              poster={mangaPoster[index]}
            />
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </React.Fragment>
    );
  }

  function displayLoader() {
    return (
      <div className="loader">
        <Rings
          height="200"
          width="200"
          radius="9"
          color="rgba(231, 56, 101, 0.95)"
          className="loader"
          ariaLabel="three-dots-loading"
          wrapperStyle
          wrapperClass
        />
      </div>
    );
  }

  return (
    <div
      id="carouselExampleFade"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel" //carousel
    >
      {loading ? displayLoader() : displayCarousel()}
    </div>
  );
};

export default Carousel;
