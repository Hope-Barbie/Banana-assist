export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 p-6">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Unauthorized</h1>
        <p className="text-gray-700 mb-6">
          You do not have permission to access this page.
        </p>
        <a
          href="/"
          className="text-white bg-red-600 px-4 py-2 rounded hover:bg-red-700"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}
