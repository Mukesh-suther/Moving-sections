'use client';
import bg1 from './assets/bg/1.jpg';
import Logo from './assets/logo2.png'
import Image from 'next/image';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';

import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Home() {
  const myslider = useRef(null);
  useEffect(() => {
    const mainElement = document.getElementById('main');
    const loaderHolder = document.querySelector('.loader-holder');
    if (mainElement && loaderHolder) {
      mainElement.style.transition = 'opacity 0.5s';
      mainElement.style.opacity = '1';

      setTimeout(() => {
        loaderHolder.classList.add('none');
      }, 500);
    }
    const anchors = document.querySelectorAll("#menu a");
    anchors.forEach(function(anchor) {
      anchor.addEventListener("mousedown", async function(event) {
        if (myslider.current && myslider.current.swiper) {
          const swiper = myslider.current.swiper;
          console.log('Mukesh');
          event.preventDefault();
          document.querySelector("#menu .active").classList.remove("active");
          anchor.classList.add("active");
          swiper.slideTo(Array.from(anchor.parentNode.children).indexOf(anchor));
          setTimeout(hideMenu, 1750);
        } else {
          console.error('Swiper instance not found');
        }
      });
    });
  }, []);

  function showMenu() {
    document.getElementById("nav").classList.remove("vis");
    document.querySelector('.wrapper').classList.add('vis-menu');
    document.querySelector('.nav-button').classList.add('cmenu');
    document.querySelectorAll(".elem").forEach(function(elem) {
      elem.style.display = 'block';
    });
    setTimeout(function() {
      document.querySelectorAll(".elem-anim").forEach(function(elem, index) {
        setTimeout(function() {
          elem.style.transition = 'opacity 0.6s ease-out, margin-top 0.6s ease-out';
          elem.style.opacity = '1';
          elem.style.marginTop = '0';
        }, 150 * index);
      });
    }, 650);
  }

  function hideMenu() {
    document.getElementById("nav").classList.add("vis");
    document.querySelector('.nav-button').classList.remove('cmenu');
    document.querySelectorAll(".elem-anim").forEach(function(elem, index) {
      setTimeout(function() {
        elem.style.transition = 'opacity 0.6s ease-out, margin-top 0.6s ease-out';
        elem.style.opacity = '0';
        elem.style.marginTop = '-150px';
      }, 150 * index);
    });
    setTimeout(function() {
      document.querySelectorAll(".elem").forEach(function(elem) {
        elem.style.display = 'none';
      });
      document.querySelector('.wrapper').classList.remove('vis-menu');
    }, 650);
  }

  function Navmenu() {
    if (document.getElementById('nav').classList.contains("vis")) {
      showMenu();
    } else {
      hideMenu();
    }
  }
  return (   
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="loader-holder">
        <div className="loader">
          <div id="movingBallG">
            <div className="movingBallLineG"></div>
            <div id="movingBallG_1" className="movingBallG"></div>
          </div>
        </div>
      </div>
      <div id="main">
        <div id="fall-holder"></div>
        <div className="nav-button" onClick={Navmenu}>
          <span className="nos"></span>
          <span className="ncs"></span>
          <span className="nbs"></span>
        </div>
        <div id="nav" className="vis elem">
          <div id="menu" className="elem-anim">
            <a>
              About <span className="transition"></span>
            </a>
            <a className="active">
              Home <span className="transition"></span>
            </a>
            <a>
              Contacts <span className="transition"></span>
            </a>
          </div>
        </div>
        <div className="subcribe-form-holder elem">
          <div className="subcribe-form elem-anim">
            <form id="subscribe">
              <input
                className="enteremail"
                name="email"
                id="subscribe-email"
                placeholder="Email"
                spellCheck="false"
                type="text"
              />
              <button
                type="submit"
                id="subscribe-button"
                className="subscribe-button"
              >
                Subscribe
              </button>
              <label
                htmlFor="subscribe-email"
                className="subscribe-message"
              ></label>
            </form>
          </div>
        </div>
        <div className="social-links elem">
          <ul className="elem-anim">
            <li>
              <a href="#" target="_blank" className="transition">
                <i className="fa fa-facebook"></i>
                <span className="tooltip">Facebook</span>
              </a>
            </li>
            <li>
              <a href="#" target="_blank" className="transition">
                <i className="fa fa-dribbble"></i>
                <span className="tooltip">Dribbble</span>
              </a>
            </li>
            <li>
              <a href="#" target="_blank" className="transition">
                <i className="fa fa-twitter"></i>
                <span className="tooltip">Twitter</span>
              </a>
            </li>
            <li>
              <a href="#" target="_blank" className="transition">
                <i className="fa fa-tumblr"></i>
                <span className="tooltip">Tumblr</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="wrapper transition">
            <Swiper className="swiper-container" modules={[Navigation, Pagination, Scrollbar, A11y]}  navigation={{ nextEl: ".arrow-left", prevEl: ".arrow-right" }} speed= {1500} keyboard= {{enabled: true}} effect= 'coverflow' coverflowEffect= {{rotate: 120,depth: 2100}} initialSlide={1} grabCursor={true} 
           onSlideChange={(swiper) => {
            const activeMenuItem = document.querySelector("#menu .active");
            if (activeMenuItem) {
              activeMenuItem.classList.remove("active");
            }
            const menuLinks = document.querySelectorAll("#menu a");
            if (menuLinks.length > swiper.activeIndex) {
              menuLinks[swiper.activeIndex].classList.add("active");
            }
          }} ref={myslider}>
              <SwiperSlide
              
                className="swiper-slide slide-bg"
                style={{ background: `url${bg1}` }}
              >
                <div className="overlay hmoov"></div>
                <div className="container">
                  <section>
                    <div className="content-inner">
                      <div className="section-decor"></div>
                      <div className="content-holder">
                        <div className="about">
                          <h3>About us</h3>
                          <h4>
                            Ut enim ad minim veniam, quis nostrud exercitation
                            ullamco sit voluptatem.
                          </h4>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat. Ultricies nisi voluptatem, illo inventore
                            veritatis et quasi architecto beatae vitae dicta
                            sunt explicabo nemo enim ipsam voluptatem. Sed ut
                            perspiciatis unde omnis iste natus error sit
                            voluptatem accusantium doloremque laudantium, totam
                            rem aperiam.
                          </p>
                          <div className="btn go-contact">Our contacts</div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </SwiperSlide>
              <SwiperSlide
                className="swiper-slide slide-bg"
                style={{ background: `url${bg1}` }}
              >
                <div className="overlay hmoov"></div>
                <div className="container">
                  <div id="canvas-holder">
                    <canvas id="demo-canvas"></canvas>
                  </div>
                  <div className="logo">
                    <Image src={Logo} alt="2" />
                  </div>
                  <div className="counter-content">
                    <ul className="countdown">
                      <li>
                        <span className="days rot">00</span>
                        <p>days</p>
                      </li>
                      <li>
                        <span className="hours rot">00</span>
                        <p>hours</p>
                      </li>
                      <li>
                        <span className="minutes rot2">00</span>
                        <p>minutes</p>
                      </li>
                      <li>
                        <span className="seconds rot2">00</span>
                        <p>seconds</p>
                      </li>
                    </ul>
                  </div>
                  <div className="hero-text">
                    <h2>Our website is coming soon</h2>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide
                className="swiper-slide slide-bg"
                style={{ background: `url${bg1}` }}
              >
                <div className="overlay hmoov"></div>
                <div className="container">
                  <section>
                    <div className="content-inner">
                      <div className="section-decor"></div>
                      <div className="content-holder">
                        <div className="contact">
                          <div className="hide-con-info transition">
                            <h3>Contacts</h3>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit, sed do eiusmod tempor incididunt
                              ut labore et dolore magna aliqua.
                            </p>
                            <div className="contact-info-holder">
                              <ul className="contact-info">
                                <li>
                                  <a href="#" target="_blank">
                                    <i className="fa fa-phone"></i> +1 (000)
                                    123456
                                  </a>
                                </li>
                                <li>
                                  <a href="#" target="_blank">
                                    <i className="fa fa-envelope-o"></i>
                                    yourmail@yuormail.com
                                  </a>
                                </li>
                                <li>
                                  <a href="#" target="_blank">
                                    <i className="fa fa-globe"></i> Heritage
                                    Park Minneapolis
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <div className="btn show-form">Write us</div>
                          </div>
                          <div className="contact-form-holder transition">
                            <h3>Get in Touch</h3>
                            <div className="close-form" >
                              <span className="rcd"></span>
                              <span className="lcd"></span>
                            </div>
                            <div id="contact-form">
                              <div id="message"></div>
                              <form
                                method="post"
                                action="php/contact.php"
                                name="contactform"
                                id="contactform"
                              >
                                <input
                                  name="name"
                                  type="text"
                                  id="name"
                                  defaultValue="Name"
                                />
                                <input
                                  name="email"
                                  type="text"
                                  id="email"
                                  defaultValue="E-mail"
                                />
                                <textarea
                                  name="comments"
                                  id="comments"
                                  defaultValue="Message"
                                ></textarea>
                                <button type="submit" id="submit">
                                  <i className="fa fa-envelope-o button__icon"></i>
                                  <span>Send Message</span>
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </SwiperSlide>
            </Swiper>
            <button className="arrow-right transition2" >
     <svg enableBackground="new 0 0 15 26" height="26px" id="Layer_1" version="1.1" viewBox="0 0 15 26" width="15px"  xmlns="http://www.w3.org/2000/svg" style={{transform:'rotate(180deg)'}}><polygon fill="#231F20" points="12.885,0.58 14.969,2.664 4.133,13.5 14.969,24.336 12.885,26.42 2.049,15.584 -0.035,13.5 "/></svg>
          </button>
          <button className="arrow-left transition2" >
            <svg enableBackground="new 0 0 15 26" height="26px" id="Layer_1" version="1.1" viewBox="0 0 15 26" width="15px"  xmlns="http://www.w3.org/2000/svg" ><polygon fill="#231F20" points="12.885,0.58 14.969,2.664 4.133,13.5 14.969,24.336 12.885,26.42 2.049,15.584 -0.035,13.5 "/></svg>
          </button>
        </div>
      </div>
    </main>
  );
}
