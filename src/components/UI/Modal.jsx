const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-3/4" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-xl font-semibold text-gray-200 mb-4">{title}</h2>
              {children}
              <button onClick={onClose} className="mt-4 bg-red-600 px-4 py-2 rounded text-white hover:bg-red-500">
              Close
              </button>
          </div>
      </div>
    );
}

export default Modal