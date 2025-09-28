import SubscriptionManagement from '@/components/admin/SubscriptionManagement';

export default function SubscriptionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Subscription Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage subscription plans and customer subscriptions
        </p>
      </div>
      <SubscriptionManagement />
    </div>
  );
}


