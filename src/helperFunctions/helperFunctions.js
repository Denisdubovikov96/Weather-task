export function dtToTime(dt) {
  return new Date(dt * 1000).toLocaleTimeString();
}
