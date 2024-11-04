export const loadAuth = (req, res) => {
    res.render('auth');
};

export const successGoogleLogin = (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,
        });
    }
};

export const failureGoogleLogin = (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure",
    });
};
