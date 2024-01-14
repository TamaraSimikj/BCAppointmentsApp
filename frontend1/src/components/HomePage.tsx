import AuthService from "../services/auth.service";
import SalonList from "./Salon/SalonList";

const HomePage = () => {
  console.log("logged user", AuthService.getCurrentUser());

  return (
    <div>
      Hello from home page
      <SalonList />
    </div>
  );
};

export default HomePage;
