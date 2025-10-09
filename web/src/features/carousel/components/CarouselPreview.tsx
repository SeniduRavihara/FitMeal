'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';

type CarouselPreviewProps = {
  item: any;
  onClose: () => void;
};

const styles = {
  overlay: {
    position: 'fixed' as const,
    inset: '0',
    backgroundColor: 'rgba(75, 85, 99, 0.75)',
    overflowY: 'auto' as const,
    height: '100%',
    width: '100%',
    zIndex: 50,
  },
  modal: {
    position: 'relative' as const,
    top: '5rem',
    margin: '0 auto',
    padding: '1.25rem',
    border: '1px solid #e5e7eb',
    width: '91.666667%',
    maxWidth: '32rem',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    borderRadius: '0.375rem',
    backgroundColor: 'white',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '1.125rem',
    fontWeight: '500',
    color: '#111827',
  },
  closeButton: {
    color: '#9ca3af',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: 'transparent',
    padding: '0.25rem',
  },
  content: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.5rem',
  },
  section: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  sectionTitle: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#111827',
    marginBottom: '0.75rem',
  },
  mobileContainer: {
    backgroundColor: '#f3f4f6',
    padding: '1rem',
    borderRadius: '0.5rem',
  },
  mobileScreen: {
    margin: '0 auto',
    width: '20rem',
    backgroundColor: 'white',
    borderRadius: '1rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
  },
  statusBar: {
    backgroundColor: 'black',
    height: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBarIndicator: {
    width: '4rem',
    height: '0.25rem',
    backgroundColor: 'white',
    borderRadius: '9999px',
  },
  appHeader: {
    padding: '1rem',
    backgroundColor: '#f9fafb',
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },
  headerText: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  headerTitle: {
    height: '1rem',
    backgroundColor: '#d1d5db',
    borderRadius: '0.25rem',
    width: '8rem',
    marginBottom: '0.5rem',
  },
  headerSubtitle: {
    height: '0.75rem',
    backgroundColor: '#e5e7eb',
    borderRadius: '0.25rem',
    width: '6rem',
  },
  headerIcon: {
    width: '2rem',
    height: '2rem',
    backgroundColor: '#f97316',
    borderRadius: '9999px',
  },
  searchBar: {
    height: '2.5rem',
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    border: '1px solid #e5e7eb',
  },
  carouselContainer: {
    padding: '1rem',
  },
  carouselItem: {
    borderRadius: '1rem',
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '7.5rem',
  },
  carouselContent: {
    flex: '1',
    paddingRight: '1rem',
  },
  carouselTitle: {
    fontSize: '1.125rem',
    fontWeight: 'bold',
    marginBottom: '0.25rem',
  },
  carouselSubtitle: {
    fontSize: '0.875rem',
    opacity: 0.9,
    marginBottom: '0.25rem',
  },
  carouselDescription: {
    fontSize: '0.75rem',
    opacity: 0.75,
    marginBottom: '0.75rem',
  },
  carouselPrice: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.5rem',
  },
  carouselPriceMain: {
    fontSize: '1.125rem',
    fontWeight: 'bold',
  },
  carouselPriceOriginal: {
    fontSize: '0.875rem',
    textDecoration: 'line-through',
    opacity: 0.75,
  },
  carouselDiscount: {
    display: 'inline-block',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.25rem',
    fontSize: '0.75rem',
    fontWeight: '500',
  },
  carouselImage: {
    width: '5rem',
    height: '5rem',
    flexShrink: 0,
    borderRadius: '0.75rem',
    objectFit: 'cover' as const,
  },
  bottomPadding: {
    height: '5rem',
    backgroundColor: '#f9fafb',
  },
  detailsSection: {
    backgroundColor: '#f9fafb',
    padding: '1rem',
    borderRadius: '0.5rem',
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    fontSize: '0.875rem',
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  detailLabel: {
    fontWeight: '500',
    color: '#111827',
  },
  detailValue: {
    color: '#374151',
  },
  colorSwatch: {
    display: 'flex',
    alignItems: 'center',
  },
  colorBox: {
    width: '1rem',
    height: '1rem',
    borderRadius: '0.25rem',
    marginRight: '0.5rem',
    border: '1px solid #e5e7eb',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.25rem 0.5rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '500',
  },
  activeBadge: {
    backgroundColor: '#dcfce7',
    color: '#166534',
  },
  inactiveBadge: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
  },
  scheduleSection: {
    backgroundColor: '#f9fafb',
    padding: '1rem',
    borderRadius: '0.5rem',
  },
  scheduleGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    fontSize: '0.875rem',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '1.5rem',
  },
  closeButtonAction: {
    padding: '0.5rem 1rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.375rem',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
    backgroundColor: 'white',
    cursor: 'pointer',
  },
};

export default function CarouselPreview({ item, onClose }: CarouselPreviewProps) {
  if (!item) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h3 style={styles.title}>
            Carousel Item Preview
          </h3>
          <button
            onClick={onClose}
            style={styles.closeButton}
          >
            <XMarkIcon style={{ height: '1.5rem', width: '1.5rem' }} />
          </button>
        </div>

        <div style={styles.content}>
          {/* Mobile Preview */}
          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Mobile View</h4>
            <div style={styles.mobileContainer}>
              {/* Simulated mobile screen */}
              <div style={styles.mobileScreen}>
                {/* Status bar simulation */}
                <div style={styles.statusBar}>
                  <div style={styles.statusBarIndicator}></div>
                </div>
                
                {/* App header simulation */}
                <div style={styles.appHeader}>
                  <div style={styles.headerContent}>
                    <div style={styles.headerText}>
                      <div style={styles.headerTitle}></div>
                      <div style={styles.headerSubtitle}></div>
                    </div>
                    <div style={styles.headerIcon}></div>
                  </div>
                  
                  {/* Search bar simulation */}
                  <div style={styles.searchBar}></div>
                </div>

                {/* Carousel item */}
                <div style={styles.carouselContainer}>
                  <div 
                    style={{
                      ...styles.carouselItem,
                      backgroundColor: item.backgroundColor,
                      color: item.textColor 
                    }}
                  >
                    <div style={styles.carouselContent}>
                      <h3 style={styles.carouselTitle}>
                        {item.title}
                      </h3>
                      <p style={styles.carouselSubtitle}>
                        {item.subtitle}
                      </p>
                      <p style={styles.carouselDescription}>
                        {item.description}
                      </p>
                      <div style={styles.carouselPrice}>
                        <span style={styles.carouselPriceMain}>
                          ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price || '0.00'}
                        </span>
                        {item.originalPrice && (
                          <span style={styles.carouselPriceOriginal}>
                            ${typeof item.originalPrice === 'number' ? item.originalPrice.toFixed(2) : item.originalPrice}
                          </span>
                        )}
                      </div>
                      {item.discount && (
                        <div style={styles.carouselDiscount}>
                          {item.discount}
                        </div>
                      )}
                    </div>
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        style={styles.carouselImage}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNSAyNUg1NVY1NUgyNVYyNVoiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTM1IDM1TDQ1IDQ1TDUwIDQwIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=';
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Bottom padding simulation */}
                <div style={styles.bottomPadding}></div>
              </div>
            </div>
          </div>

          {/* Item Details */}
          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Item Details</h4>
            <div style={styles.detailsSection}>
              <div style={styles.detailsGrid}>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Title:</span>
                  <span style={styles.detailValue}>{item.title}</span>
                </div>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Subtitle:</span>
                  <span style={styles.detailValue}>{item.subtitle}</span>
                </div>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Description:</span>
                  <span style={styles.detailValue}>{item.description || 'None'}</span>
                </div>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Price:</span>
                  <span style={styles.detailValue}>
                    ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price || '0.00'}
                    {item.originalPrice && (
                      <span style={{ color: '#6b7280', textDecoration: 'line-through', marginLeft: '0.5rem' }}>
                        ${typeof item.originalPrice === 'number' ? item.originalPrice.toFixed(2) : item.originalPrice}
                      </span>
                    )}
                  </span>
                </div>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Discount:</span>
                  <span style={styles.detailValue}>{item.discount || 'None'}</span>
                </div>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Action:</span>
                  <span style={styles.detailValue}>{item.actionType} → {item.actionValue}</span>
                </div>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Background:</span>
                  <div style={styles.colorSwatch}>
                    <div 
                      style={{
                        ...styles.colorBox,
                        backgroundColor: item.backgroundColor
                      }}
                    />
                    {item.backgroundColor}
                  </div>
                </div>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Text Color:</span>
                  <div style={styles.colorSwatch}>
                    <div 
                      style={{
                        ...styles.colorBox,
                        backgroundColor: item.textColor
                      }}
                    />
                    {item.textColor}
                  </div>
                </div>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Display Order:</span>
                  <span style={styles.detailValue}>{item.displayOrder || 1}</span>
                </div>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Status:</span>
                  <span 
                    style={{
                      ...styles.badge,
                      ...(item.isActive ? styles.activeBadge : styles.inactiveBadge)
                    }}
                  >
                    {item.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Information */}
          {(item.startDate || item.endDate) && (
            <div style={styles.section}>
              <h4 style={styles.sectionTitle}>Schedule</h4>
              <div style={styles.scheduleSection}>
                <div style={styles.scheduleGrid}>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Start Date:</span>
                    <span style={styles.detailValue}>
                      {item.startDate ? new Date(item.startDate).toLocaleDateString() : 'Not set'}
                    </span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>End Date:</span>
                    <span style={styles.detailValue}>
                      {item.endDate ? new Date(item.endDate).toLocaleDateString() : 'Not set'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={styles.actions}>
          <button
            onClick={onClose}
            style={styles.closeButtonAction}
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}