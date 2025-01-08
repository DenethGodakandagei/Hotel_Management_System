import React from "react";
import about from "../assets/About.jpg";

export const About = () => {
  return (
    <section className="About" id="about">
      <div className="container my-24 mx-auto md:px-6">
        <section className="background-radial-gradient mb-32">
          <div className="px-6 py-12 text-center md:px-12 lg:text-left">
            <div className="container mx-auto">
              <div className="grid items-center gap-16 lg:grid-cols-2">
                <div className="mt-12 lg:mt-0">
                  <h1 className="mb-12 text-5xl font-bold tracking-tight text-[hsl(218,81%,95%)] md:text-6xl xl:text-7xl">
                    <span className="text-[hsl(218,81%,75%)] reveal">
                      Welcome to LuxeStay Resort
                    </span>
                  </h1>
                  <p className="text-lg text-hsl[234.5,89.5%,73.9%] reveal">
                    Discover opulent luxury at LuxeStay. Indulge in exquisite
                    accommodations, impeccable service, and breathtaking
                    surroundings, creating an unforgettable retreat that
                    surpasses expectations.
                  </p>
                </div>
                <div className=" grid justify-items-center item-center container mb-12 lg:mb-0">
                  <img
                    src={about}
                    className=" reveal sm:h-[55vh] relative w-full overflow-hidden rounded-lg shadow-lg "
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};