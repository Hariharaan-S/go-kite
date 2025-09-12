
'use client'

import Image from "next/image";
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";

const ReviewGallery = () => {
  const reviewGalleryImg = [
    "https://img.freepik.com/free-photo/beautiful-girl-standing-boat-looking-mountains-ratchaprapha-dam-khao-sok-national-park-surat-thani-province-thailand_335224-849.jpg",
    "https://img.freepik.com/free-photo/beautiful-girl-standing-boat-looking-mountains-ratchaprapha-dam-khao-sok-national-park-surat-thani-province-thailand_335224-849.jpg",
    "https://img.freepik.com/free-photo/beautiful-girl-standing-boat-looking-mountains-ratchaprapha-dam-khao-sok-national-park-surat-thani-province-thailand_335224-849.jpg",
    "https://img.freepik.com/free-photo/beautiful-girl-standing-boat-looking-mountains-ratchaprapha-dam-khao-sok-national-park-surat-thani-province-thailand_335224-849.jpg",
  ];
  return (
    <Gallery>
      <div className="row x-gap-30 y-gap-30 pt-20">
        {reviewGalleryImg.map((img, i) => (
          <div className="col-auto" key={i}>
            <Item original={img} thumbnail={img} width={110} height={110}>
              {({ ref, open }) => (
                <img
                  width={110}
                  height={110}
                  src={img}
                  ref={ref}
                  onClick={open}
                  alt="image"
                  role="button"
                  className="rounded-4"
                />
              )}
            </Item>
          </div>
        ))}
      </div>
    </Gallery>
  );
};

export default ReviewGallery;
