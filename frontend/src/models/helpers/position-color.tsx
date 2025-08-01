  // Helper function to get position color
  export const getPositionColor = (position: string) => {
    const colors: { [key: string]: string } = {
      'GK': 'bg-yellow-100 text-yellow-800',
      'CB': 'bg-blue-100 text-blue-800',
      'LB': 'bg-blue-100 text-blue-800',
      'RB': 'bg-blue-100 text-blue-800',
      'CDM': 'bg-green-100 text-green-800',
      'CM': 'bg-green-100 text-green-800',
      'CAM': 'bg-green-100 text-green-800',
      'LM': 'bg-green-100 text-green-800',
      'RM': 'bg-green-100 text-green-800',
      'LW': 'bg-red-100 text-red-800',
      'RW': 'bg-red-100 text-red-800',
      'ST': 'bg-red-100 text-red-800',
    };
    return colors[position] || 'bg-gray-100 text-gray-800';
  };