import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets_frontend/assets";

const About = () => {
  const images = [
    { src: assets.about_image_1, alt: "About Image 1" },
    { src: assets.about_image_2, alt: "About Image 2" },
    { src: assets.about_image_3, alt: "About Image 3" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const intervalId = setInterval(nextImage, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div id="about" className="about-box py-10">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <p className="mt-4 text-sm leading-7 text-gray-500 font-regular uppercase">About Us</p>
          <h2 className="text-4xl sm:text-5xl leading-normal font-extrabold tracking-tight text-gray-900">Welcome to <span className="text-indigo-600">Doctor Suites</span></h2>
          <p className="text-lg text-gray-600 mt-4">
            Where a diverse range of medical professionals provide specialized care tailored to meet the unique needs of each patient.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center mb-12">
          <div className="lg:w-1/2 p-4">
            <div className="border-2 border-primary shadow-lg overflow-hidden rounded-lg">
              <div className="relative h-[450px] transition-all duration-300">
                <img
                  src={images[currentIndex].src}
                  alt={images[currentIndex].alt}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 p-4">
            <h3 className="text-3xl font-semibold mb-4">What We Do</h3>
            <p className="mb-4 text-gray-600 text-sm leading-relaxed">
              Doctor Suites serve as comprehensive healthcare facilities that house various medical specialists, each focusing on particular fields of medicine. This approach allows for coordinated and interdisciplinary patient care.
            </p>
            <h4 className="text-xl font-semibold mb-4">Importance of Specialization</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              Specialization in medicine is crucial for accurate diagnosis and effective treatment. Medical specialists undergo extensive training focusing on their specific area, enabling them to handle complex cases effectively.
            </p>
            <a
              href="#"
              className="new-btn-d inline-block px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300"
            >
              Read More
            </a>
          </div>
        </div>

        {/* ---- About Us Section ---- */}
        <section className="aboutus-section py-24 bg-gray-50">
          <div className="container mx-auto flex flex-wrap -mx-4">
            {/* About Us Text */}
            <div className="md:w-1/3 sm:w-1/2 w-full px-4 mb-6 flex flex-col">
              <div className="aboutus p-4 border border-gray-200 rounded-lg shadow-md flex-grow bg-white">
              <h2 className="aboutus-title text-xl font-bold uppercase mb-4">About Us</h2>
                
                <p className="aboutus-text text-gray-600 text-sm mb-4">Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.</p>
                <a href="#" className="aboutus-more inline-block border border-yellow-400 rounded-full text-yellow-400 font-bold px-[20px] py-[7px] uppercase hover:bg-yellow-400 hover:text-white transition duration-300">Read More</a>
              </div>
            </div>

            {/* Features Section */}
            <div className="md:w-2/3 w-full px-4 space-y-6">
              {['Work with heart', 'Reliable services', 'Great support'].map((title, index) => (
                <div key={index} className="feature-box flex items-start space-x-4 p-2 border border-gray-200 rounded-lg shadow-md bg-white">
                  <span className="icon bg-white text-yellow-400 rounded-full flex items-center justify-center h-[70px] w-[70px] border border-yellow-400">
                    {/* Example icon; replace with an actual icon component */}
                    &#9889;
                  </span>
                  <div className="feature-content flex-grow">
                    <h4 className="text-black font-semibold">{title}</h4>
                    <p className="text-gray-600 text-sm">Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae.</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ---- Testimonials Section ---- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 rounded bg-primary-gradient p-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="text-center p-4 bg-white rounded-lg shadow-md">
              <div className="text-yellow-500 text-xl mb-2">★★★★☆</div>
              <p className="text-gray-800 mb-4">
                Slate helps you see how many more days you need to work to reach your financial goal for the month and year.
              </p>
              <div className="flex items-center justify-center">
                <img 
                  src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? 'women' : 'men'}/44.jpg`} 
                  alt={`Person Image ${index + 1}`} 
                  className="w-40 h-40 rounded-full" 
                />
                <div className="ml-3 text-left">
                  <h4 className="text-primary font-bold">Regina Miles</h4>
                  <p className="text-gray-600 text-sm">Designer</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default About;