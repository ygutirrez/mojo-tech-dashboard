export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-mojo-green rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">MoJo Creative</h1>
              <p className="text-sm text-gray-500">AI Content Generator</p>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            Powered by AI
          </div>
        </div>
      </div>
    </header>
  )
}
