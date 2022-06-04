const Order = require("../models/Order");

async function orderSave(orderObj, customer) {
    try {
        const orderItems = []
        Object.keys(orderObj.items).map(key => orderObj.items[key].items.map(item => orderItems.push({ item: `${item.name} ${item.variantName} ${item.dough !== null && item.dough + ' тесто'}`, price: item.price })))

        const lastOrder = await Order.find({}).sort({ orderId: -1 });

        let orderNumberedIdNew = 0;
        if (lastOrder.length > 0) {
            orderNumberedIdNew = lastOrder[0].orderId + 1;
        }

        const order = new Order({
            customerName: customer.name,
            customerAddress: customer.address,
            orderObj: orderItems,
            orderComment: customer.comment,
            orderId: orderNumberedIdNew
        });
        await order.save();
        return orderNumberedIdNew
    } catch (error) {
        console.log(`Error with saving order to database ${error}`)
    }



}

module.exports = { orderSave };