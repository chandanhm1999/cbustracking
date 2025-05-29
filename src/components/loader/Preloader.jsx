// components/Preloader.js
import styles from "./Loader.module.css"; // Import CSS module

const Preloader = () => {
  return (
    <div className={styles.loaderContainer}>
      <img
        src="/assets/busloader.gif" // Replace with your actual GIF URL
        alt="Loading..."
        className={styles.loader}
        width={150}
        height={150}
        unoptimized
      />
    </div>
  );
};

export default Preloader;
