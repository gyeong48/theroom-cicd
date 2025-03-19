import React, { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import PrevArrow from './PrevArrow';
import NextArrow from './NextArrow';
import { getMainImages } from '../../api/contentApi';
import { useNavigate } from 'react-router-dom';
import FetchingModal from '../common/FetchingModal';
import useCustomMove from '../../hooks/useCustomMove';

function ImageSlider() {
  const navigate = useNavigate();
  const [images, setImages] = useState(null);
  const host = process.env.REACT_APP_SERVER_URL;
  const { moveToError } = useCustomMove();

  useEffect(() => {
    getMainImages()
      .then(res => {
        setImages(res.data)
      })
      .catch(err => {
        console.log(err);
        moveToError();
      })
  }, [])

  const handleMoveContact = () => {
    navigate({ pathname: "../contact" })
  }

  const settings = {
    fade: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    prevArrow: <PrevArrow />, // 커스텀 이전 버튼
    nextArrow: <NextArrow />, // 커스텀 다음 버튼
  };

  if (!images) return <FetchingModal />

  return (
    <div className="relative h-screen overflow-hidden">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="w-full h-screen">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${host}/api/content/view/${encodeURIComponent(image.uploadedName)})` }}
            />
          </div>
        ))}
      </Slider>
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          className="text-white text-sm md:text-lg lg:text-base drop-shadow-lg border rounded-3xl px-6 py-3 hover:bg-white hover:text-black ease-in-out duration-300"
          onClick={handleMoveContact}
        >
          견적문의하기
        </button>
      </div>
    </div>
  );
}

export default ImageSlider;
