export const truncateString = (str : string, num : number, suffix?: string) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + suffix || "...";
  };
  

  export const reply = (message: string, replyTo: string) => {
    return `@${replyTo}, ${message}`;
  }