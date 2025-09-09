import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router";
import { getActivities } from "../services/api";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import PedalBikeIcon from "@mui/icons-material/PedalBike";

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  const fetchActivities = async () => {
    try {
      const response = await getActivities();
      setActivities(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  // Function to return icon based on type
  const getActivityIcon = (type) => {
    switch (type) {
      case "RUNNING":
        return <DirectionsRunIcon sx={{ fontSize: 40, color: "#4e54c8" }} />;
      case "WALKING":
        return <DirectionsWalkIcon sx={{ fontSize: 40, color: "#28a745" }} />;
      case "CYCLING":
        return <PedalBikeIcon sx={{ fontSize: 40, color: "#f39c12" }} />;
      default:
        return null;
    }
  };

  return (
    <Grid container spacing={3}>
      {activities.map((activity) => (
        <Grid item xs={12} sm={6} md={4} key={activity.id}>
          <Card
            elevation={4}
            sx={{
              cursor: "pointer",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #fdfbfb, #ebedee)",
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
              },
            }}
            onClick={() =>
              navigate(`/activities/${activity.id}`, { state: { activity } })
            }
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Box sx={{ mb: 2 }}>{getActivityIcon(activity.type)}</Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: "#333" }}>
                {activity.type}
              </Typography>
              <Typography sx={{ color: "gray", mt: 1 }}>
                ⏱ Duration: {activity.duration} mins
              </Typography>
              <Typography sx={{ color: "gray" }}>
                🔥 Calories: {activity.caloriesBurned}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ActivityList;
