const baseURL =
  import.meta.env.VITE_BACKEND_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:9000"
    : "https://terrafix-backend-0nt7.onrender.com/login");

    export default baseURL;