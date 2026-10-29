/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "10.10.119.160", // Replace with the hostname of your image server
        port: "5000",
        pathname: "/ItReq/**", // specify a path pattern
      },
      {
        protocol: "https",
        hostname: "nabanna-itpwd.online", // Replace with the hostname of your image server

        pathname: "/api/ItReq/**", // specify a path pattern
      },

      {
        protocol: "http",
        hostname: "10.10.119.160",
        port: "5000",
        pathname: "/EstimateFolder/**",
      },
      {
        protocol: "https",
        hostname: "nabanna-itpwd.online",

        pathname: "/api/EstimateFolder/**",
      },
      {
        protocol: "http",
        hostname: "10.10.119.160",
        port: "5000",
        pathname: "/RequisitionFolder/**",
      },
      {
        protocol: "https",
        hostname: "nabanna-itpwd.online",

        pathname: "/api/RequisitionFolder/**",
      },
      {
        protocol: "http",
        hostname: "10.10.119.160",
        port: "5000",
        pathname: "/ApprovalFolder/**",
      },
      {
        protocol: "https",
        hostname: "nabanna-itpwd.online",

        pathname: "/api/ApprovalFolder/**",
      },
      {
        protocol: "http",
        hostname: "10.10.119.160",
        pathname: "/api/WorkOrderFolder/**",
      },
      {
        protocol: "https",
        hostname: "nabanna-itpwd.online",
        pathname: "/api/WorkOrderFolder/**",
      },

      {
        protocol: "http",
        hostname: "10.10.119.160",
        port: "5000",
        pathname: "uploads/images/Meetings/**",
      },
      {
        protocol: "https",
        hostname: "nabanna-itpwd.online",

        pathname: "/api/uploads/images/Meetings/**",
      },
      {
        protocol: "http",
        hostname: "10.10.119.160",
        port: "5000",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
