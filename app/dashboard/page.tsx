export default function Dashboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Dashboard</h1>
      <section className="mb-6">
        <h2 className="font-semibold">Profile</h2>
        <p>Name: Jessica</p>
        <p>Email: jessica@example.com</p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold">Your Bookings</h2>
        <ul className="border p-2">
          <li className="flex justify-between items-center">
            Booking #123 - 20 Nov 2025
            <button className="bg-red-500 text-white px-2 py-1">Cancel & Refund</button>
          </li>
          <li className="flex justify-between items-center">
            Booking #124 - 22 Nov 2025
            <button className="bg-red-500 text-white px-2 py-1">Cancel & Refund</button>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-semibold">Refund Status</h2>
        <p>No pending refunds</p>
      </section>
    </div>
  )
}
