import { Button, TextField, InputAdornment, MenuItem } from "@mui/material";
import { AiOutlineVideoCameraAdd, AiOutlineSearch } from "react-icons/ai";
import { GrEdit } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import { useModal } from "@/app/Hook/useModal";
import {
  AddModal,
  EditMeetingModal,
  SearchShowResult,
} from "../ModalForm/MeetingModal";
import { useAxios } from "@/app/Hook/useAxios";
import { toast } from "react-toastify";
import { SweetSwal } from "@/component/ConstValues/sweetAlert";
import { useRef } from "react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import ConfirmDialog_two from "@/components/ui/ConfirmDialog_two";
import { useDialog } from "@/app/Hook/useDialog";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const AddMeetingBtn = ({ onSuccess }) => {
  const { open, handleOpen, handleClose } = useModal();

  return (
    <>
      <Button
        startIcon={<AiOutlineVideoCameraAdd />}
        variant="contained"
        color="error"
        onClick={() => handleOpen(true)}
        sx={{ textTransform: "none", fontWeight: 600 }} // Makes text look cleaner
      >
        Meeting
      </Button>
      <AddModal
        isOpen={open}
        isClose={() => handleClose(true)}
        onSuccess={onSuccess}
      />
    </>
  );
};

export const SearchBtn = () => {
  const [searchWord, setSearchWord] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const axios = useAxios();
  const { open, handleOpen, handleClose } = useModal();

  const handleSearchMeeting = async () => {
    if (!searchWord.trim()) {
      toast.warning("Please enter a meeting date or organiser name");
      return;
    }

    try {
      const response = await axios.get(
        `/VIP/search/?s_key=${encodeURIComponent(searchWord.trim())}`,
      );

      console.log("Search response:", response.data);

      // Store the returned meeting records
      const result = response.data?.data || [];

      if (result.length > 0) {
        setSearchResult(result);
        handleOpen(); // Open the modal after data is found
      } else {
        setSearchResult([]);
        toast.info("No meeting records found");
      }
    } catch (error) {
      console.error("Search error:", error);

      const errMsg =
        error.response?.data?.message || "No meeting records found";

      setSearchResult([]);
      toast.error(errMsg);
    }
    setSearchWord("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchMeeting();
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <TextField
          size="small"
          variant="outlined"
          placeholder="Search by date or organiser..."
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          onKeyDown={handleKeyDown}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AiOutlineSearch style={{ color: "rgba(0,0,0,0.54)" }} />
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSearchMeeting}
          sx={{
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Search
        </Button>
      </div>

      <SearchShowResult
        isOpen={open}
        isClose={handleClose}
        searchResult={searchResult}
      />
    </>
  );
};

export const EditBtn = ({ editData, onRefresh }) => {
  const { open, handleOpen, handleClose } = useModal();
  return (
    <>
      <GrEdit
        style={{ color: "green", fontSize: "25px" }}
        onClick={() => handleOpen(true)}
      />
      <EditMeetingModal
        isOpen={open}
        isClose={() => handleClose(true)}
        onSuccess={onRefresh}
        editInfo={editData}
      />
    </>
  );
};
export const DeleteBtn = ({ delId, onRefresh }) => {
  const axios = useAxios();

  const { isOpen, openDialog, closeDialog } = useDialog();

  const handleDeleteMeeting = async () => {
    try {
      const response = await axios.delete(`/VIP/delete/${delId}`);

      if (response.data.success) {
        toast.success("Data deleted");
        closeDialog();
        onRefresh();
      } else {
        throw new Error("Delete failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete data");
    }
  };
  return (
    <>
      {/* Delete icon */}
      <MdDeleteForever
        className="cursor-pointer text-red-500"
        style={{ fontSize: "25px" }}
        onClick={openDialog}
      />

      {/* Confirmation Dialog */}
      <ConfirmDialog_two
        isOpen={isOpen}
        onClose={closeDialog}
        onConfirm={handleDeleteMeeting}
      />
    </>
  );
};

// PDF HEADER — customize later
const addPdfHeader = (doc, selectedMonth, year) => {
  // Add department name, logo, report title, etc. here.
};

// PDF FOOTER — customize later
const addPdfFooter = (doc, pageNumber, totalPages) => {
  // Add signatures, page numbers, approval details, etc. here.
};

export const PDFBtn = ({ meetingData = [] }) => {
  console.log(meetingData);
  const month = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];
  const currentYear = new Date().getFullYear();

  const [selectMonth, setSelectMonth] = useState(month[new Date().getMonth()]);

  const handleChange = (event) => {
    setSelectMonth(event.target.value);
  };

  const handlePdfExport = () => {
    // PDF EXPORT FUNCTIONALITY//
    if (!selectMonth) {
      alert("Please select a month.");
      return;
    }

    // Filter meeting records by selected month and current year.
    const selectedMonthIndex = month.indexOf(selectMonth);

    const filteredData = meetingData.filter((meeting) => {
      if (!meeting.meetingDate) return false;

      const date = new Date(meeting.meetingDate);

      return (
        !Number.isNaN(date.getTime()) &&
        date.getUTCFullYear() === currentYear &&
        date.getUTCMonth() === selectedMonthIndex
      );
    });

    if (filteredData.length === 0) {
      alert(`No meeting records found for ${selectMonth} ${currentYear}.`);
      return;
    }

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    // Convert meeting records into PDF table rows.
    const rows = filteredData.map((meeting, index) => {
      const itemDetails = Array.isArray(meeting.itemDetails)
        ? meeting.itemDetails
            .map((category) => {
              const items = Array.isArray(category.items) ? category.items : [];

              const itemText = items
                .map((item) => {
                  const details = [
                    `Qty: ${item.qty ?? "N/A"}`,
                    item.specification
                      ? `Specification: ${item.specification}`
                      : "",
                    item.measurement ? `Measurement: ${item.measurement}` : "",
                  ]
                    .filter(Boolean)
                    .join(", ");

                  return `${item.itemName || "Unnamed item"} (${details})`;
                })
                .join("\n");

              return itemText
                ? `${category.category || "OTHER"}:\n${itemText}`
                : "";
            })
            .filter(Boolean)
            .join("\n\n")
        : "";

      return [
        index + 1,
        new Date(meeting.meetingDate).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          timeZone: "UTC",
        }),
        meeting.programmeName || "N/A",
        meeting.organiser || "N/A",
        meeting.venue || "N/A",
        meeting.meetingTime || "N/A",
        meeting.agency || "N/A",
        itemDetails || "No IT requirements",
        meeting.remarks || "—",
      ];
    });

    autoTable(doc, {
      startY: 20,
      margin: {
        top: 20,
        bottom: 15,
        left: 10,
        right: 10,
      },
      head: [
        [
          "Sl.",
          "Date",
          "Programme",
          "Organiser",
          "Venue",
          "Time",
          "Agency",
          "IT Requirements",
          "Remarks",
        ],
      ],
      body: rows,
      theme: "grid",
      styles: {
        fontSize: 7,
        cellPadding: 2,
        overflow: "linebreak",
        valign: "top",
      },
      headStyles: {
        fillColor: [21, 101, 192],
        textColor: 255,
        fontStyle: "bold",
        halign: "center",
      },
      columnStyles: {
        0: { cellWidth: 9 },
        1: { cellWidth: 20 },
        2: { cellWidth: 30 },
        3: { cellWidth: 28 },
        4: { cellWidth: 28 },
        5: { cellWidth: 15 },
        6: { cellWidth: 25 },
        7: { cellWidth: 70 },
        8: { cellWidth: 30 },
      },

      // Called for every page. Header remains separate.
      didDrawPage: () => {
        addPdfHeader(doc, selectMonth, currentYear);
      },
    });

    // Add footer separately on every generated page.
    const totalPages = doc.getNumberOfPages();

    for (let page = 1; page <= totalPages; page++) {
      doc.setPage(page);
      addPdfFooter(doc, page, totalPages);
    }

    doc.save(`Meeting_Report_${selectMonth}_${currentYear}.pdf`);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <TextField
        id="outlined-select-month"
        select
        label="Select Month"
        value={selectMonth}
        onChange={handleChange}
        variant="outlined" // Can be 'outlined', 'filled', or 'standard'
        sx={{ width: 200 }}
      >
        {month.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <Button
        variant="contained"
        color="secondary"
        onClick={handlePdfExport}
        sx={{
          py: 1,
          px: 2.5,
          fontWeight: 600,
          textTransform: "none",
          borderRadius: 2,
        }}
      >
        Export PDF
      </Button>
    </div>
  );
};
