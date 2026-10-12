"use client";
import { useState, useEffect } from "react";
import { useAxios } from "@/app/Hook/useAxios";
import { handleAxiosError } from "@/app/utils/axiosError";
import TableContainer from "./TableContainer";
import {
  AddMeetingBtn,
  SearchBtn,
  PDFBtn,
} from "../../component/ActionButton/MeetingButton";
import { Box, Typography } from "@mui/material";
import { WorkspacePremium } from "@mui/icons-material";
import { MilitaryTech } from "@mui/icons-material";

const PublicMeeting = () => {
  const [meetingData, setMeetingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const axios = useAxios();

  const getMeetingDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/VIP/fetchAll");
      //console.log(response)
      if (response.data.success) {
        setMeetingData(response.data?.data);
      } else {
        throw Error("Something Wrong");
      }
    } catch (error) {
      console.error(error);
      const { generalError } = handleAxiosError(error);
      setError(generalError || "Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMeetingDetails();
  }, []);

  return (
    <>
      <Box
        className="h-[7%] flex flex-col justify-center items-center"
        sx={{
          background:
            "linear-gradient(135deg, #0f0c29 0%, #1a1333 40%, #0d0b1e 100%)",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(ellipse 60% 120% at 50% 50%, rgba(168,130,255,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60%",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.25) 30%, rgba(212,175,55,0.5) 50%, rgba(212,175,55,0.25) 70%, transparent 100%)",
            pointerEvents: "none",
          },
        }}
      >
        {/* Icon and Text Row */}
        <Box
          className="flex items-center gap-2"
          sx={{
            position: "relative",
            zIndex: 1,
            py: 0.5,
            px: 3,
            borderRadius: "4px",
            backdropFilter: "blur(4px)",
          }}
        >
          <WorkspacePremium
            sx={{
              fontSize: 26,
              color: "#d4af37",
              filter: "drop-shadow(0 0 6px rgba(212,175,55,0.5))",
              animation: "premiumPulse 3s ease-in-out infinite",
              "@keyframes premiumPulse": {
                "0%, 100%": {
                  filter: "drop-shadow(0 0 6px rgba(212,175,55,0.4))",
                },
                "50%": {
                  filter: "drop-shadow(0 0 12px rgba(212,175,55,0.7))",
                },
              },
            }}
          />
          <Typography
            variant="h6"
            fontWeight={700}
            className="uppercase"
            sx={{
              letterSpacing: 3,
              fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
              background:
                "linear-gradient(135deg, #d4af37 0%, #f5e6a3 40%, #d4af37 60%, #b8962e 100%)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 4s ease-in-out infinite",
              "@keyframes shimmer": {
                "0%": { backgroundPosition: "200% 50%" },
                "100%": { backgroundPosition: "-200% 50%" },
              },
              textShadow: "none",
            }}
          >
            VIP Meeting Details
          </Typography>
        </Box>
      </Box>
      <div className="h-[10%] flex items-center justify-evenly bg-blue-100">
        {/* If you want them on the left: */}

        <AddMeetingBtn onSuccess={getMeetingDetails} />
        <SearchBtn />
        <PDFBtn meetingData={meetingData} />

        {/* You can put other header items like Profile/Avatars on the right here */}
      </div>
      <div className="h-[83%] border-2 border-primary overflow-auto grow">
        <TableContainer
          tableData={meetingData}
          tableError={error}
          isLoading={loading}
          onRefresh={getMeetingDetails}
        />{" "}
      </div>
    </>
  );
};

export default PublicMeeting;
