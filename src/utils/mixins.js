import moment from "moment"
moment.locale('zh-tw');

export const fromNowFilter = {
  filters: {
    fromNow(dateTime) {
      if (!dateTime) return "-";
      return moment(dateTime).fromNow();
    },
  }
}

export const emptyImageFilter = {
  filters: {
    emptyImage(src) {
      return src || 'https://via.placeholder.com/350x220/DFDFDF?text=No+Image'
    }
  }
}