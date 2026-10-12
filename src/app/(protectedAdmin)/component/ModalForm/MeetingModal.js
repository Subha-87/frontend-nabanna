import {
  Modal,
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Divider,
  Paper,
  Stack,
} from "@mui/material";
import { modStyle } from "./modalStyle";
import { MeetingForm, EditMeetingForm } from "../FormikForm/MeetingForm";

const modalStyleMeeting = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  maxWidth: 1200,
  height: "88vh",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};
export const AddModal = ({ isOpen, isClose, onSuccess }) => {
  const handleModalClose = () => {
    isClose(true);
  };

  return (
    <Modal open={isOpen} onClose={isClose}>
      <Box sx={modalStyleMeeting}>
        <MeetingForm modStat={handleModalClose} onSuccess={onSuccess} />
      </Box>
    </Modal>
  );
};

export const EditMeetingModal = ({ isOpen, isClose, editInfo, onSuccess }) => {
  const handleModalClose = () => {
    isClose(true);
  };
  return (
    <Modal open={isOpen} onClose={isClose}>
      <Box sx={modalStyleMeeting}>
        <EditMeetingForm
          data={editInfo}
          modStat={handleModalClose}
          onSuccess={onSuccess}
        />
      </Box>
    </Modal>
  );
};

export const SearchShowResult = ({ isOpen, isClose, searchResult = [] }) => {
  return (
    <Dialog open={isOpen} onClose={isClose} fullWidth maxWidth="md">
      <DialogTitle
        sx={{
          background: "linear-gradient(135deg, #1565c0, #42a5f5)",
          color: "white",
          fontWeight: 700,
        }}
      >
        Meeting Search Results
      </DialogTitle>

      <DialogContent dividers sx={{ bgcolor: "#f5f7fb", p: 3 }}>
        {searchResult.map((meeting) => (
          <Paper
            key={meeting._id}
            elevation={2}
            sx={{
              mb: 3,
              p: { xs: 2, sm: 3 },
              borderRadius: 3,
              border: "1px solid #e0e7ff",
            }}
          >
            {/* Meeting Information */}
            <Typography
              variant="h6"
              fontWeight={700}
              color="primary.main"
              gutterBottom
            >
              {meeting.programmeName || "Meeting"}
            </Typography>

            <Stack spacing={1}>
              <Typography>
                <strong>Programme:</strong> {meeting.programmeName || "N/A"}
              </Typography>

              <Typography>
                <strong>Organiser:</strong> {meeting.organiser || "N/A"}
              </Typography>

              <Typography>
                <strong>Venue:</strong> {meeting.venue || "N/A"}
              </Typography>

              <Typography>
                <strong>Date:</strong>{" "}
                {meeting.meetingDate
                  ? new Date(meeting.meetingDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      timeZone: "UTC",
                    })
                  : "N/A"}
              </Typography>

              {meeting.meetingTime && (
                <Typography>
                  <strong>Time:</strong> {meeting.meetingTime}
                </Typography>
              )}

              {meeting.agency && (
                <Typography>
                  <strong>Agency:</strong> {meeting.agency}
                </Typography>
              )}
            </Stack>

            {/* IT Requirements */}
            {Array.isArray(meeting.itemDetails) &&
              meeting.itemDetails.length > 0 && (
                <>
                  <Divider sx={{ my: 2 }} />

                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ mb: 2, color: "#263238" }}
                  >
                    IT Requirements
                  </Typography>

                  <Stack spacing={2}>
                    {meeting.itemDetails.map((categoryData, index) => (
                      <Box
                        key={`${categoryData.category}-${index}`}
                        sx={{
                          border: "1px solid #dbeafe",
                          borderRadius: 2,
                          overflow: "hidden",
                          bgcolor: "#fff",
                        }}
                      >
                        {/* Category heading */}
                        <Box
                          sx={{
                            px: 2,
                            py: 1.2,
                            bgcolor: "#e3f2fd",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 1,
                          }}
                        >
                          <Typography fontWeight={700} color="#1565c0">
                            {categoryData.category}
                          </Typography>

                          <Chip
                            size="small"
                            label={`${
                              Array.isArray(categoryData.items)
                                ? categoryData.items.length
                                : 0
                            } item(s)`}
                            color="primary"
                            variant="outlined"
                          />
                        </Box>

                        {/* Items under category */}
                        <Box sx={{ p: 2 }}>
                          {Array.isArray(categoryData.items) &&
                          categoryData.items.length > 0 ? (
                            <Stack spacing={1.5}>
                              {categoryData.items.map((item, itemIndex) => (
                                <Box
                                  key={`${item.itemName}-${itemIndex}`}
                                  sx={{
                                    p: 1.5,
                                    borderRadius: 1.5,
                                    bgcolor: "#f8fafc",
                                    border: "1px solid #e2e8f0",
                                  }}
                                >
                                  <Typography fontWeight={600}>
                                    {item.itemName || "Unnamed item"}
                                  </Typography>

                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mt: 0.5 }}
                                  >
                                    <strong>Quantity:</strong>{" "}
                                    {item.qty ?? "N/A"}
                                  </Typography>

                                  {item.specification && (
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                      sx={{ mt: 0.5 }}
                                    >
                                      <strong>Specification:</strong>{" "}
                                      {item.specification}
                                    </Typography>
                                  )}

                                  {item.measurement && (
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                      sx={{ mt: 0.5 }}
                                    >
                                      <strong>Measurement:</strong>{" "}
                                      {item.measurement}
                                    </Typography>
                                  )}
                                </Box>
                              ))}
                            </Stack>
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              No items added in this category.
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </>
              )}

            {/* Remarks */}
            {meeting.remarks && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography>
                  <strong>Remarks:</strong> {meeting.remarks}
                </Typography>
              </>
            )}
          </Paper>
        ))}

        {searchResult.length === 0 && (
          <Typography color="text.secondary" textAlign="center" py={4}>
            No meeting records found.
          </Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button
          variant="contained"
          onClick={isClose}
          sx={{ textTransform: "none" }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SearchShowResult;
