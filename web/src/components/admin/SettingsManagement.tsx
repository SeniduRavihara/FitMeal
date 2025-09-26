'use client';

import { useState } from 'react';
import { 
  BellIcon,
  CogIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  TruckIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

export default function SettingsManagement() {
  const [settings, setSettings] = useState({
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      orderUpdates: true,
      marketingEmails: false,
    },
    delivery: {
      deliveryRadius: 25,
      deliveryFee: 2.99,
      freeDeliveryThreshold: 25,
      deliveryTimeSlots: ['9:00-12:00', '12:00-15:00', '15:00-18:00', '18:00-21:00'],
    },
    payment: {
      stripeEnabled: true,
      paypalEnabled: true,
      applePayEnabled: true,
      googlePayEnabled: true,
    },
    app: {
      maintenanceMode: false,
      appVersion: '1.0.0',
      apiVersion: 'v1',
      debugMode: false,
    },
  });

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value,
      },
    }));
  };

  return (
    <div className="space-y-8">
      {/* Notifications Settings */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <BellIcon className="h-6 w-6 text-gray-400 mr-3" />
            <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
          </div>
        </div>
        <div className="px-6 py-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
              <p className="text-sm text-gray-500">Send email notifications to customers</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.emailNotifications}
              onChange={(e) => handleSettingChange('notifications', 'emailNotifications', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Push Notifications</h4>
              <p className="text-sm text-gray-500">Send push notifications to mobile app</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.pushNotifications}
              onChange={(e) => handleSettingChange('notifications', 'pushNotifications', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Order Updates</h4>
              <p className="text-sm text-gray-500">Notify customers about order status changes</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.orderUpdates}
              onChange={(e) => handleSettingChange('notifications', 'orderUpdates', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Marketing Emails</h4>
              <p className="text-sm text-gray-500">Send promotional and marketing emails</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.marketingEmails}
              onChange={(e) => handleSettingChange('notifications', 'marketingEmails', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
        </div>
      </div>

      {/* Delivery Settings */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <TruckIcon className="h-6 w-6 text-gray-400 mr-3" />
            <h3 className="text-lg font-medium text-gray-900">Delivery Settings</h3>
          </div>
        </div>
        <div className="px-6 py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Delivery Radius (miles)
            </label>
            <input
              type="number"
              value={settings.delivery.deliveryRadius}
              onChange={(e) => handleSettingChange('delivery', 'deliveryRadius', parseInt(e.target.value))}
              className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Delivery Fee ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={settings.delivery.deliveryFee}
              onChange={(e) => handleSettingChange('delivery', 'deliveryFee', parseFloat(e.target.value))}
              className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Free Delivery Threshold ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={settings.delivery.freeDeliveryThreshold}
              onChange={(e) => handleSettingChange('delivery', 'freeDeliveryThreshold', parseFloat(e.target.value))}
              className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Payment Settings */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <CreditCardIcon className="h-6 w-6 text-gray-400 mr-3" />
            <h3 className="text-lg font-medium text-gray-900">Payment Methods</h3>
          </div>
        </div>
        <div className="px-6 py-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Stripe</h4>
              <p className="text-sm text-gray-500">Credit card payments via Stripe</p>
            </div>
            <input
              type="checkbox"
              checked={settings.payment.stripeEnabled}
              onChange={(e) => handleSettingChange('payment', 'stripeEnabled', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">PayPal</h4>
              <p className="text-sm text-gray-500">PayPal payments</p>
            </div>
            <input
              type="checkbox"
              checked={settings.payment.paypalEnabled}
              onChange={(e) => handleSettingChange('payment', 'paypalEnabled', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Apple Pay</h4>
              <p className="text-sm text-gray-500">Apple Pay for iOS devices</p>
            </div>
            <input
              type="checkbox"
              checked={settings.payment.applePayEnabled}
              onChange={(e) => handleSettingChange('payment', 'applePayEnabled', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Google Pay</h4>
              <p className="text-sm text-gray-500">Google Pay for Android devices</p>
            </div>
            <input
              type="checkbox"
              checked={settings.payment.googlePayEnabled}
              onChange={(e) => handleSettingChange('payment', 'googlePayEnabled', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
        </div>
      </div>

      {/* App Settings */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <CogIcon className="h-6 w-6 text-gray-400 mr-3" />
            <h3 className="text-lg font-medium text-gray-900">App Configuration</h3>
          </div>
        </div>
        <div className="px-6 py-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Maintenance Mode</h4>
              <p className="text-sm text-gray-500">Put the app in maintenance mode</p>
            </div>
            <input
              type="checkbox"
              checked={settings.app.maintenanceMode}
              onChange={(e) => handleSettingChange('app', 'maintenanceMode', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Debug Mode</h4>
              <p className="text-sm text-gray-500">Enable debug logging and features</p>
            </div>
            <input
              type="checkbox"
              checked={settings.app.debugMode}
              onChange={(e) => handleSettingChange('app', 'debugMode', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                App Version
              </label>
              <input
                type="text"
                value={settings.app.appVersion}
                onChange={(e) => handleSettingChange('app', 'appVersion', e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API Version
              </label>
              <input
                type="text"
                value={settings.app.apiVersion}
                onChange={(e) => handleSettingChange('app', 'apiVersion', e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
          Save Settings
        </button>
      </div>
    </div>
  );
}

