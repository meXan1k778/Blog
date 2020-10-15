function cutText(text) {
    return `${text
      .split(' ')
      .filter((item, i) => i < 23)
      .join(' ')} ... `;
  }

  export default cutText