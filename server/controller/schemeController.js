import axios from "axios";

export const getSchemesByState = async (req, res) => {
  try {
    // Use query param instead of route param
    const state = req.query.state || "All";

    // Build the query parameter properly

    const url = `https://api.myscheme.gov.in/search/v5/schemes?lang=en&q=%5B%7B%22identifier%22%3A%22beneficiaryState%22%2C%22value%22%3A%22All%22%7D%2C%7B%22identifier%22%3A%22beneficiaryState%22%2C%22value%22%3A%22${state}%22%7D%2C%7B%22identifier%22%3A%22schemeCategory%22%2C%22value%22%3A%22Agriculture%2CRural%20%26%20Environment%22%7D%5D&keyword=&sort=&from=0&size=10`;


    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "X-Api-Key": process.env.MYSCHEME_API_KEY,
        Origin: "https://www.myscheme.gov.in",
      },
    });

    // Send response back
    res.status(200).json(response.data);
  } catch (error) {
    // Better error logging
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      res.status(error.response.status).json({
        error: "Failed to fetch schemes",
        details: error.response.data,
      });
    } else {
      console.error(error.message);
      res.status(500).json({ error: "Failed to fetch schemes" });
    }
  }
};
