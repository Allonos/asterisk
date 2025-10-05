import mariami from "../../assets/images/mariami.jpg";
import luka from "../../assets/images/luka1.jpg";
import rezy from "../../assets/images/rezy.jpg";
import salo from "../../assets/images/salo.jpg";
import sesili from "../../assets/images/sesili.jpg";

import data from "../../data/data";

const MemberCard = () => {
  // Create an array of images in the same order as your data
  const images = [mariami, luka, salo, sesili, rezy];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {data.map((member, index) => (
        <div key={member.id} className="mt-10 bg-[#575B664d] rounded-lg">
          <img
            src={images[index]}
            alt={member.name}
            className="w-full h-[400px] rounded-t-lg object-cover"
          />
          <div className="my-4 flex items-center justify-center">
            <h1 className="text-2xl">{member.name}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemberCard;
