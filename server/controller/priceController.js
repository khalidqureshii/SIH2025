import axios from "axios";

export const getCommodityPrice = async (req, res) => {
  try {
    const { state, district, commodity } = req.query;

    if (!state || !district || !commodity) {
      return res.status(400).json({
        error: "Missing required query params: state, district, commodity",
      });
    }

    // API endpoint for Variety-wise Daily Market Prices
    const url =
      "https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24";

    const params = {
      "api-key": process.env.DATA_GOV_API_KEY, // store your key in .env
      format: "json",
      limit: 50,
      "filters[State]": state,
      "filters[District]": district,
      "filters[Commodity]": commodity,
    };

    const response = await axios.get(url, { params });

    if (
      !response.data ||
      !response.data.records ||
      response.data.records.length === 0
    ) {
      return res.status(404).json({
        error: "No price data found for given filters",
      });
    }

    // Format the response
    const results = response.data.records.map((record) => ({
      state: record.State,
      district: record.District,
      market: record.Market,
      commodity: record.Commodity,
      variety: record.Variety,
      grade: record.Grade,
      arrival_date: record.Arrival_Date,
      min_price: record.Min_Price,
      max_price: record.Max_Price,
      modal_price: record.Modal_Price,
    }));

    res.json(results);
  } catch (err) {
    console.error("Error fetching commodity price:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
