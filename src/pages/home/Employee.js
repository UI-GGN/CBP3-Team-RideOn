import React, {useState} from "react";
import logoImage from "../../assets/Logo.svg";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useAuth0} from "@auth0/auth0-react";
import Box from "@mui/material/Box";

function Employee() {
  const {user} = useAuth0();
  const msg = `Hello ${user?.given_name},`;

  const [isOpen, setOpen] = useState(true);
  const [pickupLocation, setPickupLocation] = React.useState("");
  const [projectCode, setProjectCode] = React.useState("");
  const [pickupLocationErrorText, setPickupLocationErrorText] = React.useState("");
  const [projectCodeErrorText, setProjectCodeErrorText] = React.useState("");
  const [dropLocation, setDropLocation] = React.useState("");
  const [dropLocationErrorText, setDropLocationErrorText] = React.useState("");

  const onSubmit = e => {
    e.preventDefault();

    if (!pickupLocation) {
      setPickupLocationErrorText("Please enter pickup location");
    } else {
      setPickupLocationErrorText("");
    }
    if (!projectCode) {
      setProjectCodeErrorText("Please enter project code");
    } else {
      setProjectCodeErrorText("");
    }
    if (!dropLocation) {
      setDropLocationErrorText("Please enter drop location");
    } else {
      setDropLocationErrorText("");
    }
  };

  return (
    <>
        <img src={logoImage} className="logo"/>
      <h4 style={{
        color: "rgba(0, 0, 0, 0.60)",
        marginTop: "70px",
        marginLeft: "90px",
        fontSize: "24px",
        fontFamily: "Roboto",
        fontWeight: 500,
        lineHeight: "20px",
        letterSpacing: "0.5px"
      }}>{msg}</h4>
      <Box sx={{marginLeft: "90px"}}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={() => setOpen(!isOpen)}
        >
            <Typography>
              {isOpen
                ? "Planning an upcoming travel, create your travel request here"
                : "Fill the form to create a new travel request"}
              </Typography>
        </AccordionSummary>
        <AccordionDetails onFocus={() => setOpen(false)}>
          <Typography>
            <FormControl className="form-control-container">
              <div>
                <TextField
                 variant="standard"
                  type="text"
                  required
                  placeholder="Project Code"
                  id="projectCode"
                  name="projectCode"
                  className="text-field"
                  value={projectCode}
                  error={!!projectCodeErrorText}
                  helperText={projectCodeErrorText}
                  onChange={e => setProjectCode(e.target.value)}
                />
                <Input
                  type="text"
                  required
                  className="text-field"
                  placeholder="Pickup Time"
                  name="Pickup Time"
                />
              </div>
              <div>
               <TextField
                  variant="standard"
                  type="text"
                  required
                  placeholder="Pickup Location"
                  id="pickupLocation"
                  className="text-field"
                  name="pickupLocation"
                  value={pickupLocation}
                  error={!!pickupLocationErrorText}
                  helperText={pickupLocationErrorText}
                  onChange={e => setPickupLocation(e.target.value)}
              />
                <TextField
                    variant="standard"
                    type="text"
                    required
                    className="text-field"
                    placeholder="Drop Location"
                    id="dropLocation"
                    name="dropLocation"
                    value={dropLocation}
                    error={!!dropLocationErrorText}
                    helperText={dropLocationErrorText}
                    onChange={e => setDropLocation(e.target.value)}
                />
              </div>
              <Button variant="contained" size="large" onClick={onSubmit}>
                Submit Request
              </Button>
            </FormControl>
          </Typography>
        </AccordionDetails>
      </Accordion>
      </Box>
    </>
  );
}

export default Employee;
