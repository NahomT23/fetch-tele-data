
import busIcon from '../assets/bus.png';
import qualityIcon from '../assets/quality.jpg'; 
import savingIcon from '../assets/saving.webp'; 


const About = () => {
  return (
    <div className="container flex flex-col space-y-12 md:flex-row md:justify-evenly md:space-y-0 mx-auto py-12 items-center">

      {/* Delivery */}
      <div className="main-about w-72 min-h-[380px] text-center relative cursor-pointer">
        <div className="service p-8 rounded-lg absolute bottom-0 shadow-[0_0_20px_-15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_-15px_rgba(0,0,0,0.5)]">
          <div className="service-logo w-32 h-32 rounded-full border-2 border-red-500 mx-auto -mt-20 hover:border-red-700 transition-colors">
            <img src={busIcon} alt="Delivery" className="w-12 mt-8 mx-auto" />
          </div>
          <h3 className="mt-8 text-lg font-semibold">Delivery</h3>
          <p className="mt-4">
            Valuing time and punctuality at Kalit, we ensure every ordered timepiece is delivered swiftly, safely, and reliably.
            Our commitment is to provide you with a seamless shopping experience.
          </p>
        </div>
      </div>

      {/* Quality */}
      <div className="main-about w-72 min-h-[380px] text-center relative cursor-pointer">
        <div className="service p-8 rounded-lg absolute bottom-0 shadow-[0_0_20px_-15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_-15px_rgba(0,0,0,0.5)]">
          <div className="service-logo w-32 h-32 rounded-full border-2 border-red-500 mx-auto -mt-20 hover:border-red-700 transition-colors">
            <img src={qualityIcon} alt="Quality" className="w-12 mt-8 mx-auto" />
          </div>
          <h3 className="mt-8 text-lg font-semibold">Quality</h3>
          <p className="mt-4">
            Kalit watches, more than timepieces, are ideal gifts for all occasions. Each watch, elegantly boxed, is ready to narrate the wearer’s unique story, reflecting our commitment to quality.
          </p>
        </div>
      </div>

      {/* Fair */}
      <div className="main-about w-72 min-h-[380px] text-center relative cursor-pointer">
        <div className="service p-8 rounded-lg absolute bottom-0 shadow-[0_0_20px_-15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_-15px_rgba(0,0,0,0.5)]">
          <div className="service-logo w-32 h-32 rounded-full border-2 border-red-500 mx-auto -mt-20 hover:border-red-700 transition-colors">
            <img src={savingIcon} alt="Fair" className="w-12 mt-8 mx-auto" />
          </div>
          <h3 className="mt-8 text-lg font-semibold">Fair</h3>
          <p className="mt-4">
            Maximize your savings at Kalit! Purchase five or more items and receive a 50% discount on two. Explore our quality timepieces and seize the opportunity for substantial savings today.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
