// Location Controller - States and LGAs for North-West Nigeria
const statesAndLGAs = {
  "Kano": [
    "Ajingi", "Albasu", "Bagwai", "Bebeji", "Bichi", "Bunkure", "Dala", 
    "Dambatta", "Dawakin Kudu", "Dawakin Tofa", "Doguwa", "Fagge", "Gabasawa", 
    "Garko", "Garun Mallam", "Gaya", "Gezawa", "Gwale", "Gwarzo", "Kabo", 
    "Kano Municipal", "Karaye", "Kibiya", "Kiru", "Kumbotso", "Kunchi", "Kura", 
    "Madobi", "Makoda", "Minjibir", "Nassarawa", "Rano", "Rimin Gado", 
    "Rogo", "Shanono", "Sumaila", "Takai", "Tarauni", "Tofa", "Tsanyawa", 
    "Tudun Wada", "Ungogo", "Warawa", "Wudil"
  ],
  "Kaduna": [
    "Birnin Gwari", "Chikun", "Giwa", "Igabi", "Ikara", "Jaba", "Jema'a", 
    "Kachia", "Kaduna North", "Kaduna South", "Kagarko", "Kajuru", "Kaura", 
    "Kauru", "Kubau", "Kudan", "Lere", "Makarfi", "Sabon Gari", "Sanga", 
    "Soba", "Zangon Kataf", "Zaria"
  ],
  "Katsina": [
    "Bakori", "Batagarawa", "Batsari", "Baure", "Bindawa", "Charanchi", 
    "Dandume", "Danja", "Dan Musa", "Daura", "Dutsi", "Dutsin Ma", "Faskari", 
    "Funtua", "Ingawa", "Jibia", "Kafur", "Kaita", "Kankara", "Kankia", 
    "Katsina", "Kurfi", "Kusada", "Mai'Adua", "Malumfashi", "Mani", "Mashi", 
    "Matazu", "Musawa", "Rimi", "Sabuwa", "Safana", "Sandamu", "Zango"
  ],
  "Jigawa": [
    "Auyo", "Babura", "Biriniwa", "Birnin Kudu", "Buji", "Dutse", "Gagarawa", 
    "Garki", "Gumel", "Guri", "Gwaram", "Gwiwa", "Hadejia", "Jahun", "Kafin Hausa", 
    "Kaugama", "Kazaure", "Kiri Kasama", "Kiyawa", "Maigatari", "Malam Madori", 
    "Miga", "Ringim", "Roni", "Sule Tankarkar", "Taura", "Yankwashi"
  ],
  "Kebbi": [
    "Aleiro", "Arewa Dandi", "Argungu", "Augie", "Bagudo", "Birnin Kebbi", 
    "Bunza", "Dandi", "Fakai", "Gwandu", "Jega", "Kalgo", "Koko/Besse", 
    "Maiyama", "Ngaski", "Sakaba", "Shanga", "Suru", "Wasagu/Danko", 
    "Yauri", "Zuru"
  ],
  "Sokoto": [
    "Binji", "Bodinga", "Dange Shuni", "Gada", "Goronyo", "Gudu", "Gwadabawa", 
    "Illela", "Isa", "Kebbe", "Kware", "Rabah", "Sabon Birni", "Shagari", 
    "Silame", "Sokoto North", "Sokoto South", "Tambuwal", "Tangaza", "Tureta", 
    "Wamako", "Wurno", "Yabo"
  ],
  "Zamfara": [
    "Anka", "Bakura", "Birnin Magaji/Kiyaw", "Bukkuyum", "Bungudu", "Gummi", 
    "Gusau", "Kaura Namoda", "Maradun", "Maru", "Shinkafi", "Talata Mafara", 
    "Tsafe", "Zurmi"
  ]
};

// Get all states
exports.getStates = async (req, res) => {
  try {
    const states = Object.keys(statesAndLGAs).sort();
    
    res.status(200).json({
      success: true,
      message: "States retrieved successfully",
      data: states
    });
  } catch (error) {
    console.error('Error fetching states:', error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve states",
      error: {
        statusCode: 500,
        message: error.message
      }
    });
  }
};

// Get LGAs by state
exports.getLGAs = async (req, res) => {
  try {
    const { state } = req.query;
    
    if (!state) {
      return res.status(400).json({
        success: false,
        message: "State parameter is required",
        error: {
          statusCode: 400,
          message: "Please provide a state parameter"
        }
      });
    }
    
    const lgas = statesAndLGAs[state];
    
    if (!lgas) {
      return res.status(404).json({
        success: false,
        message: "State not found",
        error: {
          statusCode: 404,
          message: `No LGAs found for state: ${state}`
        }
      });
    }
    
    res.status(200).json({
      success: true,
      message: "LGAs retrieved successfully",
      data: {
        state,
        lgas: lgas.sort()
      }
    });
  } catch (error) {
    console.error('Error fetching LGAs:', error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve LGAs",
      error: {
        statusCode: 500,
        message: error.message
      }
    });
  }
};

// Get all states with their LGAs
exports.getAllStatesWithLGAs = async (req, res) => {
  try {
    const formattedData = Object.entries(statesAndLGAs).map(([state, lgas]) => ({
      state,
      lgas: lgas.sort(),
      lgaCount: lgas.length
    })).sort((a, b) => a.state.localeCompare(b.state));
    
    res.status(200).json({
      success: true,
      message: "All states and LGAs retrieved successfully",
      data: formattedData
    });
  } catch (error) {
    console.error('Error fetching states and LGAs:', error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve states and LGAs",
      error: {
        statusCode: 500,
        message: error.message
      }
    });
  }
};
