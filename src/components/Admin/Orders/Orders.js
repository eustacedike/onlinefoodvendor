import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./orders.module.css";
import { useState, useEffect } from "react";

import Blank from "../../Loading/Blank";

import { updateOrderStatus } from "@/actions/orders";

export default function AdminOrders({ orders }) {
    // console.log(orders[1]);

    const router = useRouter();

    const [filteredOrders, setFilteredOrders] = useState([]);
    const [statusFilter, setStatusFilter] = useState("All");
    const [dateFilter, setDateFilter] = useState("");
    const [orderStatuses, setOrderStatuses] = useState({});
    const [saving, setSaving] = useState({});

    useEffect(() => {
        let updated = [...orders];

        if (statusFilter !== "All") {
            updated = updated.filter(order => order.status === statusFilter);
        }

        if (dateFilter) {
            updated = updated.filter(order => {
                const orderDate = order.created_at.split('T')[0];
                return orderDate === dateFilter;
            });
        }

        setFilteredOrders(updated);
        
        // Initialize order statuses
        const initialStatuses = {};
        updated.forEach(order => {
            initialStatuses[order.six_digit_id] = order.status;
        });
        setOrderStatuses(initialStatuses);
    }, [orders, statusFilter, dateFilter]);

    const handleStatusChange = (orderId, newStatus) => {
        setOrderStatuses(prev => ({
            ...prev,
            [orderId]: newStatus
        }));
    };

    const handleSaveStatus = async (order) => {
        const newStatus = orderStatuses[order.six_digit_id];
        
        if (newStatus === order.status) {
            return; // No change needed
        }

        setSaving(prev => ({ ...prev, [order.six_digit_id]: true }));

        try {
            await updateOrderStatus(order.ref, newStatus);
            
            // Update the order in the original orders array
            const updatedOrders = orders.map(o => 
                o.six_digit_id === order.six_digit_id 
                    ? { ...o, status: newStatus }
                    : o
            );
            
            // You might want to call a parent function to update the orders state
            // or trigger a re-fetch of the data
            
            console.log(`Order ${order.six_digit_id} status updated to ${newStatus}`);
            
        } catch (error) {
            console.error('Error updating order status:', error);
            // Reset the status back to original on error
            setOrderStatuses(prev => ({
                ...prev,
                [order.six_digit_id]: order.status
            }));
        } finally {
            setSaving(prev => ({ ...prev, [order.six_digit_id]: false }));
        }
    };

    return (
        <div className={styles.ordersContainer}>
            <div className={styles.filter}>
                <div className={styles.statusFilter}>
                    {["All", "processing", "enroute", "delivered"].map((status) => (
                        <button
                            key={status}
                            className={`${styles.filterBtn} ${statusFilter === status ? styles.filterBtnActive : ""
                                }`}
                            onClick={() => setStatusFilter(status)}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                <div className={styles.dateFilter}>
                    <input type="date" onChange={(e) => setDateFilter(e.target.value)} />
                    <button
                        className={styles.showAllBtn}
                        onClick={() => {
                            setStatusFilter("All");
                            setDateFilter("");
                        }}
                    >
                        Show all
                    </button>
                </div>
            </div>

            {filteredOrders.length === 0 ? (
                <Blank content="Nothing to show here" imgSrc={null} />
            ) : (
                <table className={styles.orderTable}>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order) => (
                            <tr key={order.six_digit_id}>
                                <td>{order.six_digit_id}</td>
                                <td>
                                    {new Date(order.created_at).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                    }).replace(/ /g, '-')}
                                </td>
                                <td>₦{Intl.NumberFormat('en-US').format(order.subtotal + order.delivery + order.vat)}</td>
                                <td
                                    style={{
                                        color: "white",
                                        backgroundColor: 
                                            orderStatuses[order.six_digit_id] === "delivered" ? "limegreen" :
                                            orderStatuses[order.six_digit_id] === "enroute" ? "orange" : "black"
                                    }}
                                >
                                    <select 
                                        className={styles.statusSelect}
                                        value={orderStatuses[order.six_digit_id] || order.status}
                                        onChange={(e) => handleStatusChange(order.six_digit_id, e.target.value)}
                                    >
                                        <option value="processing">Processing</option>
                                        <option value="enroute">En Route</option>
                                        <option value="delivered">Delivered</option>
                                    </select>
                                </td>
                                <td>
                                    <button
                                        className={styles.viewBtn}
                                        style={{ 
                                            background: orderStatuses[order.six_digit_id] === order.status ? "gray" : "limegreen"
                                        }}
                                        onClick={() => handleSaveStatus(order)}
                                        disabled={saving[order.six_digit_id] || orderStatuses[order.six_digit_id] === order.status}
                                    >
                                        {saving[order.six_digit_id] ? "Saving..." : "Save"}
                                    </button>
                                </td>
                                <td>
                                    <Link href={`/orders/${order.ref}`}>
                                        <button className={styles.viewBtn}>View</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}