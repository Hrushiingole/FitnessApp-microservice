import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { addActivity } from "../services/api";

const ActivityForm = ({ onActivityAdded }) => {
  const [activity, setActivity] = useState({
    type: "RUNNING",
    duration: "",
    caloriesBurned: "",
    additionalMetrics: {},
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addActivity(activity);
      onActivityAdded();
      setActivity({ type: "RUNNING", duration: "", caloriesBurned: "" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card
      elevation={4}
      sx={{
        borderRadius: "16px",
        p: 2,
        mb: 4,
        background: "linear-gradient(135deg, #f9f9f9, #f3f6ff)",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{ mb: 3, fontWeight: 600, textAlign: "center", color: "#333" }}
        >
          Add New Activity
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <FormControl fullWidth>
            <InputLabel>Activity Type</InputLabel>
            <Select
              value={activity.type}
              onChange={(e) =>
                setActivity({ ...activity, type: e.target.value })
              }
              sx={{ borderRadius: "12px" }}
            >
              <MenuItem value="RUNNING">🏃 Running</MenuItem>
              <MenuItem value="WALKING">🚶 Walking</MenuItem>
              <MenuItem value="CYCLING">🚴 Cycling</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Duration (Minutes)"
            type="number"
            value={activity.duration}
            onChange={(e) =>
              setActivity({ ...activity, duration: e.target.value })
            }
            sx={{ borderRadius: "12px" }}
          />

          <TextField
            fullWidth
            label="Calories Burned"
            type="number"
            value={activity.caloriesBurned}
            onChange={(e) =>
              setActivity({ ...activity, caloriesBurned: e.target.value })
            }
            sx={{ borderRadius: "12px" }}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              py: 1.2,
              borderRadius: "12px",
              fontWeight: 600,
              fontSize: "1rem",
              textTransform: "none",
              background: "linear-gradient(135deg, #4e54c8, #8f94fb)",
              transition: "0.3s",
              "&:hover": {
                background: "linear-gradient(135deg, #434190, #667eea)",
                transform: "scale(1.03)",
              },
            }}
          >
            ➕ Add Activity
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ActivityForm;
