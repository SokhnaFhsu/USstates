const fs = require('fs');
const path = require('path');
const jsonFilePath = path.join(__dirname, '..', '..', 'data', 'states.json');

// Function to load state data from the JSON file
function loadStateData() {
    try {
        const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.error("Failed to load state data:", error);
        return []; 
    }
}

const statesData = loadStateData();

// Get all states
exports.getAllStates = (req, res) => {
  res.json(statesData);
};

// Get specific state details
exports.getStateDetails = (req, res) => {
  const stateCode = req.params.state.toUpperCase();
  const state = statesData.find(s => s.stateCode === stateCode);
  if (state) {
      res.json(state);
  } else {
      res.status(404).json({ error: "State not found" });
  }
};

// Add a fun fact to a state
exports.addFunFact = (req, res) => {
  const stateCode = req.params.state.toUpperCase();
  const funFact = req.body.funfact;

  const state = statesData.find(s => s.stateCode === stateCode);
  if (state) {
      if (!state.funfacts) {
          state.funfacts = [];
      }
      if (funFact) {
          state.funfacts.push(funFact);
          res.json({ message: "Fun fact added", state });
      } else {
          res.status(400).json({ error: "No fun fact provided" });
      }
  } else {
      res.status(404).json({ error: "State not found" });
  }
};

// Update a fun fact
exports.updateFunFact = (req, res) => {
  const stateCode = req.params.state.toUpperCase();
  const { index, funfact } = req.body;

  const state = statesData.find(s => s.stateCode === stateCode);
  if (state && state.funfacts && index < state.funfacts.length && index >= 0) {
      state.funfacts[index] = funfact;
      res.json({ message: "Fun fact updated", state });
  } else {
      res.status(404).json({ error: "Fun fact not found" });
  }
};

// Delete a fun fact
exports.deleteFunFact = (req, res) => {
  const stateCode = req.params.state.toUpperCase();
  const { index } = req.body;

  const state = statesData.find(s => s.stateCode === stateCode);
  if (state && state.funfacts && index < state.funfacts.length && index >= 0) {
      state.funfacts.splice(index, 1);
      res.json({ message: "Fun fact deleted", state });
  } else {
      res.status(404).json({ error: "Fun fact not found" });
  }
};