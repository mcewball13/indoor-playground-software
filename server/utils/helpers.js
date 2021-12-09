module.exports = {
    format_paragraph: paragraph => {
        if (paragraph.length > 75) {
            paragraph = paragraph.substr(0,74) + '...';
        }
        return paragraph;
    },
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
          date
        ).getFullYear()}`;
      },
}