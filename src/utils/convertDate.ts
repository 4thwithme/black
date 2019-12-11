export default(date: Date | number) => {
  const d = new Date();

  const interactionDate = new Date(date).toLocaleString('en-US', { day: 'numeric', month: '2-digit', year: 'numeric' });
  const today = new Date().toLocaleString('en-US', { day: 'numeric', month: '2-digit', year: 'numeric' });
  const yesterday = new Date(d.setDate(d.getDate() - 1)).toLocaleString('en-US', { day: 'numeric', month: '2-digit', year: 'numeric' });

  const formatDate = new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' });

  if (interactionDate === today) {
    return new Date(date).toLocaleTimeString().slice(0, 5);
  }
  else if (interactionDate === yesterday) {
    return "Yesterday";
  }
  else {
    return formatDate;
  }
};