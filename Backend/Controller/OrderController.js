import Order from '../Model/Orders.js';
import MenuItem from '../Model/MenuItems.js';

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { userId, items, shippingAddress } = req.body;

    // Fetch the menu items based on item IDs
    const menuItems = await MenuItem.find({ '_id': { $in: items.map(item => item.menuItemId) } });

    if (menuItems.length !== items.length) {
      return res.status(404).json({ message: 'Some menu items not found' });
    }

    let totalAmount = 0;

    // Calculate total price for each item and total order amount
    const updatedItems = items.map(item => {
      const menuItem = menuItems.find(mItem => mItem._id.toString() === item.menuItemId);
      const totalPrice = menuItem.price * item.quantity;
      totalAmount += totalPrice;

      return {
        menuItemId: menuItem._id,
        quantity: item.quantity,
        price: menuItem.price,
        totalPrice,
      };
    });

    const newOrder = new Order({
      userId,
      items: updatedItems,
      totalAmount,
      shippingAddress,
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating order' });
  }
};

// Get all orders for a user
export const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).populate('items.menuItemId');
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    order.updatedAt = Date.now();

    await order.save();
    res.status(200).json({ message: 'Order status updated', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating order status' });
  }
};
