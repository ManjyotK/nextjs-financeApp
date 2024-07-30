"use client";

import { createUser } from "@/app/lib/actions";

/**
 * Form component for creating a new user.
 * @returns The JSX for the form.
 */
export default function Form() {
  // The form for creating a new user
  return (
    <form action={createUser}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Name */}
        <div className="mb-4">
          {/* Label for the name input */}
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Enter name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              {/* Name input */}
              <input
                id="name"
                name="name"
                type="string"
                placeholder="Enter name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Email Address */}
        <div className="mb-4">
          {/* Label for the email address input */}
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Enter email address
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              {/* Email address input */}
              <input
                id="email"
                name="email"
                type="string"
                placeholder="Enter email address"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Submit button */}
      <div className="mt-6 flex justify-end gap-4">
        <button type="submit">Create User</button>
      </div>
    </form>
  );
}
