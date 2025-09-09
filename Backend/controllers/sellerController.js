import User from '../models/userModel.js';

const applySeller = async (req, res) => {
    const { storeName, phone } = req.body;
    const user = await User.findById(req.user.id);

    if (user) {
        user.role = 'seller';
        user.sellerDetails.storeName = storeName || user.sellerDetails.storeName;
        user.sellerDetails.phone = phone || user.sellerDetails.phone;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            sellerDetails: updatedUser.sellerDetails,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

export { applySeller };