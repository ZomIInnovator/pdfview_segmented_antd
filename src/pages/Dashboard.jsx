import homebck from "../images/bckgrnd.png";

const Dashboard = () => {
  return (
    <div
      className="flex h-screen bg-cover"
      style={{ backgroundImage: `url(${homebck})` }}
    >
      <div className="flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-10">
        Dashboard
      </div>
    </div>
  );
};

export default Dashboard;
