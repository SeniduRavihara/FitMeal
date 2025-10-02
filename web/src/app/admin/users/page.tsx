import UserManagement from '@/components/admin/UserManagement';

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage customer accounts, subscriptions, and user data
        </p>
      </div>
      <UserManagement />
    </div>
  );
}





