import SettingsManagement from '@/components/admin/SettingsManagement';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage app settings, notifications, and system configuration
        </p>
      </div>
      <SettingsManagement />
    </div>
  );
}


