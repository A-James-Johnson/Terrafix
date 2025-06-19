const baseURL =
  import.meta.env.VITE_BACKEND_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:9000"
    : "https://terrafix-backend.onrender.com");

    export default baseURL;