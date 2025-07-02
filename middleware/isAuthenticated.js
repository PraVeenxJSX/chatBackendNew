import jwt from "jsonwebtoken";

const isAuthenticated = async(req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated."
            });
        }

        try {
            const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.id = decode.userId;
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token"
            });
        }
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export default isAuthenticated;

const req = {
    id:"",
}
req.id = "sdlbgnjdfn"