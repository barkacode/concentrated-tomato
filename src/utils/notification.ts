export const playSound = () => {
  const audio = new Audio("/sounds/ding.mp3");
  audio.play().catch((e) => console.log("Audio playback failed:", e));
};

export const showNotification = (title: string) => {
  if (Notification.permission === "granted") {
    const notification = new Notification(title);

    setTimeout(() => {
      notification.close();
    }, 5000);
  }
}; 