// src/components/ui/card.jsx
export const Card = ({ children, className }) => {
    return (
      <div className={`p-4 bg-gray-800 rounded-lg shadow ${className}`}>
        {children}
      </div>
    );
  };
  