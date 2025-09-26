'use client';

import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export default function AdminHeader() {
  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1"></div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Notifications */}
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" />
          </button>

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />

          {/* Profile dropdown */}
          <div className="flex items-center gap-x-2">
            <UserCircleIcon className="h-8 w-8 text-gray-400" />
            <span className="hidden lg:block text-sm font-medium text-gray-700">
              Admin User
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

