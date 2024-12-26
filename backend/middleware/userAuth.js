import jwt from 'jsonwebtoken';

// Login middleware - Authenticate admin 
const userAuth = async (req, res, next) => {
    try {
        // Retrieve access token from headers
        const { authorization } = req.headers;

        // Check if access token is provided
        if ( !authorization || !authorization.startsWith('Bearer') ) {
            return res.status(403).json({ message: "User not logged in - Please login again." });
        }

        const accessToken = authorization.split(' ')[1]; // Extract token

        // Verify JWT token
        const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);

        // Attach user information to request object for further use
        req.user = decodedToken;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error(error); // Log the error for debugging

        // Handle specific JWT errors
        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: 'Invalid token' });
        }

        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ message: 'Token has expired' });
        }

        // General error response
        res.status(500).json({ message: 'Error during authentication', error: error.message });
    }
};


export default userAuth;
