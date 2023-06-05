export function WriteStorage(key, value) {
  try {
    const type = typeof value;
    let valueToWrite = "null";

    switch (type) {
      case "object":
        if (value) {
          valueToWrite = JSON.stringify(value);
        }
        localStorage.setItem(key, valueToWrite);
        break;
      default:
        localStorage.setItem(key, value);
        break;
    }
  } catch (error) {
    console.error(error);
  }
}

export function ReadStorage(key) {
  return localStorage.getItem(key);
}

export function ClearStorage() {
  return localStorage.clear();
}
