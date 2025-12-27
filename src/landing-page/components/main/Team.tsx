import type { LandingPageTeamData } from "@/landing-page/type";
import { FaPeopleGroup } from "react-icons/fa6";

const Team = ({ teamList }: { teamList: LandingPageTeamData[] }) => {
  return (
    <>
      <div className="w-full h-auto lg:h-screen xl:h-screen flex flex-col justify-center items-center mx-auto gap-2 mb-14 lg:mb-0 xl:mb-0 bg-dark">
        <div className="hero min-h-[20vh]">
          <div className="hero-content text-center flex flex-col justify-center items-center">
            <div className="flex flex-row justify-center items-center text-3xl bg-gradient-to-r from-primary to-secondary bg-clip-text gap-2">
              <FaPeopleGroup className="w-6 h-6 inline" />
              <p>Our Teams</p>
            </div>
            <p>
              Meet the talented individuals behind our innovative mobile
              applications.
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 my-10">
          {teamList.map((team) => (
            <div className="card bg-white text-gray-800 w-96 shadow-sm">
              <figure>
                <img
                  src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                  alt="Play Store"
                />
              </figure>
              <div className="card-body text-center">
                <p className="text-3xl">{team.name}</p>
                <p>{team.title}</p>
              </div>
            </div>
          ))}
          <div className="card bg-white text-gray-800 w-96 shadow-sm">
            <figure>
              <img
                src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                alt="Play Store"
              />
            </figure>
            <div className="card-body text-center">
              <p className="text-3xl">Who next?</p>
              <p>Maybe you...</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Team;
