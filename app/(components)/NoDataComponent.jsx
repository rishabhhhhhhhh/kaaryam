import React from "react";

const NoDataComponent = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.title}>No data available</div>
        <p style={styles.description}>
          It seems there is no data to display at the moment.
        </p>
        <p style={styles.description}>
          You can add tasks by clicking Add Task button on Navigation Bar.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f8f8f8",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  content: {
    maxWidth: "400px",
    margin: "auto",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#333",
  },
  description: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "20px",
  },
  // Add more styles as needed
};

export default NoDataComponent;
