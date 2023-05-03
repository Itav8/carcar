import styles from "./Dashboard.module.css";
import SalesChart from "./SalesChart";
import AutomobileChart from "./AutomobileChart";

function MainPage() {
  return (
    <>
      <div className={`${styles.title}`}>
        <h1>CarCar</h1>
        <p className={`${styles.message}`}>
          The premiere solution for automobile dealership management!
        </p>
      </div>
      <div className={`${styles.dashboard}`}>
        <SalesChart />
        <AutomobileChart />
      </div>
    </>
  );
}

export default MainPage;
