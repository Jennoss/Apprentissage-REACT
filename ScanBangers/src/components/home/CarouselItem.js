import React, { useEffect, useState } from "react";
import axios from "axios";

const CarouselItem = ({ manga, index, poster }) => {
  let ratings = manga.attributes.averageRating / 10 / 2;
  let avrRatings = Math.round(ratings * 10) / 10;
  let status = manga.attributes.status;
  let newStatus = status.charAt(0).toUpperCase() + status.slice(1);
  let statusState = false;
  let thems = [];
  function Ratings() {
    if (avrRatings >= 4 && avrRatings < 5) {
      return (
        <React.Fragment>
          <span className="ratingscolor fa-solid fa-star"></span>
          <span className="ratingscolor fa-solid fa-star"></span>
          <span className="ratingscolor fa-solid fa-star"></span>
          <span className="ratingscolor fa-solid fa-star"></span>
          <span className="ratingscolor fa-regular fa-star-half-stroke"></span>
        </React.Fragment>
      );
    } else if (avrRatings >= 4.5) {
      return (
        <React.Fragment>
          <span className="ratingscolor fa-solid fa-star"></span>
          <span className="ratingscolor fa-solid fa-star"></span>
          <span className="ratingscolor fa-solid fa-star"></span>
          <span className="ratingscolor fa-solid fa-star"></span>
          <span className="ratingscolor fa-regular fa-star-half-stroke"></span>
        </React.Fragment>
      );
    } else if (avrRatings === 5) {
      return (
        <React.Fragment>
          <span className="ratingscolor fa-solid fa-star"></span>
          <span className="ratingscolor fa-solid fa-star"></span>
          <span className="ratingscolor fa-solid fa-star"></span>
          <span className="ratingscolor fa-solid fa-star"></span>
          <span className="ratingscolor fa-solid fa-star"></span>
        </React.Fragment>
      );
    } else if (avrRatings < 4 && avrRatings > 3.5) {
      return (
        <React.Fragment>
          <span className="ratingscolor fa-solid fa-star"></span>
          <span className="ratingscolor fa-solid fa-star"></span>
          <span className="ratingscolor fa-solid fa-star"></span>
          <span className="ratingscolor fa-regular fa-star-half-stroke"></span>
          <span className="ratingscolor fa-regular fa-star"></span>
        </React.Fragment>
      );
    } else if (avrRatings === 4) {
      return (
        <React.Fragment>
          <span className="ratingscolor fa-solid fa-star"></span>
          <span className="ratingscolor fa-solid fa-star"></span>
          <span className="ratingscolor fa-solid fa-star"></span>
          <span className="ratingscolor fa-solid fa-star"></span>
          <span className="ratingscolor fa-regular fa-star"></span>
        </React.Fragment>
      );
    }
  }

  const [data, setData] = useState([]);

  if (newStatus === "Finished") {
    statusState = true;
  } else {
    statusState = false;
  }

  async function getDataFromMangatoApi() {
    try {
      let res = "";
      res = await axios({
        url: `https://api.mangadex.org/manga?title=${manga.attributes.canonicalTitle}`,
        method: "get",
        timeout: 8000,
      });
      if (res.status === 200) {
        return res;
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (data.length === 0) {
      Promise.resolve(getDataFromMangatoApi())
        .then(async (response) => {
          setData(response);
        }, [])
        .catch((error) => {
          console.log(error);
        });
    }
  });

  if (data.data != undefined) {
    console.log(data.data.data[0].attributes.tags);
    for (let i = 0; i < data.data.data[0].attributes.tags.length; i++) {
      if (
        data.data.data[0].attributes.tags[i].attributes["group"] === "theme"
      ) {
        thems.push(data.data.data[0].attributes.tags[i].attributes.name.en);
      }
    }
    console.log(thems);
  }

  return (
    <div className={`carousel-item ${index === 0 ? "active" : ""}`}>
      <div
        className="backgroundManga d-block w-100"
        style={{
          backgroundImage: `url(${poster})`,
        }}
      >
        <div className="row">
          <div className="mangaCoverContainer col-5 col-md-5 col-sm-5 d-flex justify-content-end ">
            <img
              className="mangaCover"
              src={manga.attributes.posterImage.large}
              alt=""
            />
          </div>

          <div className="mangaInfoContainer col-5 col-md-5 col-sm-5">
            <h2 className="mangaTitle">{manga.attributes.canonicalTitle}</h2>
            <div className="genreContainer">{Ratings()}</div>
            <div className="descManga">
              <p className="syno">{manga.attributes.synopsis}</p>
            </div>
            <div className="statusContainer">
              <span className="status">
                Status :
                <span
                  className={`statusValue ${statusState ? "red" : "yellow"}`}
                >
                  {" "}
                  {newStatus}
                </span>
              </span>
            </div>
            <div className="buttonContainer">
              <button className="mangaButton">First chapter</button>
              <button className="mangaButton">Chapter list</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselItem;
