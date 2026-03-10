import Token from "../model/tokenSchema.js";

const generateToken = async (req, res) => {
  const { shopId } = req.user;

  try {
    if (!shopId) {
      return res.status(400).json({ message: "Shop ID is required" });
    }

    // Format today's date as YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];

    // Find or create a token document for today
    let tokenDoc = await Token.findOne({ shopId, date: today });

    if (!tokenDoc) {
      tokenDoc = new Token({ shopId, date: today, currentToken: 1 });
    } else {
      tokenDoc.currentToken += 1;
    }

    await tokenDoc.save();

    const formattedToken = `TKN-${tokenDoc.currentToken.toString().padStart(4, '0')}`;

    return res.status(200).json({
      message: 'Token generated',
      token: formattedToken,
      tokenNumber: tokenDoc.currentToken,
    });

  } catch (error) {
    console.error("Token generation error:", error);
    return res.status(500).json({
      message: "Error occurred during token generation",
      data: error.message,
    });
  }
};

export { generateToken };
