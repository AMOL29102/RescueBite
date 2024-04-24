import React, { useState,useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FormGroup,
  FormCheck,
} from "react-bootstrap";
import axios from "axios"; // Import axios
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/providerdetails.css"; // Import the CSS file

function BookingForm() {
  const [restoName, setRestoName] = useState("");
  const [veg, setVeg] = useState(false);
  const [nonVeg, setNonVeg] = useState(false);
  const [foodName, setFoodName] = useState("");
  const [peopleCount, setPeopleCount] = useState("");
  const [providerId, setProviderId] = useState("");

  useEffect(() => {
    fetchProviderId();
  }, []);

  const fetchProviderId = async () => {
    try {
      // Make a request to fetch the providerId (e.g., after sign up or login)
      const response = await axios.post("http://localhost:3001/provider_signup");
      // Assuming the response contains the providerId
      setProviderId(response.data.providerId);
      console.log("abcid", response.data.providerId);
    } catch (error) {
      console.error("Error fetching providerId:", error);
      // Handle error if needed
    }
  };

  const handleVegChange = (e) => {
    setVeg(e.target.checked);
    if (e.target.checked) {
      setNonVeg(false);
    }
  };

  const handleNonVegChange = (e) => {
    setNonVeg(e.target.checked);
    if (e.target.checked) {
      setVeg(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/provider_details", {
        restoName,
        veg,
        nonVeg,
        foodName,
        peopleCount,
        providerId
      });
      if (response.status === 201) {
        alert("Booking submitted successfully");
        setRestoName("");
        setVeg(false);
        setNonVeg(false);
        setFoodName("");
        setPeopleCount("");
      }
      else {
        alert("Failed to submit booking");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit booking catch");
    }
  };

  return (
    <div id="booking" className="section">
      <div className="section-center">
        <Container>
          <Row>
            <Col md={{ span: 7, order: 2 }} xs={{ span: 12, order: 1 }}>
              <div className="booking-cta">
                <h1>Add Leftover Food Details</h1>
                <p>
                
                Help Reduce Food Waste
                Thank you for participating in our initiative to reduce food waste! Please fill out the details of the leftover food you have available.
                </p>
              </div>
            </Col>
            <Col md={{ span: 4, order: 1 }} xs={{ span: 12, order: 2 }}>
              <div className="booking-form">
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label>Restaurant Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter restaurant name"
                      value={restoName}
                      onChange={(e) => setRestoName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Food Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter food name"
                      value={foodName}
                      onChange={(e) => setFoodName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>People Count</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter number of people"
                      value={peopleCount}
                      onChange={(e) => setPeopleCount(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <FormGroup>
                      <Row>
                        <Col>
                          <FormCheck>
                            <FormCheck.Input
                              type="checkbox"
                              checked={veg}
                              onChange={handleVegChange}
                            />
                            <FormCheck.Label>Vegetarian</FormCheck.Label>
                          </FormCheck>
                        </Col>
                        <Col>
                          <FormCheck>
                            <FormCheck.Input
                              type="checkbox"
                              checked={nonVeg}
                              onChange={handleNonVegChange}
                            />
                            <FormCheck.Label>Non-Vegetarian</FormCheck.Label>
                          </FormCheck>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Form.Group>
                  <div className="text-center">
                    <Button variant="primary" type="submit">
                      Add Request
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default BookingForm;
