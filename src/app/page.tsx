export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <h1 className="text-5xl font-extrabold text-blue-700 mb-6 drop-shadow-lg">
        Welcome to the MERN Full-Stack App
      </h1>
      <p className="text-xl text-gray-700 mb-4">This is the home page.</p>
      <div className="mt-8 p-6 bg-white rounded shadow-lg border border-blue-200">
      </div>
    </main>
  );
}