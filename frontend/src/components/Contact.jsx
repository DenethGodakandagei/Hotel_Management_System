import React from "react";

export const Contact = () => {
  return (
    <div>
      <div class="container my-24 mx-auto md:px-6" id="contact">
        <h1 class="text-3xl lg:text-4xl text-orange-400 font-extrabold text-center p-6">
          Explore our current promotions and exclusive deals to make the most of
          your stay with us.
        </h1>

        <section className="mb-32 text-center">
          <div className="py-12 md:px-12">
            <div className=" mx-auto xl:px-32">
              <div className="grid items-center lg:grid-cols-2">
                <div className="mb-12 md:mt-12 lg:mt-0 lg:mb-0">
                  <div className="relative z-[1] block rounded-lg bg-[hsla(0,0%,100%,0.55)] px-2 py-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[30px] dark:bg-gray-60 dark:shadow-black/20 md:px-12 lg:-mr-14 m-6">
                    <h2 className="mb-12 text-3xl font-bold text-orange-400">
                      Contact us
                    </h2>
                    <form className="w-full max-w-lg">
                      <div className="flex flex-wrap -mx-1 mb-1">
                        <div className="w-full px-1">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-last-name"
                          >
                            Name
                          </label>
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-password"
                          >
                            E-mail
                          </label>
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="email"
                            type="email"
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-password"
                          >
                            Message
                          </label>
                          <textarea
                            className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-18 resize-none"
                            id="message"
                          ></textarea>
                        </div>
                      </div>
                      <div className="md:flex md:items-center">
                        <div className="md:w-1/3">
                          <button
                            className="shadow bg-orange-400 hover:bg-orange-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                            type="button"
                          >
                            Send
                          </button>
                        </div>
                        <div className="md:w-2/3"></div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="md:mb-12 lg:mb-0  m-5">
                  <div className="relative h-[400px] sm:h-[600px] rounded-lg shadow-lg dark:shadow-black/20">
                    <iframe
                      src="https://maps.google.com/maps?q=manhatan&t=&z=13&ie=UTF8&iwloc=&output=embed"
                      className="absolute left-0 top-0 h-full w-full rounded-lg sm:w-30"
                      frameborder="0"
                      allowfullscreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};