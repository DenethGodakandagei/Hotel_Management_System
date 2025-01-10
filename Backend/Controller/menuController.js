import MenuItem from '../Model/MenuItems.js';
import cloudinary from '../config/cloudinaryConfig.js';

export const createMenuItem = async (req, res) => {
    try {
      const { name, description, price, category } = req.body;
      const imageLinks = [];
  
      // Ensure req.files is populated
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No images uploaded' });
      }
  
      // Upload all images to Cloudinary
      for (let i = 0; i < req.files.length; i++) {
        try {
          const result = await cloudinary.uploader.upload(req.files[i].path);
          imageLinks.push(result.secure_url); // Store Cloudinary image URL
        } catch (cloudinaryError) {
          console.error('Cloudinary upload error:', cloudinaryError);
          return res.status(500).json({ error: 'Error uploading images to Cloudinary' });
        }
      }
  
      const newItem = new MenuItem({
        name,
        description,
        price,
        category,
        imageUrls: imageLinks,
      });
  
      await newItem.save();
      res.status(201).json({ message: 'Menu item created successfully', newItem });
    } catch (error) {
      console.error('Error creating menu item:', error);
      res.status(400).json({ error: 'Error creating menu item' });
    }
  };
// Get all menu items
export const getAllMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching menu items' });
  }
};

// Update a menu item
export const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, imageUrl, category } = req.body;

    const updatedItem = await MenuItem.findByIdAndUpdate(id, {
      name, description, price, imageUrl, category
    }, { new: true });

    if (!updatedItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    res.status(200).json({ message: 'Menu item updated successfully', updatedItem });
  } catch (error) {
    res.status(400).json({ error: 'Error updating menu item' });
  }
};

// Delete a menu item
export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await MenuItem.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting menu item' });
  }
};
