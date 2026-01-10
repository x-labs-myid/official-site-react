import type { LandingPageTeamData } from "@/landing-page/type";
import { FaPeopleGroup } from "react-icons/fa6";

const Team = ({ teamList }: { teamList: LandingPageTeamData[] }) => {
  return (
    <>
      <div
        id="team"
        className="w-full min-h-screen flex flex-col justify-center items-center mx-auto gap-2 py-20 mb-14 lg:mb-0 xl:mb-0 bg-dark"
      >
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
                  src={
                    team.avatar_url
                      ? team.avatar_url
                      : "/assets/images/avatar-default.png"
                  }
                  alt={team.name}
                  className="w-full h-80 object-cover"
                />
              </figure>
              <div className="card-body text-center">
                <p className="text-3xl">{team.name}</p>
                <p>{team.title}</p>
              </div>
            </div>
          ))}
          <div className="card bg-white text-gray-800 w-full max-w-sm shadow-sm">
            <figure>
              <img
                src="/assets/images/avatar-default.png"
                alt="Avatar"
                className="w-full h-80 object-cover"
              />
            </figure>
            <div className="card-body text-center">
              <p className="text-3xl">Join Us?</p>
              <p>It could be you...</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Team;
