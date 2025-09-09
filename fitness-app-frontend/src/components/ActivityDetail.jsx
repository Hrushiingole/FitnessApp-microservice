import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getActivitiesDetail } from "../services/api";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
} from "@mui/material";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import TimerIcon from "@mui/icons-material/Timer";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import EventIcon from "@mui/icons-material/Event";
import { useLocation } from "react-router";
const ActivityDetail = () => {
  const location = useLocation();
  const activity = location.state?.activity;
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    const fetchActivityDetail = async () => {
      try {
        const response = await getActivitiesDetail(id);
        console.log(response);
        setData(response.data);
        setRecommendation(response.data.recommendation);
      } catch (error) {
        console.error(error);
      }
    };
    fetchActivityDetail();
  }, [id]);

  if (!activity) {
    return (
      <Typography
        variant="h6"
        sx={{ textAlign: "center", mt: 4, color: "gray" }}
      >
        Loading activity details...
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
      {/* Activity Info Card */}
      <Card
        elevation={4}
        sx={{
          mb: 3,
          borderRadius: "16px",
          background: "linear-gradient(135deg, #fdfbfb, #ebedee)",
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 600, color: "#333" }}
          >
            Activity Details
          </Typography>

          <Stack spacing={2} sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <DirectionsRunIcon color="primary" />
              <Typography variant="body1">
                <b>Type:</b> {activity.type}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <TimerIcon color="secondary" />
              <Typography variant="body1">
                <b>Duration:</b> {activity.duration} minutes
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LocalFireDepartmentIcon sx={{ color: "orange" }} />
              <Typography variant="body1">
                <b>Calories Burned:</b> {activity.caloriesBurned}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <EventIcon color="action" />
              <Typography variant="body1">
                <b>Date:</b>{" "}
                {new Date(activity.createdAt).toLocaleString("en-IN")}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* AI Recommendation */}
      {recommendation && (
        <Card
          elevation={4}
          sx={{
            borderRadius: "16px",
            background: "linear-gradient(135deg, #f9f9f9, #f3f6ff)",
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: 600, color: "#333" }}
            >
              AI Recommendation
            </Typography>

            {/* Analysis */}
            <Typography variant="h6" sx={{ mt: 2, color: "#4e54c8" }}>
              Analysis
            </Typography>
            <Typography paragraph>{data.recommendation}</Typography>

            <Divider sx={{ my: 2 }} />

            {/* Improvements */}
            <Typography variant="h6" sx={{ color: "#4e54c8" }}>
              Improvements
            </Typography>
            {data?.improvements?.map((improvement, index) => (
              <Typography key={index} paragraph>
                • {improvement}
              </Typography>
            ))}

            <Divider sx={{ my: 2 }} />

            {/* Suggestions */}
            <Typography variant="h6" sx={{ color: "#4e54c8" }}>
              Suggestions
            </Typography>
            {data?.suggestions?.map((suggestion, index) => (
              <Typography key={index} paragraph>
                • {suggestion}
              </Typography>
            ))}

            <Divider sx={{ my: 2 }} />

            {/* Safety Guidelines */}
            <Typography variant="h6" sx={{ color: "#4e54c8" }}>
              Safety Guidelines
            </Typography>
            {data?.safety?.map((safety, index) => (
              <Typography key={index} paragraph>
                • {safety}
              </Typography>
            ))}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default ActivityDetail;
