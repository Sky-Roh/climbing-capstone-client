export const getColorByTitle = (title) => {
  switch (title) {
    case "Sport Climbing":
      return "#1E6FCC";
    case "Bouldering":
      return "#8A2BE2";
    case "Autobelay":
      return "#00B5AD";
    case "Top Rope":
      return "#FF6B6B";
    case "Traditional Climbing":
      return "#FF1493";
    default:
      return "#808080"; 
  }
};