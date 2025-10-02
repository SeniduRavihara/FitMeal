'use client';

import { useState } from 'react';
import { 
  ClockIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  TruckIcon,
  EyeIcon,
  PencilIcon 
} from '@heroicons/react/24/outline';

const orders = [
  {
    id: 'ORD-001',
    customer: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    items: [
      { name: 'Grilled Chicken & Quinoa Bowl', quantity: 2, price: 14.99 },
      { name: 'Mediterranean Salmon', quantity: 1, price: 18.99 },
    ],
    total: 48.97,
    deliveryFee: 2.99,
    tax: 4.16,
    grandTotal: 56.12,
    status: 'delivered',
    paymentMethod: 'Visa **** 1234',
    deliveryAddress: '123 Main Street, San Francisco, CA 94102',
    orderDate: '2024-01-20T12:00:00',
    deliveryDate: '2024-01-20T18:15:00',
  },
  {
    id: 'ORD-002',
    customer: 'Sarah Wilson',
    email: 'sarah.wilson@email.com',
    items: [
      { name: 'Vegan Buddha Bowl', quantity: 2, price: 12.99 },
    ],
    total: 25.98,
    deliveryFee: 2.99,
    tax: 2.32,
    grandTotal: 31.29,
    status: 'preparing',
    paymentMethod: 'Mastercard **** 5678',
    deliveryAddress: '456 Oak Avenue, San Francisco, CA 94103',
    orderDate: '2024-01-20T14:30:00',
    deliveryDate: null,
  },
  {
    id: 'ORD-003',
    customer: 'Mike Chen',
    email: 'mike.chen@email.com',
    items: [
      { name: 'Keto Beef Bowl', quantity: 1, price: 16.99 },
      { name: 'Protein Smoothie', quantity: 2, price: 8.99 },
    ],
    total: 34.97,
    deliveryFee: 2.99,
    tax: 3.20,
    grandTotal: 41.16,
    status: 'confirmed',
    paymentMethod: 'Apple Pay',
    deliveryAddress: '789 Pine Street, San Francisco, CA 94104',
    orderDate: '2024-01-20T16:45:00',
    deliveryDate: null,
  },
];

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.5rem',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },
  filters: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  input: {
    display: 'block',
    width: '16rem',
    padding: '0.5rem 0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    color: '#111827',
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  },
  select: {
    display: 'block',
    padding: '0.5rem 0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    color: '#111827',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
  },
  tableContainer: {
    backgroundColor: 'white',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    borderRadius: '0.375rem',
    overflow: 'hidden',
  },
  table: {
    minWidth: '100%',
    borderCollapse: 'collapse' as const,
  },
  tableHeader: {
    backgroundColor: '#f9fafb',
  },
  tableHeaderCell: {
    padding: '0.75rem 1.5rem',
    textAlign: 'left' as const,
    fontSize: '0.75rem',
    fontWeight: '500',
    color: '#6b7280',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    borderBottom: '1px solid #e5e7eb',
  },
  tableRow: {
    borderBottom: '1px solid #e5e7eb',
  },
  tableCell: {
    padding: '1rem 1.5rem',
    fontSize: '0.875rem',
    color: '#111827',
    verticalAlign: 'top' as const,
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.25rem 0.5rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '500',
  },
  pendingBadge: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
  },
  confirmedBadge: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
  },
  preparingBadge: {
    backgroundColor: '#e0e7ff',
    color: '#3730a3',
  },
  deliveredBadge: {
    backgroundColor: '#dcfce7',
    color: '#166534',
  },
  cancelledBadge: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
  },
  iconButton: {
    padding: '0.25rem',
    color: '#6b7280',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: 'transparent',
    marginRight: '0.5rem',
  },
  customerInfo: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  customerName: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#111827',
  },
  customerEmail: {
    fontSize: '0.875rem',
    color: '#6b7280',
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.25rem',
  },
  item: {
    fontSize: '0.875rem',
    color: '#111827',
  },
  itemQuantity: {
    color: '#6b7280',
  },
  priceInfo: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  totalPrice: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#111827',
  },
  grandTotal: {
    fontSize: '0.75rem',
    color: '#6b7280',
  },
  dateInfo: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  orderDate: {
    fontSize: '0.875rem',
    color: '#111827',
  },
  deliveryDate: {
    fontSize: '0.75rem',
    color: '#6b7280',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
};

export default function OrderManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { style: styles.pendingBadge, icon: ClockIcon, text: 'Pending' },
      confirmed: { style: styles.confirmedBadge, icon: CheckCircleIcon, text: 'Confirmed' },
      preparing: { style: styles.preparingBadge, icon: ClockIcon, text: 'Preparing' },
      delivered: { style: styles.deliveredBadge, icon: TruckIcon, text: 'Delivered' },
      cancelled: { style: styles.cancelledBadge, icon: XCircleIcon, text: 'Cancelled' },
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span style={{ ...styles.badge, ...config.style }}>
        <Icon style={{ width: '0.75rem', height: '0.75rem', marginRight: '0.25rem' }} />
        {config.text}
      </span>
    );
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <div style={styles.container}>
      {/* Filters */}
      <div style={styles.header}>
        <div style={styles.filters}>
          <input
            type="text"
            placeholder="Search orders, customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.input}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={styles.select}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="preparing">Preparing</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead style={styles.tableHeader}>
            <tr>
              <th style={styles.tableHeaderCell}>Order ID</th>
              <th style={styles.tableHeaderCell}>Customer</th>
              <th style={styles.tableHeaderCell}>Items</th>
              <th style={styles.tableHeaderCell}>Total</th>
              <th style={styles.tableHeaderCell}>Status</th>
              <th style={styles.tableHeaderCell}>Order Date</th>
              <th style={styles.tableHeaderCell}>Delivery</th>
              <th style={styles.tableHeaderCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} style={styles.tableRow}>
                <td style={styles.tableCell}>
                  <div style={{ fontWeight: '500', color: '#2563eb' }}>
                    {order.id}
                  </div>
                </td>
                <td style={styles.tableCell}>
                  <div style={styles.customerInfo}>
                    <div style={styles.customerName}>{order.customer}</div>
                    <div style={styles.customerEmail}>{order.email}</div>
                  </div>
                </td>
                <td style={styles.tableCell}>
                  <div style={styles.itemsList}>
                    {order.items.map((item, index) => (
                      <div key={index} style={styles.item}>
                        {item.name} <span style={styles.itemQuantity}>x{item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </td>
                <td style={styles.tableCell}>
                  <div style={styles.priceInfo}>
                    <div style={styles.totalPrice}>{formatPrice(order.total)}</div>
                    <div style={styles.grandTotal}>
                      Total: {formatPrice(order.grandTotal)}
                    </div>
                  </div>
                </td>
                <td style={styles.tableCell}>
                  {getStatusBadge(order.status)}
                </td>
                <td style={styles.tableCell}>
                  <div style={styles.dateInfo}>
                    <div style={styles.orderDate}>
                      {formatDate(order.orderDate)}
                    </div>
                  </div>
                </td>
                <td style={styles.tableCell}>
                  <div style={styles.dateInfo}>
                    {order.deliveryDate ? (
                      <div style={styles.deliveryDate}>
                        {formatDate(order.deliveryDate)}
                      </div>
                    ) : (
                      <div style={{ ...styles.deliveryDate, fontStyle: 'italic' }}>
                        Pending
                      </div>
                    )}
                  </div>
                </td>
                <td style={styles.tableCell}>
                  <div style={styles.actions}>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      style={{ ...styles.iconButton, color: '#2563eb' }}
                      title="View Details"
                    >
                      <EyeIcon style={{ width: '1rem', height: '1rem' }} />
                    </button>
                    <button
                      onClick={() => console.log('Edit order:', order.id)}
                      style={{ ...styles.iconButton, color: '#7c3aed' }}
                      title="Edit Order"
                    >
                      <PencilIcon style={{ width: '1rem', height: '1rem' }} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredOrders.length === 0 && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '3rem 0',
          color: '#6b7280'
        }}>
          <ClockIcon style={{ width: '3rem', height: '3rem', marginBottom: '1rem' }} />
          <div style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '0.5rem' }}>
            No orders found
          </div>
          <div style={{ fontSize: '0.875rem' }}>
            Try adjusting your search or filter criteria
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div style={{
          position: 'fixed',
          inset: '0',
          backgroundColor: 'rgba(75, 85, 99, 0.5)',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            maxWidth: '32rem',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#111827',
              }}>
                Order Details - {selectedOrder.id}
              </h3>
              <button
                onClick={() => setSelectedOrder(null)}
                style={{
                  padding: '0.25rem',
                  color: '#6b7280',
                  cursor: 'pointer',
                  border: 'none',
                  backgroundColor: 'transparent',
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <h4 style={{ fontWeight: '500', marginBottom: '0.5rem' }}>Customer Information</h4>
                <p>{selectedOrder.customer}</p>
                <p style={{ color: '#6b7280' }}>{selectedOrder.email}</p>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  {selectedOrder.deliveryAddress}
                </p>
              </div>

              <div>
                <h4 style={{ fontWeight: '500', marginBottom: '0.5rem' }}>Order Items</h4>
                {selectedOrder.items.map((item, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0.5rem 0',
                    borderBottom: index < selectedOrder.items.length - 1 ? '1px solid #e5e7eb' : 'none',
                  }}>
                    <span>{item.name} x{item.quantity}</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div>
                <h4 style={{ fontWeight: '500', marginBottom: '0.5rem' }}>Payment Summary</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span>Subtotal:</span>
                  <span>{formatPrice(selectedOrder.total)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span>Delivery Fee:</span>
                  <span>{formatPrice(selectedOrder.deliveryFee)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span>Tax:</span>
                  <span>{formatPrice(selectedOrder.tax)}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: '600',
                  borderTop: '1px solid #e5e7eb',
                  paddingTop: '0.5rem',
                }}>
                  <span>Total:</span>
                  <span>{formatPrice(selectedOrder.grandTotal)}</span>
                </div>
              </div>

              <div>
                <h4 style={{ fontWeight: '500', marginBottom: '0.5rem' }}>Order Status</h4>
                {getStatusBadge(selectedOrder.status)}
                <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                  Payment Method: {selectedOrder.paymentMethod}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}