import { useSelector } from "react-redux";
import { useAppSelector } from "../../store";

const Home = () => {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <div>
      Homeeeeeeeeee!
      {user?.name}
    </div>
  );
};

export default Home;
