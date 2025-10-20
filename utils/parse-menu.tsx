export const parseMenu = (text: string) => {
  const lines = text.split("\n").filter((l) => l.trim());
  const dishes: { name: string; description?: string }[] = [];
  let currentDish: { name: string; description?: string } | null = null;

  for (const line of lines) {

    if (/^[A-Z][A-Za-z\s]+$/.test(line) || line.includes("- $")) {
      if (currentDish) dishes.push(currentDish);
      currentDish = { name: line, description: "" };
    } else if (currentDish) {
      currentDish.description += line + " ";
    }
  }
  if (currentDish) dishes.push(currentDish);
  return dishes;
};
