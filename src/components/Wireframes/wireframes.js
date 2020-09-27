import React from 'react';
import { Carousel } from 'react-bootstrap';
import logo1 from '../../images/wf1.png';
import logo2 from '../../images/wf2.png';
import logo3 from '../../images/wf3.png';
import logo4 from '../../images/wf4.png';
import logo5 from '../../images/wf5.png';

const Wireframes = () => (
  <div>
    <h2>This is the wireframes page</h2>

    <Carousel>
      <Carousel.Item interval={2000}>
        <h6>Page 1 of 5</h6>
        <img
          className="d-block w-100"
          src={logo1}
          alt="wireframe 1"
        />
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <h6>Page 2 of 5</h6>
        <img
          className="d-block w-100"
          src={logo2}
          alt="wireframe 2"
        />
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <h6>Page 3 of 5</h6>
        <img
          className="d-block w-100"
          src={logo3}
          alt="wireframe 3"
        />
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <h6>Page 4 of 5</h6>
        <img
          className="d-block w-100"
          src={logo4}
          alt="wireframe 4"
        />
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <h6>Page 5 of 5</h6>
        <img
          className="d-block w-100"
          src={logo5}
          alt="wireframe 5"
        />
      </Carousel.Item>
    </Carousel>
  </div>
);

export default Wireframes;
