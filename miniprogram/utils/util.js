module.exports = {
  parseDate: function(date){
    return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
  },

}