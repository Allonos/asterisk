import Wrapper from "../components/layouts/wrapper";
import MemberCard from "../components/ui/MemberCard";

const AboutUs = () => {
  return (
    <div className="bg-black text-white py-5">
      <Wrapper>
        <div>
          <h1 className="text-3xl font-semibold">About the Team</h1>
          <div>
            <div className="bg-[#575B664d] p-2 rounded-lg mt-5">
              <p>
                Our team name, Asterisk (*) symbolizes that every big
                achievement starts from something small. Our goal is to
                challenge ourselves by working with deadlines and analyzing data
                using various methods, including multiple programming languages.
                We are also motivated to bring innovation to the world!
              </p>
            </div>
          </div>
        </div>

        <MemberCard />
      </Wrapper>
    </div>
  );
};

export default AboutUs;
