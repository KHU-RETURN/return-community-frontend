const DateConverter = (dateString) => {
    const dateTime = new Date(dateString);
    const currentTime = new Date();
    const timeDifference = currentTime - dateTime;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const years = Math.floor(days / 365);

    if (years > 0) {
      return `${years}년 전`;
    } else if (days > 0) {
      return `${days}일 전`;
    } else if (hours > 0) {
      return `${hours}시간 전`;
    } else if (minutes > 0) {
      return`${minutes}분 전`;
    } else {
      return`${seconds}초 전`;
    }
};

export default DateConverter;
