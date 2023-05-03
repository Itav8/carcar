import styles from "./Dashboard.module.css";
import Charts from "./Charts";

function MainPage() {
  return (
    <>
      <div className={`${styles.dashboard}`}>
        <div className="px-4 py-5 my-5 text-center">
          <h1 className="display-5 fw-bold">CarCar</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
              The premiere solution for automobile dealership management!
            </p>
            <Charts />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
